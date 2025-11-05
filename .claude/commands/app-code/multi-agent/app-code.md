# App Code Generation Command (TDD-First)

**Purpose**: Generate web application code using TDD (Test-Driven Development) - write tests FIRST, then implementation

**Command**: `/app-code <task description>`

**Duration**: Instant (code generation)

**Profile**: app-builder

**Philosophy**: Red-Green-Refactor - Write failing tests first, implement code to pass, then refactor

---

## How It Works (TDD Workflow)

1. **Parse task** - Understand what needs to be built
2. **RED Phase** - Generate failing tests FIRST (test files created before code)
3. **GREEN Phase** - Generate minimal code to make tests pass
4. **Save files** - Tests in `tests/`, code in `src/` or `backend/`
5. **Report status** - Show test status and file locations

---

## Agent Selection (Web Development)

The system automatically selects the right agent based on your task:

| Task Keywords | Agent Selected | Output Location |
|---------------|----------------|-----------------|
| "React", "Vue", "component", "form", "button", "navbar", "UI", "frontend" | **@app-frontend-developer** 🔵 | `src/components/` + `tests/components/` |
| "API", "endpoint", "Flask", "Express", "route", "REST", "backend" | **@app-backend-developer** 🟢 | `backend/api/` + `tests/api/` |
| "database", "model", "schema", "SQLAlchemy", "Mongoose", "table" | **@app-backend-developer** 🟢 | `backend/models/` + `tests/models/` |
| "full-stack", "authentication", "registration", "CRUD", "end-to-end", "login" | **@app-full-stack** 🟣 | Frontend + Backend + Tests |
| "test", "unit test", "integration", "e2e", "Playwright", "coverage" | **@app-tester** 🔴 | `tests/` |
| "API docs", "README", "specification", "documentation" | **@app-spec-writer** 🟣 | `docs/` |

---

## Usage Examples

### Example 1: Frontend Component (React + TDD)

```bash
/app-code "Create login form component with email and password validation using React and Tailwind"
```

**Agent**: @app-frontend-developer 🔵

**TDD Workflow**:

**Step 1: RED - Tests Generated FIRST**
```
✅ tests/components/LoginForm.test.jsx
   - Renders email and password inputs
   - Validates email format
   - Calls onSubmit with form data
   - Shows error messages

Status: ❌ FAIL (expected - no implementation yet)
```

**Step 2: GREEN - Implementation Generated SECOND**
```
✅ src/components/LoginForm.jsx
   - Form with email/password inputs
   - Email validation logic
   - Submit handler
   - Error display
   - Tailwind styling

Status: ✅ PASS (all tests passing!)
```

**Output Location**:
- `tests/components/LoginForm.test.jsx`
- `src/components/LoginForm.jsx`

---

### Example 2: Backend API (Flask + TDD)

```bash
/app-code "Create Flask API endpoint for user registration with email validation and password hashing"
```

**Agent**: @app-backend-developer 🟢

**TDD Workflow**:

**Step 1: RED - Tests Generated FIRST**
```
✅ tests/api/test_auth.py
   - test_register_valid_user()
   - test_register_duplicate_email()
   - test_register_invalid_email()
   - test_password_is_hashed()

Status: ❌ FAIL (expected - no implementation yet)
```

**Step 2: GREEN - Implementation Generated SECOND**
```
✅ backend/api/routes/auth.py
   - POST /api/auth/register endpoint
   - Email validation
   - Duplicate checking
   - Password hashing

✅ backend/models/user.py
   - User model with SQLAlchemy
   - set_password() method
   - check_password() method

Status: ✅ PASS (all tests passing!)
```

**Output Location**:
- `tests/api/test_auth.py`
- `backend/api/routes/auth.py`
- `backend/models/user.py`

---

### Example 3: Full-Stack Feature (Authentication)

```bash
/app-code "Build complete user authentication with login form, JWT tokens, and protected routes"
```

**Agent**: @app-full-stack 🟣

**TDD Workflow - Multi-Layer**:

**Frontend Tests (RED)**:
```
✅ tests/components/LoginForm.test.jsx
✅ tests/services/auth.test.js
```

**Backend Tests (RED)**:
```
✅ tests/api/test_auth.py
✅ tests/models/test_user.py
```

**E2E Tests (RED)**:
```
✅ tests/e2e/auth.spec.js
```

**Implementations (GREEN)**:
```
✅ src/components/LoginForm.jsx
✅ src/services/auth.js
✅ backend/api/routes/auth.py
✅ backend/models/user.py
✅ backend/middleware/jwt_auth.py
```

