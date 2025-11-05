# App Testing Command (Multi-Layer)

**Purpose**: Run comprehensive multi-layer tests (Frontend + Backend + E2E) for web applications

**Command**: `/app-test [test-type] [options]`

**Duration**: 1-5 minutes (depending on test suite size)

**Profile**: app-builder

**Philosophy**: Test all layers - Unit tests for logic, Integration tests for APIs, E2E tests for user flows

---

## Test Types

| Test Type | What It Tests | Framework | Duration |
|-----------|---------------|-----------|----------|
| `unit` | Components, functions, logic | Jest/Vitest | ~30 seconds |
| `integration` | API endpoints, database operations | pytest/Jest + Supertest | ~1 minute |
| `e2e` | User workflows, full stack | Playwright | ~2-3 minutes |
| `all` | All layers (unit + integration + e2e) | All frameworks | ~3-5 minutes |
| `coverage` | All tests + coverage report | All frameworks | ~3-5 minutes |

---

## Usage

```bash
# Run all tests (default)
/app-test

# Run specific layer
/app-test unit
/app-test integration
/app-test e2e

# Run with coverage report
/app-test coverage

# Run in watch mode (TDD)
/app-test watch
```

---

## Test Type 1: Unit Tests

**Command**: `/app-test unit`

**What It Tests**:
- Frontend: Components, hooks, utilities
- Backend: Functions, models, utilities
- Focus: Isolated logic without external dependencies

### Frontend Unit Tests (React/Vue)

**Framework**: Vitest + React Testing Library

**Example Test**: `tests/components/LoginForm.test.jsx`

```javascript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../../src/components/LoginForm';

describe('LoginForm Component', () => {
  it('renders email and password inputs', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('validates email format', async () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText('Email');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    expect(await screen.findByText('Invalid email format')).toBeInTheDocument();
  });

  it('calls onSubmit with form data', () => {
    const mockSubmit = vi.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
});
```

**Run Command**:
```bash
npm test
# or
npm run test:watch  # Watch mode for TDD
```

**Expected Output**:
```
✓ tests/components/LoginForm.test.jsx (3)
  ✓ renders email and password inputs
  ✓ validates email format
  ✓ calls onSubmit with form data

Test Files  1 passed (1)
     Tests  3 passed (3)
  Start at  10:30:15
  Duration  1.23s
```

---

### Backend Unit Tests (Flask/Express)

**Framework**: pytest (Flask) or Jest (Express)

**Example Test (Flask)**: `tests/backend/unit/test_auth.py`

```python
import pytest
from backend.models.user import User
from backend.utils.validation import validate_email

def test_user_password_hashing():
    """Test password is hashed correctly"""
    user = User(email="test@example.com")
    user.set_password("my_password")

    assert user.password_hash is not None
    assert user.password_hash != "my_password"
    assert user.check_password("my_password") is True
    assert user.check_password("wrong_password") is False

def test_email_validation():
    """Test email validation utility"""
    assert validate_email("test@example.com") is True
    assert validate_email("invalid-email") is False
    assert validate_email("@example.com") is False
    assert validate_email("test@") is False

def test_user_model_creation():
    """Test user model instantiation"""
    user = User(email="user@test.com", username="testuser")
    assert user.email == "user@test.com"
    assert user.username == "testuser"
    assert user.id is None  # Not saved yet
```

**Run Command**:
```bash
pytest tests/backend/unit/ -v
```

**Expected Output**:
```
tests/backend/unit/test_auth.py::test_user_password_hashing PASSED  [ 33%]
tests/backend/unit/test_auth.py::test_email_validation PASSED       [ 66%]
tests/backend/unit/test_auth.py::test_user_model_creation PASSED    [100%]

====================== 3 passed in 0.42s =======================
```

---

## Test Type 2: Integration Tests

**Command**: `/app-test integration`

**What It Tests**:
- API endpoints (requests/responses)
- Database operations (CRUD)
- Authentication flows
- External service mocks

### Backend Integration Tests (Flask)

**Example Test**: `tests/backend/integration/test_api_auth.py`

