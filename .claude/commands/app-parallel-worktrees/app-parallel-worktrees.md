# App Parallel Worktrees Command

**Command**: `/app-parallel-worktrees <features>`

> **Note**: This is the standalone documentation version. For automated multi-agent execution, see [multi-agent/app-parallel-worktrees.md](multi-agent/app-parallel-worktrees.md)

## Purpose

Set up Git worktrees for parallel development of multiple web app features simultaneously. Each feature gets its own isolated workspace with a dedicated branch, allowing you to work on frontend, backend, and full-stack features concurrently without conflicts.

## Two Versions Available

1. **Standalone (this file)**: Comprehensive documentation and manual implementation guide
2. **Multi-Agent (multi-agent/ folder)**: Automated execution using Claude Code subagents via the Task tool

**When to use Multi-Agent version**:
- You want fully automated worktree setup and parallel development
- You have complex features that benefit from subagent specialization
- You want features implemented in true parallel by multiple agents
- You're running Claude Code from the parent directory of your project

**When to use Standalone version**:
- You want to understand the process step-by-step
- You prefer manual control over each phase
- You're learning about Git worktrees and parallel development

---

## Command Format

```bash
/app-parallel-worktrees <feature1> <feature2> <feature3> ...
```

**Arguments**:
- `<feature1>, <feature2>, ...` - Names of features to develop in parallel (space-separated)

---

## What This Command Does

1. **Analyzes Feature Requests**: Determines if features should be split or grouped
2. **Creates Git Worktrees**: Sets up isolated workspaces for each feature
3. **Creates Feature Branches**: Generates `feature/<feature-name>` branches
4. **Sets Up Environments**: Initializes dev environment in each worktree
5. **Provides Navigation**: Lists all worktrees with their paths and purposes

---

## How It Works

### Phase 1: Feature Analysis

**Agent**: `@ultrathink` (for complex feature splitting) or `@app-spec-writer` (for simple cases)

The command first analyzes the feature requests to determine:
- Whether features are independent or related
- If any features should be split into smaller units
- What type of work each feature involves (frontend/backend/full-stack)
- Dependencies between features
- Recommended development order

**Example Analysis Output**:
```
📋 Feature Analysis:
1. user-authentication (full-stack, core feature)
   → Independent, can be developed in parallel

2. dashboard-ui (frontend)
   → Depends on authentication for user data
   → Can start layout independently

3. export-feature (frontend + backend API)
   → Independent, can be developed in parallel

4. settings-page (frontend)
   → Independent, can be developed in parallel

✅ All 4 features can be developed in parallel
⚠️  Note: dashboard-ui will need mock data until authentication is merged
```

---

### Phase 2: Worktree Creation

**Agent**: `@app-full-stack` (orchestrates setup across all worktrees)

For each feature, the command:

1. **Creates the worktree directory**:
   ```bash
   git worktree add ../[project-name]-[feature-name] -b feature/[feature-name]
   ```

2. **Sets up the development environment**:
   - Copies necessary config files (.env.example → .env)
   - Installs dependencies (npm install, pip install)
   - Verifies database connections
   - Ensures test frameworks are ready

3. **Creates a feature specification**:
   ```
   [worktree-path]/FEATURE_SPEC.md
   ```

   Contains:
   - Feature description
   - Files that will be modified
   - API endpoints to create/modify
   - Components to build
   - Tests to write
   - Integration points with other features

---

## Example Usages

### Example 1: Simple Parallel Development

```bash
/app-parallel-worktrees user-profile settings notifications
```

**Output**:
```
🌳 Setting up parallel worktrees for 3 features...

📋 Feature Analysis:
✅ user-profile: Frontend + Backend (user profile page + API)
✅ settings: Frontend (settings page)
✅ notifications: Full-stack (notification system)

All features are independent and can be developed in parallel.

🔧 Creating worktrees...

✅ Worktree 1: ../my-app-user-profile
   Branch: feature/user-profile
   Type: Full-stack
   Location: /Users/Wolverine/00_PROJECTS/my-app-user-profile

✅ Worktree 2: ../my-app-settings
   Branch: feature/settings
   Type: Frontend
   Location: /Users/Wolverine/00_PROJECTS/my-app-settings

✅ Worktree 3: ../my-app-notifications
   Branch: feature/notifications
   Type: Full-stack
   Location: /Users/Wolverine/00_PROJECTS/my-app-notifications

🎯 Next Steps:
1. Navigate to each worktree to start development:
   - cd ../my-app-user-profile && /app-code "..."
   - cd ../my-app-settings && /app-code "..."
   - cd ../my-app-notifications && /app-code "..."

2. Develop features independently in each worktree

3. When ready to integrate: /app-integrate-parallel-worktrees user-profile settings notifications
```

