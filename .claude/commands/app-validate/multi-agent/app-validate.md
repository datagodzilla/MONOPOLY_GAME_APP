# App Validation Command (Code Quality + Architecture)

**Purpose**: Validate web application code quality, architecture, and best practices

**Command**: `/app-validate [check-type]`

**Duration**: 1-3 minutes (depending on project size)

**Profile**: app-builder

**Philosophy**: Validate early, validate often - Catch issues before they become problems

---

## Validation Types

| Check Type | What It Validates | Tools Used | Duration |
|------------|-------------------|------------|----------|
| `lint` | Code style and syntax | ESLint, pylint | ~30 seconds |
| `format` | Code formatting | Prettier, Black | ~20 seconds |
| `types` | Type checking (if TypeScript) | tsc, mypy | ~40 seconds |
| `security` | Security vulnerabilities | npm audit, safety | ~30 seconds |
| `architecture` | Project structure and patterns | Custom checks | ~30 seconds |
| `dependencies` | Package versions and conflicts | npm/pip | ~20 seconds |
| `design` | **Design principles (SRP, OCP, DIP)** | **Custom analysis** | **~30 seconds** |
| `all` | All validations | All tools | ~3-4 minutes |

---

## Usage

```bash
# Run all validations (default)
/app-validate

# Run specific validation
/app-validate lint
/app-validate security
/app-validate architecture

# Quick check (lint + format only)
/app-validate quick
```

---

## Validation 1: Code Linting

**Command**: `/app-validate lint`

**Purpose**: Check code quality, style, and potential bugs

### Frontend Linting (ESLint)

**Configuration**: `.eslintrc.js` or `.eslintrc.json`

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "plugins": ["react", "react-hooks"],
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "warn",
    "react/prop-types": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  }
}
```

**Run Command**:
```bash
npm run lint
# or
npx eslint src --ext .js,.jsx,.ts,.tsx
```

**Example Output**:
```
✓ src/components/LoginForm.jsx
✓ src/components/Dashboard.jsx
✗ src/components/Navbar.jsx
  3:10  warning  'user' is assigned a value but never used  no-unused-vars
  15:5  warning  Unexpected console statement                no-console
  28:15 error    React Hook useEffect has a missing dependency react-hooks/exhaustive-deps

✓ src/utils/validation.js
✓ src/utils/api.js

5 files checked
2 warnings
1 error

❌ Linting failed - fix errors before committing
```

**Auto-fix**:
```bash
npm run lint -- --fix
```

---

### Backend Linting (pylint/flake8)

**Configuration**: `.pylintrc` or `setup.cfg`

```ini
[pylint]
max-line-length = 100
disable =
    missing-docstring,
    too-few-public-methods,
    invalid-name
ignore = tests,venv
```

**Run Command**:
```bash
pylint backend/
# or
flake8 backend/
```

**Example Output**:
```
************* Module backend.api.routes.auth
backend/api/routes/auth.py:15:0: C0301: Line too long (105/100) (line-too-long)
backend/api/routes/auth.py:42:0: W0611: Unused import sys (unused-import)
backend/api/routes/auth.py:78:4: R0915: Too many statements (52/50) (too-many-statements)

************* Module backend.models.user
backend/models/user.py:25:4: C0116: Missing function docstring (missing-function-docstring)

-----------------------------------
Your code has been rated at 8.5/10

⚠️  Fix 4 issues to reach 9.0/10 rating
```

---

## Validation 2: Code Formatting

**Command**: `/app-validate format`

**Purpose**: Ensure consistent code formatting

### Frontend Formatting (Prettier)

**Configuration**: `.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "arrowParens": "avoid"
}
```

**Check Formatting**:
```bash
npx prettier --check src/
```

**Example Output**:
```
Checking formatting...
src/components/LoginForm.jsx
src/components/Dashboard.jsx
src/components/Navbar.jsx  ❌ (needs formatting)
src/utils/validation.js
src/utils/api.js  ❌ (needs formatting)

