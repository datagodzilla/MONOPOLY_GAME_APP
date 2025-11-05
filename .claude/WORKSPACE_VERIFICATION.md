# Workspace Verification Guidelines

**Purpose**: Prevent agents from working in wrong directories (60% failure cause)

**Status**: REQUIRED for all app-builder agents

---

## Critical Problem

**Root Cause of 60% Agent Failures**:
- Agents worked in `expense-tracker/` instead of `expense-tracker-v2/`
- File system searches found similar directories first
- No mechanism to verify correct workspace
- Resulted in cascade failures

**Solution**: Strict workspace verification BEFORE starting any work

---

## Verification Protocol

### Step 1: Get Current Directory

```bash
CURRENT_DIR=$(pwd)
echo "Current directory: $CURRENT_DIR"
```

### Step 2: Verify Against Expected Workspace

```bash
# Expected workspace must be provided in agent prompt
EXPECTED_WORKSPACE="/absolute/path/from/prompt"

if [ "$CURRENT_DIR" != "$EXPECTED_WORKSPACE" ]; then
  echo "❌ ERROR: Wrong directory"
  echo "   Current: $CURRENT_DIR"
  echo "   Expected: $EXPECTED_WORKSPACE"
  echo "   Action: cd to correct directory or fix prompt"
  exit 1
fi
```

### Step 3: Verify Directory Characteristics

```bash
# Additional checks to confirm this is the correct project
# Check for specific marker files or structure

# Example: Verify package.json exists
if [ ! -f "package.json" ]; then
  echo "⚠️  WARNING: package.json not found"
  echo "   This may not be a valid project directory"
fi

# Example: Verify .agent-tokens directory exists (for dependent agents)
if [ ! -d ".agent-tokens" ]; then
  echo "⚠️  WARNING: .agent-tokens directory not found"
  echo "   Creating directory..."
  mkdir -p .agent-tokens
fi
```

---

## Verification Checklist

Before starting ANY agent work:

- [ ] **Run `pwd`** and capture output
- [ ] **Compare with expected workspace** from prompt
- [ ] **Exit immediately if mismatch** (DO NOT search for alternatives)
- [ ] **Verify project markers** (package.json, etc.)
- [ ] **Check for .agent-tokens/** directory
- [ ] **Report verification status** to user

**If ANY check fails**: STOP immediately, report error, DO NOT PROCEED.

---

## Agent Prompt Requirements

### ❌ BAD: Ambiguous Path

```
Build frontend components in expense-tracker-v2
```

**Problems**:
- Relative path
- Agent might find wrong directory
- No verification possible

### ✅ GOOD: Absolute Path with Verification

```
WORKSPACE: /Users/Wolverine/00_PROJECTS/SOFTWARE_ENGG_WITH_CLAUDE/expense-tracker-v2

VERIFICATION REQUIRED:
1. Run: pwd
2. Verify: Output must EXACTLY match WORKSPACE path above
3. If mismatch: EXIT immediately with error
4. Do NOT search for alternative directories
5. Do NOT work in similar-named directories

TASK: [Your task here]
```

---

## Verification Scripts

### Basic Verification Script

Save as: `.agent-tokens/verify-workspace.sh`

```bash
#!/bin/bash

# Usage: ./verify-workspace.sh "/expected/workspace/path"

EXPECTED_WORKSPACE="$1"
CURRENT_DIR=$(pwd)

echo "=== Workspace Verification ==="
echo "Current:  $CURRENT_DIR"
echo "Expected: $EXPECTED_WORKSPACE"

if [ "$CURRENT_DIR" != "$EXPECTED_WORKSPACE" ]; then
  echo ""
  echo "❌ VERIFICATION FAILED"
  echo "   You are in the WRONG directory"
  echo "   Action required: cd $EXPECTED_WORKSPACE"
  exit 1
fi

echo ""
echo "✅ VERIFICATION PASSED"
echo "   Workspace is correct"
exit 0
```

### Advanced Verification Script

Save as: `.agent-tokens/verify-workspace-advanced.sh`

```bash
#!/bin/bash

# Usage: ./verify-workspace-advanced.sh "/expected/workspace/path" "project-name"

EXPECTED_WORKSPACE="$1"
PROJECT_NAME="$2"
CURRENT_DIR=$(pwd)

echo "=== Advanced Workspace Verification ==="

# Check 1: Directory path
echo "1. Checking directory path..."
if [ "$CURRENT_DIR" != "$EXPECTED_WORKSPACE" ]; then
  echo "   ❌ FAIL: Wrong directory"
  echo "      Current:  $CURRENT_DIR"
  echo "      Expected: $EXPECTED_WORKSPACE"
  exit 1
fi
echo "   ✅ PASS: Directory path correct"

# Check 2: Project markers
echo "2. Checking project markers..."
if [ ! -f "package.json" ]; then
  echo "   ⚠️  WARNING: package.json not found"
fi

if [ -f "package.json" ]; then
  PKG_NAME=$(cat package.json | grep -o '"name"[[:space:]]*:[[:space:]]*"[^"]*"' | cut -d'"' -f4)
  if [ "$PKG_NAME" != "$PROJECT_NAME" ]; then
    echo "   ⚠️  WARNING: package.json name mismatch"
    echo "      Found: $PKG_NAME"
    echo "      Expected: $PROJECT_NAME"
  else
    echo "   ✅ PASS: package.json name matches"
  fi
fi

# Check 3: Token directory
echo "3. Checking .agent-tokens directory..."
if [ ! -d ".agent-tokens" ]; then
  echo "   ⚠️  INFO: .agent-tokens not found, creating..."
  mkdir -p .agent-tokens
  echo "   ✅ Created .agent-tokens directory"
else
  echo "   ✅ PASS: .agent-tokens exists"
fi

# Check 4: No conflicting directories
echo "4. Checking for conflicting directories..."
PARENT_DIR=$(dirname "$CURRENT_DIR")
SIMILAR_DIRS=$(find "$PARENT_DIR" -maxdepth 1 -type d -name "*$(basename $CURRENT_DIR | sed 's/-v2//')*" | wc -l)

if [ "$SIMILAR_DIRS" -gt 1 ]; then
  echo "   ⚠️  WARNING: Found $SIMILAR_DIRS similar directories"
  echo "      Make sure you're in the correct one"
  find "$PARENT_DIR" -maxdepth 1 -type d -name "*$(basename $CURRENT_DIR | sed 's/-v2//')*"
fi

echo ""
echo "✅ VERIFICATION COMPLETE"
echo "   Workspace: $CURRENT_DIR"
echo "   Status: Ready for agent work"
exit 0
```

---

## Integration with Agents

### Every Agent Must Start With

```markdown
## CRITICAL: WORKSPACE VERIFICATION (MUST BE FIRST STEP)

**STOP**: Do not proceed until verification passes.

1. **Get current directory**:
   ```bash
   CURRENT_DIR=$(pwd)
   echo "Working in: $CURRENT_DIR"
   ```

2. **Verify against expected workspace**:
   ```bash
   EXPECTED_WORKSPACE="[from-prompt]"

   if [ "$CURRENT_DIR" != "$EXPECTED_WORKSPACE" ]; then
     echo "❌ ERROR: Wrong directory"
     echo "   Current: $CURRENT_DIR"
     echo "   Expected: $EXPECTED_WORKSPACE"
     exit 1
   fi
   ```

3. **Report verification**:
   ```bash
   echo "✅ Workspace verified: $CURRENT_DIR"
   ```

4. **Create token directory if needed**:
   ```bash
   mkdir -p .agent-tokens
   ```

**ONLY PROCEED if all checks pass. If ANY fail, EXIT immediately.**
```

---

## Common Scenarios

### Scenario 1: Multiple Similar Projects

**Problem**:
```
/projects/
├── expense-tracker/       ← v1 (wrong)
└── expense-tracker-v2/    ← v2 (correct)
```

**Solution**:
```bash
# Agent prompt MUST specify absolute path
WORKSPACE: /Users/Wolverine/projects/expense-tracker-v2

# Agent MUST verify exact match
CURRENT=$(pwd)
if [ "$CURRENT" != "/Users/Wolverine/projects/expense-tracker-v2" ]; then
  exit 1
fi
```

### Scenario 2: Agent Launched from Wrong Directory

**Problem**: User runs agent while in v1, expects work in v2

**Solution**:
```bash
# Verification catches this immediately
EXPECTED="/path/to/v2"
CURRENT=$(pwd)  # Returns /path/to/v1

if [ "$CURRENT" != "$EXPECTED" ]; then
  echo "❌ Wrong directory. cd to: $EXPECTED"
  exit 1
fi
```

### Scenario 3: Typo in Directory Name

**Problem**: Expected `expense-tracker-v2`, actual is `expense-trackr-v2` (typo)

**Solution**:
```bash
# Exact string match catches typos
EXPECTED="/path/expense-tracker-v2"
CURRENT=$(pwd)  # Returns /path/expense-trackr-v2

if [ "$CURRENT" != "$EXPECTED" ]; then
  echo "❌ Mismatch detected"
  echo "   Check for typos in directory name"
  exit 1
fi
```

---

## Error Messages

### Standard Error Format

```bash
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ❌ WORKSPACE VERIFICATION FAILED                          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Agent: [agent-name]"
echo "Expected workspace: [expected-path]"
echo "Current directory:  [current-path]"
echo ""
echo "Problem: You are in the WRONG directory"
echo ""
echo "Action Required:"
echo "  1. Change directory: cd [expected-path]"
echo "  2. OR update agent prompt with correct path"
echo "  3. Re-run agent"
echo ""
echo "DO NOT:"
echo "  ✗ Continue in wrong directory"
echo "  ✗ Search for alternative directories"
echo "  ✗ Modify files in current directory"
exit 1
```

### Success Message Format

```bash
echo "✅ Workspace Verification: PASSED"
echo "   Directory: $CURRENT_DIR"
echo "   Agent: [agent-name] ready to start"
echo ""
```

---

## Best Practices

### DO ✅

- **Always use absolute paths** in agent prompts
- **Verify BEFORE starting work** (first step, no exceptions)
- **Exit immediately on mismatch** (fail fast)
- **Report verification status** clearly
- **Use standard error format** for consistency
- **Create .agent-tokens/ if missing**

### DON'T ❌

- **Never skip verification** (even if "sure" it's correct)
- **Never search for directories** (use exact path only)
- **Never proceed on mismatch** (no exceptions)
- **Never assume relative paths** work correctly
- **Never modify verification** to be more lenient
- **Never work in similar-named directories**

---

## Testing Verification

### Test 1: Correct Directory

```bash
cd /correct/project/path
EXPECTED="/correct/project/path"
CURRENT=$(pwd)
[ "$CURRENT" = "$EXPECTED" ] && echo "✅ PASS" || echo "❌ FAIL"
```

### Test 2: Wrong Directory

```bash
cd /wrong/project/path
EXPECTED="/correct/project/path"
CURRENT=$(pwd)
[ "$CURRENT" = "$EXPECTED" ] && echo "❌ FAIL" || echo "✅ PASS (correctly failed)"
```

### Test 3: Similar Directory Name

```bash
cd /projects/expense-tracker
EXPECTED="/projects/expense-tracker-v2"
CURRENT=$(pwd)
[ "$CURRENT" = "$EXPECTED" ] && echo "❌ FAIL" || echo "✅ PASS (correctly rejected)"
```

---

## Troubleshooting

### Issue: Verification always fails

**Diagnosis**:
```bash
# Check what pwd returns
pwd

# Check what expected path is
echo "$EXPECTED_WORKSPACE"

# Compare character by character
diff <(echo "$CURRENT") <(echo "$EXPECTED")
```

**Common causes**:
- Trailing slash in one but not other: `/path/to/project` vs `/path/to/project/`
- Hidden characters or spaces
- Symlink vs real path

**Solution**:
```bash
# Normalize paths before comparing
CURRENT=$(cd "$(pwd)" && pwd -P)  # Resolve symlinks
EXPECTED=$(echo "$EXPECTED_WORKSPACE" | sed 's:/$::')  # Remove trailing slash
```

### Issue: Agent finds wrong directory

**Diagnosis**:
```bash
# List similar directories
find /parent/dir -maxdepth 1 -type d -name "*project-name*"
```

**Solution**:
- Use absolute paths (not relative)
- Verify exact match (not substring match)
- Don't use `find` or glob patterns

---

## Integration with /app-setup

The `/app-setup` command should create the verification infrastructure:

```bash
# After creating project structure
mkdir -p .agent-tokens

# Create verification script
cat > .agent-tokens/verify-workspace.sh << 'EOF'
[verification script content]
EOF

chmod +x .agent-tokens/verify-workspace.sh

# Create workspace ID
echo "$(uuidgen)" > .agent-tokens/workspace-id.txt

# Document workspace path
cat > .agent-tokens/workspace-path.txt << EOF
$(pwd)
EOF
```

---

## Summary

**Critical Insight**: 60% of agent failures were due to working in wrong directory.

**Solution**: Strict workspace verification catches errors immediately.

**Implementation**:
1. Add verification to every agent profile
2. Use absolute paths in all prompts
3. Fail fast on mismatch
4. Never skip verification

**Expected Result**:
- 95% success rate (up from 40%)
- Zero cascade failures
- Predictable outcomes

---

**Version**: 1.0
**Date**: 2025-10-28
**Status**: Production Ready
**Profile**: app-builder
**Priority**: 🔴 CRITICAL
