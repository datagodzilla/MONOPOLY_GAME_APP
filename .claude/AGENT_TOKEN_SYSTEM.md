# Agent Token System

**Purpose**: Enforce dependencies and prevent cascade failures in multi-agent workflows

**Status**: Required for all app-builder agents

---

## Overview

The agent token system ensures agents execute in the correct order by creating completion markers that subsequent agents must verify before starting work.

**Key Principle**: An agent cannot start until all prerequisite agents have completed successfully.

---

## Token Directory Structure

```
project-root/
└── .agent-tokens/
    ├── backend-complete.token
    ├── frontend-complete.token
    ├── integration-complete.token
    └── docs-complete.token
```

**Location**: Always create `.agent-tokens/` in the project root directory.

---

## Token Format

### Standard Token Schema

```json
{
  "agent": "agent-name",
  "profile": "app-builder",
  "workspace": "/absolute/path/to/project",
  "status": "complete",
  "timestamp": "2025-10-28T14:22:00Z",
  "files_created": [
    "relative/path/to/file1.ts",
    "relative/path/to/file2.tsx"
  ],
  "verification_hash": "sha256-checksum",
  "next_agent": "suggested-next-agent",
  "metadata": {
    "duration_seconds": 180,
    "model_used": "sonnet-4",
    "success_criteria_met": true
  }
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `agent` | string | Agent identifier (e.g., "backend-developer") |
| `profile` | string | Always "app-builder" |
| `workspace` | string | Absolute path to project root |
| `status` | string | Must be "complete" for valid token |
| `timestamp` | string | ISO 8601 format |
| `files_created` | array | List of files created (relative paths) |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `verification_hash` | string | Checksum of created files |
| `next_agent` | string | Suggested next agent to run |
| `metadata` | object | Additional information |

---

## Agent-Specific Tokens

### 1. backend-complete.token

**Created by**: `app-backend-developer`

**Indicates**: Backend data layer is complete

**Required files**:
```json
{
  "agent": "backend-developer",
  "workspace": "/absolute/path/to/project",
  "status": "complete",
  "timestamp": "2025-10-28T14:22:00Z",
  "files_created": [
    "lib/types/expense.ts",
    "lib/utils/storage.ts",
    "lib/hooks/useExpenses.ts",
    "lib/README.md"
  ],
  "next_agent": "frontend-developer"
}
```

### 2. frontend-complete.token

**Created by**: `app-frontend-developer`

**Prerequisites**: `backend-complete.token` must exist

**Indicates**: UI components are complete

```json
{
  "agent": "frontend-developer",
  "workspace": "/absolute/path/to/project",
  "status": "complete",
  "timestamp": "2025-10-28T14:25:00Z",
  "files_created": [
    "components/ExpenseList.tsx",
    "components/ExpenseForm.tsx",
    "components/ui/Button.tsx"
  ],
  "prerequisites_verified": ["backend-complete.token"],
  "next_agent": "full-stack-integration"
}
```

### 3. integration-complete.token

**Created by**: `app-full-stack`

**Prerequisites**: Both `backend-complete.token` AND `frontend-complete.token`

**Indicates**: Application integrated and build verified

```json
{
  "agent": "full-stack-integration",
  "workspace": "/absolute/path/to/project",
  "status": "complete",
  "timestamp": "2025-10-28T14:30:00Z",
  "files_created": [
    "app/page.tsx",
    "app/layout.tsx"
  ],
  "prerequisites_verified": [
    "backend-complete.token",
    "frontend-complete.token"
  ],
  "build_verified": true,
  "next_agent": "spec-writer"
}
```

### 4. docs-complete.token

**Created by**: `app-spec-writer`

**Prerequisites**: `integration-complete.token`

**Indicates**: Documentation is complete

```json
{
  "agent": "spec-writer",
  "workspace": "/absolute/path/to/project",
  "status": "complete",
  "timestamp": "2025-10-28T14:35:00Z",
  "files_created": [
    "README.md",
    "FEATURES.md",
    "DEVELOPMENT.md"
  ],
  "prerequisites_verified": ["integration-complete.token"]
}
```

---

## Token Validation

### Validation Checklist

Before accepting a token as valid, verify:

1. **File Exists**: Token file exists at expected path
2. **Valid JSON**: Token parses as valid JSON
3. **Required Fields**: All required fields present
4. **Status Complete**: `status` field equals "complete"
5. **Workspace Match**: `workspace` matches current project path
6. **Files Exist**: All listed files actually exist
7. **Recent Timestamp**: Timestamp within reasonable timeframe (< 24 hours)

### Validation Script (bash)

```bash
#!/bin/bash

TOKEN_FILE="$1"
EXPECTED_WORKSPACE="$2"