2 files need formatting
```

**Auto-format**:
```bash
npx prettier --write src/
```

**After Auto-format**:
```
Formatting...
src/components/Navbar.jsx  ✅ (formatted)
src/utils/api.js  ✅ (formatted)

✅ All files formatted!
```

---

### Backend Formatting (Black)

**Configuration**: `pyproject.toml`

```toml
[tool.black]
line-length = 100
target-version = ['py310']
include = '\.pyi?$'
exclude = '''
/(
    \.git
  | \.venv
  | venv
  | tests
)/
'''
```

**Check Formatting**:
```bash
black --check backend/
```

**Example Output**:
```
would reformat backend/api/routes/auth.py
would reformat backend/models/user.py

2 files would be reformatted, 8 files would be left unchanged.
```

**Auto-format**:
```bash
black backend/
```

---

## Validation 3: Type Checking

**Command**: `/app-validate types`

**Purpose**: Check type safety (TypeScript/Python type hints)

### TypeScript Checking

**Configuration**: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Run Command**:
```bash
npx tsc --noEmit
```

**Example Output**:
```
src/components/LoginForm.tsx:15:5 - error TS2322: Type 'string | null' is not assignable to type 'string'.
  15     const email: string = getEmail();  // email might be null
         ^^^^^

src/utils/api.ts:42:10 - error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
  42   fetchUser(userId);  // userId is number, expects string
                ^^^^^^^

Found 2 errors.
```

---

### Python Type Checking (mypy)

**Configuration**: `mypy.ini`

```ini
[mypy]
python_version = 3.10
warn_return_any = True
warn_unused_configs = True
disallow_untyped_defs = False
ignore_missing_imports = True
exclude = venv|tests
```

**Run Command**:
```bash
mypy backend/
```

**Example Output**:
```
backend/api/routes/auth.py:25: error: Argument 1 to "hash_password" has incompatible type "Optional[str]"; expected "str"
backend/models/user.py:42: error: Incompatible return value type (got "None", expected "User")

Found 2 errors in 2 files (checked 15 source files)
```

---

## Validation 4: Security Vulnerabilities

**Command**: `/app-validate security`

**Purpose**: Detect known security vulnerabilities in dependencies

### Frontend Security (npm audit)

**Run Command**:
```bash
npm audit
```

**Example Output**:
```
found 3 vulnerabilities (1 moderate, 2 high) in 842 scanned packages

┌───────────────┬──────────────────────────────────────────────────┐
│ high          │ Prototype Pollution in lodash                    │
├───────────────┼──────────────────────────────────────────────────┤
│ Package       │ lodash                                           │
├───────────────┼──────────────────────────────────────────────────┤
│ Dependency of │ react-scripts                                    │
├───────────────┼──────────────────────────────────────────────────┤
│ Path          │ react-scripts > lodash                           │
├───────────────┼──────────────────────────────────────────────────┤
│ More info     │ https://npmjs.com/advisories/1673                │
└───────────────┴──────────────────────────────────────────────────┘

┌───────────────┬──────────────────────────────────────────────────┐
│ moderate      │ Regular Expression Denial of Service in ajv      │
├───────────────┼──────────────────────────────────────────────────┤
│ Package       │ ajv                                              │
├───────────────┼──────────────────────────────────────────────────┤
│ Dependency of │ webpack                                          │
├───────────────┼──────────────────────────────────────────────────┤
│ Path          │ webpack > ajv                                    │
├───────────────┼──────────────────────────────────────────────────┤
│ More info     │ https://npmjs.com/advisories/1589                │
└───────────────┴──────────────────────────────────────────────────┘

