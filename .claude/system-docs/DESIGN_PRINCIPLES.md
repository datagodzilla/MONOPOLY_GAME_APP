# Design Principles for app-builder Profile

**Purpose**: Pragmatic SOLID principles for rapid web app prototyping
**Philosophy**: Quality without over-engineering - ship fast with maintainable code
**Approach**: Tier-based application (Always → Core Features → Rarely)

---

## Quick Reference

### 🟢 Tier 1: Always Use
- **SRP (Single Responsibility)** - Every component/function does ONE thing
- **Cost**: Low | **Value**: Very High | **Apply**: Always

### 🟡 Tier 2: Core Features Only
- **OCP (Open/Closed)** - Extend without modifying (auth, payments, export)
- **DIP (Dependency Inversion)** - Inject dependencies for testability
- **Cost**: Medium | **Value**: High | **Apply**: Core features evaluated with multi-version

### 🔴 Tier 3: Rarely Use
- **LSP (Liskov Substitution)** - Skip for 95% of prototypes
- **ISP (Interface Segregation)** - Skip for 99% of prototypes
- **Cost**: High | **Value**: Low | **Apply**: Complex enterprise systems only

---

## Philosophy: Pragmatic SOLID

### Why SOLID for Prototypes?

**app-builder Goals**:
- ✅ Ship fast (2-4 weeks MVP)
- ✅ TDD-first development
- ✅ Maintainable prototypes (can evolve to production)
- ✅ Reusable components

**SOLID Benefits**:
- ✅ Easier to test (TDD-friendly)
- ✅ Faster to modify (isolated changes)
- ✅ Reusable code (DRY)
- ✅ Better organization

**BUT**: Full SOLID can slow prototyping
- ❌ Too many abstractions
- ❌ Over-engineering
- ❌ Analysis paralysis

**Solution**: **Pragmatic SOLID** - High-value principles only

---

## 🟢 Tier 1: Single Responsibility Principle (SRP)

### Rule

**"A class/function should have only one reason to change."**

**Translation**: Every component, function, hook, route does **ONE thing** and does it well.

---

### Why Always Use SRP?

| Benefit | Impact on Prototyping |
|---------|----------------------|
| **Easy to Test** | Each piece tested independently → faster TDD |
| **Easy to Modify** | Change one thing without breaking others → faster iteration |
| **Easy to Reuse** | Small focused functions → DRY code |
| **Easy to Understand** | Clear what each piece does → faster onboarding |

**Cost**: Minimal (just better organization)
**Value**: Maximum (helps everything else)

---

### SRP for React/Vue Components

#### ❌ Bad: God Component (Multiple Responsibilities)

```typescript
// UserDashboard.jsx - 230 lines, does EVERYTHING
import { useState, useEffect } from 'react';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Responsibility 1: Data fetching
  useEffect(() => {
    setLoading(true);
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Responsibility 2: Validation
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Responsibility 3: Business logic (filtering)
  const filterUsers = () => {
    return users
      .filter(u => filter === 'all' || u.status === filter)
      .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  // Responsibility 4: Calculations
  const calculateStats = () => {
    const active = users.filter(u => u.status === 'active').length;
    const inactive = users.length - active;
    return { active, inactive, total: users.length };
  };

  // Responsibility 5: Rendering
  const stats = calculateStats();
  const filteredUsers = filterUsers();

  return (
    <div className="dashboard">
      <header>
        <h1>User Dashboard</h1>
        <div className="stats">
          <span>Total: {stats.total}</span>
          <span>Active: {stats.active}</span>
          <span>Inactive: {stats.inactive}</span>
        </div>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="user-list">
        {loading && <div>Loading...</div>}
        {error && <div className="error">{error}</div>}
        {filteredUsers.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email} {validateEmail(user.email) ? '✓' : '✗'}</p>
            <span className={`status ${user.status}`}>{user.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
```

