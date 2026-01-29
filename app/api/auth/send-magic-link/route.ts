/**
 * API Route: Send Magic Link
 * POST /api/auth/send-magic-link
 */

import { NextRequest, NextResponse } from 'next/server';
import { sendMagicLink } from '@/lib/email/magic-link';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, type, recipientName } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Send magic link
    const result = await sendMagicLink(email, type || 'signin', recipientName);

    return NextResponse.json({
      ...result,
      message: 'Magic link sent successfully',
    });
  } catch (error) {
    console.error('Failed to send magic link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send magic link' },
      { status: 500 }
    );
  }
}