Run `npm audit fix` to fix 2 vulnerabilities
1 vulnerability requires manual review
```

**Auto-fix** (safe fixes only):
```bash
npm audit fix
```

**Force fix** (may have breaking changes):
```bash
npm audit fix --force
```

---

### Backend Security (safety)

**Install safety**:
```bash
pip install safety
```

**Run Command**:
```bash
safety check
```

**Example Output**:
```
+==============================================================================+
|                                                                              |
|                               /$$$$$$            /$$                         |
|                              /$$__  $$          | $$                         |
|           /$$$$$$$  /$$$$$$ | $$  \__//$$$$$$  /$$$$$$   /$$   /$$           |
|          /$$_____/ |____  $$| $$$$   /$$__  $$|_  $$_/  | $$  | $$           |
|         |  $$$$$$   /$$$$$$$| $$_/  | $$$$$$$$  | $$    | $$  | $$           |
|          \____  $$ /$$__  $$| $$    | $$_____/  | $$ /$$| $$  | $$           |
|          /$$$$$$$/|  $$$$$$$| $$    |  $$$$$$$  |  $$$$/|  $$$$$$$           |
|         |_______/  \_______/|__/     \_______/   \___/   \____  $$           |
|                                                            /$$  | $$           |
|                                                           |  $$$$$$/           |
|  by pyup.io                                                \______/            |
|                                                                              |
+==============================================================================+

 REPORT

  Safety is using PyUp's free open-source vulnerability database.

+==============================================================================+
| VULNERABILITIES FOUND                                                        |
+==============================================================================+

-> Vulnerability found in flask version 2.0.1
   Vulnerability ID: 51668
   Affected spec: <2.2.5
   ADVISORY: Flask before 2.2.5 is vulnerable to XSS attacks.
   Fix: Upgrade to flask>=2.2.5

-> Vulnerability found in requests version 2.25.0
   Vulnerability ID: 51457
   Affected spec: <2.31.0
   ADVISORY: Requests before 2.31.0 has SSL certificate validation vulnerability.
   Fix: Upgrade to requests>=2.31.0

+==============================================================================+
| REMEDIATIONS                                                                 |
+==============================================================================+

 2 vulnerabilities found.
 Run `pip install --upgrade flask requests` to fix.
```

---

## Validation 5: Architecture & Best Practices

**Command**: `/app-validate architecture`

**Purpose**: Validate project structure and architecture patterns

### Checks Performed

**1. Folder Structure**:
```
✅ src/components/ exists
✅ src/utils/ exists
✅ tests/ exists
✅ backend/api/ exists
✅ backend/models/ exists
❌ tests/e2e/ missing (recommended)
```

**2. Component Organization**:
```
✅ Components in src/components/
✅ Utilities in src/utils/
⚠️  Large component detected: src/components/Dashboard.jsx (>300 lines)
   Consider splitting into smaller components
```

**3. API Route Structure**:
```
✅ Routes organized by resource (auth, users, posts)
✅ Blueprints properly registered
⚠️  Missing error handling in 3 routes
```

**4. Test Coverage**:
```
✅ Frontend coverage: 78% (target: 60-70%)
✅ Backend coverage: 79% (target: 60-70%)
✅ E2E tests present: 3 spec files
```

**5. Configuration Management**:
```
✅ Environment variables in .env
✅ .env.example provided
❌ Secrets detected in code:
   - backend/config.py:15 contains hardcoded API key
   Fix: Move to environment variables
```

**6. Dependency Management**:
```
✅ package.json has all dependencies
✅ requirements.txt up to date
⚠️  5 unused dependencies detected:
   - lodash (not imported anywhere)
   - moment (not imported anywhere)
   Fix: npm uninstall lodash moment
```

**7. Error Handling**:
```
✅ Global error handler in Express/Flask app
⚠️  3 API routes missing try-catch blocks
✅ Frontend has error boundaries
```

**8. Code Patterns**:
```
✅ Components follow naming conventions (PascalCase)
✅ Functions use camelCase
✅ Constants use UPPER_CASE
⚠️  2 functions exceed 50 lines (consider refactoring)
```

---

## Validation 6: Dependencies

**Command**: `/app-validate dependencies`

**Purpose**: Check package versions and conflicts

### Frontend Dependencies

**Check outdated packages**:
```bash
npm outdated
```

**Output**:
```
Package         Current  Wanted  Latest  Location
react           18.2.0   18.2.0  18.3.1  project
react-router    6.10.0   6.11.2  6.11.2  project
axios           0.27.2   0.27.2  1.4.0   project