**Problems**:
- ❌ Hard to test (need to mock fetch, test rendering, test filtering all together)
- ❌ Can't reuse validation, filtering, or calculations elsewhere
- ❌ Changes to API affect rendering code
- ❌ 230 lines in one file
- ❌ Violates TDD (too much to test at once)

---

#### ✅ Good: Separated Responsibilities

```typescript
// 1. Data Fetching Responsibility
// hooks/useUsers.js
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { users, loading, error };
};

// 2. Validation Responsibility
// utils/validation.js
export const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

// 3. Filtering Responsibility
// hooks/useUserFilters.js
export const useUserFilters = (users) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users
    .filter(u => filter === 'all' || u.status === filter)
    .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return { filteredUsers, filter, setFilter, searchTerm, setSearchTerm };
};

// 4. Calculations Responsibility
// utils/userStats.js
export const calculateUserStats = (users) => {
  const active = users.filter(u => u.status === 'active').length;
  const inactive = users.length - active;
  return { active, inactive, total: users.length };
};

// 5. Rendering Responsibility (Stats)
// components/UserStats.jsx
const UserStats = ({ stats }) => (
  <div className="stats">
    <span>Total: {stats.total}</span>
    <span>Active: {stats.active}</span>
    <span>Inactive: {stats.inactive}</span>
  </div>
);

// 6. Rendering Responsibility (Filters)
// components/UserFilters.jsx
const UserFilters = ({ filter, setFilter, searchTerm, setSearchTerm }) => (
  <div className="filters">
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  </div>
);

// 7. Rendering Responsibility (User Card)
// components/UserCard.jsx
import { validateEmail } from '../utils/validation';

const UserCard = ({ user }) => (
  <div className="user-card">
    <h3>{user.name}</h3>
    <p>{user.email} {validateEmail(user.email) ? '✓' : '✗'}</p>
    <span className={`status ${user.status}`}>{user.status}</span>
  </div>
);

// 8. Main Component (Composition Only)
// components/UserDashboard.jsx
import { useUsers } from '../hooks/useUsers';
import { useUserFilters } from '../hooks/useUserFilters';
import { calculateUserStats } from '../utils/userStats';
import UserStats from './UserStats';
import UserFilters from './UserFilters';
import UserCard from './UserCard';

const UserDashboard = () => {
  const { users, loading, error } = useUsers();
  const { filteredUsers, filter, setFilter, searchTerm, setSearchTerm } = useUserFilters(users);
  const stats = calculateUserStats(users);

  return (
    <div className="dashboard">
      <header>
        <h1>User Dashboard</h1>
        <UserStats stats={stats} />
      </header>

      <UserFilters
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="user-list">
        {loading && <div>Loading...</div>}
        {error && <div className="error">{error}</div>}
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
```

**Benefits**:
- ✅ Each piece testable independently (TDD-friendly)
- ✅ Reusable (validation, stats, filtering used elsewhere)
- ✅ Easy to modify (change API without touching UI)
- ✅ Each file 20-50 lines (readable)
- ✅ Perfect for TDD (test one responsibility at a time)

**File Structure**:
```
src/
├── components/
│   ├── UserDashboard.jsx      (60 lines - composition)
│   ├── UserStats.jsx           (15 lines - stats display)
│   ├── UserFilters.jsx         (25 lines - filters UI)
│   └── UserCard.jsx            (20 lines - user display)
├── hooks/
│   ├── useUsers.js             (30 lines - data fetching)
│   └── useUserFilters.js       (25 lines - filtering logic)
└── utils/
    ├── validation.js           (10 lines - validation)
    └── userStats.js            (15 lines - calculations)
```

---

### SRP for Flask/Express Routes

#### ❌ Bad: Fat Route (Multiple Responsibilities)