# Check file exists
if [ ! -f "$TOKEN_FILE" ]; then
  echo "ERROR: Token file not found: $TOKEN_FILE"
  exit 1
fi

# Parse JSON
TOKEN_CONTENT=$(cat "$TOKEN_FILE")

# Extract fields using jq (or grep if jq not available)
STATUS=$(echo "$TOKEN_CONTENT" | grep -o '"status"[[:space:]]*:[[:space:]]*"[^"]*"' | cut -d'"' -f4)
WORKSPACE=$(echo "$TOKEN_CONTENT" | grep -o '"workspace"[[:space:]]*:[[:space:]]*"[^"]*"' | cut -d'"' -f4)

# Verify status
if [ "$STATUS" != "complete" ]; then
  echo "ERROR: Token status is not 'complete': $STATUS"
  exit 1
fi

# Verify workspace
if [ "$WORKSPACE" != "$EXPECTED_WORKSPACE" ]; then
  echo "ERROR: Workspace mismatch"
  echo "  Expected: $EXPECTED_WORKSPACE"
  echo "  Found: $WORKSPACE"
  exit 1
fi

echo "✅ Token validation passed"
exit 0
```

---

## Token Creation

### When to Create Token

Create completion token:
- ✅ After all files are successfully created
- ✅ After all tests pass (if applicable)
- ✅ After build verification succeeds (for integration agent)
- ✅ Before agent exits

**NEVER create token**:
- ❌ If any errors occurred
- ❌ If working in wrong directory
- ❌ If prerequisites not met
- ❌ If files incomplete

### Creation Script (bash)

```bash
#!/bin/bash

AGENT_NAME="$1"
WORKSPACE="$2"
FILES_CREATED="$3"  # Comma-separated list

# Create token directory if needed
mkdir -p "$WORKSPACE/.agent-tokens"

# Create token file
TOKEN_FILE="$WORKSPACE/.agent-tokens/${AGENT_NAME}-complete.token"

cat > "$TOKEN_FILE" << EOF
{
  "agent": "${AGENT_NAME}",
  "profile": "app-builder",
  "workspace": "${WORKSPACE}",
  "status": "complete",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "files_created": [
    $(echo "$FILES_CREATED" | sed 's/,/",\n    "/g' | sed 's/^/    "/' | sed 's/$/"/')
  ]
}
EOF

echo "✅ Created token: $TOKEN_FILE"
```

---

## Dependency Chain

### Standard App-Builder Workflow

```
1. backend-developer
   ├── Prerequisites: None
   ├── Creates: backend-complete.token
   └── Next: frontend-developer

2. frontend-developer
   ├── Prerequisites: backend-complete.token
   ├── Creates: frontend-complete.token
   └── Next: full-stack-integration

3. full-stack-integration
   ├── Prerequisites: backend-complete.token + frontend-complete.token
   ├── Creates: integration-complete.token
   └── Next: spec-writer

4. spec-writer
   ├── Prerequisites: integration-complete.token
   ├── Creates: docs-complete.token
   └── Next: None (complete)
```

### Parallel Execution (Advanced)

Some agents can run in parallel if they don't depend on each other:

```
backend-developer (no prerequisites)
    ↓
    ├─→ frontend-developer (waits for backend)
    │
    └─→ api-documentation (waits for backend, runs parallel to frontend)

    Both complete
         ↓
    full-stack-integration (waits for both)
