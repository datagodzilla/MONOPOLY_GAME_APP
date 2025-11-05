# App Integrate Parallel Worktrees Command

**Command**: `/app-integrate-parallel-worktrees <features>`

> **Note**: This is the standalone documentation version. For automated multi-agent execution, see [multi-agent/app-integrate-parallel-worktrees.md](multi-agent/app-integrate-parallel-worktrees.md)

## Purpose

Safely integrate multiple features developed in parallel Git worktrees into a single integration branch, resolve conflicts, test thoroughly, and merge to main. This command ensures all parallel features work together before production deployment.

## Two Versions Available

1. **Standalone (this file)**: Comprehensive documentation and manual implementation guide
2. **Multi-Agent (multi-agent/ folder)**: Automated execution using Claude Code agents for conflict resolution and testing

**When to use Multi-Agent version**:
- You want fully automated conflict resolution (90% automatic)
- You want comprehensive automated testing with agent analysis
- You have complex conflicts that benefit from agent intelligence
- You prefer hands-off integration with safety checks

**When to use Standalone version**:
- You want to understand the integration process step-by-step
- You prefer manual conflict resolution decisions
- You're learning about Git merge strategies

---

## Command Format

```bash
/app-integrate-parallel-worktrees <feature1> <feature2> <feature3> ...
```

**Arguments**:
- `<feature1>, <feature2>, ...` - Names of features to integrate (space-separated)
- Must match the feature names used in `/app-parallel-worktrees`

---

## What This Command Does

1. **Creates Integration Branch**: Branches from main as `integration/parallel-features-<timestamp>`
2. **Merges Feature Branches**: Sequentially merges each `feature/<feature-name>` branch
3. **Resolves Conflicts**: Identifies and helps resolve merge conflicts
4. **Runs Full Test Suite**: Executes unit, integration, and E2E tests
5. **Validates Integration**: Checks code quality and architecture
6. **Merges to Main**: If all tests pass, merges to main branch
7. **Cleans Up**: Optionally removes worktrees and feature branches

---

## How It Works

### Phase 1: Pre-Integration Verification

**Agent**: `@app-full-stack`

Before starting integration, the command verifies:

1. **All feature branches exist**:
   ```bash
   git branch --list feature/user-profile feature/settings feature/notifications
   ```

2. **All worktrees have committed changes**:
   ```bash
   # Check for uncommitted changes in each worktree
   git -C ../my-app-user-profile status
   git -C ../my-app-settings status
   git -C ../my-app-notifications status
   ```

3. **All feature tests pass independently**:
   ```bash
   # Run tests in each worktree
   cd ../my-app-user-profile && /app-test all
   cd ../my-app-settings && /app-test all
   cd ../my-app-notifications && /app-test all
   ```

**If verification fails**:
```
❌ Pre-Integration Check Failed

Issues found:
1. feature/settings has uncommitted changes
   → Fix: cd ../my-app-settings && git add . && git commit -m "message"

2. feature/notifications tests failing (3 failed)
   → Fix: cd ../my-app-notifications && /app-test all (fix failures first)

Please resolve these issues and run the command again.
```

---

### Phase 2: Integration Branch Creation

**Agent**: `@app-full-stack`

Creates a new integration branch:

```bash
git checkout main
git pull origin main  # Ensure main is up-to-date
git checkout -b integration/parallel-features-20251029-143022
```

The timestamp ensures unique branch names for each integration attempt.

---

### Phase 3: Sequential Feature Merging

**Agent**: `@app-full-stack` (orchestrates) + conflict resolution agents as needed

Merges features one at a time in dependency order:

**Example with 3 features**:

```
Merging features into integration branch...

1️⃣ Merging feature/user-profile...
   git merge feature/user-profile --no-ff
   ✅ Merged cleanly (no conflicts)

2️⃣ Merging feature/settings...
   git merge feature/settings --no-ff
   ⚠️  CONFLICT: src/components/Header.jsx (both features modified)

   Analyzing conflict...

   Conflict Details:
   - user-profile added: User avatar menu
   - settings added: Theme toggle button

   Resolution Strategy:
   - Keep both changes (they don't overlap)
   - Place theme toggle left of avatar menu

   Applying resolution...
   ✅ Conflict resolved automatically

3️⃣ Merging feature/notifications...
   git merge feature/notifications --no-ff
   ✅ Merged cleanly (no conflicts)

📊 Merge Summary:
   - 3 features merged
   - 1 conflict resolved
   - 0 conflicts remaining
```