```python
# backend/api/routes/users.py
from flask import Blueprint, request, jsonify
import re
import sqlite3
from datetime import datetime

users_bp = Blueprint('users', __name__)

@users_bp.route('/api/users', methods=['POST'])
def create_user():
    data = request.json

    # Responsibility 1: Validation
    if not data.get('email'):
        return jsonify({'error': 'Email required'}), 400

    if not re.match(r'\S+@\S+\.\S+', data['email']):
        return jsonify({'error': 'Invalid email'}), 400

    if not data.get('name') or len(data['name']) < 2:
        return jsonify({'error': 'Name must be at least 2 characters'}), 400

    # Responsibility 2: Database connection
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # Responsibility 3: Check if user exists
    cursor.execute('SELECT id FROM users WHERE email = ?', (data['email'],))
    if cursor.fetchone():
        conn.close()
        return jsonify({'error': 'User already exists'}), 409

    # Responsibility 4: Business logic (create user)
    now = datetime.utcnow().isoformat()
    cursor.execute(
        'INSERT INTO users (name, email, status, created_at) VALUES (?, ?, ?, ?)',
        (data['name'], data['email'], 'active', now)
    )
    user_id = cursor.lastrowid
    conn.commit()
    conn.close()

    # Responsibility 5: Email notification (simulated)
    send_welcome_email(data['email'])

    # Responsibility 6: Response formatting
    return jsonify({
        'id': user_id,
        'name': data['name'],
        'email': data['email'],
        'status': 'active',
        'created_at': now
    }), 201

def send_welcome_email(email):
    # Email sending logic
    pass
```

**Problems**:
- ❌ Hard to test (need to mock database, email, validation)
- ❌ Can't reuse validation elsewhere
- ❌ Database logic mixed with HTTP handling
- ❌ 50+ lines in one function
- ❌ Violates TDD principles

---

#### ✅ Good: Separated Responsibilities

```python
# 1. Validation Responsibility
# backend/utils/validation.py
import re

def validate_email(email):
    """Validate email format."""
    if not email:
        return False, "Email required"
    if not re.match(r'\S+@\S+\.\S+', email):
        return False, "Invalid email format"
    return True, None

def validate_name(name):
    """Validate name."""
    if not name or len(name) < 2:
        return False, "Name must be at least 2 characters"
    return True, None

# 2. Database Responsibility
# backend/models/user.py
from datetime import datetime
import sqlite3

class User:
    def __init__(self, db_path='database.db'):
        self.db_path = db_path

    def create(self, name, email, status='active'):
        """Create a new user."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        now = datetime.utcnow().isoformat()
        cursor.execute(
            'INSERT INTO users (name, email, status, created_at) VALUES (?, ?, ?, ?)',
            (name, email, status, now)
        )
        user_id = cursor.lastrowid
        conn.commit()
        conn.close()

        return {
            'id': user_id,
            'name': name,
            'email': email,
            'status': status,
            'created_at': now
        }

    def get_by_email(self, email):
        """Get user by email."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('SELECT id, name, email, status FROM users WHERE email = ?', (email,))
        row = cursor.fetchone()
        conn.close()

        if row:
            return {'id': row[0], 'name': row[1], 'email': row[2], 'status': row[3]}
        return None

# 3. Email Service Responsibility
# backend/services/email_service.py
class EmailService:
    def send_welcome_email(self, email, name):
        """Send welcome email to new user."""
        # Email sending logic
        print(f"Sending welcome email to {email}")
        return True

# 4. HTTP Route Responsibility (Orchestration Only)
# backend/api/routes/users.py
from flask import Blueprint, request, jsonify
from backend.utils.validation import validate_email, validate_name
from backend.models.user import User
from backend.services.email_service import EmailService

users_bp = Blueprint('users', __name__)
user_model = User()
email_service = EmailService()

@users_bp.route('/api/users', methods=['POST'])
def create_user():
    """Create a new user (orchestration only)."""
    data = request.json

    # Validate email
    is_valid, error = validate_email(data.get('email'))
    if not is_valid:
        return jsonify({'error': error}), 400

    # Validate name
    is_valid, error = validate_name(data.get('name'))
    if not is_valid:
        return jsonify({'error': error}), 400

    # Check if user exists
    existing_user = user_model.get_by_email(data['email'])
    if existing_user:
        return jsonify({'error': 'User already exists'}), 409

    # Create user
    user = user_model.create(data['name'], data['email'])

    # Send welcome email
    email_service.send_welcome_email(user['email'], user['name'])

    return jsonify(user), 201
```

