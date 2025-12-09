# Supabase Setup Guide

This guide will help you connect your NEXXPORT application to Supabase with full authentication and database integration.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Your Supabase project URL and anon key

## Setup Steps

### 1. Environment Variables

The environment variables have already been configured in the `.env` file:

```env
VITE_SUPABASE_URL=https://utvjkxepitxfxspkqelx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Enable Email Authentication in Supabase

1. Go to your Supabase Dashboard: https://utvjkxepitxfxspkqelx.supabase.co
2. Navigate to **Authentication** → **Providers**
3. Enable **Email** provider
4. Configure email templates if needed (optional)
5. Save changes

### 3. Create User Accounts

You need to create user accounts in Supabase for each authorized user. There are two ways:

#### Option A: Via Supabase Dashboard (Recommended for initial setup)

1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Enter email and password for each user:
   - `Claudionicholas12@gmail.com` (Admin)
   - `yulitagreacelia0507@gmail.com`
   - `fyohana09@gmail.com`
   - `shengwangli2002@gmail.com`
   - `matthewl010713@gmail.com`
   - `evewong123001@gmail.com`
   - `ericleong147258@gmail.com`
   - `crsnnexmax@gmail.com`
   - `sreynichchin66@gmail.com`
   - `chellisblessed@gmail.com`
4. Set initial password for each (users can change later)
5. Click **Create User**

#### Option B: Via Email Signup (Users sign up themselves)

Users can sign up at the login page if you enable public signup:
1. Go to **Authentication** → **Settings**
2. Enable **Enable email confirmations** (optional)
3. Enable **Enable signup** (if you want public registration)

### 4. Create Database Tables

1. Go to your Supabase Dashboard: https://utvjkxepitxfxspkqelx.supabase.co
2. Navigate to the **SQL Editor** section
3. Create a new query
4. Copy and paste the entire contents of `supabase-setup.sql` file
5. Click **Run** to execute the SQL

This will create all necessary tables:
- `stock_mails`
- `bank_accounts`
- `bank_issues`
- `bank_issue_follow_ups`
- `c_operations`
- `transactions`
- `agents`
- `downlines`
- `daily_reports`
- `wealth_listings`
- `last_in_outs`

### 5. Configure Row Level Security (Optional but Recommended)

The SQL script already enables RLS with permissive policies. For production, you should:

1. Go to **Authentication** → **Policies**
2. Review and customize policies for each table
3. Restrict access based on user roles or email
4. Example: Only allow users to see their own data

### 6. How It Works

#### Authentication Flow

1. **Login**: Users sign in with email/password through Supabase Auth
2. **Session Management**: Supabase manages sessions and tokens automatically
3. **2FA Support**: Optional TOTP-based 2FA is still handled locally
4. **Auto-refresh**: Sessions are automatically refreshed

#### Data Flow

1. **Local Storage**: Data is stored in browser localStorage for instant access
2. **Supabase Sync**: Data is loaded from Supabase on app start
3. **Manual Sync**: Use the "Sync to Database" button to upload local data to Supabase
4. **Real-time**: Supabase auth state changes are detected automatically

### 7. Using the Application

#### First Time Login

1. Users must have an account created in Supabase
2. Navigate to the login page
3. Enter email and password
4. If 2FA is enabled for the user, enter the TOTP code
5. User is authenticated via Supabase

#### Session Management

- Sessions persist across browser refreshes
- Sessions automatically refresh when needed
- Logout clears both local and Supabase sessions

#### Data Syncing

1. Go to the Dashboard
2. Click **"Sync to Database"** button
3. This uploads all local data to Supabase
4. Refresh the page to load latest data from Supabase

### 8. Admin Features

Admin users (like PE_NICC) can:
- Add new users to the authorized users list
- Delete users (except primary admin)
- Manage user permissions
- Export data to JSON

### 9. Security Notes

#### Current Setup
- ✅ Supabase authentication enabled
- ✅ Row Level Security (RLS) enabled
- ✅ HTTPS connections
- ✅ JWT-based sessions
- ✅ Optional 2FA support

#### Production Recommendations
1. **Environment Variables**: Never commit `.env` to version control
2. **Password Policy**: Enforce strong passwords in Supabase settings
3. **Email Verification**: Enable email confirmation for new signups
4. **Custom Policies**: Update RLS policies to restrict data access by user
5. **Rate Limiting**: Enable rate limiting in Supabase dashboard
6. **Audit Logs**: Monitor authentication logs in Supabase

### 10. Monitoring

Monitor your system in the Supabase Dashboard:

- **Authentication**: View login activity, manage users
- **Table Editor**: View and edit data directly
- **Database**: See table structures and relationships
- **Logs**: Monitor queries, errors, and authentication events
- **API**: View API usage and performance

### 11. Troubleshooting

#### Authentication Issues

**Cannot login?**
- Verify user exists in Supabase Auth
- Check password is correct
- Look for errors in browser console
- Verify Supabase URL and anon key in `.env`

**Session expires too quickly?**
- Check Supabase Auth settings for session timeout
- Sessions auto-refresh by default

**2FA not working?**
- Ensure TOTP secret is saved for the user
- Verify system time is synchronized
- Try generating a new QR code

#### Data Issues

**Data not syncing?**
- Check browser console for errors
- Verify tables exist in Supabase
- Confirm RLS policies allow access
- Check network connectivity

**Tables not found?**
- Run the `supabase-setup.sql` script
- Verify all tables were created successfully
- Check for SQL errors in Supabase logs

**Connection errors?**
- Verify Supabase project is active
- Check internet connection
- Confirm anon key is valid

### 12. User Management

#### Adding New Users

As an admin:
1. Go to Settings page in the app
2. Add user to authorized users list
3. Then create the user in Supabase Dashboard
   - Navigate to Authentication → Users
   - Click "Add User"
   - Enter email and temporary password
   - User can change password after first login

#### Resetting Passwords

1. Go to Supabase Dashboard
2. Navigate to Authentication → Users
3. Find the user
4. Click "Reset Password"
5. User will receive password reset email

### 13. Migration from Local Auth

If you were previously using local authentication:

1. All existing user data in localStorage is preserved
2. Users need accounts created in Supabase
3. Use the same email addresses
4. Set initial passwords (users can change later)
5. 2FA settings are maintained locally

### 14. Development vs Production

#### Development
- Use Supabase development project
- Test with sample data
- Enable detailed logging

#### Production
- Use separate Supabase production project
- Enable email verification
- Configure custom email templates
- Set up proper RLS policies
- Enable audit logging
- Configure rate limiting

### 15. Future Enhancements

Consider implementing:
- ✨ Real-time subscriptions for live data updates
- ✨ Automatic background syncing
- ✨ Conflict resolution for concurrent edits
- ✨ OAuth providers (Google, GitHub, etc.)
- ✨ File storage for attachments
- ✨ Email notifications
- ✨ Webhooks for external integrations

### 16. Support

For issues:
- Check Supabase documentation: https://supabase.com/docs
- View Supabase status: https://status.supabase.com
- Review browser console for errors
- Check Supabase logs in dashboard

## Quick Start Checklist

- [ ] Environment variables configured
- [ ] Supabase email auth enabled
- [ ] User accounts created in Supabase
- [ ] SQL tables created
- [ ] Users can login successfully
- [ ] Data syncs to database
- [ ] Admin features working
- [ ] 2FA tested (if enabled)

Your NEXXPORT application is now fully integrated with Supabase! 🚀