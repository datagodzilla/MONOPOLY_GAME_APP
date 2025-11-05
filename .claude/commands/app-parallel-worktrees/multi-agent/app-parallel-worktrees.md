# App Parallel Worktrees Command (Multi-Agent)

**Command**: `/app-parallel-worktrees <features>`

**Arguments**: `$ARGUMENTS` - Space-separated list of feature names to develop in parallel

---

## Overview

This command uses Git worktrees and subagents to develop multiple web app features simultaneously. Each feature gets its own isolated workspace with dedicated agents working in parallel.

**Important**: Run Claude Code from the parent directory of your project for this command to work properly.

```
/parent-directory/                    # <- Run Claude Code from HERE
├── my-app/                           # Main project
```

---

## Command Workflow

I want to develop web app features in parallel using Git worktrees and subagents: $ARGUMENTS

You are in the parent folder of the main repo. You will need to change to the main repo folder to create the worktrees.

Please execute this complete workflow:

---

### PHASE 1 - ANALYZE FEATURES

**Agent**: @app-spec-writer or @ultrathink

1. Analyze the feature requests: $ARGUMENTS
2. Determine if features should be split into smaller units
3. Identify dependencies between features
4. Determine feature types (frontend/backend/full-stack)
5. Plan development order

**Output**:
```
📋 Feature Analysis:
- Feature 1: user-profile (full-stack, independent)
- Feature 2: settings (frontend, independent)
- Feature 3: notifications (full-stack, independent)

All features can be developed in parallel.
```

---

### PHASE 2 - SETUP WORKTREES

**Agent**: @app-full-stack

For each feature identified in Phase 1:

1. **Create worktree**:
   ```bash
   cd <main-project-name>
   git worktree add ../<project>-<feature-name> -b feature/<feature-name>
   ```

2. **Set up development environment**:
   ```bash
   cd ../<project>-<feature-name>

   # Copy environment file with unique ports
   cp .env.example .env
   # Modify ports: Frontend port + N, Backend port + N

   # Install dependencies
   npm install  # Frontend
   pip install -r requirements.txt  # Backend (if exists)
   ```

3. **Create feature specification**:
   Create `FEATURE_SPEC.md` in each worktree with:
   - Feature description
   - Type (frontend/backend/full-stack)
   - Files to create/modify
   - API endpoints (if backend)
   - Components to build (if frontend)
   - Testing requirements
   - Dependencies on other features
   - Assigned port numbers

4. **Handle feature dependencies**:
   - If feature depends on another, create mock implementations
   - Document mock locations in FEATURE_SPEC.md
   - Note when to replace mocks with real implementations

**Output**:
```
✅ Worktree created: ../my-app-user-profile
   Branch: feature/user-profile
   Ports: Frontend 5174, Backend 5001
   Type: Full-stack
   Status: Ready for development

✅ Worktree created: ../my-app-settings
   Branch: feature/settings
   Ports: Frontend 5175, Backend 5002
   Type: Frontend
   Status: Ready for development

✅ Worktree created: ../my-app-notifications
   Branch: feature/notifications
   Ports: Frontend 5176, Backend 5003
   Type: Full-stack
   Status: Ready for development
```

---

### PHASE 3 - SPAWN SUBAGENTS

**Coordinator**: @app-full-stack

For each feature, spawn a parallel subagent using the **Task tool** with these instructions:

**Subagent Instructions Template**:

```
You are implementing the <feature-name> feature in the <project>-<feature-name> worktree.

CONTEXT:
- Working directory: ../<project>-<feature-name>
- Branch: feature/<feature-name>
- Feature type: <frontend/backend/full-stack>
- Frontend port: <port-number>
- Backend port: <port-number>
- This is an isolated development environment

FEATURE SPECIFICATION:
Read the FEATURE_SPEC.md file in this worktree for detailed requirements.

YOUR TASKS:
1. Implement the <feature-name> feature with full functionality
2. Follow TDD approach (tests first, then implementation)
3. Apply SRP (Single Responsibility Principle)
4. Use appropriate agents:
   - Frontend code: @app-frontend-developer
   - Backend code: @app-backend-developer
   - Full-stack coordination: @app-full-stack
   - Testing: @app-tester

IMPLEMENTATION STEPS:
1. Read FEATURE_SPEC.md to understand requirements
2. Generate tests first (/app-test or write directly)
3. Implement feature code
4. Run tests (npm test for frontend, pytest for backend)
5. Validate code (/app-validate)
6. Build the project (npm run build if applicable)

IMPORTANT:
- Do NOT attempt to run dev servers (no npm run dev, no flask run)
- DO run tests and build commands
- DO commit your changes when complete
- If this feature has dependencies on other features, use the mocks specified in FEATURE_SPEC.md

OUTPUT:
When complete, write a detailed summary in <feature-name>.work.txt in the main <project> directory with:
- What was implemented
- Files created/modified
- Dependencies added (npm/pip packages)
- Testing approach and results
- Known issues or limitations
- Integration notes (conflicts to watch for)
- Next steps

Execute the complete implementation now.
```