**Benefits**:
- ✅ Each piece testable independently
- ✅ Reusable validation, database, email
- ✅ Route is just orchestration (15 lines)
- ✅ Easy to mock for testing
- ✅ Perfect for TDD

---

### SRP Guidelines for app-builder

#### For Components
- ✅ **DO**: Separate rendering from logic
- ✅ **DO**: Use custom hooks for data fetching
- ✅ **DO**: Extract reusable logic to utils
- ❌ **DON'T**: Mix API calls and rendering
- ❌ **DON'T**: Put business logic in components

#### For Routes/Endpoints
- ✅ **DO**: Routes orchestrate only (call services)
- ✅ **DO**: Separate validation, database, business logic
- ✅ **DO**: Keep routes under 30 lines
- ❌ **DON'T**: Put database queries in routes
- ❌ **DON'T**: Mix HTTP handling with business logic

#### For Functions
- ✅ **DO**: One transformation per function
- ✅ **DO**: Pure functions when possible
- ✅ **DO**: Functions under 20 lines
- ❌ **DON'T**: Functions that do multiple things
- ❌ **DON'T**: Side effects in calculation functions

---

### SRP Detection (for /app-validate)

**Red Flags** (SRP violations):
- 🚨 Files > 150 lines
- 🚨 Components with data fetching + rendering + logic
- 🚨 Functions > 30 lines
- 🚨 Routes with database queries
- 🚨 God classes/functions

**Green Flags** (SRP compliance):
- ✅ Files 20-80 lines
- ✅ Components render only
- ✅ Hooks for data fetching
- ✅ Utils for logic
- ✅ Routes orchestrate only

---

## 🟡 Tier 2: Open/Closed Principle (OCP)

### Rule

**"Software entities should be open for extension, closed for modification."**

**Translation**: Add new behavior without changing existing code.

---

### When to Use OCP

✅ **Use for Core Features**:
- Features evaluated with `/app-evaluate-planned-multiversion`
- Export systems (CSV, JSON, PDF, XML)
- Payment processors (Stripe, PayPal, Square)
- Authentication strategies (JWT, OAuth, Magic Link)
- Notification systems (Email, SMS, Push)

❌ **Skip for**:
- One-off UI components
- Quick prototypes (< 1 week)
- Features with single implementation

**Cost**: Medium (requires planning, interfaces)
**Value**: High (for evolving features)

---

### OCP Example: Export System

#### ❌ Bad: Closed for Extension

```typescript
// ExportButton.jsx - Must modify to add formats
const ExportButton = ({ data, format }) => {
  const handleExport = () => {
    if (format === 'csv') {
      const csv = convertToCSV(data);
      downloadFile(csv, 'data.csv');
    } else if (format === 'json') {
      const json = JSON.stringify(data);
      downloadFile(json, 'data.json');
    } else if (format === 'pdf') {
      const pdf = convertToPDF(data);
      downloadFile(pdf, 'data.pdf');
    }
    // Adding XML requires modifying this function!
    // else if (format === 'xml') { ... }
  };

  return <button onClick={handleExport}>Export</button>;
};
```

**Problems**:
- ❌ Must modify ExportButton to add formats
- ❌ All export logic in one place
- ❌ Hard to test each format independently
- ❌ Violates OCP

---

#### ✅ Good: Open for Extension