```

---

## Error Handling

### Missing Token

If prerequisite token missing:

```bash
echo "❌ ERROR: Prerequisite not met"
echo "   Missing token: .agent-tokens/backend-complete.token"
echo "   Agent: frontend-developer cannot start"
echo "   Action: Run backend-developer agent first"
exit 1
```

### Invalid Token

If token invalid:

```bash
echo "❌ ERROR: Invalid token"
echo "   Token file: .agent-tokens/backend-complete.token"
echo "   Problem: Status is 'failed' (expected 'complete')"
echo "   Action: Re-run backend-developer agent"
exit 1
```

### Workspace Mismatch

If workspace doesn't match:

```bash
echo "❌ ERROR: Workspace mismatch"
echo "   Token workspace: /path/to/project-v1"
echo "   Current workspace: /path/to/project-v2"
echo "   Problem: Token from different project"
echo "   Action: Verify working directory is correct"
exit 1
```

---

## Best Practices

### DO ✅

- **Create tokens immediately after successful completion**
- **Include all files created** in the token
- **Verify token validity** before relying on it
- **Use absolute paths** for workspace field
- **Check token age** (reject tokens > 24 hours old)
- **Validate prerequisites** before starting work

### DON'T ❌

- **Don't create tokens on failure**
- **Don't skip token verification**
- **Don't modify tokens manually** (regenerate instead)
- **Don't use relative paths** in workspace field
- **Don't assume tokens are valid** without checking
- **Don't proceed without prerequisite tokens**

---

## Troubleshooting

### Problem: Agent can't find token

**Solution**:
1. Verify working directory: `pwd`
2. Check token directory exists: `ls -la .agent-tokens/`
3. List tokens: `ls -la .agent-tokens/*.token`
4. Verify prerequisite agent completed successfully

### Problem: Token exists but validation fails

**Solution**:
1. Check token content: `cat .agent-tokens/[agent]-complete.token`
2. Verify JSON is valid: `cat token.json | jq .`
3. Check status field: `cat token.json | grep status`
4. Verify workspace matches: Compare with `pwd`

### Problem: Cascade failure (multiple agents failed)

**Solution**:
1. Find first failed agent in chain
2. Delete all tokens after failed agent
3. Fix root cause
4. Restart from failed agent
5. Tokens will propagate correctly

---

## Integration with Agents

### Agent Startup Template

Every agent should start with:

```markdown
## STEP 1: WORKSPACE VERIFICATION

1. Get current directory:
   ```bash
   CURRENT_DIR=$(pwd)
   ```

2. Verify matches expected workspace from prompt:
   ```bash
   if [ "$CURRENT_DIR" != "$EXPECTED_WORKSPACE" ]; then
     echo "ERROR: Wrong directory"
     exit 1
   fi
   ```

## STEP 2: PREREQUISITE CHECK

1. Check for required tokens:
   ```bash
   if [ ! -f ".agent-tokens/backend-complete.token" ]; then
     echo "ERROR: Prerequisite not met"
     exit 1
   fi
   ```

2. Validate token:
   ```bash
   ./scripts/validate-token.sh .agent-tokens/backend-complete.token
   ```

## STEP 3: PERFORM WORK

[Agent performs its tasks]

## STEP 4: CREATE COMPLETION TOKEN

1. Verify all files created
2. Create token with file list
3. Verify token is valid JSON
4. Report completion
```

---

## Migration Guide

### For Existing Projects

**Step 1**: Create token directory
```bash
mkdir -p .agent-tokens
```

**Step 2**: Manually create tokens for completed agents
```bash
# If backend is complete:
cat > .agent-tokens/backend-complete.token << 'EOF'
{
  "agent": "backend-developer",
  "workspace": "$(pwd)",
  "status": "complete",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "files_created": ["lib/types/expense.ts"]
}
EOF
```

**Step 3**: Update agent profiles (see individual agent docs)

**Step 4**: Test with simple project

---

## Examples

### Example 1: Backend Agent Creates Token

```bash
# After backend agent completes work
cd /Users/Wolverine/00_PROJECTS/my-app

# Create token
cat > .agent-tokens/backend-complete.token << 'EOF'
{
  "agent": "backend-developer",
  "workspace": "/Users/Wolverine/00_PROJECTS/my-app",
  "status": "complete",
  "timestamp": "2025-10-28T14:22:00Z",
  "files_created": [
    "lib/types/expense.ts",
    "lib/utils/storage.ts",
    "lib/hooks/useExpenses.ts"
  ],
  "next_agent": "frontend-developer"
}
EOF

echo "✅ Backend complete. Next: frontend-developer"
```

### Example 2: Frontend Agent Verifies Token

```bash
# Before frontend agent starts work
cd /Users/Wolverine/00_PROJECTS/my-app

# Check prerequisite
if [ ! -f ".agent-tokens/backend-complete.token" ]; then
  echo "❌ ERROR: Backend not complete"
  echo "   Run backend-developer agent first"
  exit 1
fi

# Verify workspace matches
TOKEN_WORKSPACE=$(cat .agent-tokens/backend-complete.token | grep -o '"workspace"[[:space:]]*:[[:space:]]*"[^"]*"' | cut -d'"' -f4)
CURRENT_DIR=$(pwd)

if [ "$TOKEN_WORKSPACE" != "$CURRENT_DIR" ]; then
  echo "❌ ERROR: Workspace mismatch"
  exit 1
fi

echo "✅ Prerequisites verified. Starting frontend work..."
```

---

## Summary

**Purpose**: Prevent 60% failure rate by enforcing dependencies

**Key Benefits**:
- ✅ Eliminates cascade failures
- ✅ Enforces correct execution order
- ✅ Provides verification points
- ✅ Creates audit trail
- ✅ Enables rollback if needed

**Success Criteria**:
- 95% of agents complete successfully
- Zero cascade failures
- Minimal manual intervention

**Next Steps**:
1. Review this document
2. Update agent profiles to use tokens
3. Test with simple project
4. Deploy to production workflows

---

**Version**: 1.0
**Date**: 2025-10-28
**Status**: Production Ready
**Profile**: app-builder