3 packages can be updated
```

**Update packages**:
```bash
npm update  # Safe updates (within wanted)
npm install react@latest  # Major update (manual)
```

---

### Backend Dependencies

**Check outdated packages**:
```bash
pip list --outdated
```

**Output**:
```
Package    Version  Latest   Type
---------- -------- -------- -----
Flask      2.0.1    3.0.0    wheel
requests   2.25.0   2.31.0   wheel
pytest     7.2.0    7.4.3    wheel

3 packages are outdated
```

**Update packages**:
```bash
pip install --upgrade Flask requests pytest
```

---

## Validation 7: Design Principles (NEW)

**Command**: `/app-validate design`

**Purpose**: Check adherence to Pragmatic SOLID principles

**Reference**: See [DESIGN_PRINCIPLES.md](../../system-docs/DESIGN_PRINCIPLES.md) for complete guide

---

### What Gets Validated

**Tier 1 (Always Applied)**:
- ✅ **Single Responsibility Principle (SRP)**
  - File sizes (target < 150 lines)
  - Component responsibilities (rendering only)
  - Function sizes (target < 30 lines)
  - Hook separation (data fetching separated)
  - Utility organization (one purpose per file)

**Tier 2 (Core Features)**:
- ⚠️ **Open/Closed Principle (OCP)**
  - Extensibility patterns (for evaluated features)
  - Hard-coded if/else chains (suggest registry pattern)

- ⚠️ **Dependency Inversion Principle (DIP)**
  - Hard dependencies on libraries (suggest interfaces)
  - Service testability (suggest injection)

---

### SRP Violations Detection

#### Large Files (Violates SRP)

```bash
# Check file sizes
find src -name "*.jsx" -o -name "*.tsx" | xargs wc -l | sort -rn | head -10
```

**Red Flags**:
- 🚨 Files > 200 lines (definitely violates SRP)
- ⚠️  Files 150-200 lines (likely violates SRP)
- ✅ Files < 150 lines (probably good)

**Example Output**:
```
🚨 src/components/UserDashboard.jsx (287 lines)
   Problem: Multiple responsibilities (data fetching + rendering + logic)
   Suggestion: Split into:
     - hooks/useUsers.js (data fetching)
     - hooks/useUserFilters.js (filtering logic)
     - components/UserDashboard.jsx (rendering)
     - components/UserStats.jsx (stats rendering)
     - utils/userCalculations.js (calculations)

⚠️  src/pages/AdminPanel.jsx (173 lines)
   Problem: Large component with multiple concerns
   Suggestion: Extract:
     - AdminHeader.jsx
     - AdminSidebar.jsx
     - AdminContent.jsx

✅ src/components/LoginForm.jsx (68 lines)
   Good: Single responsibility (form rendering only)
```

---

#### God Components (Violates SRP)

**Detection Pattern**:
```typescript
// ❌ Red flags in component:
- Direct fetch() calls in component
- Business logic in render methods
- Multiple useState hooks (> 5)
- Long useEffect hooks (> 15 lines)
- Validation logic in component
```

**Example Analysis**:
```
Component: src/components/Dashboard.jsx (187 lines)

SRP Violations:
  ❌ Data fetching mixed with rendering (lines 15-35)
  ❌ Business logic in component (filterUsers function, line 45)
  ❌ Validation logic inline (validateEmail, line 78)
  ❌ 8 useState hooks (data, loading, error, filter, search, sort, page, limit)