```typescript
// exporters/index.ts - Extension point
export interface Exporter {
  export(data: any[]): void;
}

// exporters/csvExporter.ts
export class CSVExporter implements Exporter {
  export(data: any[]): void {
    const csv = this.convertToCSV(data);
    this.downloadFile(csv, 'data.csv');
  }

  private convertToCSV(data: any[]): string {
    // CSV conversion logic
    return '';
  }

  private downloadFile(content: string, filename: string): void {
    // Download logic
  }
}

// exporters/jsonExporter.ts
export class JSONExporter implements Exporter {
  export(data: any[]): void {
    const json = JSON.stringify(data, null, 2);
    this.downloadFile(json, 'data.json');
  }

  private downloadFile(content: string, filename: string): void {
    // Download logic
  }
}

// exporters/pdfExporter.ts
export class PDFExporter implements Exporter {
  export(data: any[]): void {
    const pdf = this.convertToPDF(data);
    this.downloadFile(pdf, 'data.pdf');
  }

  private convertToPDF(data: any[]): string {
    // PDF conversion logic
    return '';
  }

  private downloadFile(content: string, filename: string): void {
    // Download logic
  }
}

// exporters/registry.ts - Registry pattern
import { CSVExporter } from './csvExporter';
import { JSONExporter } from './jsonExporter';
import { PDFExporter } from './pdfExporter';

export const exporters: Record<string, Exporter> = {
  csv: new CSVExporter(),
  json: new JSONExporter(),
  pdf: new PDFExporter(),
};

// Add XML format WITHOUT modifying ExportButton
// exporters/xmlExporter.ts
export class XMLExporter implements Exporter {
  export(data: any[]): void {
    const xml = this.convertToXML(data);
    this.downloadFile(xml, 'data.xml');
  }

  private convertToXML(data: any[]): string {
    // XML conversion logic
    return '';
  }

  private downloadFile(content: string, filename: string): void {
    // Download logic
  }
}

// Register XML exporter
import { exporters } from './registry';
import { XMLExporter } from './xmlExporter';
exporters.xml = new XMLExporter();

// ExportButton.jsx - Closed for modification, open for extension
import { exporters } from '../exporters/registry';

const ExportButton = ({ data, format }) => {
  const handleExport = () => {
    const exporter = exporters[format];
    if (!exporter) {
      console.error(`Unknown format: ${format}`);
      return;
    }
    exporter.export(data);
  };

  return <button onClick={handleExport}>Export {format.toUpperCase()}</button>;
};
```

**Benefits**:
- ✅ Add formats without modifying ExportButton
- ✅ Each exporter tested independently
- ✅ Plugin architecture
- ✅ Follows OCP

---

### OCP Example: Payment Processing

```typescript
// services/payment/PaymentProcessor.ts
export interface PaymentProcessor {
  charge(amount: number, metadata: any): Promise<PaymentResult>;
  refund(transactionId: string): Promise<void>;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  error?: string;
}

// services/payment/StripeProcessor.ts
import Stripe from 'stripe';
import { PaymentProcessor, PaymentResult } from './PaymentProcessor';

export class StripeProcessor implements PaymentProcessor {
  private stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, { apiVersion: '2023-10-16' });
  }

  async charge(amount: number, metadata: any): Promise<PaymentResult> {
    try {
      const charge = await this.stripe.charges.create({
        amount: amount * 100, // Stripe uses cents
        currency: 'usd',
        source: metadata.token,
        description: metadata.description,
      });

      return {
        success: true,
        transactionId: charge.id,
      };
    } catch (error) {
      return {
        success: false,
        transactionId: '',
        error: error.message,
      };
    }
  }

  async refund(transactionId: string): Promise<void> {
    await this.stripe.refunds.create({ charge: transactionId });
  }
}

// services/payment/PayPalProcessor.ts
import { PaymentProcessor, PaymentResult } from './PaymentProcessor';

export class PayPalProcessor implements PaymentProcessor {
  constructor(private clientId: string, private secret: string) {}

  async charge(amount: number, metadata: any): Promise<PaymentResult> {
    // PayPal API integration
    try {
      // PayPal charge logic
      return {
        success: true,
        transactionId: 'paypal_txn_123',
      };
    } catch (error) {
      return {
        success: false,
        transactionId: '',
        error: error.message,
      };
    }
  }

  async refund(transactionId: string): Promise<void> {
    // PayPal refund logic
  }
}

// services/payment/PaymentService.ts - Orchestrator
import { PaymentProcessor } from './PaymentProcessor';
import { StripeProcessor } from './StripeProcessor';
import { PayPalProcessor } from './PayPalProcessor';

export class PaymentService {
  private processors: Record<string, PaymentProcessor> = {
    stripe: new StripeProcessor(process.env.STRIPE_KEY!),
    paypal: new PayPalProcessor(process.env.PAYPAL_ID!, process.env.PAYPAL_SECRET!),
  };

  async charge(provider: string, amount: number, metadata: any) {
    const processor = this.processors[provider];
    if (!processor) {
      throw new Error(`Unknown payment provider: ${provider}`);
    }
    return await processor.charge(amount, metadata);
  }

  async refund(provider: string, transactionId: string) {
    const processor = this.processors[provider];
    if (!processor) {
      throw new Error(`Unknown payment provider: ${provider}`);
    }
    return await processor.refund(transactionId);
  }
}

// Add Square processor WITHOUT modifying PaymentService
// services/payment/SquareProcessor.ts
export class SquareProcessor implements PaymentProcessor {
  // Square implementation
}

// Register Square
import { SquareProcessor } from './SquareProcessor';
paymentService.processors.square = new SquareProcessor(process.env.SQUARE_KEY!);
```

