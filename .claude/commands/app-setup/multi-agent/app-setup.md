# App Environment Setup Command (TDD-Ready)

**Purpose**: Initialize web application environment with TDD-ready testing frameworks

**Command**: `/app-setup <stack-type>`

**Duration**: 3-5 minutes

**Profile**: app-builder

**Philosophy**: Set up once, test often - Environment ready for immediate TDD development

---

## Supported Stack Types

| Stack Type | Frontend | Backend | Testing | Use Case |
|------------|----------|---------|---------|----------|
| `react-flask` | React + Vite | Flask | Jest + pytest + Playwright | Full-stack Python backend |
| `react-express` | React + Vite | Express | Jest + Playwright | Full-stack Node.js |
| `vue-flask` | Vue 3 + Vite | Flask | Vitest + pytest + Playwright | Full-stack Python backend |
| `vue-express` | Vue 3 + Vite | Express | Vitest + Playwright | Full-stack Node.js |
| `react-only` | React + Vite | None | Jest + Playwright | Frontend-only SPA |
| `vue-only` | Vue 3 + Vite | None | Vitest + Playwright | Frontend-only SPA |
| `express-api` | None | Express | Jest + Supertest | Backend API only |
| `flask-api` | None | Flask | pytest | Backend API only |

**Default**: `react-flask` (most common for prototypes)

---

## Usage

```bash
# Full-stack React + Flask (default)
/app-setup

# Full-stack React + Express
/app-setup react-express

# Frontend-only React
/app-setup react-only

# Backend API only
/app-setup flask-api
```

---

## What This Command Does

**Steps**:
1. **Detect or accept stack type**
2. **Create folder structure** (8 folders)
3. **Setup agent orchestration** (tokens + verification)  ⭐ NEW
4. **Initialize frontend** (if applicable)
5. **Initialize backend** (if applicable)
6. **Install testing frameworks** (TDD-ready)
7. **Configure test runners** (watch mode enabled)
8. **Create TDD sample** (hello-world test + code)
9. **Create .gitignore**
10. **Create development README**
11. **Create agent workflow guide**  ⭐ NEW

**Total Time**: 3-5 minutes (depending on npm/pip speed)

---

## 🎯 Agent Orchestration Setup (CRITICAL)

**Purpose**: Prevent 60% agent failure rate by setting up proper coordination

**What Gets Created**:
- `.agent-tokens/` directory for dependency management
- Workspace verification scripts
- Agent prompt templates
- Workspace identifier files

**Why This Matters**:
- Without orchestration: 60% of agents work in wrong directory
- With orchestration: 95% success rate, zero cascade failures

### Agent Token System

Creates `.agent-tokens/` directory with:

```
.agent-tokens/
├── verify-workspace.sh          # Workspace verification script
├── workspace-id.txt             # Unique workspace identifier
├── workspace-path.txt           # Absolute path to project
└── README.md                    # Token system documentation
```

### Workspace Verification

```bash
# Create verification script
cat > .agent-tokens/verify-workspace.sh << 'EOF'
#!/bin/bash
EXPECTED="$1"
CURRENT=$(pwd)

if [ "$CURRENT" != "$EXPECTED" ]; then
  echo "❌ ERROR: Wrong directory"
  echo "   Current: $CURRENT"
  echo "   Expected: $EXPECTED"
  exit 1
fi

echo "✅ Workspace verified: $CURRENT"
exit 0
EOF

chmod +x .agent-tokens/verify-workspace.sh
```

### Workspace Identifier

```bash
# Generate unique workspace ID
uuidgen > .agent-tokens/workspace-id.txt

# Store absolute workspace path
pwd > .agent-tokens/workspace-path.txt

# Store project name
basename $(pwd) > .agent-tokens/project-name.txt
```

### Complete Orchestration Setup Script

**This script is executed during `/app-setup` to create all orchestration infrastructure**:

```bash
#!/bin/bash

# Get absolute workspace path
WORKSPACE_PATH=$(pwd)
PROJECT_NAME=$(basename "$WORKSPACE_PATH")

echo "🔧 Setting up agent orchestration infrastructure..."

# Step 1: Create .agent-tokens directory
mkdir -p .agent-tokens

# Step 2: Create workspace verification script
cat > .agent-tokens/verify-workspace.sh << 'EOF'
#!/bin/bash
# Workspace Verification Script
# Usage: ./verify-workspace.sh <expected-path>

EXPECTED_WORKSPACE="$1"
CURRENT_DIR=$(pwd)

if [ -z "$EXPECTED_WORKSPACE" ]; then
  echo "❌ ERROR: No expected workspace provided"
  echo "Usage: $0 <expected-path>"
  exit 1
fi

if [ "$CURRENT_DIR" != "$EXPECTED_WORKSPACE" ]; then
  echo "❌ ERROR: Wrong directory"
  echo "   Current:  $CURRENT_DIR"
  echo "   Expected: $EXPECTED_WORKSPACE"
  echo ""
  echo "   Action: cd \"$EXPECTED_WORKSPACE\""
  exit 1
fi

echo "✅ Workspace verified: $CURRENT_DIR"
exit 0
EOF

chmod +x .agent-tokens/verify-workspace.sh

# Step 3: Create workspace identifier files
uuidgen > .agent-tokens/workspace-id.txt
echo "$WORKSPACE_PATH" > .agent-tokens/workspace-path.txt
echo "$PROJECT_NAME" > .agent-tokens/project-name.txt
date -u +%Y-%m-%dT%H:%M:%SZ > .agent-tokens/created-at.txt

# Step 4: Create token system README
cat > .agent-tokens/README.md << 'EOF'
# Agent Token System

**Purpose**: Coordinate agents to prevent cascade failures

**Created by**: `/app-setup` command

---

## How It Works

Agents create completion tokens after successfully finishing their work:

```
.agent-tokens/
├── backend-complete.token      # Created by @app-backend-developer
├── frontend-complete.token     # Created by @app-frontend-developer
├── integration-complete.token  # Created by @app-full-stack
└── docs-complete.token         # Created by @app-spec-writer
```

**Dependency Chain**:
1. backend → 2. frontend → 3. integration → 4. docs

---

## Token Format

```json
{
  "agent": "backend-developer",
  "workspace": "/absolute/path/to/project",
  "status": "complete",
  "timestamp": "2025-10-28T14:22:00Z",
  "files_created": [
    "backend/api/routes/users.py",
    "backend/models/user.py"
  ],
  "next_agent": "frontend-developer"
}
```

---

## For Agents

**Before starting work**:
```bash
# Verify workspace
./verify-workspace.sh /expected/path

# Check prerequisites
if [ ! -f ".agent-tokens/backend-complete.token" ]; then
  echo "ERROR: Prerequisite not met"
  exit 1
