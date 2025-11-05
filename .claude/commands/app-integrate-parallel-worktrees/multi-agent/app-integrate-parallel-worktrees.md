# App Integrate Parallel Worktrees Command (Multi-Agent)

**Command**: `/app-integrate-parallel-worktrees <features>`

**Arguments**: `$ARGUMENTS` - Space-separated list of feature names to integrate (must match worktree names)

---

## Overview

This command safely integrates multiple features developed in parallel Git worktrees. It uses intelligent conflict resolution, comprehensive testing, and multi-agent collaboration to merge features into main.

**Important**: Run this command from the main project directory (not the parent directory).

```
/parent-directory/
├── my-app/                           # <- Run command from HERE
├── my-app-user-profile/              # Worktree 1
├── my-app-settings/                  # Worktree 2
└── my-app-notifications/             # Worktree 3
```

---

## Command Workflow

I want to integrate features developed in parallel worktrees: $ARGUMENTS

Please execute this complete integration workflow with comprehensive testing and conflict resolution:

---

### PHASE 1 - PRE-INTEGRATION VERIFICATION

**Agent**: @app-full-stack

Verify all features are ready for integration:

1. **Verify all feature branches exist**:
   ```bash
   git branch --list feature/<feature1> feature/<feature2> feature/<feature3>
   ```

2. **Check for uncommitted changes in worktrees**:
   ```bash
   git -C ../<project>-<feature1> status
   git -C ../<project>-<feature2> status
   git -C ../<project>-<feature3> status
   ```
   - If uncommitted changes found, report to user

3. **Verify tests pass in each worktree**:
   ```bash
   cd ../<project>-<feature1> && npm test && pytest
   cd ../<project>-<feature2> && npm test && pytest
   cd ../<project>-<feature3> && npm test && pytest
   ```

4. **Read .work.txt files**:
   - Read `<feature1>.work.txt`, `<feature2>.work.txt`, etc.
   - Understand what each feature implemented
   - Identify potential conflicts from summaries

**Output**:
```
📋 Pre-Integration Verification

✅ feature/user-profile: Branch exists, tests passing (23/23)
✅ feature/settings: Branch exists, tests passing (15/15)
✅ feature/notifications: Branch exists, tests passing (18/18)

⚠️  Potential Conflicts Detected:
- Header.jsx: Modified by user-profile and settings
- Navigation.tsx: Modified by all 3 features

Ready to proceed with integration.
```

**If verification fails**:
```
❌ Pre-Integration Check Failed

Issues:
1. feature/settings has 3 uncommitted files
   → Fix: cd ../my-app-settings && git add . && git commit -m "message"

2. feature/notifications: 2 tests failing
   → Fix: cd ../my-app-notifications && npm test (fix failures)

Please resolve and run command again.
```

---

### PHASE 2 - INTEGRATION BRANCH CREATION

**Agent**: @app-full-stack

Create isolated integration branch for testing:

1. **Update main branch**:
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create integration branch**:
   ```bash
   TIMESTAMP=$(date +%Y%m%d-%H%M%S)
   git checkout -b integration/parallel-features-$TIMESTAMP
   ```

3. **Document integration**:
   Create `INTEGRATION_LOG.md` with:
   - Timestamp
   - Features being integrated
   - Integration branch name
   - Starting commit hash

**Output**:
```
🌿 Integration Branch Created

Branch: integration/parallel-features-20251029-143022
Base: main (commit abc123)
Features to merge: user-profile, settings, notifications
```

---

### PHASE 3 - SEQUENTIAL FEATURE MERGING

**Agent**: @app-full-stack (coordinates), conflict resolution agents as needed

Merge features one at a time in dependency order:

For each feature:

1. **Merge attempt**:
   ```bash
   git merge feature/<feature-name> --no-ff -m "Merge feature/<feature-name>"
   ```

2. **Check for conflicts**:
   ```bash
   git status
   ```

