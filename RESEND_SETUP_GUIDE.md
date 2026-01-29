# Resend Setup Guide for Vendors Circle

## Quick Setup (5 minutes)

### Step 1: Sign Up for Resend (Free)

1. Go to https://resend.com/signup
2. Sign up with your email
3. Verify your email address

### Step 2: Get Your API Key

1. After signup, go to https://resend.com/api-keys
2. Click "Create API Key"
3. Give it a name (e.g., "Vendors Circle Dev")
4. Copy the API key (starts with `re_`)

### Step 3: Add API Key to Project

1. Create a file named `.env.local` in the `vendors-circle-app` folder
2. Add this line:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```
3. Replace `re_your_actual_api_key_here` with your actual API key from Step 2

### Step 4: Restart Dev Server

```bash
# Stop the current dev server (Ctrl+C)
npm run dev
```

## Testing Email Sending

### Development Mode (No API Key)

If you don't set up Resend, emails will be logged to the console instead of actually sending:

```
========== EMAIL (DEV MODE) ==========
To: user@example.com
Subject: Sign in to Vendor Circle
HTML: <html>...
======================================
```

You can still test the full flow - just check the console for magic links.

### Production Mode (With API Key)

Once you add your Resend API key, emails will actually send!

## Free Tier Limits

- **3,000 emails per month**
- **100 emails per day**
- Perfect for development and testing

## Troubleshooting

### Emails Not Sending?

1. Check that `.env.local` exists
2. Check that API key is correct (starts with `re_`)
3. Restart dev server after adding `.env.local`
4. Check console for error messages

### Emails Going to Spam?

In development, use your own email to test. Resend's free tier sends from `onboarding@resend.dev`, which may be marked as spam. To fix:

1. Upgrade to paid plan ($20/month)
2. Verify your own domain
3. Send from your domain (e.g., `no-reply@yourdomain.com`)

## Quick Test

After setup, go to `/catalogue` and:

1. Click "Send Invite" on any card
2. Check your email inbox
3. Click the magic link
4. You should be signed in!

## Production Deployment

For production, you can:
- Keep using Resend (paid plan for higher limits)
- Switch to SendGrid, AWS SES, etc. (same code, different config)

## Need Help?

- Resend Docs: https://resend.com/docs
- Resend Support: https://resend.com/support
