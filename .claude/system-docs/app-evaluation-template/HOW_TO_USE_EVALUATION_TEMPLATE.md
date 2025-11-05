# How to Use the App Evaluation Template

## Overview

The `app-evaluation-template.md` can be used in **two ways** depending on your project needs:

1. **Approach 1: Pre-Planned Multi-Version** (actual code comparison)
2. **Approach 2: Self-Evaluating Single Prompt** (conceptual comparison)

Choose based on feature complexity, available time, and project risk.

---

## 🎯 Decision Matrix: Which Approach to Use?

| Factor | Use Approach 1 (Multi-Version) | Use Approach 2 (Single Prompt) |
|--------|-------------------------------|-------------------------------|
| **Feature Complexity** | High (authentication, payment, data sync) | Low-Medium (export, filters, forms) |
| **Timeline** | Flexible (3+ weeks) | Tight (1-2 weeks) |
| **Budget** | High (can afford exploration) | Limited (need efficiency) |
| **Risk Level** | High (wrong choice is expensive) | Low-Medium (can refactor later) |
| **Team Experience** | Learning new patterns | Experienced with stack |
| **Architectural Uncertainty** | Multiple valid approaches | Clear best approach exists |
| **Feature Impact** | Core functionality | Supporting feature |

**Rule of Thumb:**
- Use Approach 1 for ~20% of features (high-impact, complex)
- Use Approach 2 for ~80% of features (standard development)

---

## 📋 Approach 1: Pre-Planned Multi-Version

### Use Case Example
You need to add **user authentication** to your app. This is complex with many valid approaches (JWT, session-based, OAuth, etc.), and choosing wrong is costly.

### Step-by-Step Workflow

#### Step 1: Create 3 Detailed Implementation Prompts

Create a file `feature-auth-versions.md`:

```markdown
# Authentication Feature - Three Approaches

## Version 1: Session-Based Auth
**Architecture:** Traditional server-side sessions
**Tech Stack:** NextAuth.js with session strategy
**Components:**
- Server-side session management
- HTTP-only cookies
- Database session storage
- Middleware for route protection

**Estimated Complexity:**
- LOC: 300-400
- Files: 5-7
- External dependencies: 2

**Pros:** Simple, secure, works without JavaScript
**Cons:** Server memory usage, sticky sessions needed

---

## Version 2: JWT Token Auth
**Architecture:** Stateless token-based authentication
**Tech Stack:** NextAuth.js with JWT strategy
**Components:**
- JWT token generation/validation
- Token refresh mechanism
- LocalStorage for client-side storage
- API middleware for token verification

**Estimated Complexity:**
- LOC: 400-500
- Files: 6-8
- External dependencies: 3

**Pros:** Stateless, scalable, works with microservices
**Cons:** Token management complexity, XSS risk

---

## Version 3: OAuth + Social Logins
**Architecture:** Third-party OAuth providers
**Tech Stack:** NextAuth.js with multiple providers
**Components:**
- OAuth flow implementation
- Multi-provider configuration (Google, GitHub, Facebook)
- Account linking logic
- Fallback email/password option

**Estimated Complexity:**
- LOC: 600-800
- Files: 8-10
- External dependencies: 4+

**Pros:** Better UX, no password management, trusted providers
**Cons:** Provider dependency, complex account linking
```

#### Step 2: Implement Each Version on Separate Branches

```bash
# V1: Session-Based
git checkout -b feature-auth-v1
# Implement according to V1 prompt
git add .
git commit -m "feat: implement session-based authentication (V1)"

# V2: JWT-Based
git checkout main
git checkout -b feature-auth-v2
# Implement according to V2 prompt
git add .
git commit -m "feat: implement JWT token authentication (V2)"

# V3: OAuth
git checkout main
git checkout -b feature-auth-v3
# Implement according to V3 prompt
git add .
git commit -m "feat: implement OAuth social login (V3)"
```

#### Step 3: Systematic Evaluation

Switch between branches and fill out the evaluation template:

```bash
# Analyze V1
git checkout feature-auth-v1
# Run app, test, measure metrics
# Document in app-evaluation-template.md

# Analyze V2
git checkout feature-auth-v2
# Run app, test, measure metrics
# Continue documenting

# Analyze V3
git checkout feature-auth-v3
# Run app, test, measure metrics
# Complete documentation
```