Suggested Refactoring:
  1. Extract data fetching:
     hooks/useDashboardData.js
     - Handles: users, loading, error

  2. Extract filtering logic:
     hooks/useDashboardFilters.js
     - Handles: filter, search, sort, pagination

  3. Extract validation:
     utils/validation.js
     - Handles: validateEmail, validateUser

  4. Component becomes:
     components/Dashboard.jsx (60 lines - rendering only)

  Benefits:
     - Easy to test each piece independently
     - Reusable logic across app
     - Clear responsibilities
```

---

#### Fat Routes (Backend - Violates SRP)

**Detection Pattern**:
```python
# ❌ Red flags in route:
- Database queries in route function
- Validation logic inline
- Business logic mixed with HTTP handling
- Multiple responsibilities (> 50 lines)
```

**Example Analysis**:
```
Route: backend/api/routes/users.py::create_user (78 lines)

SRP Violations:
  ❌ Validation inline (lines 10-20)
  ❌ Database connection in route (line 25)
  ❌ Database queries in route (lines 30-45)
  ❌ Email sending in route (line 50)
  ❌ Business logic mixed with HTTP (lines 55-70)

Suggested Refactoring:
  1. Extract validation:
     utils/validation.py
     - validate_email(), validate_password()

  2. Extract database operations:
     models/user.py
     - User.create(), User.get_by_email()

  3. Extract email service:
     services/email_service.py
     - EmailService.send_welcome_email()

  4. Route becomes (20 lines - orchestration only):
     @app.route('/users', methods=['POST'])
     def create_user():
         # Validate
         is_valid, error = validate_email(data['email'])
         # Check exists
         user = User.get_by_email(data['email'])
         # Create
         User.create(data)
         # Send email
         EmailService.send_welcome_email(data['email'])

  Benefits:
     - Easy to test (mock each service)
     - Reusable validation and models
     - Clear separation of concerns
```

---

### OCP Detection (Core Features)

**Pattern**: Long if/else chains for types

```typescript
// ❌ Red flag: Closed for extension
function exportData(data, format) {
  if (format === 'csv') { /* CSV logic */ }
  else if (format === 'json') { /* JSON logic */ }
  else if (format === 'pdf') { /* PDF logic */ }
  // Adding XML requires modifying this function!
}
```

**Suggestion**:
```typescript
// ✅ Open for extension
const exporters = {
  csv: (data) => { /* CSV */ },
  json: (data) => { /* JSON */ },
  pdf: (data) => { /* PDF */ },
};

function exportData(data, format) {
  const exporter = exporters[format];
  return exporter(data);
}

// Add XML without modifying exportData
exporters.xml = (data) => { /* XML */ };
```

---

### DIP Detection (Services)

**Pattern**: Hard dependencies on libraries

```typescript
// ❌ Red flag: Hard dependency on axios
import axios from 'axios';

class UserService {
  async getUsers() {
    return await axios.get('/api/users'); // Tightly coupled
  }
}
```

**Suggestion**:
```typescript
// ✅ Depend on abstraction
interface HttpClient {
  get<T>(url: string): Promise<T>;
}

class UserService {
  constructor(private http: HttpClient) {} // Injected

  async getUsers() {
    return await this.http.get('/api/users');
  }
}

// Easy to test with mock
const mockHttp: HttpClient = { get: jest.fn() };
const service = new UserService(mockHttp);
```

---

### Validation Output Example

```bash
/app-validate design
```

**Output**:
```
🎨 Design Principles Validation
========================================

📏 File Size Analysis:
  Checked: 42 files
  Target: < 150 lines per file

  🚨 CRITICAL (> 200 lines):
     src/components/UserDashboard.jsx (287 lines)
     backend/api/routes/users.py (214 lines)

  ⚠️  WARNING (150-200 lines):
     src/pages/AdminPanel.jsx (173 lines)
     src/components/DataTable.jsx (156 lines)

  ✅ GOOD (< 150 lines): 38 files