**Benefits**:
- ✅ Add providers without changing PaymentService
- ✅ Each processor tested independently
- ✅ Easy to swap providers
- ✅ Follows OCP

---

### OCP Guidelines

#### When to Apply
- ✅ Multi-version evaluated features
- ✅ Features with multiple providers/strategies
- ✅ Systems that will evolve over time

#### Patterns to Use
- Strategy pattern (exporters, payment processors)
- Plugin pattern (register handlers)
- Registry pattern (look up implementations)

#### Detection
**Needs OCP**:
- 🚨 Long if/else chains for types/formats
- 🚨 Must modify core code to add features
- 🚨 Multiple similar implementations

**Has OCP**:
- ✅ Interface-based extensibility
- ✅ Registry/plugin system
- ✅ Add features without core changes

---

## 🟡 Tier 2: Dependency Inversion Principle (DIP)

### Rule

**"Depend on abstractions, not concretions."**

**Translation**: Inject dependencies instead of creating them directly. Essential for TDD.

---

### When to Use DIP

✅ **Use for**:
- API clients (HTTP, WebSocket)
- Database connections
- External services (Stripe, SendGrid, AWS)
- Any service that needs mocking for tests

❌ **Skip for**:
- Simple UI components
- Pure utility functions
- Presentational components

**Cost**: Medium (requires interfaces, injection)
**Value**: High (testability, swappability)

---

### DIP Example: API Client

#### ❌ Bad: Hard Dependency

```typescript
// services/UserService.ts - Tightly coupled to axios
import axios from 'axios';

export class UserService {
  async getUsers() {
    const response = await axios.get('/api/users');
    return response.data;
  }

  async createUser(user: any) {
    const response = await axios.post('/api/users', user);
    return response.data;
  }

  async updateUser(id: string, user: any) {
    const response = await axios.put(`/api/users/${id}`, user);
    return response.data;
  }
}

// Hard to test - need complex axios mocking
test('getUsers returns users', async () => {
  // Complex axios mock setup
  jest.mock('axios');
  axios.get = jest.fn().mockResolvedValue({ data: [{ id: 1 }] });

  const service = new UserService();
  const users = await service.getUsers();

  expect(users).toEqual([{ id: 1 }]);
});
```

**Problems**:
- ❌ Can't easily swap HTTP libraries
- ❌ Hard to test (axios mocking is complex)
- ❌ Tight coupling to axios
- ❌ Violates DIP

---

#### ✅ Good: Dependency Injection

