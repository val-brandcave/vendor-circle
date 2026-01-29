/**
 * Magic Link Email Template
 * Used for passwordless authentication
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

interface MagicLinkEmailProps {
  recipientName?: string;
  magicLink: string;
  expiryMinutes?: number;
}

export function MagicLinkEmail({
  recipientName = 'there',
  magicLink,
  expiryMinutes = 15,
}: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={title}>Vendors Circle</Text>
          </Section>

          <Section style={content}>
            <Text style={greeting}>Hi {recipientName},</Text>
            
            <Text style={paragraph}>
              Click the button below to sign in to Vendor Circle:
            </Text>

            <Button style={button} href={magicLink}>
              Sign In to Vendor Circle
            </Button>

            <Text style={paragraph}>
              Or copy and paste this link into your browser:
            </Text>
            <Text style={link}>{magicLink}</Text>

            <Hr style={divider} />

            <Text style={footer}>
              This link expires in {expiryMinutes} minutes and can only be used once.
            </Text>

            <Text style={footer}>
              If you didn't request this email, you can safely ignore it.
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
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#555',
  marginBottom: '16px',
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
  padding: '12px 24px',
  marginTop: '24px',
  marginBottom: '24px',
};

const link = {
  fontSize: '14px',
  color: '#2652B1',
  textDecoration: 'underline',
  wordBreak: 'break-all' as const,
};

const divider = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const footer = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#8898aa',
  marginBottom: '8px',
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

export default MagicLinkEmail;