Use the template to document:
- **Part 2:** Architecture of each version (actual code structure)
- **Part 3:** Feature comparison matrix (what each supports)
- **Part 4:** Code quality metrics (actual LOC, complexity)
- **Part 5:** Performance analysis (actual benchmarks)
- **Part 6:** Maintainability (real code review)
- **Part 7:** Security analysis (actual vulnerability scan)
- **Part 8:** Cost analysis (actual time spent)
- **Part 9:** UX evaluation (actual user testing)
- **Part 10:** Decision framework (scoring with real data)
- **Part 11:** Final recommendation

#### Step 4: Make Decision

Based on completed evaluation:

```markdown
## Final Decision: V2 (JWT) with OAuth for Social Logins

**Reasoning:**
- V2 scored highest (73/100) for our scalability needs
- V3's social login UX is valuable → will add to V2
- V1 too limited for future microservices architecture

**Implementation Plan:**
1. Merge feature-auth-v2 to main (JWT foundation)
2. Cherry-pick OAuth components from feature-auth-v3
3. Create hybrid: JWT with social login options
4. Estimated additional work: 3 days
```

#### Step 5: Implement Final Solution

```bash
# Start from V2 (winner)
git checkout feature-auth-v2
git checkout -b feature-auth-final

# Cherry-pick from V3
git checkout feature-auth-v3 -- lib/auth/oauth.ts
git checkout feature-auth-v3 -- components/auth/SocialLoginButtons.tsx

# Integrate and test
# ...

git add .
git commit -m "feat: hybrid auth system (JWT + OAuth)"
git checkout main
git merge feature-auth-final
```

### When This Approach Excels

✅ **Complex features** with no clear best approach
✅ **High-stakes** decisions (auth, payments, data architecture)
✅ **Team learning** opportunities (explore patterns)
✅ **Long-term** projects where upfront investment pays off
✅ **Innovation** needed (exploring new solutions)

### Limitations

❌ Requires 2-3x development time upfront
❌ Only practical for ~20% of features
❌ Needs strong planning and discipline
❌ Can lead to analysis paralysis

---

## 🚀 Approach 2: Self-Evaluating Single Prompt

### Use Case Example
You need to add **data export functionality** to your app. The requirements are clear, and it's a supporting feature.

### Step-by-Step Workflow

#### Step 1: Create Single Prompt with Evaluation Instructions

Create a file `feature-export-request.md`:

```markdown
# Feature Request: Expense Data Export

## Business Requirements
- Users need to download their expense data
- Support at least CSV format (JSON/PDF nice to have)
- Should handle 1000+ expenses without performance issues
- Must work on mobile and desktop browsers

## Technical Constraints
- Must integrate with existing NextJS 14 + TypeScript app
- Use existing Expense type from lib/types.ts
- Follow existing code patterns and style
- No new major dependencies if possible

## Project Context
- Timeline: 1 week
- Budget: Medium (20-30 dev hours)
- Team: 1 developer (intermediate level)
- Priority: Medium (nice-to-have, not blocking launch)

## User Context
- Target users: Individual freelancers and small business owners
- Technical proficiency: Non-technical to intermediate
- Primary use case: End-of-month accounting and tax preparation
- Expected usage: Monthly (not daily/hourly)

---

## 🎯 Evaluation Instructions for Claude Code

Before implementing, please:

### 1. Generate Three Conceptual Approaches

Describe (don't implement yet) three different architectural approaches:

**Approach A: Minimalist**
- What: Basic functionality only
- How: Technical approach
- Why: Best for [scenario]
- Estimated: LOC, files, time

**Approach B: Standard**
- What: Balanced feature set
- How: Technical approach
- Why: Best for [scenario]
- Estimated: LOC, files, time

**Approach C: Advanced**
- What: Full-featured solution
- How: Technical approach
- Why: Best for [scenario]
- Estimated: LOC, files, time

### 2. Use Evaluation Template

Fill out these critical sections from @app-evaluation-template.md:

**Required Sections:**
- Part 1: Implementation Overview (all 3 approaches)
- Part 2: Technical Architecture Analysis (conceptual)
- Part 3: Feature Comparison Matrix
- Part 8: Development & Operational Costs (estimated)
- Part 10: Decision Framework (scoring matrix)
- Part 11: Recommendations

**Optional Sections** (if relevant):
- Part 5: Performance Analysis (if performance-critical)
- Part 7: Security Analysis (if handling sensitive data)
- Part 9: UX Evaluation (if UI-heavy feature)

### 3. Present Comparison

Show me:
- Side-by-side comparison table
- Scoring matrix with weighted totals
- Pros/cons for each approach
- Your recommendation with reasoning

### 4. Wait for Approval

Don't implement until I approve the approach or ask for modifications.

### 5. Implement Approved Approach

Once approved:
- Implement on feature branch
- Follow TDD if tests exist
- Document key decisions in code comments
- Create PR with evaluation summary

### 6. Document Final Evaluation

After implementation:
- Update evaluation template with actual metrics
- Note any deviations from estimates
- Record lessons learned
```