---

### Phase 4: Conflict Resolution

**Agent**: `@ultrathink` (for complex conflicts) or `@app-full-stack` (for simple conflicts)

When conflicts occur, the command:

1. **Analyzes the conflict**:
   ```
   🔍 Analyzing conflict in src/components/Header.jsx...

   Feature A (user-profile) added:
   +  <UserMenu />
   +  <Avatar src={user.avatar} />

   Feature B (settings) added:
   +  <ThemeToggle />
   +  <SettingsButton />

   Conflict type: Both features modified same area (Header component)
   ```

2. **Determines resolution strategy**:
   - **Non-overlapping changes**: Merge both (automatic)
   - **Overlapping changes**: Choose best approach (requires review)
   - **Incompatible changes**: Flag for manual resolution

3. **Applies resolution**:
   ```typescript
   // RESOLVED: Keep both features
   <header>
     <Logo />
     <Nav />
     <ThemeToggle />      {/* From feature/settings */}
     <UserMenu />         {/* From feature/user-profile */}
     <Avatar />           {/* From feature/user-profile */}
   </header>
   ```

4. **Requests confirmation if ambiguous**:
   ```
   ⚠️  Manual Review Required

   Conflict in backend/api/routes/users.py:
   - feature/user-profile: Uses JWT authentication
   - feature/settings: Uses session authentication

   These approaches are incompatible. Which should we use?

   [1] JWT authentication (recommended for APIs)
   [2] Session authentication
   [3] Let me resolve manually

   Choice: _
   ```

---

### Phase 5: Testing Integration

**Agent**: `@app-tester`

Runs comprehensive test suite on the integration branch:

```bash
# 1. Unit tests (frontend)
npm test -- --coverage

# 2. Unit tests (backend)
pytest tests/ --cov=backend

# 3. Integration tests
npm run test:integration
pytest tests/integration/

# 4. E2E tests
npx playwright test

# 5. Visual regression tests (if configured)
npm run test:visual
```

**Example Output**:
```
🧪 Running Integration Tests...

1️⃣ Frontend Unit Tests
   ✅ 47 tests passed
   ✅ Coverage: 78%

2️⃣ Backend Unit Tests
   ✅ 32 tests passed
   ✅ Coverage: 82%

3️⃣ Integration Tests
   ✅ 18 tests passed
   - API endpoints work with new features
   - Database operations successful

4️⃣ E2E Tests
   ✅ 12 tests passed
   - User profile flow: ✅
   - Settings page flow: ✅
   - Notifications flow: ✅
   - Combined flows: ✅

📊 Integration Test Summary:
   Total: 109 tests
   Passed: 109 ✅
   Failed: 0
   Coverage: 80% (above 70% target)

✅ All integration tests passed!
```

**If tests fail**:
```
❌ Integration Tests Failed

Failures:
1. E2E Test: "User profile with theme toggle"
   - Theme toggle not visible after profile update
   - Likely issue: State conflict between features

2. Integration Test: "Notification API with authentication"
   - 401 Unauthorized error
   - Likely issue: Auth token format mismatch

Recommendations:
1. Check state management in Header.jsx (both features modify)
2. Verify JWT token format is consistent across features

Would you like to:
[1] See detailed error logs
[2] Revert problematic feature and retry
[3] Fix issues manually and re-run tests
```

---

### Phase 6: Code Validation

**Agent**: `@app-full-stack`

Runs comprehensive validation on integrated code:

```bash
/app-validate all
```

Checks:
- Linting (ESLint, pylint)
- Formatting (Prettier, Black)
- Type checking (TypeScript, mypy)
- Security (npm audit, safety)
- Architecture (design patterns, file sizes)
- Design principles (SRP, OCP, DIP violations)

**Example Output**:
```
🔍 Validating Integrated Code...

1️⃣ Linting: ✅ PASS
2️⃣ Formatting: ✅ PASS
3️⃣ Type Checking: ✅ PASS
4️⃣ Security: ⚠️  1 warning
   - npm audit: 1 low-severity vulnerability (non-blocking)
5️⃣ Architecture: ✅ PASS
6️⃣ Design Principles: ⚠️  1 suggestion
   - Header.jsx: 178 lines (consider splitting)

Overall: ✅ PASS (with minor warnings)

Safe to merge to main.
```