3. **If conflicts detected**:
   - **Agent Selection**:
     - Frontend conflicts (*.jsx, *.tsx, *.vue) → @app-frontend-developer
     - Backend conflicts (*.py, *.js API) → @app-backend-developer
     - Mixed/complex conflicts → @ultrathink
     - Simple conflicts → @app-full-stack

   - **Conflict Analysis**:
     ```bash
     git diff --name-only --diff-filter=U
     ```
     For each conflicted file, read and analyze:
     - What did Feature A add/change?
     - What did Feature B add/change?
     - Are changes overlapping or adjacent?
     - Are they compatible?

   - **Resolution Strategy**:

     **Strategy 1: Automatic (Non-Overlapping)**
     ```javascript
     // Both features modified different parts
     <<<<<<< feature/user-profile
     import Avatar from './Avatar';
     =======
     import ThemeToggle from './ThemeToggle';
     >>>>>>> feature/settings

     // Resolution: Keep both (automatic)
     import Avatar from './Avatar';
     import ThemeToggle from './ThemeToggle';
     ```

     **Strategy 2: Semantic Merge (Compatible)**
     ```jsx
     // Both added to same section
     <<<<<<< feature/user-profile
     <div className="header-right">
       <Avatar />
       <UserMenu />
     </div>
     =======
     <div className="header-right">
       <ThemeToggle />
       <SettingsButton />
     </div>
     >>>>>>> feature/settings

     // Resolution: Combine both (semantic understanding)
     <div className="header-right">
       <ThemeToggle />        {/* settings */}
       <SettingsButton />     {/* settings */}
       <Avatar />             {/* user-profile */}
       <UserMenu />           {/* user-profile */}
     </div>
     ```

     **Strategy 3: Dependency-Based**
     ```python
     # Feature with mock vs real implementation
     <<<<<<< feature/authentication
     def get_user():
         return get_current_user()  # Real auth
     =======
     def get_user():
         return mock_user()  # Mock
     >>>>>>> feature/dashboard

     // Resolution: Keep real implementation
     def get_user():
         return get_current_user()
     ```

     **Strategy 4: Manual Decision Required**
     ```
     ⚠️  Manual Review Required

     Conflict in: backend/api/auth.py
     - feature/jwt-auth: JWT token authentication
     - feature/session-auth: Session cookie authentication

     Incompatible approaches. Choose:
     [1] JWT (recommended for REST APIs)
     [2] Session cookies
     [3] Hybrid (support both)

     Waiting for user input...
     ```

   - **Apply Resolution**:
     ```bash
     # Edit conflicted file with resolved content
     git add <conflicted-file>
     git commit -m "Resolve conflict in <file>: <resolution-strategy>"
     ```

4. **Verify merge success**:
   ```bash
   git log -1  # Confirm merge commit created
   ```

**Output Example**:
```
🔀 Sequential Merging

1️⃣ Merging feature/user-profile...
   ✅ Merged cleanly (no conflicts)
   Commit: def789

2️⃣ Merging feature/settings...
   ⚠️  CONFLICT in src/components/Header.jsx

   🔍 Analyzing conflict...
   Agent: @app-frontend-developer

   Conflict Analysis:
   - user-profile added: <Avatar /> component
   - settings added: <ThemeToggle /> component
   - Both modified same Header section

   Resolution Strategy: Semantic merge (compatible changes)

   ✅ Resolved automatically: Keep both components
   Commit: ghi012

3️⃣ Merging feature/notifications...
   ✅ Merged cleanly (no conflicts)
   Commit: jkl345

📊 Merge Summary:
   - 3 features merged
   - 1 conflict resolved automatically
   - 0 conflicts require manual resolution
```

---

### PHASE 4 - INTEGRATION TESTING

**Agent**: @app-tester (primary), @app-full-stack (coordination)

Run comprehensive test suite on integrated code:

1. **Install all dependencies**:
   ```bash
   npm install  # Frontend
   pip install -r requirements.txt  # Backend
   ```