---

### Example 2: Complex Feature with Dependencies

```bash
/app-parallel-worktrees authentication dashboard payment-system
```

**Output**:
```
🌳 Setting up parallel worktrees for 3 features...

📋 Feature Analysis:
⚠️  DEPENDENCIES DETECTED:
- dashboard depends on authentication (needs user context)
- payment-system depends on authentication (needs user verification)

✅ Recommended Development Order:
1. authentication (no dependencies)
2. dashboard + payment-system (can be parallel after auth is done)

💡 Strategy:
- authentication: Full implementation
- dashboard: Use mock auth data initially
- payment-system: Use mock auth data initially

🔧 Creating worktrees with mock setup...

✅ Worktree 1: ../my-app-authentication
   Branch: feature/authentication
   Type: Full-stack (Core Feature)
   Mock: None needed

✅ Worktree 2: ../my-app-dashboard
   Branch: feature/dashboard
   Type: Frontend
   Mock: useAuth hook with mock data created

✅ Worktree 3: ../my-app-payment-system
   Branch: feature/payment-system
   Type: Full-stack
   Mock: Mock user verification service created

🎯 Development Plan:
1. Start all 3 worktrees in parallel
2. Dashboard and payment-system use mocks initially
3. When authentication is merged to main:
   - Update dashboard worktree: git merge main
   - Update payment-system worktree: git merge main
   - Replace mocks with real auth integration
```

---

### Example 3: Feature Splitting

```bash
/app-parallel-worktrees "complete user management system"
```

**Output**:
```
🌳 Analyzing feature request...

📋 Feature Analysis by @ultrathink:
"Complete user management system" is too large. Splitting into:

1. user-authentication (login/logout/JWT)
2. user-registration (signup form + email verification)
3. user-profile (profile page + edit functionality)
4. user-roles (admin/user role management)

These can be developed in parallel with minimal dependencies.

🔧 Creating 4 worktrees...

✅ Worktree 1: ../my-app-user-authentication
✅ Worktree 2: ../my-app-user-registration
✅ Worktree 3: ../my-app-user-profile
✅ Worktree 4: ../my-app-user-roles

🎯 Development Order:
1. user-authentication (start first, others depend on it)
2. user-registration, user-profile, user-roles (parallel after auth)
```

---

## Worktree Structure

Each worktree is a complete, isolated copy of your repository:

```
my-app/                          ← Main worktree (main branch)
├── frontend/
├── backend/
└── .git/

my-app-user-profile/             ← Worktree 1 (feature/user-profile)
├── frontend/
│   └── src/
│       └── pages/UserProfile.jsx  ← New feature code here
├── backend/
│   └── api/routes/profile.py       ← New API here
├── FEATURE_SPEC.md                 ← Feature specification
└── .env                            ← Independent environment

my-app-settings/                 ← Worktree 2 (feature/settings)
├── frontend/
│   └── src/
│       └── pages/Settings.jsx      ← New feature code here
├── FEATURE_SPEC.md
└── .env

my-app-notifications/            ← Worktree 3 (feature/notifications)
├── frontend/
│   └── src/
│       └── components/NotificationBell.jsx
├── backend/
│   └── api/routes/notifications.py
├── FEATURE_SPEC.md
└── .env
```

**Key Points**:
- Each worktree has its own working directory
- Each worktree is on its own branch
- Changes in one worktree don't affect others
- All worktrees share the same `.git` repository (efficient)
- You can run dev servers in all worktrees simultaneously (different ports)

---

## Development Environment Setup

### Automatic Port Assignment

To avoid conflicts when running dev servers in parallel, the command automatically assigns ports:

**Main worktree**:
- Frontend: `localhost:5173` (React/Vue default)
- Backend: `localhost:5000` (Flask/Express default)

**Worktree 1** (feature/user-profile):
- Frontend: `localhost:5174`
- Backend: `localhost:5001`

**Worktree 2** (feature/settings):
- Frontend: `localhost:5175`
- Backend: `localhost:5002`

**Worktree 3** (feature/notifications):
- Frontend: `localhost:5176`
- Backend: `localhost:5003`

The command creates a `.env` file in each worktree with the correct ports.

---

### Database Isolation (Optional)

For features that require database changes:

**Option 1: Shared Development Database (Default)**
- All worktrees use the same dev database
- Good for: Features that don't change schema
- Risk: Schema conflicts if multiple features modify same tables

