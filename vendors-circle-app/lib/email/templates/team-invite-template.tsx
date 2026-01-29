/**
 * Team Invite Email Template
 * Used when a business admin invites a team member to join
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

interface TeamInviteEmailProps {
  recipientName?: string;
  businessName: string;
  adminName: string;
  role?: string;
  inviteLink: string;
  expiryDays?: number;
}

export function TeamInviteEmail({
  recipientName,
  businessName,
  adminName,
  role = 'Appraiser',
  inviteLink,
  expiryDays = 7,
}: TeamInviteEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={title}>Vendors Circle</Text>
            <Text style={subtitle}>Team Invitation</Text>
          </Section>

          <Section style={content}>
            <Text style={greeting}>
              Hi{recipientName ? ` ${recipientName}` : ''},
            </Text>
            
            <Text style={paragraph}>
              <strong>{adminName}</strong> has added you to <strong>{businessName}'s</strong> Vendor Circle account as {role === 'Appraiser' ? 'an' : 'a'} <strong>{role}</strong>.
            </Text>

            <Text style={heading}>To start receiving opportunities, complete your profile:</Text>
            <ul style={list}>
              <li style={listItem}>Add your licenses and credentials</li>
              <li style={listItem}>Set your coverage areas and specialties</li>
              <li style={listItem}>Upload required documents</li>
            </ul>

            <Text style={paragraph}>
              Once your profile is complete, you'll be able to receive and respond to 
              bid invitations on behalf of <strong>{businessName}</strong>.
            </Text>

            <Button style={button} href={inviteLink}>
              Complete Your Profile
            </Button>

            <Hr style={divider} />

            <Text style={footer}>
              This invitation expires in {expiryDays} days.
            </Text>

            <Text style={footer}>
              Questions? Contact <strong>{adminName}</strong> or your business administrator.
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
  borderBottom: '1px solid #e6ebf1',
};

const title = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#2652B1',
  margin: '0',
};

const subtitle = {
  fontSize: '14px',
  color: '#666',
  margin: '8px 0 0 0',
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

export default TeamInviteEmail;