2. **Frontend unit tests**:
   ```bash
   npm test -- --coverage
   ```
   - Report: Tests passed/failed, coverage %

3. **Backend unit tests**:
   ```bash
   pytest tests/ --cov=backend
   ```
   - Report: Tests passed/failed, coverage %

4. **Integration tests**:
   ```bash
   npm run test:integration  # Frontend integration
   pytest tests/integration/  # Backend integration
   ```
   - Test API endpoints work together
   - Test database operations
   - Test state management across features

5. **E2E tests**:
   ```bash
   npx playwright test
   ```
   - Test complete user workflows
   - Test all features work together
   - Test no UI conflicts

6. **Build verification**:
   ```bash
   npm run build
   ```
   - Ensure no build errors
   - Check bundle size (warn if >20% increase)

**Output**:
```
🧪 Integration Testing

1️⃣ Frontend Unit Tests
   ✅ 55 tests passed (was 47)
   ✅ Coverage: 78% (above 70% target)
   ⏱️  Duration: 12.3s

2️⃣ Backend Unit Tests
   ✅ 40 tests passed (was 32)
   ✅ Coverage: 82% (above 70% target)
   ⏱️  Duration: 8.7s

3️⃣ Integration Tests
   ✅ 18 tests passed
   - API endpoints: ✅
   - Database operations: ✅
   - State management: ✅

4️⃣ E2E Tests
   ✅ 21 tests passed (was 12)
   - User profile flow: ✅
   - Settings page flow: ✅
   - Notifications flow: ✅
   - Combined flows: ✅

5️⃣ Build Verification
   ✅ Build successful
   📦 Bundle size: 543 KB (+12% from baseline)

📊 Test Summary:
   Total: 134 tests
   Passed: 134 ✅
   Failed: 0
   Coverage: 80%

✅ All integration tests passed!
```

**If tests fail**:
```
❌ Integration Tests Failed

Failures:
1. E2E Test: "User profile with theme toggle"
   Error: Theme toggle not visible after profile update
   Location: tests/e2e/integration.spec.ts:45

   Analysis (@ultrathink):
   - State conflict: Both features modify Header state
   - user-profile updates user state
   - settings updates theme state
   - Race condition in state updates

   Recommendation:
   - Review Header.jsx state management
   - Ensure state updates don't overwrite each other
   - Consider using separate state contexts

2. Integration Test: "Notification API with auth"
   Error: 401 Unauthorized
   Location: tests/integration/notifications.test.ts:23

   Analysis (@app-backend-developer):
   - JWT token format mismatch
   - user-profile uses HS256 algorithm
   - notifications expects RS256 algorithm

   Recommendation:
   - Standardize JWT configuration
   - Update backend/config/jwt.py

Options:
[1] See detailed error logs
[2] Revert problematic feature
[3] Fix and re-run tests
[4] Abort integration
```

---

### PHASE 5 - CODE VALIDATION

**Agent**: @app-full-stack

Run comprehensive code quality checks:

```bash
/app-validate all
```

1. **Linting**:
   - ESLint (frontend)
   - pylint/flake8 (backend)

2. **Formatting**:
   - Prettier (frontend)
   - Black (backend)

3. **Type Checking**:
   - TypeScript (frontend)
   - mypy (backend, optional)

4. **Security**:
   - npm audit (frontend)
   - safety (backend)

5. **Architecture**:
   - File sizes (warn if >200 lines)
   - Folder structure
   - API design patterns

6. **Design Principles**:
   - SRP violations
   - OCP opportunities
   - DIP suggestions