#### Step 2: Claude Code Self-Evaluates

When you provide this prompt to Claude Code, it will:

1. **Analyze your requirements** and constraints
2. **Generate 3 conceptual approaches** without writing code:
   ```markdown
   ## Approach A: Simple CSV Export (Minimalist)
   - Single utility function in lib/utils/exportCSV.ts
   - Direct CSV generation with proper escaping
   - Browser download via Blob API
   - Button in expense list header
   - Estimated: 50 LOC, 1 file, 2 hours

   ## Approach B: Modal with Multiple Formats (Standard)
   - Export modal component with format selection
   - Support CSV, JSON, and basic text formats
   - Date range and category filtering
   - Preview before download
   - Estimated: 400 LOC, 4 files, 12 hours

   ## Approach C: Cloud Export System (Advanced)
   - Multi-tab export interface
   - Export templates (tax report, monthly summary)
   - Cloud destinations (email, Google Drive, Dropbox)
   - Export history and scheduling
   - Shareable links with QR codes
   - Estimated: 900 LOC, 8 files, 25 hours
   ```

3. **Fill out evaluation template** (conceptually):
   ```markdown
   ## Scoring Matrix

   | Category | Weight | Approach A | Approach B | Approach C |
   |----------|--------|------------|------------|------------|
   | Features | x3 | 5/10 (15) | 8/10 (24) | 10/10 (30) |
   | Cost | x2 | 10/10 (20) | 7/10 (14) | 4/10 (8) |
   | Timeline | x2 | 10/10 (20) | 8/10 (16) | 5/10 (10) |
   | Maintainability | x2 | 9/10 (18) | 8/10 (16) | 6/10 (12) |
   | **Total** | | **73** | **70** | **60** |
   ```

4. **Present recommendation**:
   ```markdown
   ## Recommendation: Approach B (Modal with Multiple Formats)

   **Reasoning:**
   - Meets all required features (CSV + extras)
   - Fits timeline (12 hours < 20-30 hour budget)
   - Good balance of functionality vs complexity
   - Professional UX without over-engineering
   - Leaves room for future enhancements

   **Approach A** is too basic for user expectations
   **Approach C** exceeds requirements and budget (25 hours)

   **Suggested Enhancement from C:**
   - Add export history to localStorage (low cost, high value)
   ```

5. **Wait for your approval** before implementing

#### Step 3: Review and Approve

You review the evaluation and either:
- ✅ Approve: "Looks good, proceed with Approach B"
- 🔄 Modify: "Use Approach A but add JSON export"
- ❌ Reject: "Actually, let's implement all 3 versions" (switches to Approach 1)

#### Step 4: Implementation

Claude Code implements the approved approach on a feature branch.

#### Step 5: Post-Implementation Documentation

After implementation, Claude Code updates the evaluation template with actual metrics:

```markdown
## Post-Implementation Update

### Estimated vs Actual

| Metric | Estimated | Actual | Variance |
|--------|-----------|--------|----------|
| LOC | 400 | 424 | +6% |
| Files | 4 | 5 | +25% (added types file) |
| Time | 12 hours | 14 hours | +17% |

### Lessons Learned
- CSV escaping more complex than expected (+2 hours)
- Added TypeScript types file for better type safety
- Preview feature worked perfectly (good estimate)
```