========================================
🎯 Single Responsibility (SRP) Check:
========================================

  ❌ VIOLATIONS FOUND:

  src/components/UserDashboard.jsx:
    • Data fetching mixed with rendering
    • Business logic in component
    • Validation logic inline
    • Multiple responsibilities detected

    Suggested refactoring:
      → hooks/useUsers.js (data fetching)
      → hooks/useUserFilters.js (filtering)
      → utils/validation.js (validation)
      → components/UserDashboard.jsx (rendering only)

  backend/api/routes/users.py::create_user:
    • Database queries in route
    • Validation inline
    • Email service called directly
    • Route > 50 lines

    Suggested refactoring:
      → utils/validation.py
      → models/user.py
      → services/email_service.py
      → routes/users.py (orchestration only)

========================================
🔓 Open/Closed (OCP) Check:
========================================

  ⚠️  SUGGESTIONS:

  src/utils/export.js:
    • Long if/else chain for formats (CSV, JSON, PDF)
    • Adding new format requires modifying function

    Suggestion: Use registry pattern
      const exporters = { csv, json, pdf };
      exporters.xml = xmlExporter; // Add without modifying

========================================
🔄 Dependency Inversion (DIP) Check:
========================================

  ⚠️  SUGGESTIONS:

  src/services/UserService.ts:
    • Hard dependency on axios
    • Difficult to test (complex mocking)

    Suggestion: Use interface + injection
      interface HttpClient { get, post }
      constructor(http: HttpClient) {}
      // Easy to mock for tests

========================================
📊 Summary:
========================================

  SRP Violations:     🚨 4 critical, ⚠️  2 warnings
  OCP Suggestions:    ⚠️  1 recommendation
  DIP Suggestions:    ⚠️  2 recommendations

  Priority Actions:
    1. 🚨 Split UserDashboard.jsx (287 lines → 4 files)
    2. 🚨 Refactor users.py route (214 lines → separate concerns)
    3. ⚠️  Extract AdminPanel components (173 lines)
    4. ⚠️  Implement registry for export formats

  Overall: ⚠️  IMPROVEMENTS RECOMMENDED

========================================
💡 Benefits After Refactoring:
========================================

  ✅ Easier to test (isolated responsibilities)
  ✅ Faster to modify (change one thing)
  ✅ Reusable code (DRY)
  ✅ Better organization (clear structure)
  ✅ Production-ready (can evolve without rewrite)

========================================
📚 Reference:
========================================

  See: .claude/system-docs/DESIGN_PRINCIPLES.md
  For: Complete Pragmatic SOLID guide
```

---

### Integration with /app-code

**Generated code already follows design principles**:
- ✅ SRP applied by default (separate hooks, utils, components)
- ✅ OCP for evaluated features (extensible patterns)
- ✅ DIP for services (dependency injection)

**Validation catches violations**:
- Manual code additions that violate principles
- Refactoring that breaks SRP
- Growing files that need splitting

---

### Quick Check Script

```bash
# Quick SRP check - find large files
echo "Files > 150 lines (potential SRP violations):"
find src backend -name "*.jsx" -o -name "*.tsx" -o -name "*.py" | \
  xargs wc -l | \
  awk '$1 > 150 {print $1, $2}' | \
  sort -rn

# Count components with multiple responsibilities
echo "\nComponents with potential SRP violations:"
grep -r "useState" src/components | cut -d: -f1 | uniq -c | awk '$1 > 5'

# Find routes > 50 lines
echo "\nRoutes > 50 lines (potential SRP violations):"
find backend/api/routes -name "*.py" | xargs wc -l | awk '$1 > 50'
```

---

### Benefits of Design Principles Validation

| Metric | Before Validation | After Refactoring |
|--------|-------------------|-------------------|
| Avg File Size | 180 lines | 75 lines |
| Test Time | 5 min | 2 min (isolated) |
| Modification Time | 2 hours | 30 min (isolated) |
| Reusable Code | 30% | 70% |
| Tech Debt | High | Low |

---

## Validation Type: All (Comprehensive)

**Command**: `/app-validate` or `/app-validate all`

**Duration**: 3-4 minutes

**Output**:

```
🔍 Running Comprehensive Validation...