fi
```

**After completing work**:
```bash
# Create completion token
cat > .agent-tokens/frontend-complete.token << 'TOKEN'
{
  "agent": "frontend-developer",
  "workspace": "$(pwd)",
  "status": "complete",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "files_created": ["src/components/UserList.jsx"],
  "next_agent": "full-stack-integration"
}
TOKEN
```

---

**Status**: Ready for agent coordination
EOF

# Step 5: Create agent workflow guide
cat > .agent-tokens/AGENT_WORKFLOW.md << EOF
# Agent Workflow Guide

**Project**: $PROJECT_NAME
**Workspace**: $WORKSPACE_PATH
**Created**: $(date -u +%Y-%m-%dT%H:%M:%SZ)

---

## Recommended Agent Workflow

### Phase 1: Backend Development

**Agent**: \`@app-backend-developer\`

**Command**:
\`\`\`
@app-backend-developer

WORKSPACE: $WORKSPACE_PATH

VERIFICATION REQUIRED:
1. Run: pwd
2. Verify output EXACTLY matches: $WORKSPACE_PATH
3. If mismatch: EXIT immediately with error

PREREQUISITES: None (first agent)

TASK: [Your backend task here - models, API routes, utilities]

OUTPUT: Create .agent-tokens/backend-complete.token when done
\`\`\`

**Deliverables**:
- Backend data layer (models, schemas)
- API routes and endpoints
- Utility functions
- Token: \`backend-complete.token\`

---

### Phase 2: Frontend Development

**Agent**: \`@app-frontend-developer\`

**Command**:
\`\`\`
@app-frontend-developer

WORKSPACE: $WORKSPACE_PATH

VERIFICATION REQUIRED:
1. Run: pwd
2. Verify output EXACTLY matches: $WORKSPACE_PATH
3. If mismatch: EXIT immediately with error

PREREQUISITES:
- backend-complete.token MUST exist

TASK: [Your frontend task here - components, forms, pages]

OUTPUT: Create .agent-tokens/frontend-complete.token when done
\`\`\`

**Deliverables**:
- UI components
- Forms and interactions
- Client-side utilities
- Token: \`frontend-complete.token\`

---

### Phase 3: Full-Stack Integration

**Agent**: \`@app-full-stack\`

**Command**:
\`\`\`
@app-full-stack

WORKSPACE: $WORKSPACE_PATH

VERIFICATION REQUIRED:
1. Run: pwd
2. Verify output EXACTLY matches: $WORKSPACE_PATH
3. If mismatch: EXIT immediately with error

PREREQUISITES:
- backend-complete.token MUST exist
- frontend-complete.token MUST exist

TASK: [Your integration task here - connect frontend to backend, wire up features]

OUTPUT: Create .agent-tokens/integration-complete.token when done
\`\`\`

**Deliverables**:
- Frontend ↔ Backend integration
- API calls wired up
- Full features working end-to-end
- Build verification (npm run build succeeds)
- Token: \`integration-complete.token\`

---

### Phase 4: Documentation

**Agent**: \`@app-spec-writer\`

**Command**:
\`\`\`
@app-spec-writer

WORKSPACE: $WORKSPACE_PATH

VERIFICATION REQUIRED:
1. Run: pwd
2. Verify output EXACTLY matches: $WORKSPACE_PATH
3. If mismatch: EXIT immediately with error

PREREQUISITES:
- integration-complete.token MUST exist

TASK: Document the complete application - features, API, setup, usage

OUTPUT: Create .agent-tokens/docs-complete.token when done
\`\`\`

**Deliverables**:
- README.md (updated with features)
- API documentation
- User guide
- Development guide
- Token: \`docs-complete.token\`

---

## Best Practices

### ✅ DO

1. **Always verify workspace first** - Run pwd and compare
2. **Check prerequisites** - Verify required tokens exist
3. **Use absolute paths** - Never use relative paths in prompts
4. **Create tokens after completion** - Mark work as done
5. **Exit immediately on errors** - Don't try to recover

### ❌ DON'T

1. **Don't search for directories** - Use exact workspace path
2. **Don't skip verification** - Always check pwd
3. **Don't proceed without prerequisites** - Wait for tokens
4. **Don't create tokens on failure** - Only create on success
5. **Don't modify other agents' work** - Stay in your lane

---

## Monitoring Progress

**Check which agents have completed**:
\`\`\`bash
ls -la .agent-tokens/*.token
\`\`\`

**Verify token contents**:
\`\`\`bash
cat .agent-tokens/backend-complete.token
\`\`\`

**Check what's next**:
\`\`\`bash
# If you have backend token but not frontend, run frontend agent next
# If you have both backend and frontend, run full-stack integration next
# If you have integration token, run spec-writer next
\`\`\`

---

**Workflow Status**: Ready for agent execution
EOF

# Step 6: Report completion
echo ""
echo "✅ Agent orchestration infrastructure created:"
echo "   📁 .agent-tokens/ directory"
echo "   🔍 verify-workspace.sh (executable)"
echo "   🆔 workspace-id.txt"
echo "   📍 workspace-path.txt"
echo "   📝 README.md (token system docs)"
echo "   📋 AGENT_WORKFLOW.md (workflow guide)"
echo ""
echo "📌 Workspace: $WORKSPACE_PATH"
echo "📛 Project: $PROJECT_NAME"
echo ""
echo "🎯 Next: Follow agent workflow in .agent-tokens/AGENT_WORKFLOW.md"
```

**When This Runs**: Automatically during `/app-setup` after folder structure creation

---

## Step 1: Detect Stack Type

**Auto-detection Logic**:

```bash
# Check if package.json exists
if [ -f "package.json" ]; then
    # Check dependencies for React/Vue
    if grep -q "react" package.json; then
        FRONTEND="react"
    elif grep -q "vue" package.json; then
        FRONTEND="vue"
    fi
fi

# Check if requirements.txt or app.py exists
if [ -f "requirements.txt" ] || [ -f "backend/app.py" ]; then
    BACKEND="flask"
elif [ -f "backend/server.js" ]; then
    BACKEND="express"
fi

# Determine stack
STACK="${FRONTEND}-${BACKEND}"
```