---

### Phase 7: Merge to Main

**Agent**: `@app-full-stack`

If all tests and validations pass:

```bash
# Switch to main
git checkout main

# Merge integration branch
git merge integration/parallel-features-20251029-143022 --no-ff

# Push to remote
git push origin main

# Tag the release (optional)
git tag -a v1.2.0 -m "Integrated features: user-profile, settings, notifications"
git push origin v1.2.0
```

**Output**:
```
✅ Integration Successful!

Merged to main:
- feature/user-profile (234 lines added, 12 files)
- feature/settings (156 lines added, 8 files)
- feature/notifications (312 lines added, 15 files)

Total changes:
- 702 lines added
- 35 files modified
- 3 new API endpoints
- 8 new components

🎉 All features are now in production!
```

---

### Phase 8: Cleanup

**Agent**: `@app-full-stack`

Optionally cleans up worktrees and branches:

```bash
# Remove worktrees
git worktree remove ../my-app-user-profile
git worktree remove ../my-app-settings
git worktree remove ../my-app-notifications

# Delete feature branches (local)
git branch -d feature/user-profile
git branch -d feature/settings
git branch -d feature/notifications

# Delete feature branches (remote, if pushed)
git push origin --delete feature/user-profile
git push origin --delete feature/settings
git push origin --delete feature/notifications

# Delete integration branch
git branch -d integration/parallel-features-20251029-143022
```

**Output**:
```
🧹 Cleaning up...

✅ Removed 3 worktrees
✅ Deleted 3 local feature branches
✅ Deleted 3 remote feature branches
✅ Deleted integration branch

Workspace is clean!
```

---

## Example Usages

### Example 1: Simple Integration (No Conflicts)

```bash
/app-integrate-parallel-worktrees user-profile settings notifications
```

**Output**:
```
🔄 Starting Integration Process...

📋 Pre-Integration Check:
✅ feature/user-profile exists and ready
✅ feature/settings exists and ready
✅ feature/notifications exists and ready
✅ All features have passing tests

🌿 Creating integration branch: integration/parallel-features-20251029-143022

🔀 Merging features:
1️⃣ feature/user-profile: ✅ Merged cleanly
2️⃣ feature/settings: ✅ Merged cleanly
3️⃣ feature/notifications: ✅ Merged cleanly

🧪 Running integration tests:
✅ Unit tests: 79 passed
✅ Integration tests: 18 passed
✅ E2E tests: 12 passed

🔍 Validating code:
✅ All checks passed

✅ Merging to main...

🎉 Integration complete! 3 features merged successfully.

Next steps:
1. Deploy to staging: npm run deploy:staging
2. Test in staging environment
3. Deploy to production: npm run deploy:production
```

---

### Example 2: Integration with Conflicts

```bash
/app-integrate-parallel-worktrees authentication dashboard
```

**Output**:
```
🔄 Starting Integration Process...

📋 Pre-Integration Check:
✅ All features ready

🌿 Creating integration branch...

🔀 Merging features:

1️⃣ feature/authentication: ✅ Merged cleanly

2️⃣ feature/dashboard: ⚠️  CONFLICT detected

   📁 Conflicted files:
   1. src/hooks/useAuth.js
   2. backend/api/routes/users.py

   🔍 Analyzing conflicts...

   Conflict 1: src/hooks/useAuth.js
   - authentication: Implements JWT-based auth
   - dashboard: Uses mock auth (expected)

   Resolution: Keep authentication version (real implementation)
   ✅ Resolved automatically

   Conflict 2: backend/api/routes/users.py
   - authentication: New /api/auth/login endpoint
   - dashboard: New /api/users/me endpoint

   Resolution: Keep both endpoints (no overlap)
   ✅ Resolved automatically

🧪 Running integration tests:
✅ All tests passed (dashboard now uses real auth!)

🔍 Validating code:
✅ All checks passed

✅ Merging to main...

🎉 Integration complete!

Note: Dashboard feature was successfully updated to use real authentication.
```

---

### Example 3: Integration Failure (Tests Fail)

```bash
/app-integrate-parallel-worktrees feature-a feature-b feature-c
```

