/**
 * Email Sending Utilities
 * Uses Resend for production or console logging for development
 */

import { render } from '@react-email/render';

interface EmailOptions {
  to: string;
  subject: string;
  react: React.ReactElement;
}

/**
 * Send email using Resend or log to console in development
 */
export async function sendEmail({ to, subject, react }: EmailOptions) {
  const html = await render(react);

  // Check if Resend API key is configured
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey || apiKey.startsWith('re_123')) {
    // Development mode: Log to console instead of sending
    console.log('\n========== EMAIL (DEV MODE) ==========');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('HTML:', html.substring(0, 200) + '...');
    console.log('======================================\n');
    
    return {
      success: true,
      mode: 'development',
      message: 'Email logged to console (no actual email sent)',
    };
  }

  try {
    // Production mode: Send actual email with Resend
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const response = await resend.emails.send({
      from: 'Vendor Circle <onboarding@vendorscircle.com>',
      to,
      subject,
      html,
    });

    console.log('Email sent successfully:', response);

    return {
      success: true,
      mode: 'production',
      emailId: response.data?.id,
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    
    // Fallback to console in case of error
    console.log('\n========== EMAIL (FALLBACK) ==========');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Error:', error);
    console.log('======================================\n');
    
    return {
      success: false,
      mode: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Simplified email sending for common templates
 */
export async function sendMagicLinkEmail(
  to: string,
  magicLink: string,
  recipientName?: string
) {
  const { MagicLinkEmail } = await import('./templates/magic-link-template');
  
  return sendEmail({
    to,
    subject: 'Sign in to Vendor Circle',
    react: MagicLinkEmail({ recipientName, magicLink }),
  });
}

export async function sendBankInviteEmail(
  to: string,
  bankName: string,
  inviteLink: string,
  recipientName?: string
) {
  const { BankInviteEmail } = await import('./templates/bank-invite-template');
  
  return sendEmail({
    to,
    subject: `${bankName} invites you to Vendor Circle`,
    react: BankInviteEmail({ recipientName, bankName, inviteLink }),
  });
}

export async function sendTeamInviteEmail(
  to: string,
  businessName: string,
  adminName: string,
  inviteLink: string,
  recipientName?: string,
  role?: string
) {
  const { TeamInviteEmail } = await import('./templates/team-invite-template');
  
  return sendEmail({
    to,
    subject: `${adminName} added you to ${businessName}'s Vendor Circle account`,
    react: TeamInviteEmail({
      recipientName,
      businessName,
      adminName,
      role,
      inviteLink,
    }),
  });
}
