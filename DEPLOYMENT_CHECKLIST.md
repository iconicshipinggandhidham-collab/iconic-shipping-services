# Live deployment checklist

1. Create a managed PostgreSQL database.
2. Create a Node/Docker web service and connect this repository/project.
3. Set every variable from `.env.example` in the hosting dashboard.
4. Run `npm run db:init` once against production DB.
5. Run `npm run admin:create` once with a strong admin password.
6. Configure SMTP and verify new-enquiry emails.
7. Attach your custom domain and force HTTPS.
8. Test:
   - customer register/login/logout
   - enquiry submission
   - admin login
   - status change
   - quote creation
   - PDF download
   - customer quote download
9. Enable managed PostgreSQL backups.
10. Keep `.env` and credentials out of Git.
