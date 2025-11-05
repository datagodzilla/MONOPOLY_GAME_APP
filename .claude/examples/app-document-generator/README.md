# Document Generator Examples (app-builder)

This directory contains example outputs from the `/app-document-generator` command for web application features.

---

## Example 1: Password Reset Feature

**Command**:
```bash
/app-document-generator password-reset
```

**Output**:
```
📝 Documenting feature: password-reset

🔍 Searching for feature implementation...
🟣 Detected: Full-stack feature (frontend + backend)

📂 Found files:
Frontend: src/components/PasswordReset.jsx
Frontend: src/hooks/usePasswordReset.js
Backend: backend/api/routes/password_reset.py
Backend: backend/models/password_reset_token.py

✅ Documentation directories ready

📝 Generating documentation...
   Creating developer docs: docs/dev/password-reset-implementation.md
   Creating user docs: docs/user/how-to-password-reset.md
   Adding cross-references...
   Linking related documentation...

✅ Documentation generated successfully!

📄 Files created:
   - docs/dev/password-reset-implementation.md (developer documentation)
   - docs/user/how-to-password-reset.md (user guide)

🔗 Related documentation:
   - docs/dev/authentication-implementation.md (linked)
   - docs/user/how-to-login.md (linked)

📸 Screenshot placeholders added:
   - docs/user/_screenshots/password-reset-step-1.png
   - docs/user/_screenshots/password-reset-step-2.png
   - docs/user/_screenshots/password-reset-step-3.png
```

**Files Generated**:

### `docs/dev/password-reset-implementation.md`
**Size**: ~500 lines
**Content**:
- Overview and architecture
- Component structure (React components, hooks, utils)
- API endpoints (POST /api/password-reset/request, POST /api/password-reset/confirm)
- Database models (PasswordResetToken)
- Business logic (token generation, email sending, expiration)
- Validation rules (email format, token validity, password strength)
- Testing (unit tests, integration tests, E2E tests)
- Security considerations (rate limiting, token expiration, secure emails)
- Deployment notes

### `docs/user/how-to-password-reset.md`
**Size**: ~300 lines
**Content**:
- What is password reset?
- Before you start (prerequisites)
- Quick start guide (3 steps with screenshots)
- FAQ (common questions about password reset)
- Troubleshooting (token expired, email not received, etc.)
- Tips and best practices
- Mobile app guide (if applicable)

---

## Example 2: User Dashboard (Frontend Only)

**Command**:
```bash
/app-document-generator user-dashboard
```

**Output**:
```
📝 Documenting feature: user-dashboard

🔍 Searching for feature implementation...
🔵 Detected: Frontend feature

📂 Found files:
Frontend: src/components/UserDashboard.jsx
Frontend: src/hooks/useUserData.js
Frontend: src/utils/dashboardHelpers.js

✅ Documentation generated successfully!

📄 Files created:
   - docs/dev/user-dashboard-implementation.md
   - docs/user/how-to-user-dashboard.md
```

**Key Sections**:
- Component props and state
- Hooks used (useUserData, useEffect)
- Data visualization (charts, tables)
- Responsive design notes

---

## Example 3: API Authentication (Backend Only)

**Command**:
```bash
/app-document-generator api-authentication
```

**Output**:
```
📝 Documenting feature: api-authentication

🔍 Searching for feature implementation...
🟢 Detected: Backend feature

📂 Found files:
Backend: backend/api/routes/auth.py
Backend: backend/models/user.py
Backend: backend/utils/jwt_helpers.py

✅ Documentation generated successfully!
```

**Key Sections**:
- Authentication flow (login, token generation, token validation)
- JWT implementation details
- Password hashing (bcrypt)
- Rate limiting and security
- API endpoint specifications

---

## Example Documentation Structure

After running `/app-document-generator` on multiple features:

```
docs/
├── dev/                                    # Developer documentation
│   ├── password-reset-implementation.md
│   ├── user-dashboard-implementation.md
│   ├── api-authentication-implementation.md
│   └── payment-processing-implementation.md
└── user/                                   # User guides
    ├── how-to-password-reset.md
    ├── how-to-user-dashboard.md
    ├── how-to-api-authentication.md
    ├── how-to-payment-processing.md
    └── _screenshots/                       # Screenshot placeholders
        ├── password-reset-step-1.png
        ├── password-reset-step-2.png
        ├── user-dashboard-overview.png
        └── payment-flow-step-1.png
```

---

## Benefits

### Time Savings
- **Before**: 1-2 hours to write documentation manually per feature
- **After**: 3-5 minutes to generate comprehensive docs automatically
- **Savings**: ~90 minutes per feature

### Consistency
- All docs follow the same structure
- No missing sections
- Cross-references automatically added

### Completeness
- Developer docs cover all technical aspects
- User docs include troubleshooting and FAQs
- Screenshot placeholders remind you to add visuals

---

## Best Practices

### 1. Run After Feature Implementation
```bash
# Implement feature first
/app-code "Create password reset feature"

# Then generate documentation
/app-document-generator password-reset
```

### 2. Customize Generated Docs
- Review generated content for accuracy
- Add actual screenshots to replace placeholders
- Update examples with real data
- Add project-specific notes

### 3. Keep Docs Updated
- Re-run `/app-document-generator` after major changes
- Update screenshots when UI changes
- Keep cross-references current

### 4. Commit Documentation
```bash
git add docs/
git commit -m "Add password reset documentation"
```

---

## Next Steps

1. **Review this README** to understand example outputs
2. **Try the command** on your own features
3. **Customize the templates** if needed (in command file)
4. **Build documentation habit** - run after every feature

---

**Document Features, Not Afterthoughts!** 📝