```typescript
// types/HttpClient.ts - Abstraction (interface)
export interface HttpClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
  put<T>(url: string, data: any): Promise<T>;
  delete<T>(url: string): Promise<T>;
}

// services/AxiosClient.ts - Concrete implementation
import axios, { AxiosInstance } from 'axios';
import { HttpClient } from '../types/HttpClient';

export class AxiosClient implements HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string = '') {
    this.client = axios.create({ baseURL });
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.client.get(url);
    return response.data;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await this.client.post(url, data);
    return response.data;
  }

  async put<T>(url: string, data: any): Promise<T> {
    const response = await this.client.put(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete(url);
    return response.data;
  }
}

// services/UserService.ts - Depends on abstraction
import { HttpClient } from '../types/HttpClient';

export class UserService {
  constructor(private http: HttpClient) {} // Inject dependency

  async getUsers() {
    return this.http.get('/api/users');
  }

  async createUser(user: any) {
    return this.http.post('/api/users', user);
  }

  async updateUser(id: string, user: any) {
    return this.http.put(`/api/users/${id}`, user);
  }
}

// Easy to test - inject mock
test('getUsers returns users', async () => {
  // Simple mock implementation
  const mockHttp: HttpClient = {
    get: jest.fn().mockResolvedValue([{ id: 1, name: 'Alice' }]),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };

  const service = new UserService(mockHttp);
  const users = await service.getUsers();

  expect(users).toEqual([{ id: 1, name: 'Alice' }]);
  expect(mockHttp.get).toHaveBeenCalledWith('/api/users');
});

// Production usage
const httpClient = new AxiosClient('https://api.example.com');
const userService = new UserService(httpClient);
```

**Benefits**:
- ✅ Easy to test (inject mock)
- ✅ Can swap HTTP library (fetch, axios, custom)
- ✅ Decoupled from implementation
- ✅ Follows DIP
- ✅ Perfect for TDD

---

### DIP Example: Database Connection (Flask)

```python
# models/database.py - Abstraction (ABC)
from abc import ABC, abstractmethod

class DatabaseConnection(ABC):
    @abstractmethod
    def execute(self, query: str, params: tuple = ()):
        """Execute a query and return results."""
        pass

    @abstractmethod
    def commit(self):
        """Commit transaction."""
        pass

    @abstractmethod
    def rollback(self):
        """Rollback transaction."""
        pass

# models/sqlite_connection.py - Concrete implementation
import sqlite3
from models.database import DatabaseConnection

class SQLiteConnection(DatabaseConnection):
    def __init__(self, db_path: str):
        self.db_path = db_path
        self.conn = None

    def connect(self):
        self.conn = sqlite3.connect(self.db_path)
        return self

    def execute(self, query: str, params: tuple = ()):
        cursor = self.conn.cursor()
        cursor.execute(query, params)
        return cursor.fetchall()

    def commit(self):
        self.conn.commit()

    def rollback(self):
        self.conn.rollback()

    def close(self):
        if self.conn:
            self.conn.close()

# models/user.py - Depends on abstraction
from models.database import DatabaseConnection

class UserModel:
    def __init__(self, db: DatabaseConnection):
        self.db = db  # Inject dependency

    def create(self, name: str, email: str):
        """Create a new user."""
        query = 'INSERT INTO users (name, email) VALUES (?, ?)'
        self.db.execute(query, (name, email))
        self.db.commit()

    def get_all(self):
        """Get all users."""
        query = 'SELECT id, name, email FROM users'
        return self.db.execute(query)

    def get_by_email(self, email: str):
        """Get user by email."""
        query = 'SELECT id, name, email FROM users WHERE email = ?'
        results = self.db.execute(query, (email,))
        return results[0] if results else None

# Easy to test - inject mock
def test_create_user():
    # Mock database
    class MockDB(DatabaseConnection):
        def __init__(self):
            self.queries = []

        def execute(self, query, params=()):
            self.queries.append((query, params))
            return []

        def commit(self):
            pass

        def rollback(self):
            pass

    mock_db = MockDB()
    user_model = UserModel(mock_db)
    user_model.create('Alice', 'alice@example.com')

    assert len(mock_db.queries) == 1
    assert mock_db.queries[0][1] == ('Alice', 'alice@example.com')

# Production usage
from models.sqlite_connection import SQLiteConnection

db = SQLiteConnection('app.db').connect()
user_model = UserModel(db)
```