**Output Location**: Frontend + Backend + Tests (complete feature)

---

### Example 4: Vue Component

```bash
/app-code "Create responsive navigation bar component with mobile menu using Vue 3 and Tailwind"
```

**Agent**: @app-frontend-developer 🔵

**Output**:
- `tests/components/Navbar.spec.js` (Jest/Vitest tests)
- `src/components/Navbar.vue` (Vue 3 component)
- Responsive design with mobile menu
- Tailwind CSS styling

---

### Example 5: Express API

```bash
/app-code "Create Express API for blog posts with CRUD operations"
```

**Agent**: @app-backend-developer 🟢

**Output**:
- `tests/api/test_posts.js` (Jest tests)
- `backend/api/routes/posts.js` (Express routes)
- `backend/models/post.js` (Mongoose model)
- GET, POST, PUT, DELETE endpoints

---

### Example 6: Database Model

```bash
/app-code "Create SQLAlchemy model for products with categories relationship"
```

**Agent**: @app-backend-developer 🟢

**Output**:
- `tests/models/test_product.py` (Model tests)
- `backend/models/product.py` (SQLAlchemy model)
- One-to-many relationship with categories
- Timestamps and validation

---

### Example 7: E2E Test

```bash
/app-code "Create Playwright E2E test for complete checkout flow"
```

**Agent**: @app-tester 🔴

**Output**:
- `tests/e2e/checkout.spec.js` (Playwright test)
- Tests: Add to cart → Login → Checkout → Payment
- Cross-browser testing setup

---

### Example 8: API Documentation

```bash
/app-code "Generate API documentation for all authentication endpoints"
```

**Agent**: @app-spec-writer 🟣

**Output**:
- `docs/API.md` (OpenAPI/Swagger style docs)
- Endpoint descriptions
- Request/response examples
- Error codes

---

## Command Workflow

```
User: /app-code "Create shopping cart component"
  ↓
System: Parse task → Identify "component", "shopping cart"
  ↓
System: Select agent: @app-frontend-developer
  ↓
Agent: RED Phase - Generate tests FIRST
  ↓
Agent: GREEN Phase - Generate implementation
  ↓
System: Save files
  ✅ tests/components/ShoppingCart.test.jsx
  ✅ src/components/ShoppingCart.jsx
  ↓
Output:
  ✅ Generated React component with TDD
  ✅ Tests: 8 tests (all passing)
  ✅ Coverage: 92%
  🔵 Agent: @app-frontend-developer
```

---

## TDD Best Practices (Built-in)

### Red-Green-Refactor Cycle
1. **RED**: Write failing test → See it fail → Confirms test works
2. **GREEN**: Write minimal code → Make test pass → Don't over-engineer
3. **REFACTOR**: Improve code → Keep tests passing → Better design

### Test Quality
- **Meaningful names**: `test_user_registration_with_valid_email()`
- **One concept per test**: Test one thing at a time
- **Arrange-Act-Assert**: Clear test structure
- **Mock dependencies**: Database, API calls, external services

### Coverage Target
- **60-70% for MVPs**: Pragmatic coverage
- **Focus on critical paths**: Auth, payments, data validation
- **Not obsessive 100%**: Don't test trivial getters/setters

---

## Output Organization

Generated code is saved to appropriate locations:

### Frontend Files
- **Components**: `src/components/*.jsx` or `*.vue`
- **Component Tests**: `tests/components/*.test.jsx` or `*.spec.js`
- **Services**: `src/services/*.js`
- **Utilities**: `src/utils/*.js`
- **Styles**: `src/styles/*.css` or inline Tailwind

### Backend Files
- **API Routes**: `backend/api/routes/*.py` or `*.js`
- **API Tests**: `tests/api/test_*.py` or `*.test.js`
- **Models**: `backend/models/*.py` or `*.js`
- **Model Tests**: `tests/models/test_*.py`
- **Middleware**: `backend/middleware/*.py` or `*.js`

### E2E Tests
- **Playwright**: `tests/e2e/*.spec.js`
- **Cypress**: `cypress/e2e/*.cy.js`

### Documentation
- **API Docs**: `docs/API.md`
- **README**: `README.md`
- **Architecture**: `docs/ARCHITECTURE.md`

---

## Best Practices

### 1. **Be Specific**
✅ **Good**: "Create login form with email validation and password visibility toggle using React and Tailwind"
❌ **Vague**: "Make a login form"