**Agent Selection for Subagents**:
- Frontend features → Primary agent: @app-frontend-developer
- Backend features → Primary agent: @app-backend-developer
- Full-stack features → Primary agent: @app-full-stack
- Testing → @app-tester
- Complex analysis → @ultrathink

**Example Task Tool Usage**:
```
Task(Implement user-profile feature)
[Instructions for user-profile feature subagent]

Task(Implement settings feature)
[Instructions for settings feature subagent]

Task(Implement notifications feature)
[Instructions for notifications feature subagent]
```

---

### PHASE 4 - COORDINATION & MONITORING

**Agent**: @app-full-stack

While subagents work in parallel:

1. **Monitor progress**:
   - Check for subagent completion
   - Look for error messages or failures
   - Track which features are done

2. **Verify completion**:
   - Ensure each subagent completes their implementation
   - Check that .work.txt files are created
   - Verify tests pass in each worktree

3. **Handle issues**:
   - If a subagent fails, analyze the error
   - Retry or adjust approach if needed
   - Document any blockers

**Output Updates**:
```
🔄 Monitoring parallel development...

✅ user-profile: Implementation complete
✅ settings: Implementation complete
⏳ notifications: In progress...

✅ All features complete!
```

---

### PHASE 5 - FINAL SUMMARY

**Agent**: @app-full-stack

After all subagents complete:

1. **Read all .work.txt files** created by subagents
2. **Aggregate results**:
   - List all features implemented
   - Summarize what each feature does
   - Note files modified/created
   - Identify potential conflicts (files touched by multiple features)
   - List all dependencies added

3. **Provide comprehensive summary**:

```
🎉 PARALLEL FEATURE DEVELOPMENT COMPLETE

FEATURES IMPLEMENTED:
===================

1. User Profile (feature/user-profile)
   ✅ Worktree: ../my-app-user-profile
   ✅ Type: Full-stack
   ✅ Components: UserProfile.jsx, Avatar.jsx, ProfileForm.jsx
   ✅ API Endpoints: GET/PUT /api/users/profile
   ✅ Tests: 23 passed
   ✅ Build: Success

2. Settings (feature/settings)
   ✅ Worktree: ../my-app-settings
   ✅ Type: Frontend
   ✅ Components: Settings.jsx, ThemeToggle.jsx
   ✅ Tests: 15 passed
   ✅ Build: Success

3. Notifications (feature/notifications)
   ✅ Worktree: ../my-app-notifications
   ✅ Type: Full-stack
   ✅ Components: NotificationBell.jsx, Toast.jsx
   ✅ API Endpoints: GET/POST /api/notifications
   ✅ Tests: 18 passed
   ✅ Build: Success

POTENTIAL CONFLICTS:
==================
- Header.jsx: Modified by user-profile and settings
- Navigation.tsx: Modified by all 3 features

FILES MODIFIED:
=============
User Profile:
  - frontend/src/components/UserProfile.jsx (new)
  - frontend/src/components/Avatar.jsx (new)
  - frontend/src/components/Header.jsx (modified)
  - backend/api/routes/users.py (modified)

Settings:
  - frontend/src/components/Settings.jsx (new)
  - frontend/src/components/ThemeToggle.jsx (new)
  - frontend/src/components/Header.jsx (modified)

Notifications:
  - frontend/src/components/NotificationBell.jsx (new)
  - frontend/src/components/Toast.jsx (new)
  - frontend/src/components/Navigation.tsx (modified)
  - backend/api/routes/notifications.py (new)

DEPENDENCIES ADDED:
==================
Frontend:
  - react-hot-toast@^2.4.1 (notifications)

Backend:
  - None

NEXT STEPS:
==========
1. Review each feature in its worktree
2. Test each feature independently:
   cd ../my-app-user-profile && npm run dev
   cd ../my-app-settings && npm run dev
   cd ../my-app-notifications && npm run dev

3. When ready to integrate, use:
   /app-integrate-parallel-worktrees user-profile settings notifications

INTEGRATION NOTES:
================
- Header.jsx conflict: Both user-profile and settings modified
  → Likely need to merge both changes (avatar + theme toggle)
- Navigation.tsx: All features added links
  → Will need to combine all navigation items

Time saved: ~4 days (features developed in parallel instead of sequentially)
```