**Benefits**:
- ✅ Easy to test (inject mock)
- ✅ Can swap database (SQLite, PostgreSQL, MySQL)
- ✅ Decoupled from DB implementation
- ✅ Follows DIP

---

### DIP Guidelines

#### When to Apply
- ✅ Services that need testing
- ✅ External dependencies (API, database, email)
- ✅ Core features evaluated with multi-version

#### Patterns to Use
- Constructor injection (pass in constructor)
- Interface/Abstract class (define contract)
- Factory pattern (create instances)

#### Detection
**Needs DIP**:
- 🚨 Direct imports of concrete implementations
- 🚨 Hard to test (complex mocking)
- 🚨 Tight coupling to libraries

**Has DIP**:
- ✅ Depends on interfaces/abstractions
- ✅ Easy to test (simple mocks)
- ✅ Swappable implementations

---

## 🔴 Tier 3: Liskov Substitution & Interface Segregation

### Skip for 95%+ of Prototypes

**LSP (Liskov Substitution)**: Subtypes must be substitutable
- Too advanced for most prototypes
- Requires deep OOP understanding
- Only for complex polymorphic systems

**ISP (Interface Segregation)**: Small, focused interfaces
- Overkill for prototypes
- Creates too many interfaces
- Only for complex multi-role systems

**When to Consider** (rare):
- Complex enterprise applications
- Multiple payment processors with exact interface requirements
- Multi-role systems (5+ user types)

---

## Integration with app-builder Workflow

### 1. Design Before Coding

```bash
# Before /app-code, think about design
/app-self-evaluate "Add user management feature"

# During evaluation, consider:
# - How to apply SRP (separate components, hooks, utils)
# - If OCP needed (will this feature extend? multiple providers?)
# - If DIP needed (need to mock for tests?)
```

---

### 2. Code Generation with Principles

```bash
/app-code "Create user registration with email validation"

# Agent generates SRP-compliant code:
# - hooks/useRegistration.js (data fetching)
# - utils/validation.js (validation logic)
# - components/RegistrationForm.jsx (rendering)
```

---

### 3. Validation with Principles

```bash
/app-validate

# Checks design principles:
# ✅ SRP: Most files follow single responsibility
# ⚠️  src/components/Dashboard.jsx (187 lines)
#     Suggestion: Split into DashboardHeader, DashboardStats, DashboardContent
```

---

## Quick Decision Matrix

### Should I apply this principle?

| Principle | Always? | When? | Skip? |
|-----------|---------|-------|-------|
| **SRP** | ✅ YES | All code | Never |
| **OCP** | ⚠️ SOMETIMES | Core features, multi-version evaluated | Simple features |
| **DIP** | ⚠️ SOMETIMES | Services needing tests, external deps | UI components |
| **LSP** | ❌ RARELY | Complex polymorphism | 95% of code |
| **ISP** | ❌ RARELY | Multi-role systems | 99% of code |

---

## Summary: Pragmatic SOLID for app-builder

### Always
- ✅ **SRP** - Every component/function does ONE thing

### Core Features (Evaluated with Multi-Version)
- ✅ **OCP** - Extend without modifying (plugins, strategies)
- ✅ **DIP** - Inject dependencies (testability)

### Rarely
- ❌ **LSP** - Skip for prototypes
- ❌ **ISP** - Skip for prototypes

### Result
- Fast development (SRP doesn't slow you down)
- Testable code (DIP for mocking)
- Extensible features (OCP for evolving systems)
- No over-engineering (skip LSP/ISP)

---

**Philosophy**: **Ship fast with maintainable code**

**Motto**: **Evaluate First, Design Well, Test First, Code Second, Ship with Confidence!**

---

**Document Version**: 1.0
**Date**: 2025-10-29
**Status**: ✅ Production Ready
**Lines**: 2,000+ lines (comprehensive guide)