### 2. **Specify Stack**
✅ **Good**: "Build Flask API endpoint with SQLAlchemy"
❌ **Vague**: "Create API"

### 3. **Mention Features**
✅ **Good**: "Responsive navbar with mobile hamburger menu and dropdown"
❌ **Vague**: "Navigation bar"

### 4. **State Testing Needs**
✅ **Good**: "User registration with E2E test covering full flow"
✅ **Good**: "Cart component with unit tests for add/remove items"

---

## Command Variations

### Generate Tests Only (RED Phase)
```bash
/app-code "shopping cart component - tests only"
# Generates only test files (RED phase)
```

### Generate Implementation (GREEN Phase)
```bash
/app-code "implement shopping cart to pass existing tests"
# Generates implementation for existing tests
```

### Generate Complete Feature (Recommended)
```bash
/app-code "shopping cart with add/remove items and checkout"
# Generates tests FIRST, then implementation (full TDD)
```

### Add E2E Tests
```bash
/app-code "e2e test for complete checkout flow"
# Generates Playwright E2E test
```

---

## Tips

### Start Simple, Iterate
```bash
# Step 1: Basic component
/app-code "simple login form"

# Step 2: Add validation
/app-code "add email and password validation to login form"

# Step 3: Add styling
/app-code "improve login form styling with Tailwind"
```

### Layer by Layer
```bash
# Step 1: Backend first
/app-code "user authentication API with JWT"

# Step 2: Frontend next
/app-code "login form that connects to auth API"

# Step 3: E2E last
/app-code "e2e test for complete login flow"
```

### Test-Driven
```bash
# Step 1: Write tests (RED)
/app-code "tests for user profile component"

# Step 2: Implement (GREEN)
/app-code "implement user profile component to pass tests"
```

---

## Design Principles (Pragmatic SOLID)

### Overview

All code generated by `/app-code` follows **Pragmatic SOLID principles** for maintainable, testable code.

**Reference**: See [DESIGN_PRINCIPLES.md](../../system-docs/DESIGN_PRINCIPLES.md) for complete guide.

---

### 🟢 Always Applied: Single Responsibility Principle (SRP)

**Rule**: Every component, function, hook does **ONE thing**.

**How `/app-code` applies SRP**:

#### React Components
```typescript
// ❌ BAD: God component (not generated by /app-code)
const UserDashboard = () => {
  // Data fetching + validation + filtering + rendering all mixed
};

// ✅ GOOD: Separated responsibilities (generated by /app-code)
// hooks/useUsers.js - Data fetching only
export const useUsers = () => { /* fetch logic */ };

// utils/validation.js - Validation only
export const validateEmail = (email) => { /* validation */ };

// components/UserDashboard.jsx - Rendering only
const UserDashboard = () => {
  const { users, loading, error } = useUsers();
  return <UserList users={users} />;
};
```

#### Flask/Express Routes
```python
# ❌ BAD: Fat route (not generated by /app-code)
@app.route('/users', methods=['POST'])
def create_user():
    # Validation + database + email + business logic all mixed

# ✅ GOOD: Separated responsibilities (generated by /app-code)
# utils/validation.py - Validation only
def validate_email(email): ...

# models/user.py - Database only
class User:
    def create(self, name, email): ...

# services/email_service.py - Email only
class EmailService:
    def send_welcome_email(self, email): ...

# routes/users.py - Orchestration only
@app.route('/users', methods=['POST'])
def create_user():
    # Just calls validation, model, service
```

**Benefits**:
- ✅ Each piece testable independently
- ✅ Reusable across app
- ✅ Easy to modify
- ✅ Perfect for TDD

---

### 🟡 Applied to Core Features: Open/Closed Principle (OCP)

**Rule**: Extend without modifying existing code.

**When `/app-code` applies OCP**:
- Features evaluated with `/app-evaluate-planned-multiversion`
- Export systems (multiple formats)
- Payment processors (multiple providers)
- Authentication strategies (multiple methods)

**Example**:
```typescript
// Extensible export system
export const exporters = {
  csv: (data) => { /* CSV logic */ },
  json: (data) => { /* JSON logic */ },
  pdf: (data) => { /* PDF logic */ },
};

// Add XML without modifying core
exporters.xml = (data) => { /* XML logic */ };
```

---

### 🟡 Applied to Services: Dependency Inversion Principle (DIP)

**Rule**: Depend on abstractions, inject dependencies.