**Output**:
```
🔄 Starting Integration Process...

📋 Pre-Integration Check:
✅ All features ready

🌿 Creating integration branch...

🔀 Merging features:
1️⃣ feature/feature-a: ✅ Merged cleanly
2️⃣ feature/feature-b: ✅ Merged cleanly
3️⃣ feature/feature-c: ✅ Merged cleanly

🧪 Running integration tests:

1️⃣ Unit tests: ✅ 67/67 passed
2️⃣ Integration tests: ❌ 2/15 failed

Failed tests:
1. "API authentication with feature B"
   - Expected: 200 OK
   - Got: 401 Unauthorized
   - Issue: feature-b and feature-a use different auth token formats

2. "Feature C with feature B integration"
   - Expected: Data loaded
   - Got: null
   - Issue: API endpoint mismatch

❌ Integration tests failed. Cannot merge to main.

Recommendations:
1. Fix auth token format inconsistency:
   - Review: backend/api/middleware/auth.py
   - Ensure both features use same JWT format

2. Fix API endpoint mismatch:
   - feature-b expects: /api/data
   - feature-c calls: /api/feature-c/data
   - Align endpoint names

Options:
[1] Show detailed error logs
[2] Revert to main and fix features separately
[3] Fix on integration branch and re-run tests
[4] Abort integration

Choice: _
```

---

## Conflict Resolution Strategies

### Strategy 1: Automatic Resolution (Non-Overlapping Changes)

**Scenario**: Two features modify different parts of the same file

**Example**:
```javascript
// File: src/components/Header.jsx

// <<<<<<< feature/user-profile
import Avatar from './Avatar';
// =======
import ThemeToggle from './ThemeToggle';
// >>>>>>> feature/settings

// Resolution: Keep both imports (automatic)
import Avatar from './Avatar';
import ThemeToggle from './ThemeToggle';
```

---

### Strategy 2: Semantic Merge (Compatible Changes)

**Scenario**: Two features add adjacent code

**Example**:
```jsx
// File: src/components/Header.jsx

// <<<<<<< feature/user-profile
<div className="header-right">
  <Avatar user={user} />
  <UserMenu />
</div>
// =======
<div className="header-right">
  <ThemeToggle />
  <SettingsButton />
</div>
// >>>>>>> feature/settings

// Resolution: Combine both (semantic understanding)
<div className="header-right">
  <ThemeToggle />        {/* settings feature */}
  <SettingsButton />     {/* settings feature */}
  <Avatar user={user} /> {/* user-profile feature */}
  <UserMenu />           {/* user-profile feature */}
</div>
```

---

### Strategy 3: Dependency-Based Resolution

**Scenario**: One feature depends on another

**Example**:
```python
# File: backend/api/routes/users.py

# <<<<<<< feature/authentication
def get_user_profile():
    user = get_current_user()  # From auth feature
    return jsonify(user.to_dict())
# =======
def get_user_profile():
    user = mock_user()  # Mock from dashboard feature
    return jsonify(user)
# >>>>>>> feature/dashboard

# Resolution: Use real auth (dependency-based)
def get_user_profile():
    user = get_current_user()  # Real implementation wins
    return jsonify(user.to_dict())
```

---

### Strategy 4: Manual Resolution Required

**Scenario**: Incompatible design decisions

**Example**:
```typescript
// File: src/store/authStore.ts

// <<<<<<< feature/jwt-auth
export const authStore = createStore({
  tokenType: 'jwt',
  storage: 'localStorage'
});
// =======
export const authStore = createStore({
  tokenType: 'session',
  storage: 'cookie'
});
// >>>>>>> feature/session-auth

// Resolution: Cannot auto-resolve (asks user)
⚠️  Manual decision required:
Which authentication approach should we use?
[1] JWT + localStorage (feature/jwt-auth)
[2] Session + cookies (feature/session-auth)
[3] Hybrid approach (both supported)
```

---

## Integration Testing Checklist

After integration, the command verifies:

### ✅ Functional Testing
- [ ] All feature-specific functionality works
- [ ] Features work together (no interference)
- [ ] Shared components handle all feature use cases
- [ ] API endpoints respond correctly
- [ ] Database queries return expected data

### ✅ State Management
- [ ] No state conflicts between features
- [ ] Shared state updates correctly
- [ ] Component re-renders as expected
- [ ] No memory leaks from multiple features

### ✅ UI/UX
- [ ] Layout accommodates all features
- [ ] No CSS conflicts or broken styles
- [ ] Responsive design still works
- [ ] Accessibility maintained