========================================
1️⃣ Code Linting
========================================

Frontend (ESLint):
✓ src/components/LoginForm.jsx
✓ src/components/Dashboard.jsx
✓ src/utils/validation.js

Backend (pylint):
✓ backend/api/routes/auth.py (9.2/10)
✓ backend/models/user.py (9.5/10)

✅ Linting passed

========================================
2️⃣ Code Formatting
========================================

Frontend (Prettier):
✓ All 15 files formatted correctly

Backend (Black):
✓ All 12 files formatted correctly

✅ Formatting passed

========================================
3️⃣ Type Checking
========================================

TypeScript:
✓ 0 type errors

Python (mypy):
✓ 0 type errors

✅ Type checking passed

========================================
4️⃣ Security Scan
========================================

Frontend (npm audit):
⚠️  1 moderate vulnerability in lodash
   Fix: npm audit fix

Backend (safety):
✅ No known vulnerabilities

⚠️  Security issues found

========================================
5️⃣ Architecture Review
========================================

Project Structure:    ✅ PASS
Component Size:       ⚠️  1 large component (300+ lines)
Test Coverage:        ✅ PASS (78% frontend, 79% backend)
Configuration:        ⚠️  1 hardcoded secret detected
Dependency Usage:     ⚠️  5 unused dependencies
Error Handling:       ⚠️  3 routes missing error handlers
Code Patterns:        ✅ PASS

⚠️  Architecture improvements recommended

========================================
6️⃣ Dependencies
========================================

Frontend:
✓ 128 packages up to date
⚠️  3 packages outdated

Backend:
✓ 42 packages up to date
⚠️  2 packages outdated

⚠️  Some dependencies need updating

========================================
7️⃣ Design Principles
========================================

📏 File Size Analysis:
  ✅ OK: 22 files < 150 lines
  ⚠️  WARNING: 3 files 150-200 lines
     - src/components/Dashboard.jsx (178 lines)
     - backend/api/routes/users.py (165 lines)
  🚨 CRITICAL: 1 file > 200 lines
     - src/components/UserManagement.jsx (287 lines)

🎯 Single Responsibility (SRP):
  ❌ VIOLATIONS (2 found):

  src/components/UserManagement.jsx:287
    Problems:
      • Data fetching mixed with rendering (lines 15-42)
      • Business logic in component (lines 78-134)
      • Multiple state concerns (8 useState hooks)

    Suggested refactoring:
      → hooks/useUserManagement.js (data + logic)
      → components/UserList.jsx (rendering list)
      → components/UserForm.jsx (rendering form)
      → utils/userValidation.js (validation logic)

  backend/api/routes/users.py:165
    Problems:
      • Validation + database + email in single route
      • Business logic mixed with HTTP handling

    Suggested refactoring:
      → utils/validation.py (validate_user_data)
      → models/user.py (User.create method)
      → services/email_service.py (send_welcome_email)
      → routes/users.py (orchestration only, ~25 lines)

🔓 Open/Closed (OCP):
  ⚠️  SUGGESTIONS (1 found):

  src/utils/export.js:45
    • Long if/else chain for export formats (4 formats)
    Suggestion: Use registry pattern
      const exporters = {
        csv: (data) => { /* ... */ },
        json: (data) => { /* ... */ },
      };

🔄 Dependency Inversion (DIP):
  ⚠️  SUGGESTIONS (2 found):

  src/services/UserService.ts:12
    • Hard dependency on axios
    Suggestion: Use interface + dependency injection
      interface HttpClient { get<T>(url: string): Promise<T>; }
      constructor(private http: HttpClient)

  backend/utils/email.py:8
    • Hard dependency on smtplib
    Suggestion: Create EmailService interface