**If not detected**: Prompt user to select from supported stacks

---

## Step 2: Create Folder Structure

**Full-Stack React + Flask Example**:

```bash
mkdir -p \
  src/components \
  src/utils \
  src/assets \
  tests/components \
  tests/integration \
  tests/e2e \
  backend/api/routes \
  backend/models \
  backend/utils \
  tests/backend/unit \
  tests/backend/integration
```

**Expected Structure**:

```
project/
├── src/                      # Frontend source
│   ├── components/           # React/Vue components
│   ├── utils/                # Frontend utilities
│   └── assets/               # Images, styles
├── tests/                    # Frontend tests
│   ├── components/           # Component unit tests
│   ├── integration/          # Integration tests
│   └── e2e/                  # End-to-end tests
├── backend/                  # Backend source
│   ├── api/
│   │   └── routes/           # API routes
│   ├── models/               # Data models
│   └── utils/                # Backend utilities
└── tests/backend/            # Backend tests
    ├── unit/                 # Unit tests
    └── integration/          # Integration tests
```

**Frontend-Only Projects** (no `backend/` folder)
**Backend-Only Projects** (no `src/` or frontend tests)

---

## Step 3: Initialize Frontend (React/Vue)

### React + Vite Setup

**Task**: Initialize React project with Vite

```bash
# Only if not already initialized
if [ ! -f "package.json" ]; then
    npm create vite@latest . -- --template react
fi

# Install dependencies
npm install

# Install testing frameworks
npm install --save-dev \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  vitest \
  jsdom \
  @playwright/test

# Install dev dependencies
npm install --save-dev \
  @vitejs/plugin-react \
  eslint \
  eslint-plugin-react \
  prettier
```

**Configuration**: Create `vitest.config.js`

```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    coverage: {
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '*.config.js',
      ],
    },
  },
});
```

**Test Setup**: Create `tests/setup.js`

```javascript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Cleanup after each test
afterEach(() => {
  cleanup();
});
```

**Scripts**: Update `package.json`

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "lint": "eslint src --ext .js,.jsx"
  }
}
```

---

### Vue 3 + Vite Setup

**Task**: Initialize Vue 3 project with Vite

```bash
# Only if not already initialized
if [ ! -f "package.json" ]; then
    npm create vite@latest . -- --template vue
fi

# Install dependencies
npm install

# Install testing frameworks
npm install --save-dev \
  @vue/test-utils \
  vitest \
  jsdom \
  @playwright/test

# Install dev dependencies
npm install --save-dev \
  @vitejs/plugin-vue \
  eslint \
  eslint-plugin-vue \
  prettier
```

**Configuration**: Create `vitest.config.js`

```javascript
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '*.config.js',
      ],
    },
  },
});
```

**Scripts**: Update `package.json`

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "lint": "eslint src --ext .js,.vue"
  }
}
```

---

## Step 4: Initialize Backend (Flask/Express)

### Flask Setup

**Task**: Initialize Flask backend with testing

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Create requirements.txt
cat > backend/requirements.txt << 'EOF'
# Flask Core
Flask==3.0.0
flask-cors==4.0.0

# Database
Flask-SQLAlchemy==3.1.1
Flask-Migrate==4.0.5

# Authentication (optional)
Flask-JWT-Extended==4.5.3

# Validation
Flask-Marshmallow==0.15.0
marshmallow-sqlalchemy==0.29.0

# Testing
pytest==7.4.3
pytest-cov==4.1.0
pytest-flask==1.3.0

# Development
python-dotenv==1.0.0
EOF

# Install packages
pip install -r backend/requirements.txt
```

**Create Flask App**: `backend/app.py`

```python
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Configuration
    app.config['TESTING'] = False

    # Register blueprints here
    # from api.routes import api_blueprint
    # app.register_blueprint(api_blueprint, url_prefix='/api')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
```

**Test Configuration**: `tests/backend/conftest.py`

```python
import pytest
from backend.app import create_app