### When This Approach Excels

✅ **Standard features** with clear requirements
✅ **Time/budget** constraints (most projects)
✅ **Low-to-medium** risk features
✅ **Experienced** teams who know their stack
✅ **Iterative** projects (can refactor later)

### Advantages

✅ **Fast**: Only implement once (1x time vs 3x)
✅ **Practical**: Good enough for 80% of features
✅ **Structured**: Still benefits from evaluation framework
✅ **Flexible**: Can pivot to Approach 1 if needed
✅ **Realistic**: Fits real-world constraints

---

## 🔄 Hybrid Workflow (Recommended)

For most projects, use a **combination** of both approaches:

### Decision Tree

```
New Feature
    │
    ├─ Core feature? ────────────> YES ─> Approach 1 (Multi-Version)
    │                                      - Auth, Payments, Data Sync
    │
    ├─ High complexity? ─────────> YES ─> Approach 1 (Multi-Version)
    │                                      - Many valid approaches
    │
    ├─ High risk? ───────────────> YES ─> Approach 1 (Multi-Version)
    │                                      - Wrong choice expensive
    │
    └─ Everything else ──────────> NO ──> Approach 2 (Self-Eval)
                                           - Export, Forms, Filters
```

### Real Project Example

**Expense Tracker App - Feature Prioritization:**

| Feature | Approach | Reasoning |
|---------|----------|-----------|
| Authentication | Approach 1 | Core feature, high risk, many approaches |
| Data Export | Approach 2 | Supporting feature, clear requirements |
| Budget Alerts | Approach 2 | Standard notification feature |
| Multi-Currency | Approach 1 | Complex, affects entire app architecture |
| Dark Mode | Approach 2 | Well-established patterns exist |
| Receipt OCR | Approach 1 | Cutting-edge, many vendor options |
| Filters/Search | Approach 2 | Common pattern, low risk |
| Data Backup | Approach 1 | Critical, affects reliability |

**Result:**
- 3 features with Approach 1 (multi-version): 37.5%
- 5 features with Approach 2 (self-eval): 62.5%
- Weighted effort: 60% on Approach 1, 40% on Approach 2

---

## 📝 Template Files Quick Reference

### For Approach 1 (Multi-Version):
1. Use `app-evaluation-template.md` - Full template (all 14 sections)
2. Implement 3 versions on separate branches
3. Fill out template completely with real metrics
4. Refer to `code-analysis.md` for example

### For Approach 2 (Self-Evaluating):
1. Use `app-evaluation-quickstart.md` - Condensed template
2. Fill out critical sections only (conceptually)
3. Get approval before implementing
4. Update with actuals after implementation

### Supporting Files:
- `README_EVALUATION_FRAMEWORK.md` - Overview and integration guide
- `App_Features_Version_Summary.md` - User-facing documentation
- `code-analysis.md` - Complete example of Approach 1

---

## 🎯 Integration with App-Builder Profile

### For `/Users/Wolverine/agent-ai/profiles/app-builder`:

Add to profile instructions:

```markdown
# Feature Development Workflow

## When implementing new features:

1. **Assess feature complexity** using decision matrix in
   HOW_TO_USE_EVALUATION_TEMPLATE.md

2. **For complex/core features** (Approach 1):
   - Request 3 separate implementation prompts from user
   - Implement each on separate branch
   - Use app-evaluation-template.md (full) for comparison
   - Present recommendation with scoring matrix

3. **For standard features** (Approach 2):
   - Generate 3 conceptual approaches
   - Use app-evaluation-quickstart.md (condensed)
   - Present comparison and recommendation
   - Wait for approval before implementing

4. **Always document** the evaluation decision in the template

5. **Update post-implementation** with actual metrics vs estimates
```

---

## ⚡ Quick Start Examples

### Example 1: User Requests Export Feature (Standard)

**User says:** "Add export functionality to the expense tracker"