**Output**:
```
🔍 Code Validation

1️⃣ Linting: ✅ PASS
   - ESLint: 0 errors, 2 warnings
   - pylint: Score 9.2/10

2️⃣ Formatting: ✅ PASS
   - Prettier: All files formatted
   - Black: All files formatted

3️⃣ Type Checking: ✅ PASS
   - TypeScript: 0 errors
   - mypy: Not configured

4️⃣ Security: ⚠️  1 warning
   - npm audit: 1 low severity (non-blocking)
   - safety: No vulnerabilities

5️⃣ Architecture: ✅ PASS
   - File sizes: All under 200 lines
   - Structure: Well organized

6️⃣ Design Principles: ⚠️  1 suggestion
   - Header.jsx: 178 lines (consider splitting)
   - Recommendation: Extract user menu to component

Overall: ✅ PASS (minor warnings acceptable)

Safe to merge to main.
```

---

### PHASE 6 - MERGE TO MAIN

**Agent**: @app-full-stack

Only if all tests and validations pass:

1. **Switch to main**:
   ```bash
   git checkout main
   git pull origin main  # Get any new changes
   ```

2. **Merge integration branch**:
   ```bash
   git merge integration/parallel-features-<timestamp> --no-ff
   ```

3. **Push to remote**:
   ```bash
   git push origin main
   ```

4. **Optional: Tag release**:
   ```bash
   git tag -a v1.2.0 -m "Integrated features: user-profile, settings, notifications"
   git push origin v1.2.0
   ```

**Output**:
```
✅ Merged to Main

Integration branch: integration/parallel-features-20251029-143022
Merged to: main
Commit: mno678

Features integrated:
- feature/user-profile (234 lines added, 12 files)
- feature/settings (156 lines added, 8 files)
- feature/notifications (312 lines added, 15 files)

Total changes:
- 702 lines added
- 35 files modified
- 3 new API endpoints
- 8 new components
- 3 new npm packages

Tagged as: v1.2.0

Pushed to: origin/main
```

---

### PHASE 7 - CLEANUP

**Agent**: @app-full-stack

Clean up worktrees and branches:

1. **Remove worktrees**:
   ```bash
   git worktree remove ../<project>-<feature1>
   git worktree remove ../<project>-<feature2>
   git worktree remove ../<project>-<feature3>
   ```

2. **Delete local feature branches**:
   ```bash
   git branch -d feature/<feature1>
   git branch -d feature/<feature2>
   git branch -d feature/<feature3>
   ```

3. **Optional: Delete remote branches**:
   ```bash
   git push origin --delete feature/<feature1>
   git push origin --delete feature/<feature2>
   git push origin --delete feature/<feature3>
   ```

4. **Delete integration branch**:
   ```bash
   git branch -d integration/parallel-features-<timestamp>
   ```

5. **Clean up .work.txt files**:
   ```bash
   rm <feature1>.work.txt <feature2>.work.txt <feature3>.work.txt
   ```

**Output**:
```
🧹 Cleanup

✅ Removed 3 worktrees
   - ../my-app-user-profile
   - ../my-app-settings
   - ../my-app-notifications

✅ Deleted 3 local feature branches
   - feature/user-profile
   - feature/settings
   - feature/notifications

✅ Deleted 3 remote feature branches

✅ Deleted integration branch
   - integration/parallel-features-20251029-143022

✅ Cleaned up work summaries
   - Moved to archive/integration-20251029/

Workspace is clean!
```

---

### PHASE 8 - FINAL REPORT

**Agent**: @app-full-stack

Provide comprehensive integration summary:

```
🎉 INTEGRATION COMPLETE - ALL FEATURES MERGED TO MAIN

FEATURES INTEGRATED:
==================

1. User Profile (feature/user-profile)
   ✅ Type: Full-stack
   ✅ Components: UserProfile.jsx, Avatar.jsx, ProfileForm.jsx
   ✅ API: GET/PUT /api/users/profile
   ✅ Tests: 23 passed
   ✅ Files: 12 modified
   ✅ Lines: +234

2. Settings (feature/settings)
   ✅ Type: Frontend
   ✅ Components: Settings.jsx, ThemeToggle.jsx, SettingsButton.jsx
   ✅ Tests: 15 passed
   ✅ Files: 8 modified
   ✅ Lines: +156

3. Notifications (feature/notifications)
   ✅ Type: Full-stack
   ✅ Components: NotificationBell.jsx, Toast.jsx
   ✅ API: GET/POST /api/notifications, WebSocket /ws/notifications
   ✅ Tests: 18 passed
   ✅ Files: 15 modified
   ✅ Lines: +312

CONFLICTS RESOLVED:
=================
1. Header.jsx (user-profile + settings)
   - Resolution: Semantic merge - kept both features
   - Strategy: Placed theme toggle left of user avatar

TESTING RESULTS:
==============
- Unit Tests: 95 passed (was 79)
- Integration Tests: 18 passed (new)
- E2E Tests: 21 passed (was 12)
- Total: 134 tests, 0 failures
- Coverage: 80% (above 70% target)

VALIDATION RESULTS:
=================
- Linting: ✅ PASS
- Formatting: ✅ PASS
- Security: ✅ PASS (1 minor warning)
- Architecture: ✅ PASS
- Design: ✅ PASS (1 suggestion)

DEPLOYMENT STATUS:
================
✅ Merged to main (commit mno678)
✅ Tagged as v1.2.0
✅ Pushed to origin/main
✅ Worktrees cleaned up
✅ Feature branches deleted

TIME METRICS:
============
- Development: 2 days (parallel)
- Integration: 30 minutes (automated)
- Total: 2 days vs 6 days (sequential)
- Time saved: 4 days (67% faster)

NEXT STEPS:
==========
1. Deploy to staging:
   npm run deploy:staging

2. Run smoke tests in staging

3. Deploy to production:
   npm run deploy:production

4. Monitor for issues:
   - Check error logs
   - Monitor performance metrics
   - Watch user feedback

🚀 All features are now in production!
```

---

## Agent Orchestration Summary

| Phase | Primary Agent | Helper Agents | Purpose |
|-------|--------------|---------------|---------|
| 1. Verification | @app-full-stack | @app-tester | Check readiness |
| 2. Branch Creation | @app-full-stack | - | Create integration branch |
| 3. Merging | @app-full-stack | @app-frontend-developer, @app-backend-developer, @ultrathink | Merge & resolve conflicts |
| 4. Testing | @app-tester | @app-full-stack | Comprehensive testing |
| 5. Validation | @app-full-stack | - | Code quality checks |
| 6. Merge to Main | @app-full-stack | - | Final merge |
| 7. Cleanup | @app-full-stack | - | Remove worktrees |
| 8. Report | @app-full-stack | - | Final summary |

**Conflict Resolution Agents**:
- Frontend conflicts → @app-frontend-developer
- Backend conflicts → @app-backend-developer
- Complex conflicts → @ultrathink
- Simple conflicts → @app-full-stack

---

## Rollback Strategies

If integration fails:

**Option 1: Abort Integration**
```bash
git checkout main
git branch -D integration/parallel-features-<timestamp>
# Features remain in worktrees for fixes
```

**Option 2: Partial Integration**
```bash
# Integrate only compatible features
/app-integrate-parallel-worktrees user-profile settings
# Leave notifications for later
```

**Option 3: Revert Individual Feature**
```bash
# On integration branch
git revert <commit-hash-of-feature-merge>
# Continue with other features
```

---

## Example Usage

```bash
# From main project directory
cd /Users/Wolverine/00_PROJECTS/my-app

# Run integration
/app-integrate-parallel-worktrees user-profile settings notifications
```

**What happens**:
1. Verifies all 3 features are ready (tests passing, no uncommitted changes)
2. Creates integration branch
3. Merges features sequentially, resolving conflicts automatically
4. Runs comprehensive test suite (134 tests)
5. Validates code quality
6. Merges to main (all checks pass)
7. Cleans up worktrees and branches
8. Provides detailed success report

**Time saved**: 60-120 minutes (automated vs manual integration)

---

Execute this complete integration workflow with automated conflict resolution and comprehensive testing.
