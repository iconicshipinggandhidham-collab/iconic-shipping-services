# ICONIC SHIPPING SERVICES — Production Version

## Included
- PostgreSQL database
- Secure password hashing with bcrypt
- HTTP-only JWT authentication cookies
- Customer registration/login
- Admin login and protected dashboard
- Enquiry creation and status management
- Email notification on new enquiry
- Quote builder with line items, tax and validity date
- Downloadable quotation PDF
- Customer portal to see own enquiries and download quotes
- Helmet security headers
- Rate limiting on auth/enquiry routes
- Uploaded ICONIC banner used in the website
- Dockerfile + Render deployment template

## Local setup

1. Install Node.js 20+ and PostgreSQL.
2. Copy `.env.example` to `.env`.
3. Set `DATABASE_URL` and `JWT_SECRET`.
4. Set SMTP values for your business email.
5. Install:
   npm install
6. Initialize DB:
   npm run db:init
7. Create admin:
   npm run admin:create
8. Start:
   npm start
9. Open:
   http://localhost:3000

## Production deployment

Recommended simple architecture:
- Web app: Render (Docker)
- Database: managed PostgreSQL such as Render PostgreSQL or Neon
- SMTP: your business email provider / transactional SMTP
- Domain: your own domain pointing to the web service

Set all environment variables from `.env.example` in the hosting dashboard. Never commit `.env`, passwords, JWT secrets or SMTP credentials.

After deployment:
1. Run DB initialization against production DB.
2. Run the admin creation command with a strong unique password.
3. Confirm `/api/health`.
4. Test customer registration/login.
5. Submit an enquiry and confirm the notification email.
6. Log in as admin, create a quotation and download the PDF.
7. Log in as customer and verify the quote appears.

## Security notes
- Use HTTPS only in production.
- Use a long random JWT_SECRET.
- Use a unique admin password.
- Rotate SMTP password if it has ever been shared elsewhere.
- PostgreSQL backups should be enabled by the DB provider.
- For higher security, add MFA, CAPTCHA/WAF, email verification and object storage for documents before handling sensitive production traffic.