**Option 2: Separate Database Per Feature**
- Each worktree gets its own database (e.g., `myapp_user_profile`, `myapp_settings`)
- Good for: Features with significant schema changes
- Setup: Command creates separate DBs automatically if requested

**Request separate databases**:
```bash
/app-parallel-worktrees --separate-dbs user-profile settings notifications
```

---

## Working in Worktrees

### Starting Development in a Worktree

```bash
# Navigate to worktree
cd ../my-app-user-profile

# Start coding (same commands as main worktree)
/app-code "Create user profile page with edit functionality"

# Run tests
/app-test all

# Validate code
/app-validate

# Start dev server (on assigned port)
npm run dev  # Frontend on port 5174
python run.py  # Backend on port 5001
```

---

### Viewing All Worktrees

```bash
git worktree list
```

**Output**:
```
/Users/Wolverine/00_PROJECTS/my-app                 abc123d [main]
/Users/Wolverine/00_PROJECTS/my-app-user-profile    def456e [feature/user-profile]
/Users/Wolverine/00_PROJECTS/my-app-settings        ghi789f [feature/settings]
/Users/Wolverine/00_PROJECTS/my-app-notifications   jkl012g [feature/notifications]
```

---

### Switching Between Worktrees

No need to switch branches! Just navigate to the directory:

```bash
# Work on user-profile
cd ../my-app-user-profile
/app-code "Add profile picture upload"
git add . && git commit -m "Add profile picture upload"

# Switch to settings (no git checkout needed!)
cd ../my-app-settings
/app-code "Create theme selector"
git add . && git commit -m "Add theme selector"

# Back to main worktree
cd ../my-app
```

---

## Benefits of Parallel Worktrees

### 1. **True Parallel Development**
- Work on multiple features simultaneously without branch switching
- No context switching overhead
- Keep dev servers running for all features

### 2. **Isolation**
- Changes in one worktree don't affect others
- Test features independently
- No risk of accidentally committing wrong feature code

### 3. **Efficiency**
- No need to stash changes when switching features
- Run tests for one feature while coding another
- Compare implementations side-by-side

### 4. **Team Collaboration**
- Different team members can work on different worktrees
- Easy to demo multiple in-progress features
- Faster parallel integration testing

---

## Integration

When features are ready, use the companion command to integrate:

```bash
/app-integrate-parallel-worktrees user-profile settings notifications
```

This will:
1. Create an integration branch
2. Merge all feature branches
3. Resolve conflicts
4. Run tests
5. Merge to main if successful

See `/app-integrate-parallel-worktrees` documentation for details.

---

## Troubleshooting

### Issue 1: Port Conflicts

**Problem**: Dev server fails to start due to port in use

**Solution**:
```bash
# Check what's using the port
lsof -i :5174

# Kill the process or change port in .env
VITE_PORT=5180
```

---

### Issue 2: Shared Database Conflicts

**Problem**: Two features modify the same database table

**Solution**:
```bash
# Option A: Use separate databases
/app-parallel-worktrees --separate-dbs feature1 feature2

# Option B: Coordinate schema changes (merge feature1 first, then update feature2)
cd ../my-app-feature2
git merge main  # Get feature1's schema changes
```

---

### Issue 3: Worktree Creation Fails

**Problem**: `fatal: 'feature/name' is already checked out at '...'`

**Solution**:
```bash
# Remove the existing worktree first
git worktree remove ../my-app-feature-name

# Then recreate
/app-parallel-worktrees feature-name
```

---

### Issue 4: Dependency Updates Needed

**Problem**: Main branch updated dependencies, worktree is out of sync

**Solution**:
```bash
cd ../my-app-user-profile
git merge main  # Get latest changes from main
npm install     # Update dependencies
pip install -r requirements.txt
```

---

## Best Practices

### 1. **Keep Features Small and Independent**
- Ideal: 1-3 days of work per feature
- Avoid: Features that touch too many files
- Goal: Easy integration without conflicts

### 2. **Use Feature Specifications**
- Each worktree gets a `FEATURE_SPEC.md`
- Review specs before starting development
- Update specs as implementation evolves

### 3. **Sync with Main Regularly**
```bash
# In each worktree, periodically:
git merge main  # Get latest changes
npm install     # Update dependencies
/app-test all   # Ensure tests still pass
```

### 4. **Commit Often**
```bash
# In each worktree, commit after each logical change
git add .
git commit -m "Add user profile form validation"
```