📊 Design Principles Summary:
  SRP Violations:     🚨 2 critical
  OCP Suggestions:    ⚠️  1 recommendation
  DIP Suggestions:    ⚠️  2 recommendations

⚠️  Design improvements recommended

========================================
📊 Validation Summary
========================================

✅ Passed:  3 checks
⚠️  Warnings: 4 checks
❌ Failed:  0 checks

Overall Status: ⚠️  NEEDS ATTENTION

Action Items:
1. Run `npm audit fix` to fix security vulnerability
2. Move hardcoded secret in backend/config.py to .env
3. Remove 5 unused npm dependencies
4. Add error handling to 3 API routes
5. Update 5 outdated packages
6. Refactor UserManagement.jsx (287 lines) - SRP violation
7. Refactor users.py route - separate validation, DB, email

========================================
⏱️  Total Duration: 3m 22s
```

---

## Quick Validation

**Command**: `/app-validate quick`

**Purpose**: Fast essential checks (lint + format only)

**Duration**: ~1 minute

**Output**:
```
🚀 Running Quick Validation...

Frontend Lint: ✅ PASS
Frontend Format: ✅ PASS
Backend Lint: ✅ PASS (9.0/10)
Backend Format: ✅ PASS

✅ Quick validation passed in 48s
Ready to commit!
```

---

## Auto-fix Mode

**Command**: `/app-validate --fix`

**Purpose**: Automatically fix issues where possible

**What gets auto-fixed**:
- ✅ Code formatting (Prettier, Black)
- ✅ Some lint errors (with `--fix` flag)
- ✅ Security vulnerabilities (safe fixes)
- ❌ Type errors (manual fix required)
- ❌ Architecture issues (manual fix required)

**Example**:
```bash
/app-validate --fix

Auto-fixing issues...

✅ Formatted 3 files with Prettier
✅ Formatted 2 files with Black
✅ Fixed 7 ESLint issues
✅ Fixed 2 security vulnerabilities

⚠️  2 issues require manual fixing:
  - Type error in src/utils/api.ts:42
  - Hardcoded secret in backend/config.py

Run /app-validate to see remaining issues
```

---

## CI/CD Integration

**Pre-commit Hook** (`.git/hooks/pre-commit`):
```bash
#!/bin/bash

echo "Running validation before commit..."
/app-validate quick

if [ $? -ne 0 ]; then
  echo "❌ Validation failed. Commit aborted."
  echo "Fix issues and try again."
  exit 1
fi

echo "✅ Validation passed. Proceeding with commit."
```

**GitHub Actions** (`.github/workflows/validate.yml`):
```yaml
name: Validate

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: 3.10
      - name: Install dependencies
        run: |
          npm install
          pip install -r backend/requirements.txt
      - name: Run validation
        run: /app-validate all
```

---

## Validation Configuration Files

**Package.json Scripts**:
```json
{
  "scripts": {
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --check src/",
    "format:fix": "prettier --write src/",
    "validate": "npm run lint && npm run format && npm test",
    "validate:quick": "npm run lint && npm run format"
  }
}
```

**Makefile** (optional):
```makefile
.PHONY: validate validate-quick lint format security

validate:
	npm run lint
	npm run format
	pytest tests/backend/ --cov=backend
	npm audit
	safety check

validate-quick:
	npm run lint
	npm run format

lint:
	npm run lint
	pylint backend/

format:
	prettier --check src/
	black --check backend/

security:
	npm audit
	safety check
```

---

## Next Steps

1. **Fix critical issues first**: Security vulnerabilities and type errors
2. **Address warnings**: Architecture and dependency issues
3. **Run validation before commits**: Use pre-commit hooks
4. **Integrate with CI/CD**: Automate validation in pipelines
5. **Keep dependencies updated**: Regular `npm update` and `pip upgrade`

---

**Command Complete**: Code validation finished! ✅

**Validate Early, Validate Often, Ship Quality Code!**