```python
import pytest
import json

def test_register_endpoint(client):
    """Test user registration endpoint"""
    response = client.post('/api/auth/register', json={
        'email': 'newuser@example.com',
        'password': 'SecurePass123!',
        'username': 'newuser'
    })

    assert response.status_code == 201
    data = response.get_json()
    assert data['message'] == 'User created successfully'
    assert 'user_id' in data

def test_register_duplicate_email(client):
    """Test registration with duplicate email fails"""
    # First registration
    client.post('/api/auth/register', json={
        'email': 'duplicate@example.com',
        'password': 'password',
        'username': 'user1'
    })

    # Second registration with same email
    response = client.post('/api/auth/register', json={
        'email': 'duplicate@example.com',
        'password': 'password',
        'username': 'user2'
    })

    assert response.status_code == 400
    data = response.get_json()
    assert 'Email already exists' in data['error']

def test_login_endpoint(client):
    """Test login endpoint with valid credentials"""
    # Register user first
    client.post('/api/auth/register', json={
        'email': 'login@example.com',
        'password': 'password',
        'username': 'loginuser'
    })

    # Login
    response = client.post('/api/auth/login', json={
        'email': 'login@example.com',
        'password': 'password'
    })

    assert response.status_code == 200
    data = response.get_json()
    assert 'access_token' in data
    assert data['user']['email'] == 'login@example.com'

def test_login_invalid_credentials(client):
    """Test login with wrong password fails"""
    response = client.post('/api/auth/login', json={
        'email': 'test@example.com',
        'password': 'wrongpassword'
    })

    assert response.status_code == 401
    data = response.get_json()
    assert 'Invalid credentials' in data['error']
```

**Run Command**:
```bash
pytest tests/backend/integration/ -v
```

**Expected Output**:
```
tests/backend/integration/test_api_auth.py::test_register_endpoint PASSED         [ 25%]
tests/backend/integration/test_api_auth.py::test_register_duplicate_email PASSED  [ 50%]
tests/backend/integration/test_api_auth.py::test_login_endpoint PASSED            [ 75%]
tests/backend/integration/test_api_auth.py::test_login_invalid_credentials PASSED [100%]

====================== 4 passed in 1.12s =======================
```

---

### Backend Integration Tests (Express)

**Example Test**: `tests/backend/integration/auth.test.js`

```javascript
const request = require('supertest');
const app = require('../../backend/server');

describe('Auth API Integration Tests', () => {
  describe('POST /api/auth/register', () => {
    it('should register new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'newuser@test.com',
          password: 'Password123!',
          username: 'newuser'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'User created successfully');
      expect(res.body).toHaveProperty('user_id');
    });

    it('should fail with duplicate email', async () => {
      // Register first user
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@test.com',
          password: 'password',
          username: 'user1'
        });

      // Try to register with same email
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@test.com',
          password: 'password',
          username: 'user2'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('Email already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create test user
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'login@test.com',
          password: 'Password123!',
          username: 'loginuser'
        });
    });

    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@test.com',
          password: 'Password123!'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('access_token');
      expect(res.body.user.email).toBe('login@test.com');
    });

    it('should fail with invalid password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@test.com',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toContain('Invalid credentials');
    });
  });
});
```

**Run Command**:
```bash
cd backend && npm test
```

---

## Test Type 3: End-to-End Tests

**Command**: `/app-test e2e`

**What It Tests**:
- Complete user workflows
- Frontend + Backend integration
- UI interactions
- Multi-step processes

**Framework**: Playwright

**Example Test**: `tests/e2e/auth.spec.js`

```javascript
const { test, expect } = require('@playwright/test');

test.describe('Authentication Flow', () => {
  test('complete registration and login flow', async ({ page }) => {
    // Navigate to app
    await page.goto('http://localhost:5173');

    // Go to registration page
    await page.click('text=Sign Up');
    await expect(page).toHaveURL(/.*register/);

    // Fill registration form
    await page.fill('input[name="email"]', 'e2e@test.com');
    await page.fill('input[name="username"]', 'e2euser');
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.fill('input[name="confirmPassword"]', 'SecurePass123!');

    // Submit form
    await page.click('button[type="submit"]');

    // Verify success message
    await expect(page.locator('text=Registration successful')).toBeVisible();

    // Redirect to login
    await expect(page).toHaveURL(/.*login/);

    // Login with new credentials
    await page.fill('input[name="email"]', 'e2e@test.com');
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');

    // Verify logged in
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('text=Welcome, e2euser')).toBeVisible();
  });

  test('login with invalid credentials shows error', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.fill('input[name="email"]', 'wrong@test.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Verify error message
    await expect(page.locator('text=Invalid credentials')).toBeVisible();

    // Still on login page
    await expect(page).toHaveURL(/.*login/);
  });

  test('protected route redirects to login when not authenticated', async ({ page }) => {
    // Try to access protected dashboard without login
    await page.goto('http://localhost:5173/dashboard');

    // Should redirect to login
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('text=Please log in')).toBeVisible();
  });
});
```

**Run Command**:
```bash
npm run test:e2e
```

**Expected Output**:
```
Running 3 tests using 1 worker

  ✓ tests/e2e/auth.spec.js:3:3 › complete registration and login flow (2.4s)
  ✓ tests/e2e/auth.spec.js:29:3 › login with invalid credentials shows error (1.2s)
  ✓ tests/e2e/auth.spec.js:43:3 › protected route redirects to login (0.8s)

  3 passed (4.4s)
```