### 5. **Integration Testing**
- Test features in isolation first
- Then test integration before merging to main
- Use `/app-integrate-parallel-worktrees` for safe integration

### 6. **Clean Up After Integration**
```bash
# After features are merged to main:
git worktree remove ../my-app-user-profile
git worktree remove ../my-app-settings
git branch -d feature/user-profile
git branch -d feature/settings
```

---

## Command Implementation

### Agent Orchestration

The command uses a multi-agent approach:

**1. Feature Analysis**:
- Simple requests (< 3 features, clear names) → `@app-spec-writer`
- Complex requests (vague descriptions, >3 features) → `@ultrathink`

**2. Worktree Setup**:
- All cases → `@app-full-stack` (handles both frontend and backend setup)

**3. Environment Configuration**:
- Frontend setup → `@app-frontend-developer`
- Backend setup → `@app-backend-developer`
- Full coordination → `@app-full-stack`

---

### Command Workflow

```
User Input: /app-parallel-worktrees user-profile settings notifications
         ↓
    Feature Analysis (@app-spec-writer or @ultrathink)
         ↓
    Determine Dependencies & Order
         ↓
    Create Worktree Structure (@app-full-stack)
         ↓
    Set Up Each Worktree:
    ├── Create git worktree
    ├── Create feature branch
    ├── Copy config files
    ├── Assign ports
    ├── Install dependencies
    ├── Create FEATURE_SPEC.md
    └── Set up database (if --separate-dbs)
         ↓
    Verify All Worktrees Ready
         ↓
    Output Summary & Next Steps
```

---

## Advanced Options

### Option 1: Separate Databases

```bash
/app-parallel-worktrees --separate-dbs auth dashboard payments
```

Creates:
- `myapp_auth` database for auth feature
- `myapp_dashboard` database for dashboard feature
- `myapp_payments` database for payments feature

---

### Option 2: Custom Worktree Locations

```bash
/app-parallel-worktrees --path /tmp/features auth dashboard
```

Creates worktrees in `/tmp/features/` instead of parent directory.

---

### Option 3: Skip Dependency Installation

```bash
/app-parallel-worktrees --no-install auth dashboard
```

Creates worktrees but skips `npm install` / `pip install` (faster for large projects).

---

## Example: Complete Parallel Development Session

```bash
# 1. Create worktrees for 3 features
cd /Users/Wolverine/00_PROJECTS/my-app
/app-parallel-worktrees user-profile settings notifications

# 2. Start developing user-profile
cd ../my-app-user-profile
/app-code "Create user profile page with avatar upload"
npm run dev  # Port 5174
# Browser: localhost:5174

# 3. Open new terminal for settings (parallel!)
cd /Users/Wolverine/00_PROJECTS/my-app-settings
/app-code "Create settings page with theme toggle"
npm run dev  # Port 5175
# Browser: localhost:5175

# 4. Open new terminal for notifications (parallel!)
cd /Users/Wolverine/00_PROJECTS/my-app-notifications
/app-code "Create notification bell component"
npm run dev  # Port 5176
# Browser: localhost:5176

# Now you have 3 dev servers running, all visible in browser!

# 5. Test each feature independently
cd ../my-app-user-profile && /app-test all
cd ../my-app-settings && /app-test all
cd ../my-app-notifications && /app-test all

# 6. Commit progress in each worktree
cd ../my-app-user-profile && git add . && git commit -m "User profile MVP"
cd ../my-app-settings && git add . && git commit -m "Settings page MVP"
cd ../my-app-notifications && git add . && git commit -m "Notification bell MVP"

# 7. Integrate all features
cd /Users/Wolverine/00_PROJECTS/my-app
/app-integrate-parallel-worktrees user-profile settings notifications

# 8. Clean up worktrees
git worktree remove ../my-app-user-profile
git worktree remove ../my-app-settings
git worktree remove ../my-app-notifications
```

---

## Summary

The `/app-parallel-worktrees` command enables efficient parallel development by:

✅ Creating isolated workspaces for each feature
✅ Setting up independent development environments
✅ Handling port assignments automatically
✅ Managing dependencies between features
✅ Providing clear feature specifications
✅ Supporting multiple concurrent dev servers

**Use this command when**:
- Building 2+ features that can be developed independently
- Need to demo multiple in-progress features
- Want to avoid constant branch switching
- Working with a team on different features
- Testing different implementations of the same feature

**Time Saved**: 30-60 minutes per feature (no branch switching, no stashing, no conflicts during development)

**Next Step**: Use `/app-integrate-parallel-worktrees` to merge all features safely.