---

## Port Assignment Strategy

**Main worktree**:
- Frontend: 5173 (default Vite)
- Backend: 5000 (default Flask/Express)

**Worktree 1** (feature 1):
- Frontend: 5174
- Backend: 5001

**Worktree 2** (feature 2):
- Frontend: 5175
- Backend: 5002

**Worktree 3** (feature 3):
- Frontend: 5176
- Backend: 5003

---

## Dependency Handling

If Feature B depends on Feature A:

1. **Detect dependency** (Phase 1):
   ```
   dashboard depends on authentication (needs user context)
   ```

2. **Create mock** (Phase 2):
   ```typescript
   // In dashboard worktree: src/mocks/useAuth.js
   export const useAuth = () => ({
     user: { id: 1, name: "Mock User", email: "mock@example.com" },
     isAuthenticated: true,
     login: () => {},
     logout: () => {}
   });
   ```

3. **Document in FEATURE_SPEC.md**:
   ```markdown
   ## Dependencies
   - Depends on: authentication feature
   - Mock location: src/mocks/useAuth.js
   - Replace mock after auth is merged to main
   ```

4. **Update after integration**:
   ```bash
   cd ../my-app-dashboard
   git merge main  # Get real auth implementation
   # Remove mock, use real implementation
   ```

---

## Agent Orchestration Summary

| Phase | Primary Agent | Helper Agents | Purpose |
|-------|--------------|---------------|---------|
| 1. Analyze | @app-spec-writer | @ultrathink (if complex) | Feature analysis & splitting |
| 2. Setup | @app-full-stack | - | Worktree creation & environment |
| 3. Spawn | @app-full-stack | All (via Task tool) | Coordinate parallel development |
| 4. Monitor | @app-full-stack | - | Track progress & handle issues |
| 5. Summary | @app-full-stack | - | Aggregate results |

**Subagent Assignments** (Phase 3):
- Frontend features → @app-frontend-developer
- Backend features → @app-backend-developer
- Full-stack features → @app-full-stack
- Testing → @app-tester

---

## Example Usage

```bash
# From parent directory of project
cd /Users/Wolverine/00_PROJECTS

# Run Claude Code here
claude

# In Claude Code, execute:
/app-parallel-worktrees user-profile settings notifications
```

**What happens**:
1. Analyzes 3 features (all independent)
2. Creates 3 worktrees with ports 5174-5176
3. Spawns 3 parallel subagents
4. Each subagent implements their feature using TDD
5. All work simultaneously (true parallelism)
6. Aggregates results and provides summary

**Time saved**: 4+ days (parallel vs sequential development)

---

## Troubleshooting

### Issue: Subagent can't find worktree

**Problem**: Subagent working directory incorrect

**Solution**: Verify in Phase 2 that worktrees were created in parent directory:
```bash
cd <project-name>
git worktree list
```

---

### Issue: Port conflicts

**Problem**: Assigned port already in use

**Solution**: Check running processes and adjust ports in .env:
```bash
lsof -i :5174
# If occupied, use 5180 instead
```

---

### Issue: Subagent doesn't complete

**Problem**: Subagent stuck or errored

**Solution**: Check subagent logs, retry with clearer instructions, or implement feature manually in that worktree

---

## Best Practices

1. **Keep features independent**: Easier parallel development
2. **Use mocks for dependencies**: Don't block on other features
3. **Commit often**: Each subagent should commit when done
4. **Test before integration**: Run tests in each worktree
5. **Document conflicts**: Note potential merge conflicts in .work.txt

---

## Success Criteria

After this command completes:

✅ All worktrees created with unique branches
✅ All development environments configured
✅ All features implemented with passing tests
✅ All .work.txt summaries created
✅ Clear integration plan provided
✅ Potential conflicts identified

**Next step**: Use `/app-integrate-parallel-worktrees` to merge all features safely.

---

Execute this complete parallel development workflow.