---

## Test Type 4: All Tests

**Command**: `/app-test all` or `/app-test`

**What It Does**: Runs all test layers sequentially

**Execution Order**:
1. Frontend Unit Tests (npm test)
2. Backend Unit Tests (pytest unit/)
3. Backend Integration Tests (pytest integration/)
4. E2E Tests (playwright test)

**Example Output**:

```bash
🧪 Running All Tests...

========================================
1️⃣ Frontend Unit Tests
========================================
✓ tests/components/LoginForm.test.jsx (3 passed)
✓ tests/components/Dashboard.test.jsx (5 passed)
✓ tests/utils/validation.test.js (4 passed)

Test Files  3 passed (3)
     Tests  12 passed (12)
  Duration  1.45s

========================================
2️⃣ Backend Unit Tests
========================================
tests/backend/unit/test_auth.py::test_user_password_hashing PASSED
tests/backend/unit/test_auth.py::test_email_validation PASSED
tests/backend/unit/test_models.py::test_user_creation PASSED

===================== 3 passed in 0.52s =====================

========================================
3️⃣ Backend Integration Tests
========================================
tests/backend/integration/test_api_auth.py::test_register_endpoint PASSED
tests/backend/integration/test_api_auth.py::test_login_endpoint PASSED
tests/backend/integration/test_api_users.py::test_get_user PASSED
tests/backend/integration/test_api_users.py::test_update_user PASSED

===================== 4 passed in 1.23s =====================

========================================
4️⃣ End-to-End Tests
========================================
✓ tests/e2e/auth.spec.js:3 › complete registration and login flow (2.4s)
✓ tests/e2e/auth.spec.js:29 › login with invalid credentials (1.2s)
✓ tests/e2e/dashboard.spec.js:5 › user can view dashboard (1.8s)

  3 passed (5.4s)

========================================
✅ Test Summary
========================================
Frontend Unit:     12 passed
Backend Unit:       3 passed
Integration:        4 passed
E2E:                3 passed
----------------------------------------
Total:             22 passed

⏱️  Total Duration: 8.64s
✅ ALL TESTS PASSED
```

---

## Test Type 5: Coverage Report

**Command**: `/app-test coverage`

**What It Does**: Runs all tests + generates coverage reports

**Frontend Coverage**:
```bash
npm run test:coverage
```

**Output**:
```
Test Files  5 passed (5)
     Tests  23 passed (23)
  Duration  2.34s

 % Coverage report from v8
--------------------------|---------|----------|---------|---------|
File                      | % Stmts | % Branch | % Funcs | % Lines |
--------------------------|---------|----------|---------|---------|
src/components/
  LoginForm.jsx           |   95.45 |    87.50 |  100.00 |   95.45 |
  Dashboard.jsx           |   78.26 |    70.00 |   85.71 |   78.26 |
  Navbar.jsx              |   82.35 |    75.00 |   90.00 |   82.35 |
src/utils/
  validation.js           |   91.67 |    85.71 |  100.00 |   91.67 |
  api.js                  |   65.22 |    50.00 |   75.00 |   65.22 |
--------------------------|---------|----------|---------|---------|
All files                 |   78.42 |    72.14 |   87.50 |   78.42 |
--------------------------|---------|----------|---------|---------|

Coverage report: coverage/index.html
```

**Backend Coverage (Flask)**:
```bash
pytest tests/backend/ --cov=backend --cov-report=html --cov-report=term
```

**Output**:
```
---------- coverage: platform darwin, python 3.11 -----------
Name                          Stmts   Miss  Cover
-------------------------------------------------
backend/api/routes/auth.py       45      8    82%
backend/api/routes/users.py      38     12    68%
backend/models/user.py           28      3    89%
backend/utils/validation.py      15      1    93%
backend/utils/db.py              22      7    68%
-------------------------------------------------
TOTAL                           148     31    79%

Coverage HTML written to htmlcov/index.html
```

**Combined Summary**:
```
========================================
📊 Coverage Summary
========================================
Frontend:  78% (target: 60-70%) ✅
Backend:   79% (target: 60-70%) ✅

📁 Reports:
  Frontend: coverage/index.html
  Backend:  htmlcov/index.html

✅ Coverage targets met!
```

---

## Test Type 6: Watch Mode (TDD)

**Command**: `/app-test watch`

**What It Does**: Runs tests in watch mode for TDD workflow

**Frontend Watch**:
```bash
npm run test:watch
```

**Behavior**:
- Watches file changes
- Re-runs tests automatically
- Shows only affected tests
- Fast feedback loop