@pytest.fixture
def app():
    """Create application for testing"""
    app = create_app()
    app.config['TESTING'] = True
    return app

@pytest.fixture
def client(app):
    """Create test client"""
    return app.test_client()

@pytest.fixture
def runner(app):
    """Create test CLI runner"""
    return app.test_cli_runner()
```

---

### Express Setup

**Task**: Initialize Express backend with testing

```bash
# Initialize backend if needed
cd backend
npm init -y

# Install dependencies
npm install \
  express \
  cors \
  dotenv

# Install dev dependencies
npm install --save-dev \
  jest \
  supertest \
  nodemon \
  @types/express \
  @types/jest

cd ..
```

**Jest Configuration**: Create `backend/jest.config.js`

```javascript
module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'api/**/*.js',
    'models/**/*.js',
    'utils/**/*.js',
    '!**/*.test.js',
  ],
  testMatch: ['**/tests/**/*.test.js'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
};
```

**Create Express App**: `backend/server.js`

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// const apiRoutes = require('./api/routes');
// app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

// Only start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
```

**Scripts**: Update `backend/package.json`

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## Step 5: Install E2E Testing (Playwright)

**Task**: Initialize Playwright for end-to-end testing

```bash
# Install Playwright
npm install --save-dev @playwright/test

# Initialize Playwright (installs browsers)
npx playwright install
```

**Configuration**: Create `playwright.config.js`

```javascript
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173', // Vite default
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Run dev server before tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Step 6: Create TDD Sample (Hello World)

**Purpose**: Demonstrate TDD workflow with a working example

### Frontend Sample (React)

**Test FIRST**: `tests/components/HelloWorld.test.jsx`

```javascript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HelloWorld from '../../src/components/HelloWorld';