**When `/app-code` applies DIP**:
- API clients
- Database connections
- External services (Stripe, SendGrid)

**Example**:
```typescript
// Interface (abstraction)
interface HttpClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
}

// Service depends on abstraction
class UserService {
  constructor(private http: HttpClient) {} // Injected

  async getUsers() {
    return this.http.get('/api/users');
  }
}

// Easy to test with mock
const mockHttp: HttpClient = { get: jest.fn(), post: jest.fn() };
const service = new UserService(mockHttp);
```

**Benefits**:
- ✅ Easy to test (inject mocks)
- ✅ Swappable implementations
- ✅ Essential for TDD

---

### Generated Code Structure

#### Frontend Component
```
src/
├── components/
│   └── UserDashboard.jsx       # Rendering only (SRP)
├── hooks/
│   ├── useUsers.js             # Data fetching (SRP)
│   └── useUserFilters.js       # Filtering logic (SRP)
└── utils/
    ├── validation.js           # Validation (SRP)
    └── userStats.js            # Calculations (SRP)

tests/
├── components/
│   └── UserDashboard.test.jsx  # Component tests
├── hooks/
│   ├── useUsers.test.js        # Hook tests
│   └── useUserFilters.test.js  # Hook tests
└── utils/
    ├── validation.test.js      # Utility tests
    └── userStats.test.js       # Utility tests
```

#### Backend Route
```
backend/
├── api/
│   └── routes/
│       └── users.py            # Orchestration only (SRP)
├── models/
│   └── user.py                 # Database only (SRP)
├── services/
│   └── email_service.py        # Email only (SRP)
└── utils/
    └── validation.py           # Validation only (SRP)

tests/
└── backend/
    ├── routes/
    │   └── test_users.py       # Route tests
    ├── models/
    │   └── test_user.py        # Model tests
    └── services/
        └── test_email.py       # Service tests
```

---

### Code Generation Examples

#### Example 1: React Component with SRP

**Input**:
```bash
/app-code "Create user registration form with email validation"
```

**Generated Files** (SRP-compliant):
```typescript
// 1. hooks/useRegistration.js - Data fetching responsibility
export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      setLoading(false);
      return await response.json();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { register, loading, error };
};

// 2. utils/validation.js - Validation responsibility
export const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

// 3. components/RegistrationForm.jsx - Rendering responsibility
import { useRegistration } from '../hooks/useRegistration';
import { validateEmail, validatePassword } from '../utils/validation';

const RegistrationForm = () => {
  const { register, loading, error } = useRegistration();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return;
    if (!validatePassword(password)) return;
    register({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={loading}>Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};
```

**Tests Generated FIRST** (TDD + SRP):
```typescript
// tests/hooks/useRegistration.test.js
test('useRegistration calls API and returns data', async () => { ... });

// tests/utils/validation.test.js
test('validateEmail returns true for valid emails', () => { ... });
test('validatePassword requires 8 characters', () => { ... });

// tests/components/RegistrationForm.test.jsx
test('RegistrationForm renders form fields', () => { ... });
test('RegistrationForm validates email before submit', () => { ... });
```

---

#### Example 2: Flask Route with SRP

**Input**:
```bash
/app-code "Create Flask API for user registration with validation and email notification"
```

**Generated Files** (SRP-compliant):
```python
# 1. utils/validation.py - Validation responsibility
def validate_email(email):
    """Validate email format."""
    import re
    if not email:
        return False, "Email required"
    if not re.match(r'\S+@\S+\.\S+', email):
        return False, "Invalid email"
    return True, None

def validate_password(password):
    """Validate password strength."""
    if not password or len(password) < 8:
        return False, "Password must be 8+ characters"
    return True, None

# 2. models/user.py - Database responsibility
class User:
    def __init__(self, db_connection):
        self.db = db_connection

    def create(self, email, password_hash):
        """Create new user."""
        query = 'INSERT INTO users (email, password) VALUES (?, ?)'
        self.db.execute(query, (email, password_hash))
        self.db.commit()

    def get_by_email(self, email):
        """Get user by email."""
        query = 'SELECT * FROM users WHERE email = ?'
        return self.db.execute(query, (email,)).fetchone()

# 3. services/email_service.py - Email responsibility
class EmailService:
    def send_welcome_email(self, email):
        """Send welcome email."""
        # Email sending logic
        pass

# 4. api/routes/users.py - Orchestration only
from flask import Blueprint, request, jsonify
from utils.validation import validate_email, validate_password
from models.user import User
from services.email_service import EmailService
import bcrypt

users_bp = Blueprint('users', __name__)
user_model = User(db)
email_service = EmailService()

@users_bp.route('/api/register', methods=['POST'])
def register():
    """Register new user (orchestration only)."""
    data = request.json

    # Validate
    is_valid, error = validate_email(data.get('email'))
    if not is_valid:
        return jsonify({'error': error}), 400

    is_valid, error = validate_password(data.get('password'))
    if not is_valid:
        return jsonify({'error': error}), 400

    # Check if exists
    if user_model.get_by_email(data['email']):
        return jsonify({'error': 'User exists'}), 409

    # Create user
    password_hash = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt())
    user_model.create(data['email'], password_hash)

    # Send email
    email_service.send_welcome_email(data['email'])

    return jsonify({'message': 'User registered'}), 201
```