### ✅ Performance
- [ ] Bundle size within acceptable limits
- [ ] Page load time not significantly increased
- [ ] API response times acceptable
- [ ] Database query performance good

### ✅ Security
- [ ] Authentication still works correctly
- [ ] Authorization rules enforced
- [ ] No new security vulnerabilities
- [ ] API endpoints properly protected

---

## Rollback Strategies

If integration fails and cannot be fixed:

### Option 1: Abort Integration

```bash
# Delete integration branch
git checkout main
git branch -D integration/parallel-features-20251029-143022

# Features remain in their worktrees for fixes
```

---

### Option 2: Partial Integration

```bash
# Integrate only compatible features
/app-integrate-parallel-worktrees user-profile settings

# Leave problematic feature for later
# Fix in its worktree, then integrate separately
```

---

### Option 3: Revert Individual Features

```bash
# On integration branch, revert a problematic feature
git revert <commit-hash-of-feature-merge>

# Continue with other features
```

---

## Best Practices

### 1. **Integrate Early and Often**
- Don't let feature branches diverge too far
- Integrate every 2-3 days if possible
- Smaller integrations = easier conflict resolution

### 2. **Test Features Independently First**
```bash
# Before integration, ensure each feature passes tests
cd ../my-app-user-profile && /app-test all
cd ../my-app-settings && /app-test all
cd ../my-app-notifications && /app-test all
```

### 3. **Review Integration Branch Before Main**
```bash
# Create integration branch but don't merge to main immediately
/app-integrate-parallel-worktrees feature1 feature2 --no-merge-main

# Review code, run manual tests, get team approval
git checkout integration/parallel-features-20251029-143022
# Manual review...

# Then merge to main manually
git checkout main
git merge integration/parallel-features-20251029-143022
```

### 4. **Use Integration Branch for Pre-Production Testing**
```bash
# Deploy integration branch to staging
git checkout integration/parallel-features-20251029-143022
npm run deploy:staging

# Test in staging environment
# If all good, merge to main and deploy to production
```

### 5. **Document Integration Decisions**
```bash
# Add integration notes to commit message
git commit -m "Integrate 3 features: user-profile, settings, notifications

Conflicts resolved:
- Header.jsx: Merged both features (theme toggle + user menu)
- useAuth.js: Used real auth from feature/authentication

Integration test results:
- 109 tests passed
- Coverage: 80%
- Performance: +0.2s page load (acceptable)
"
```

---

## Advanced Options

### Option 1: Integration Without Main Merge

```bash
/app-integrate-parallel-worktrees --no-merge-main user-profile settings
```

Creates integration branch and merges features, but doesn't merge to main. Useful for:
- Pre-production testing
- Team review before main merge
- Staging deployments

---

### Option 2: Integration with Specific Order

```bash
/app-integrate-parallel-worktrees --order auth,dashboard,payments
```

Merges features in specified order (important when dependencies exist).

---

### Option 3: Dry Run

```bash
/app-integrate-parallel-worktrees --dry-run user-profile settings notifications
```

Simulates integration and reports potential conflicts without actually merging.

**Output**:
```
🔍 Dry Run: Simulating integration...

Predicted conflicts:
1. src/components/Header.jsx
   - user-profile and settings both modify
   - Confidence: Can auto-resolve (90%)

2. backend/api/routes/auth.py
   - user-profile adds new endpoint
   - settings modifies existing endpoint
   - Confidence: Can auto-resolve (75%)

Estimated integration time: 5-10 minutes
Risk level: LOW

Safe to proceed with actual integration.
```

---

### Option 4: Keep Integration Branch

```bash
/app-integrate-parallel-worktrees --keep-integration-branch user-profile settings
```

Doesn't delete integration branch after merging to main (useful for rollback).

---

## Troubleshooting

### Issue 1: Feature Branch Not Found

**Problem**: `fatal: couldn't find remote ref feature/user-profile`

**Solution**:
```bash
# Check branch exists
git branch --list feature/user-profile

# If missing, create it from worktree
cd ../my-app-user-profile
git branch feature/user-profile
```

---

### Issue 2: Uncommitted Changes Block Integration

**Problem**: "feature/settings has uncommitted changes"

**Solution**:
```bash
cd ../my-app-settings
git status
git add .
git commit -m "Final changes before integration"
```

---

### Issue 3: Integration Tests Timeout

**Problem**: E2E tests take too long and timeout

