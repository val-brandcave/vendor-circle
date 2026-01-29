/**
 * API Route: Send Invite (Bank or Team)
 * POST /api/auth/send-invite
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateInviteToken } from '@/lib/email/magic-link';
import { sendBankInviteEmail, sendTeamInviteEmail } from '@/lib/email/send-email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      inviteType, // 'bank' or 'team'
      bankId,
      bankName,
      businessId,
      businessName,
      adminName,
      role,
      recipientName,
    } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!inviteType) {
      return NextResponse.json(
        { success: false, error: 'Invite type is required' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                    request.headers.get('origin') ||
                    'http://localhost:3000';

    if (inviteType === 'bank') {
      if (!bankId || !bankName) {
        return NextResponse.json(
          { success: false, error: 'Bank information is required' },
          { status: 400 }
        );
      }

      const token = generateInviteToken({
        email,
        type: 'bank_invite',
        inviterId: bankId,
        inviterName: bankName,
        bankId,
        bankName,
      });

      const inviteLink = `${baseUrl}/accept-invite?token=${token}`;
      
      await sendBankInviteEmail(email, bankName, inviteLink, recipientName);

      return NextResponse.json({
        success: true,
        message: 'Bank invite sent successfully',
        inviteLink,
      });

    } else if (inviteType === 'team') {
      if (!businessId || !businessName || !adminName) {
        return NextResponse.json(
          { success: false, error: 'Business and admin information is required' },
          { status: 400 }
        );
      }

      const token = generateInviteToken({
        email,
        type: 'team_invite',
        inviterId: businessId,
        inviterName: adminName,
        businessId,
        businessName,
        role,
      });

      const inviteLink = `${baseUrl}/join-team?token=${token}`;
      
      await sendTeamInviteEmail(email, businessName, adminName, inviteLink, recipientName, role);

      return NextResponse.json({
        success: true,
        message: 'Team invite sent successfully',
        inviteLink,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid invite type' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Failed to send invite:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send invite' },
      { status: 500 }
    );
  }
}