**You respond:**
```markdown
I'll evaluate different approaches for the export feature before implementing.
Let me generate 3 options using the evaluation framework...

[Generates conceptual comparison]

Based on your requirements, I recommend Approach B (Modal with
multi-format export). Here's why:
- Meets all requirements
- Fits 1-week timeline
- Professional UX
- Score: 70/100 (highest)

Shall I proceed with this approach?
```

### Example 2: User Requests Authentication (Complex)

**User says:** "Add user authentication to the app"

**You respond:**
```markdown
Authentication is a core feature with multiple valid approaches.
I recommend implementing 3 versions to compare:

Version 1: Session-based (traditional)
Version 2: JWT tokens (stateless)
Version 3: OAuth + social logins (modern UX)

This will take 3x the time upfront but ensures we choose the right
architecture for your long-term needs.

Would you like me to:
A) Implement all 3 versions for comparison (recommended)
B) Evaluate conceptually and implement 1 version
C) Provide detailed prompts for you to review first
```

---

## 🎓 Best Practices

### Do:
✅ Use Approach 1 for ~20% of features (high-impact)
✅ Use Approach 2 for ~80% of features (standard)
✅ Always document the decision (even brief notes)
✅ Update estimates vs actuals for learning
✅ Consider hybrid implementations (best of multiple)

### Don't:
❌ Use Approach 1 for every feature (wasteful)
❌ Skip evaluation entirely (leads to regret)
❌ Over-analyze simple features (paralysis)
❌ Ignore post-implementation learnings
❌ Forget to update the template after completion

---

## 📊 Success Metrics

Track these over time to improve your process:

```markdown
## Evaluation Framework Effectiveness

| Metric | Target | Actual |
|--------|--------|--------|
| Features using evaluation | >80% | ___ |
| Correct approach chosen | >90% | ___ |
| Estimate accuracy (time) | ±20% | ___ |
| Estimate accuracy (LOC) | ±30% | ___ |
| Refactoring needed | <10% | ___ |
| Team satisfaction | >8/10 | ___ |
```

# Summary: Two Valid Approaches

## Approach 1: Pre-Planned Multi-Version (What we did with export feature)
   - You provide: 3 separate detailed prompts for 3 different implementations
   - Claude implements: All 3 versions on separate branches
   - Then evaluates: Using actual code metrics
   - Best for: Complex/core features (20% of cases) - auth, payments, data architecture
   - Time cost: 3x upfront, but reduces long-term risk

## Approach 2: Self-Evaluating Single Prompt (More practical for most cases)
   - You provide: 1 prompt with requirements + evaluation instructions
   - Claude generates: 3 conceptual approaches (no code yet)
   - Claude evaluates: Using estimates and presents recommendation
   - You approve: Then Claude implements the chosen approach
   - Best for: Standard features (80% of cases) - exports, forms, filters
   - Time cost: 1x implementation time

# Recommendation
## Use Approach 2 (Self-Evaluating) as your default, because:
   - ✅ Only 1x implementation time (practical for real projects)
   - ✅ Still structured evaluation (prevents poor decisions)
   - ✅ Can pivot to Approach 1 if needed
   - ✅ Works for 80% of features

### Reserve Approach 1 (Multi-Version) for:
   - Core features (authentication, payments)
   - High-complexity architecture decisions
   - High-risk features where wrong choice is expensive
   - Cases with no clear "best practice"

## Quick Example Prompt (Approach 2)
### Add expense export feature

Requirements: CSV download, 1000+ records, 1 week timeline

Before implementing:
   1. Generate 3 conceptual approaches (minimalist, standard, advanced)
   2. Use @app-evaluation-template.md sections 1,2,3,8,10,11
   3. Present comparison with scoring matrix
   4. Wait for my approval
   5. Implement chosen approach

The new guide includes decision matrices, real examples, integration instructions for your app-builder profile, and best practices for both approaches!

---

## 🤝 Contributing

As you use this framework, please update:
- Add new decision criteria as you discover them
- Document edge cases and exceptions
- Share lessons learned from projects
- Improve scoring weights based on outcomes

---

**Framework Version:** 1.0
**Last Updated:** 2025-10-29
**Maintained By:** AI Engineering Team
**Status:** Production-Ready ✅
