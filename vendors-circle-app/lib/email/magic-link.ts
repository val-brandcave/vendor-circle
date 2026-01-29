/**
 * Magic Link Generation and Validation
 * Handles secure token generation for passwordless authentication
 */

import { sendMagicLinkEmail } from './send-email';

export interface MagicLinkToken {
  email: string;
  type: 'signin' | 'signup';
  timestamp: number;
  expiresAt: number;
}

export interface InviteToken {
  email: string;
  type: 'bank_invite' | 'team_invite';
  inviterId: string;
  inviterName: string;
  bankId?: string;
  bankName?: string;
  businessId?: string;
  businessName?: string;
  role?: string;
  timestamp: number;
  expiresAt: number;
}

const MAGIC_LINK_EXPIRY = 15 * 60 * 1000; // 15 minutes
const INVITE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Helper: Convert base64 to URL-safe format
 */
function toBase64Url(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Helper: Convert URL-safe base64 back to regular format
 */
function fromBase64Url(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  // Add padding if needed
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

/**
 * Generate a magic link token
 */
export function generateMagicLinkToken(email: string, type: 'signin' | 'signup'): string {
  const timestamp = Date.now();
  const token: MagicLinkToken = {
    email,
    type,
    timestamp,
    expiresAt: timestamp + MAGIC_LINK_EXPIRY,
  };

  // In production, this should be a proper JWT with secret signing
  // For now, we use base64 encoding with a simple signature
  const payload = JSON.stringify(token);
  const encoded = toBase64Url(payload);
  
  // Simple signature (in production, use proper HMAC)
  const signature = toBase64Url(email + timestamp).substring(0, 10);
  
  return `${encoded}.${signature}`;
}

/**
 * Validate and decode a magic link token
 */
export function validateMagicLinkToken(token: string): { valid: boolean; data?: MagicLinkToken; error?: string } {
  try {
    const [encoded, signature] = token.split('.');
    if (!encoded || !signature) {
      return { valid: false, error: 'Invalid token format' };
    }

    const payload = fromBase64Url(encoded);
    const data: MagicLinkToken = JSON.parse(payload);

    // Check expiry
    if (Date.now() > data.expiresAt) {
      return { valid: false, error: 'Token has expired' };
    }

    // Verify signature (simple check)
    const expectedSig = toBase64Url(data.email + data.timestamp).substring(0, 10);
    if (signature !== expectedSig) {
      return { valid: false, error: 'Invalid token signature' };
    }

    return { valid: true, data };
  } catch (error) {
    return { valid: false, error: 'Failed to parse token' };
  }
}

/**
 * Generate an invite token (bank or team)
 */
export function generateInviteToken(params: {
  email: string;
  type: 'bank_invite' | 'team_invite';
  inviterId: string;
  inviterName: string;
  bankId?: string;
  bankName?: string;
  businessId?: string;
  businessName?: string;
  role?: string;
}): string {
  const timestamp = Date.now();
  const token: InviteToken = {
    ...params,
    timestamp,
    expiresAt: timestamp + INVITE_EXPIRY,
  };

  const payload = JSON.stringify(token);
  const encoded = toBase64Url(payload);
  
  const signature = toBase64Url(params.email + timestamp + params.type).substring(0, 10);
  
  return `${encoded}.${signature}`;
}

/**
 * Validate and decode an invite token
 */
export function validateInviteToken(token: string): { valid: boolean; data?: InviteToken; error?: string } {
  try {
    const [encoded, signature] = token.split('.');
    if (!encoded || !signature) {
      return { valid: false, error: 'Invalid token format' };
    }

    const payload = fromBase64Url(encoded);
    const data: InviteToken = JSON.parse(payload);

    // Check expiry
    if (Date.now() > data.expiresAt) {
      return { valid: false, error: 'Invitation has expired' };
    }

    // Verify signature
    const expectedSig = toBase64Url(data.email + data.timestamp + data.type).substring(0, 10);
    if (signature !== expectedSig) {
      return { valid: false, error: 'Invalid token signature' };
    }

    return { valid: true, data };
  } catch (error) {
    return { valid: false, error: 'Failed to parse token' };
  }
}

/**
 * Send a magic link to the user's email
 */
export async function sendMagicLink(email: string, type: 'signin' | 'signup', recipientName?: string) {
  const token = generateMagicLinkToken(email, type);
  
  // Build magic link URL
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  const magicLink = `${baseUrl}/verify-magic?token=${token}`;
  
  // Send email
  await sendMagicLinkEmail(email, magicLink, recipientName);
  
  // Also log to console for development
  console.log('\n🔗 Magic Link Generated:');
  console.log('Email:', email);
  console.log('Link:', magicLink);
  console.log('Expires:', new Date(Date.now() + MAGIC_LINK_EXPIRY).toLocaleString());
  console.log('\n');
  
  return { success: true, token, magicLink };
}

/**
 * Check if a magic link token has been used (stored in localStorage)
 */
export function isTokenUsed(token: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const usedTokens = JSON.parse(localStorage.getItem('used_magic_tokens') || '[]');
  return usedTokens.includes(token);
}

/**
 * Mark a token as used
 */
export function markTokenAsUsed(token: string): void {
  if (typeof window === 'undefined') return;
  
  const usedTokens = JSON.parse(localStorage.getItem('used_magic_tokens') || '[]');
  usedTokens.push(token);
  
  // Keep only last 50 tokens to avoid localStorage bloat
  if (usedTokens.length > 50) {
    usedTokens.shift();
  }
  
  localStorage.setItem('used_magic_tokens', JSON.stringify(usedTokens));
}
