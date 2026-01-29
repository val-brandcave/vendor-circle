/**
 * Bank Invite Email Template
 * Used when a bank invites an appraiser to join Vendor Circle
 */

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';

interface BankInviteEmailProps {
  recipientName?: string;
  bankName: string;
  inviteLink: string;
  expiryDays?: number;
}

export function BankInviteEmail({
  recipientName,
  bankName,
  inviteLink,
  expiryDays = 7,
}: BankInviteEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={bankTitle}>{bankName}</Text>
            <Text style={subtitle}>invites you to</Text>
            <Text style={title}>Vendors Circle</Text>
          </Section>

          <Section style={content}>
            <Text style={greeting}>
              Hi{recipientName ? ` ${recipientName}` : ''},
            </Text>
            
            <Text style={paragraph}>
              <strong>{bankName}</strong> has invited you to join Vendor Circle 
              to streamline your credential management and receive opportunities.
            </Text>

            <Text style={heading}>With Vendor Circle, you can:</Text>
            <ul style={list}>
              <li style={listItem}>Update your credentials once, notify all banks automatically</li>
              <li style={listItem}>Manage licenses, coverage areas, and specialties in one place</li>
              <li style={listItem}>Receive and respond to bid invitations</li>
              <li style={listItem}>Track your performance and ratings</li>
            </ul>

            <Button style={button} href={inviteLink}>
              Accept Invitation
            </Button>

            <Hr style={divider} />

            <Text style={footer}>
              This invitation expires in {expiryDays} days.
            </Text>

            <Text style={footer}>
              This invitation was sent by <strong>{bankName}</strong> via Realwired's Vendor Circle platform.
            </Text>

            <Text style={footer}>
              Questions? Contact {bankName} or visit our help center.
            </Text>
          </Section>

          <Section style={brandingSection}>
            <Text style={branding}>Powered by Realwired</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const header = {
  padding: '24px',
  textAlign: 'center' as const,
  borderBottom: '2px solid #2652B1',
};

const bankTitle = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#333',
  margin: '0 0 8px 0',
};

const subtitle = {
  fontSize: '14px',
  color: '#666',
  margin: '0 0 8px 0',
};

const title = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#2652B1',
  margin: '0',
};

const content = {
  padding: '0 48px',
};

const greeting = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#333',
  marginBottom: '16px',
  marginTop: '24px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#555',
  marginBottom: '16px',
};

const heading = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#333',
  marginBottom: '12px',
  marginTop: '24px',
};

const list = {
  paddingLeft: '20px',
  marginBottom: '24px',
};

const listItem = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#555',
  marginBottom: '8px',
};

const button = {
  backgroundColor: '#2652B1',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '14px 24px',
  marginTop: '32px',
  marginBottom: '32px',
};

const divider = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const footer = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#8898aa',
  marginBottom: '12px',
};

const brandingSection = {
  padding: '24px 48px',
  borderTop: '1px solid #e6ebf1',
};

const branding = {
  fontSize: '12px',
  color: '#8898aa',
  textAlign: 'center' as const,
  margin: '0',
};

export default BankInviteEmail;