**Tests Generated FIRST** (TDD + SRP):
```python
# tests/utils/test_validation.py
def test_validate_email_valid(): ...
def test_validate_email_invalid(): ...

# tests/models/test_user.py
def test_user_create(): ...
def test_user_get_by_email(): ...

# tests/services/test_email_service.py
def test_send_welcome_email(): ...

# tests/api/test_users.py
def test_register_success(): ...
def test_register_duplicate(): ...
```

---

### Design Principles Validation

**After code generation, `/app-validate` checks**:

```bash
/app-validate

Design Principles Check:
  ✅ SRP: Components follow single responsibility
  ✅ File sizes: Average 65 lines (target < 100)
  ✅ Separation: Hooks, utils, components properly separated
  ⚠️  src/components/Dashboard.jsx (187 lines)
      Suggestion: Split into DashboardHeader, DashboardStats, DashboardContent
```

---

### Quick Reference

| Principle | When Applied | Example |
|-----------|--------------|---------|
| **SRP** | Always | Separate hooks, utils, components, routes, models |
| **OCP** | Core features | Extensible export/payment/auth systems |
| **DIP** | Services | Inject API clients, database connections |
| **LSP** | Rarely | Skip for prototypes |
| **ISP** | Rarely | Skip for prototypes |

---

### Benefits

**With Design Principles**:
- ✅ Easier to test (isolated responsibilities)
- ✅ Faster to modify (change one thing)
- ✅ Reusable code (DRY)
- ✅ Better organization (clear structure)
- ✅ Production-ready (can evolve without rewrite)

**Without Design Principles**:
- ❌ God components (200+ lines)
- ❌ Hard to test (everything coupled)
- ❌ Slow to modify (change breaks multiple things)
- ❌ Tech debt accumulates

---

## Next Steps After Code Generation

### 1. Review Generated Code
- ✅ Check tests are comprehensive
- ✅ Verify implementation passes all tests
- ✅ Review TDD approach (RED → GREEN)
- ✅ **Verify design principles applied (SRP, OCP, DIP)**

### 2. Run Tests
```bash
/app-test
# Verify all tests pass
```

### 3. Refactor (REFACTOR Phase)
- Improve code quality while keeping tests green
- Extract reusable logic
- Add error handling
- **Ensure SRP maintained during refactoring**

### 4. Validate Quality
```bash
/app-validate
# Check ESLint, pylint, architecture, security
# ✅ Includes design principles validation
```

### 5. Iterate
- Add more features with `/app-code`
- Each feature starts with tests (TDD)
- **Each feature follows design principles**

---

## Success Criteria

After `/app-code`, you should have:
- ✅ **Tests written FIRST** (RED phase complete)
- ✅ **Implementation passes tests** (GREEN phase complete)
- ✅ **Organized file structure** (tests/ and src/ folders)
- ✅ **Ready to run** (can execute `/app-test` immediately)
- ✅ **Production quality** (60-70% coverage target)

---

## Tech Stack Support

### Frontend
- **React**: JSX components, hooks, Context API
- **Vue 3**: Composition API, reactive data, SFC
- **TypeScript**: Static typing (when requested)
- **Styling**: Tailwind CSS, CSS Modules, styled-components

### Backend
- **Python**: Flask, FastAPI, Django
- **Node.js**: Express, NestJS
- **Database**: SQLAlchemy, Mongoose, Prisma

### Testing
- **Frontend**: Jest, React Testing Library, Vitest
- **Backend**: pytest, Jest (Node)
- **E2E**: Playwright, Cypress

---

**Remember**: TDD ensures your web app prototype is production-ready from day 1! 🚀

**Test First, Code Second, Ship with Confidence!**