**Output**:
```
 WATCH  Waiting for file changes...
        Press h to show help, q to quit

 ✓ tests/components/LoginForm.test.jsx (3)

Test Files  1 passed (1)
     Tests  3 passed (3)
  Duration  0.89s (in thread 0ms, 0.00x)

 WATCHING  src/components/LoginForm.jsx

 [File changed...]

 RERUN  tests/components/LoginForm.test.jsx

 ✓ tests/components/LoginForm.test.jsx (4)  [+1 new test]

Test Files  1 passed (1)
     Tests  4 passed (4)
  Duration  0.92s
```

---

## Test Organization

**Recommended Structure**:

```
tests/
├── components/               # Frontend unit tests
│   ├── LoginForm.test.jsx
│   ├── Dashboard.test.jsx
│   └── Navbar.test.jsx
├── utils/                    # Frontend utility tests
│   ├── validation.test.js
│   └── api.test.js
├── integration/              # Frontend integration tests
│   └── authFlow.test.js
├── e2e/                      # End-to-end tests
│   ├── auth.spec.js
│   ├── dashboard.spec.js
│   └── userProfile.spec.js
├── backend/                  # Backend tests
│   ├── unit/                 # Backend unit tests
│   │   ├── test_auth.py
│   │   └── test_models.py
│   └── integration/          # Backend integration tests
│       ├── test_api_auth.py
│       └── test_api_users.py
├── setup.js                  # Frontend test setup
└── conftest.py               # Backend test setup
```

---

## Coverage Goals

| Test Layer | Target Coverage | Priority |
|------------|----------------|----------|
| **Unit Tests** | 70-80% | High - Test logic thoroughly |
| **Integration Tests** | 60-70% | High - Cover all API endpoints |
| **E2E Tests** | 40-50% | Medium - Cover critical flows |
| **Overall** | 60-70% | Pragmatic for MVPs |

**Focus Areas**:
- ✅ Authentication flows (login, register, logout)
- ✅ CRUD operations (create, read, update, delete)
- ✅ Form validations
- ✅ Error handling
- ✅ API responses

**Lower Priority**:
- ⚠️ UI styling details
- ⚠️ Trivial getters/setters
- ⚠️ Third-party library wrappers

---

## Test Commands Reference

| Command | Frontend | Backend | E2E | Coverage |
|---------|----------|---------|-----|----------|
| `/app-test` | ✅ | ✅ | ✅ | ❌ |
| `/app-test unit` | ✅ | ✅ | ❌ | ❌ |
| `/app-test integration` | ❌ | ✅ | ❌ | ❌ |
| `/app-test e2e` | ❌ | ❌ | ✅ | ❌ |
| `/app-test coverage` | ✅ | ✅ | ✅ | ✅ |
| `/app-test watch` | ✅ | ❌ | ❌ | ❌ |

**Direct Commands**:
```bash
# Frontend
npm test                    # Run once
npm run test:watch          # Watch mode
npm run test:coverage       # With coverage

# Backend (Flask)
pytest tests/backend/unit/              # Unit tests
pytest tests/backend/integration/       # Integration tests
pytest tests/backend/ --cov=backend     # All with coverage

# Backend (Express)
cd backend && npm test                  # All tests
cd backend && npm run test:watch        # Watch mode
cd backend && npm run test:coverage     # With coverage

# E2E
npm run test:e2e            # All E2E tests
npm run test:e2e -- --ui    # With UI mode
npm run test:e2e -- --debug # Debug mode
```

---

## Troubleshooting

### Tests fail to run

**Frontend**:
```bash
# Verify Vitest is installed
npm list vitest

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Backend**:
```bash
# Activate virtual environment
source venv/bin/activate

# Verify pytest is installed
pip show pytest

# Reinstall
pip install -r backend/requirements.txt
```

### E2E tests fail

```bash
# Ensure servers are running
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd backend && python app.py  # or npm run dev

# Terminal 3: E2E tests
npm run test:e2e
```

### Import errors

**Frontend**:
```javascript
// Update vitest.config.js
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**Backend**:
```bash
# Add to PYTHONPATH
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
```

### Database conflicts

```python
# Use in-memory database for tests
# tests/backend/conftest.py
@pytest.fixture
def app():
    app = create_app()
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['TESTING'] = True
    return app
```

---

## Next Steps

1. **Run tests frequently**: `/app-test` after every code change
2. **Use watch mode for TDD**: `npm run test:watch` while coding
3. **Check coverage regularly**: `/app-test coverage` before commits
4. **Add E2E tests for critical flows**: New features get E2E tests
5. **Validate before deployment**: `/app-validate` to ensure quality

---

**Command Complete**: Multi-layer testing executed! 🧪

**Test All Layers, Ship with Confidence!**