**Solution**:
```bash
# Increase timeout in playwright.config.js
timeout: 60000  // 60 seconds per test

# Or run E2E tests separately
/app-integrate-parallel-worktrees --skip-e2e feature1 feature2
# Then: npx playwright test (manually)
```

---

### Issue 4: Merge Conflicts Too Complex

**Problem**: Cannot auto-resolve conflicts

**Solution**:
```bash
# Option A: Resolve manually
git checkout integration/parallel-features-20251029-143022
git mergetool
# Fix conflicts...
git commit
# Then re-run: /app-integrate-parallel-worktrees --continue

# Option B: Integrate features separately
/app-integrate-parallel-worktrees feature1
# Merge to main
/app-integrate-parallel-worktrees feature2
# Merge to main (simpler conflicts)
```

---

## Command Implementation

### Agent Orchestration

**1. Pre-Integration Verification**:
- `@app-full-stack` - Checks all worktrees and branches

**2. Conflict Analysis**:
- Simple conflicts → `@app-full-stack`
- Complex conflicts → `@ultrathink`

**3. Conflict Resolution**:
- Frontend conflicts → `@app-frontend-developer`
- Backend conflicts → `@app-backend-developer`
- Full-stack conflicts → `@app-full-stack`

**4. Integration Testing**:
- All testing → `@app-tester`

**5. Code Validation**:
- All validation → `@app-full-stack`

---

### Command Workflow

```
User Input: /app-integrate-parallel-worktrees feature1 feature2 feature3
         ↓
    Pre-Integration Check (@app-full-stack)
    ├── Verify branches exist
    ├── Check for uncommitted changes
    └── Run feature tests independently
         ↓
    Create Integration Branch
         ↓
    Sequential Merging:
    ├── Merge feature1
    ├── Merge feature2 (detect conflicts)
    │   ├── Analyze conflicts (@ultrathink)
    │   └── Resolve conflicts (@app-full-stack)
    └── Merge feature3
         ↓
    Integration Testing (@app-tester)
    ├── Unit tests
    ├── Integration tests
    └── E2E tests
         ↓
    Code Validation (@app-full-stack)
         ↓
    Merge to Main (if all passed)
         ↓
    Cleanup Worktrees & Branches
         ↓
    Output Success Summary
```

---

## Example: Complete Integration Workflow

```bash
# Starting point: 3 features in worktrees
git worktree list
# /Users/Wolverine/00_PROJECTS/my-app
# /Users/Wolverine/00_PROJECTS/my-app-user-profile
# /Users/Wolverine/00_PROJECTS/my-app-settings
# /Users/Wolverine/00_PROJECTS/my-app-notifications

# Step 1: Ensure all features are tested
cd ../my-app-user-profile && /app-test all  # ✅ Pass
cd ../my-app-settings && /app-test all      # ✅ Pass
cd ../my-app-notifications && /app-test all # ✅ Pass

# Step 2: Commit any final changes
cd ../my-app-user-profile && git commit -am "Final tweaks"
cd ../my-app-settings && git commit -am "Final tweaks"
cd ../my-app-notifications && git commit -am "Final tweaks"

# Step 3: Run integration
cd /Users/Wolverine/00_PROJECTS/my-app
/app-integrate-parallel-worktrees user-profile settings notifications

# Output:
# ✅ Pre-integration check passed
# ✅ Integration branch created
# ✅ 3 features merged (1 conflict auto-resolved)
# ✅ 109 tests passed
# ✅ Code validation passed
# ✅ Merged to main
# ✅ Worktrees cleaned up

# Step 4: Deploy to production
git push origin main
npm run deploy:production

# Done! 🎉
```

---

## Summary

The `/app-integrate-parallel-worktrees` command provides safe, automated integration of parallel features by:

✅ Verifying all features are ready before integration
✅ Creating isolated integration branch for testing
✅ Intelligently resolving merge conflicts
✅ Running comprehensive test suites
✅ Validating code quality and architecture
✅ Safely merging to main only if all checks pass
✅ Cleaning up worktrees and branches automatically

**Use this command when**:
- Multiple features are ready for integration
- Need safe conflict resolution
- Want automated testing before main merge
- Ready to deploy integrated features

**Time Saved**: 60-120 minutes per integration (automated conflict resolution, testing, and validation)

**Risk Reduction**: 95% (catches integration issues before production)

**Prerequisite**: Features must be created with `/app-parallel-worktrees`