describe('HelloWorld Component', () => {
  it('renders greeting message', () => {
    render(<HelloWorld name="Developer" />);
    expect(screen.getByText('Hello, Developer!')).toBeInTheDocument();
  });

  it('uses default name when no name provided', () => {
    render(<HelloWorld />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
});
```

**Implementation SECOND**: `src/components/HelloWorld.jsx`

```javascript
function HelloWorld({ name = 'World' }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
    </div>
  );
}

export default HelloWorld;
```

**Run Tests**:
```bash
npm test
# ✅ PASS tests/components/HelloWorld.test.jsx
```

---

### Backend Sample (Flask)

**Test FIRST**: `tests/backend/unit/test_hello.py`

```python
import pytest

def test_hello_endpoint(client):
    """Test hello endpoint returns greeting"""
    response = client.get('/api/hello')
    assert response.status_code == 200
    data = response.get_json()
    assert data['message'] == 'Hello, World!'

def test_hello_with_name(client):
    """Test hello endpoint with name parameter"""
    response = client.get('/api/hello?name=Developer')
    assert response.status_code == 200
    data = response.get_json()
    assert data['message'] == 'Hello, Developer!'
```

**Implementation SECOND**: `backend/api/routes/hello.py`

```python
from flask import Blueprint, request, jsonify

hello_bp = Blueprint('hello', __name__)

@hello_bp.route('/hello', methods=['GET'])
def hello():
    name = request.args.get('name', 'World')
    return jsonify({'message': f'Hello, {name}!'})
```

**Register Blueprint**: Update `backend/app.py`

```python
def create_app():
    app = Flask(__name__)
    CORS(app)

    # Register blueprints
    from api.routes.hello import hello_bp
    app.register_blueprint(hello_bp, url_prefix='/api')

    return app
```

**Run Tests**:
```bash
pytest tests/backend/
# ✅ PASSED tests/backend/unit/test_hello.py
```

---

## Step 7: Create .gitignore

**Task**: Create comprehensive .gitignore

**File**: `.gitignore`

```gitignore
# Dependencies
node_modules/
venv/
.venv/
ENV/
env/

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python

# Testing
.coverage
htmlcov/
coverage/
.pytest_cache/
test-results/
playwright-report/

# Build
dist/
build/
*.egg-info/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Environment
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*
```

---

## Step 8: Create Development README

**Task**: Create README with setup and test instructions

**File**: `README.md`

```markdown
# Project Name

Web application prototype with TDD-ready environment.

**Stack**: [React/Vue] + [Flask/Express]

---

## Setup

### Frontend

\`\`\`bash
npm install
npm run dev
# Opens at http://localhost:5173
\`\`\`

### Backend

**Flask**:
\`\`\`bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install -r requirements.txt
python app.py
# Runs at http://localhost:5000
\`\`\`

**Express**:
\`\`\`bash
cd backend
npm install
npm run dev
# Runs at http://localhost:5000
\`\`\`

---

## Testing (TDD-Ready)

### Frontend Tests
\`\`\`bash
# Run once
npm test

# Watch mode (TDD)
npm run test:watch

# Coverage report
npm run test:coverage
\`\`\`

### Backend Tests

**Flask**:
\`\`\`bash
pytest tests/backend/
pytest --cov=backend tests/backend/  # With coverage
\`\`\`

**Express**:
\`\`\`bash
cd backend
npm test
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage
\`\`\`

### E2E Tests
\`\`\`bash
npm run test:e2e
\`\`\`

---

## TDD Workflow

**Red-Green-Refactor**:

1. **Write failing test** (RED):
   \`\`\`bash
   npm run test:watch  # Keep running
   # Edit tests/components/MyComponent.test.jsx
   # See test FAIL ❌
   \`\`\`

2. **Implement code** (GREEN):
   \`\`\`bash
   # Edit src/components/MyComponent.jsx
   # See test PASS ✅
   \`\`\`

3. **Refactor** (REFACTOR):
   \`\`\`bash
   # Improve code quality
   # Tests still PASS ✅
   \`\`\`

---

## Project Structure

\`\`\`
.
├── src/              # Frontend source
│   └── components/   # React/Vue components
├── tests/            # Frontend tests
│   ├── components/   # Component tests
│   ├── integration/  # Integration tests
│   └── e2e/          # End-to-end tests
├── backend/          # Backend source
│   ├── api/          # API routes
│   └── models/       # Data models
└── tests/backend/    # Backend tests
    ├── unit/         # Unit tests
    └── integration/  # Integration tests
\`\`\`

---

## Next Steps

### Development Workflow

1. **Evaluate feature approaches** (before coding):
   - For standard features: `/app-self-evaluate "feature description"`
   - For core/critical features: `/app-evaluate-planned-multiversion "feature description"`

2. **Start coding with TDD**: Use `/app-code "task description"`

3. **Run tests in watch mode**: `npm run test:watch`

4. **Write test first, then code**

5. **Validate code**: Use `/app-validate`

### Feature Evaluation Commands

**`/app-self-evaluate`** - For 80% of features (standard, low-risk)
- Conceptual evaluation without implementation
- 3 approaches compared (minimalist, standard, advanced)
- Scoring matrix and recommendation
- 1x implementation time
- Use for: exports, forms, filters, UI components

**`/app-evaluate-planned-multiversion`** - For 20% of features (core, high-risk)
- 3 actual implementations on separate branches
- Real metrics (bundle size, performance, complexity)
- Comprehensive evaluation with all 14 template parts
- 3x implementation time but reduces long-term risk
- Use for: auth, payments, data sync, architecture decisions

See: [.claude/system-docs/app-evaluation-template/](../../.claude/system-docs/app-evaluation-template/) for full evaluation framework

**Built with TDD - Test First, Ship with Confidence!** 🚀
```

---

## Final Output

After running `/app-setup react-flask`, you'll have:

```
my-app/
├── .gitignore
├── README.md
├── package.json                   # Frontend dependencies
├── vite.config.js                 # Vite configuration
├── vitest.config.js               # Vitest configuration
├── playwright.config.js           # Playwright configuration
├── .agent-tokens/                 # ⭐ Agent orchestration (NEW)
│   ├── verify-workspace.sh        # ⭐ Workspace verification script (executable)
│   ├── workspace-id.txt           # ⭐ Unique workspace ID
│   ├── workspace-path.txt         # ⭐ Absolute workspace path
│   ├── project-name.txt           # ⭐ Project name
│   ├── created-at.txt             # ⭐ Creation timestamp
│   ├── README.md                  # ⭐ Token system documentation
│   └── AGENT_WORKFLOW.md          # ⭐ Agent workflow guide with templates
├── src/
│   ├── components/
│   │   └── HelloWorld.jsx         # ✅ Sample component
│   ├── utils/
│   └── assets/
├── tests/
│   ├── setup.js                   # Test setup
│   ├── components/
│   │   └── HelloWorld.test.jsx    # ✅ Sample test (PASSING)
│   ├── integration/
│   └── e2e/
├── backend/
│   ├── app.py                     # Flask app
│   ├── requirements.txt           # Python dependencies
│   ├── api/
│   │   └── routes/
│   │       └── hello.py           # ✅ Sample route
│   ├── models/
│   └── utils/
├── tests/backend/
│   ├── conftest.py                # Pytest configuration
│   └── unit/
│       └── test_hello.py          # ✅ Sample test (PASSING)
└── venv/                          # Python virtual environment
```

**Status**:
- ✅ Frontend initialized (React/Vue + Vite)
- ✅ Backend initialized (Flask/Express)
- ✅ Testing frameworks installed (Jest/Vitest + pytest + Playwright)
- ✅ TDD sample created (tests PASSING ✅)
- ✅ Watch mode enabled for TDD workflow
- ✅ .gitignore created
- ✅ Development README created
- ✅ Agent orchestration infrastructure created ⭐ NEW
- ✅ Workspace verification enabled ⭐ NEW
- ✅ Agent workflow guide created ⭐ NEW

**Time**: 3-5 minutes

**Next Steps**:
1. Review [.agent-tokens/AGENT_WORKFLOW.md](.agent-tokens/AGENT_WORKFLOW.md) for agent coordination
2. Start with backend development using `@app-backend-developer`
3. Follow the dependency chain: backend → frontend → integration → docs

---

## Test Commands Summary

| Test Type | Command | Watch Mode | Coverage |
|-----------|---------|------------|----------|
| **Frontend Unit** | `npm test` | `npm run test:watch` | `npm run test:coverage` |
| **Backend Unit (Flask)** | `pytest tests/backend/` | `pytest-watch` | `pytest --cov=backend` |
| **Backend Unit (Express)** | `cd backend && npm test` | `npm run test:watch` | `npm run test:coverage` |
| **E2E** | `npm run test:e2e` | N/A | N/A |
| **All** | `npm test && pytest` | Multiple terminals | Both |

---

## Troubleshooting

### Frontend tests not running
```bash
# Verify Vitest is installed
npm list vitest

# Reinstall if needed
npm install --save-dev vitest jsdom @testing-library/react
```

### Backend tests not running (Flask)
```bash
# Verify virtual environment is activated
source venv/bin/activate

# Verify pytest is installed
pip show pytest

# Reinstall if needed
pip install pytest pytest-flask
```

### E2E tests failing
```bash
# Ensure dev server is running
npm run dev

# Verify Playwright is installed
npx playwright --version

# Reinstall browsers if needed
npx playwright install
```

### Port conflicts
```bash
# Frontend (default: 5173)
# Change in vite.config.js: server: { port: 3000 }

# Backend (default: 5000)
# Change in app.py (Flask): app.run(port=5001)
# Change in server.js (Express): const PORT = 5001
```

---

## Next Steps

1. **Activate environments**:
   ```bash
   # Frontend: already in project root

   # Backend (Flask): activate venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

2. **Start development servers**:
   ```bash
   # Terminal 1: Frontend
   npm run dev

   # Terminal 2: Backend
   cd backend && python app.py  # or npm run dev
   ```

3. **Start TDD workflow**:
   ```bash
   # Terminal 3: Frontend tests (watch mode)
   npm run test:watch

   # Terminal 4: Backend tests (watch mode)
   pytest-watch  # or cd backend && npm run test:watch
   ```

4. **Follow design principles**:
   - See [DESIGN_PRINCIPLES.md](../../system-docs/DESIGN_PRINCIPLES.md) for Pragmatic SOLID guide
   - All code generation follows Single Responsibility Principle (SRP)
   - Apply Open/Closed (OCP) and Dependency Inversion (DIP) to core features

5. **Generate code with TDD**:
   ```bash
   /app-code "Create user registration form with email validation"
   ```

6. **Validate setup**:
   ```bash
   /app-validate
   ```

---

**Command Complete**: Environment ready for TDD web development! 🚀

**Test First, Code Second, Ship with Confidence!**
