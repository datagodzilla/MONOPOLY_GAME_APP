# App Feature Self-Evaluation Command

**Purpose**: Evaluate 3 conceptual approaches for a feature before implementation

**Command**: `/app-self-evaluate <feature-description>`

**Duration**: 15-30 minutes (evaluation only, no implementation)

**Profile**: app-builder

**Philosophy**: Think first, code second - Structured evaluation prevents poor architectural decisions

---

## What This Command Does

Implements **Approach 2 (Self-Evaluating)** from the evaluation framework:
- Generates 3 conceptual approaches (Minimalist, Standard, Advanced)
- Evaluates each approach using standardized criteria
- Presents comparison with scoring matrix
- Recommends best approach with reasoning
- Waits for approval before implementation

**This is NOT code implementation** - this command only evaluates approaches conceptually.

---

## When to Use This Command

✅ **Use for 80% of features:**
- Standard features with clear requirements
- Supporting features (export, filters, forms)
- Time/budget-constrained projects
- Low-to-medium risk features
- Features where best practices exist

❌ **Don't use for 20% of features (use Approach 1 instead):**
- Core features (authentication, payments, data sync)
- High-complexity architecture decisions
- High-risk features where wrong choice is expensive
- Features with no clear "best practice"

---

## Usage

### Basic Usage

```bash
/app-self-evaluate "Add expense export functionality"
```

### With Requirements

```bash
/app-self-evaluate "Add expense export functionality

Requirements:
- CSV download support
- Handle 1000+ records
- Timeline: 1 week
- Budget: 20-30 dev hours
- Must work on mobile and desktop"
```

### With Context

```bash
/app-self-evaluate "Add user authentication

Requirements:
- Email/password login
- JWT tokens
- Password reset flow
- Timeline: 2 weeks

Context:
- Next.js 14 + TypeScript
- No authentication currently exists
- Will add OAuth later (Phase 2)
- Team: 1 intermediate developer"
```

---

## Evaluation Workflow

### Step 1: Generate 3 Conceptual Approaches

**For each approach, define conceptually (no code yet):**

#### Approach A: Minimalist
- **What**: Basic functionality only
- **How**: Technical approach and architecture
- **Why**: Best for [specific scenario]
- **Estimated**: LOC, files, time, cost

#### Approach B: Standard
- **What**: Balanced feature set
- **How**: Technical approach and architecture
- **Why**: Best for [specific scenario]
- **Estimated**: LOC, files, time, cost

#### Approach C: Advanced
- **What**: Full-featured solution
- **How**: Technical approach and architecture
- **Why**: Best for [specific scenario]
- **Estimated**: LOC, files, time, cost

---

### Step 2: Use Evaluation Template

Fill out these **critical sections** from `app-evaluation-template.md`:

#### Required Sections:

**Part 1: Implementation Overview**
- 1.1 Version Summary Table (conceptual estimates)
- 1.2 One-Sentence Descriptions
- 1.3 Target Use Case for Each Version

**Part 2: Technical Architecture Analysis**
- 2.1 Architecture Pattern Comparison (conceptual)
- 2.2 File Organization (estimated structure)
- 2.3 Key Technical Decisions

**Part 3: Feature Comparison Matrix**
- 3.1 Core Functionality
- 3.2 User Experience Features
- 3.3 Advanced Capabilities

**Part 8: Development & Operational Costs**
- 8.1 Development Cost Breakdown (estimated)
- 8.2 Ongoing Maintenance Cost (estimated)

**Part 10: Decision Framework**
- 10.1 Requirements Alignment
- 10.2 Constraint Analysis
- 10.3 Risk Assessment
- 10.5 Final Scoring Matrix

**Part 11: Recommendations**
- 11.1 Primary Recommendation
- 11.2 Alternative Recommendations
- 11.3 Hybrid Approach (if applicable)

#### Optional Sections (include if relevant):

**Part 5: Performance Analysis** (if performance-critical)
- Bundle size estimates
- Runtime performance estimates
- Scalability assessment

**Part 7: Security Analysis** (if handling sensitive data)
- Security checklist
- Vulnerability assessment

**Part 9: UX Evaluation** (if UI-heavy feature)
- User journey comparison
- UX quality metrics

---

### Step 3: Present Comparison

**Output format:**

```markdown
# Feature Evaluation: [Feature Name]

## Executive Summary

**Feature**: [Name]
**Evaluated Approaches**: 3 (Minimalist, Standard, Advanced)
**Recommended**: Approach [X]
**Confidence**: High/Medium/Low

---

## Approach Comparison

### Approach A: Minimalist
**Description**: [One sentence]
**Estimated**: [LOC] lines, [N] files, [X] hours, $[Y]
**Best for**: [Scenario]

**Pros**:
- [Pro 1]
- [Pro 2]

**Cons**:
- [Con 1]
- [Con 2]

**Score**: [XX/100]

---

### Approach B: Standard
**Description**: [One sentence]
**Estimated**: [LOC] lines, [N] files, [X] hours, $[Y]
**Best for**: [Scenario]

**Pros**:
- [Pro 1]
- [Pro 2]

**Cons**:
- [Con 1]
- [Con 2]

**Score**: [XX/100]

---

### Approach C: Advanced
**Description**: [One sentence]
**Estimated**: [LOC] lines, [N] files, [X] hours, $[Y]
**Best for**: [Scenario]

**Pros**:
- [Pro 1]
- [Pro 2]

**Cons**:
- [Con 1]
- [Con 2]

**Score**: [XX/100]

---

## Scoring Matrix

| Category | Weight | Approach A | Approach B | Approach C |
|----------|--------|------------|------------|------------|
| Features | x3 | 5/10 (15) | 8/10 (24) | 10/10 (30) |
| Cost | x2 | 10/10 (20) | 7/10 (14) | 4/10 (8) |
| Timeline | x2 | 10/10 (20) | 8/10 (16) | 5/10 (10) |
| Maintainability | x2 | 9/10 (18) | 8/10 (16) | 6/10 (12) |
| UX | x2 | 6/10 (12) | 9/10 (18) | 10/10 (20) |
| Security | x1 | 8/10 (8) | 9/10 (9) | 10/10 (10) |
| **Total** | | **93** | **97** | **90** |

---

## Recommendation: Approach B (Standard)

### Reasoning:
1. **Meets all requirements** with [X] features
2. **Best balance** of functionality vs complexity
3. **Fits timeline** (12 hours < 20-30 hour budget)
4. **Highest score** (97/100) in weighted comparison
5. **Professional UX** without over-engineering

### Why Not Others:
- **Approach A** is too basic - missing [key feature]
- **Approach C** exceeds budget (25 hours) and adds unnecessary complexity

### Suggested Enhancements:
- Add [feature from C]: Low cost, high value
- Consider [pattern from A]: Simplifies maintenance

---

## Next Steps

**If you approve Approach B:**
1. Create feature branch: `feature/[name]`
2. Implement according to specifications
3. Follow TDD approach (if tests exist)
4. Estimated completion: [X] hours

**If you want modifications:**
- Tell me which aspects to adjust
- I can re-evaluate with new requirements

**If you want Approach 1 instead:**
- I can implement all 3 versions on separate branches
- This will take 3x time but provides real comparison
```

---

### Step 4: Wait for Approval

**DO NOT IMPLEMENT until user approves or requests changes.**

Possible responses:
- ✅ **Approve**: "Looks good, proceed with Approach B"
- 🔄 **Modify**: "Use Approach A but add JSON export"
- 🔀 **Switch**: "Actually, let's implement all 3 versions" (Approach 1)
- ❌ **Reject**: "These approaches don't fit, here's what I need..."

---

### Step 5: Post-Approval Implementation

After approval:
1. Create feature branch
2. Implement approved approach
3. Follow TDD if tests exist
4. Document key decisions in code comments

---

### Step 6: Post-Implementation Update

After implementation, update evaluation with actuals:

```markdown
## Post-Implementation Update

### Estimated vs Actual

| Metric | Estimated | Actual | Variance |
|--------|-----------|--------|----------|
| LOC | 400 | 424 | +6% |
| Files | 4 | 5 | +25% |
| Time | 12 hours | 14 hours | +17% |

### Lessons Learned
- CSV escaping more complex than expected (+2 hours)
- Added types file for better type safety
- Preview feature worked perfectly (accurate estimate)
```

---

## Evaluation Criteria

### Scoring System (1-10 scale)

**Features (Weight x3)**
- How many required features implemented?
- Quality of feature implementation
- Edge cases handled

**Cost (Weight x2)**
- Development time
- Maintenance cost
- Infrastructure cost

**Timeline (Weight x2)**
- Can we meet deadline?
- Implementation complexity
- Testing time

**Maintainability (Weight x2)**
- Code readability
- Modularity
- Documentation

**UX (Weight x2)**
- User experience quality
- Error handling
- Loading states

**Security (Weight x1)**
- Input validation
- Data protection
- Vulnerability risk

---

## Example Evaluation

### Feature: Expense Export

**Requirements**:
- CSV download
- Handle 1000+ records
- 1 week timeline
- 20-30 hour budget

### Approach A: Simple CSV Export

**Description**: Single utility function with browser download

**Technical Details**:
- 1 file: `lib/utils/exportCSV.ts` (~50 lines)
- Direct CSV generation with escaping
- Browser download via Blob API
- Button in expense list header

**Estimated**: 50 LOC, 1 file, 2 hours, $200

**Pros**:
- ✅ Fastest implementation (2 hours)
- ✅ Zero dependencies
- ✅ Minimal maintenance
- ✅ Simple and reliable

**Cons**:
- ❌ CSV format only
- ❌ No preview
- ❌ No filtering
- ❌ Basic user experience

**Best for**: MVP, proof of concept, tight deadlines

**Score**: 73/100

---

### Approach B: Modal with Multiple Formats

**Description**: Export modal with format selection and preview

**Technical Details**:
- 4 files:
  - `components/ExportModal.tsx` (~200 lines)
  - `lib/utils/exportCSV.ts` (~80 lines)
  - `lib/utils/exportJSON.ts` (~60 lines)
  - `lib/types/export.ts` (~60 lines)
- Modal UI with format selector
- Date range and category filtering
- Preview before download
- Progress indicator for large exports

**Estimated**: 400 LOC, 4 files, 12 hours, $1,200

**Pros**:
- ✅ Multiple formats (CSV, JSON)
- ✅ Professional UX
- ✅ Filtering capabilities
- ✅ Preview functionality
- ✅ Good balance

**Cons**:
- ❌ More complex than needed for CSV-only
- ❌ Moderate implementation time

**Best for**: Production apps, professional UX, standard requirements

**Score**: 97/100 ⭐ **RECOMMENDED**

---

### Approach C: Cloud Export System

**Description**: Full export system with templates and cloud destinations

**Technical Details**:
- 8 files:
  - `components/ExportTabs.tsx` (~300 lines)
  - `components/ExportTemplates.tsx` (~200 lines)
  - `components/ExportHistory.tsx` (~150 lines)
  - `lib/api/cloudExport.ts` (~200 lines)
  - Plus 4 utility/type files (~150 lines)
- Multi-tab interface
- Export templates (tax, monthly, yearly)
- Cloud destinations (email, Google Drive, Dropbox)
- Export history and scheduling
- Shareable links with QR codes
- Backend API required

**Estimated**: 900 LOC, 8 files, 25 hours, $2,500

**Pros**:
- ✅ Feature-complete
- ✅ Cloud integration
- ✅ Export templates
- ✅ Future-proof

**Cons**:
- ❌ Exceeds budget (25 hours > 20-30)
- ❌ Over-engineered for requirements
- ❌ Requires backend changes
- ❌ Complex maintenance

**Best for**: Enterprise apps, cloud-first products, when budget allows

**Score**: 85/100

---

### Scoring Matrix

| Category | Weight | Approach A | Approach B | Approach C |
|----------|--------|------------|------------|------------|
| **Features** | x3 | 5/10 (15) | 8/10 (24) | 10/10 (30) |
| **Cost** | x2 | 10/10 (20) | 7/10 (14) | 4/10 (8) |
| **Timeline** | x2 | 10/10 (20) | 8/10 (16) | 5/10 (10) |
| **Maintainability** | x2 | 9/10 (18) | 8/10 (16) | 6/10 (12) |
| **UX** | x2 | 6/10 (12) | 9/10 (18) | 10/10 (20) |
| **Security** | x1 | 8/10 (8) | 9/10 (9) | 10/10 (10) |
| **Total** | - | **93** | **97** | **90** |

### Recommendation: Approach B

**Reasoning**:
1. Highest score (97/100)
2. Meets all requirements (CSV + bonus formats)
3. Fits timeline (12 hours well within 20-30)
4. Professional UX without over-engineering
5. Good foundation for future enhancements

**Approach A** too basic - lacks filtering and preview
**Approach C** exceeds budget and over-engineered

**Enhancement from C**: Add export history to localStorage (low cost, +1 hour)

---

## Decision Matrix

Use this to determine if this command is appropriate:

```
Is this a standard feature?
    NO → Consider Approach 1 (Multi-Version)
    YES → Continue

Are requirements clear?
    NO → Clarify requirements first
    YES → Continue

Is this core functionality?
    YES → Consider Approach 1 (Multi-Version)
    NO → Continue

Is timeline flexible (>2 weeks)?
    YES → Consider Approach 1 (Multi-Version)
    NO → Continue

Is risk high (wrong choice expensive)?
    YES → Consider Approach 1 (Multi-Version)
    NO → Continue

→ USE THIS COMMAND (/app-self-evaluate)
```

---

## Integration with Existing Commands

### Workflow Integration

```bash
# 1. Set up project (if new)
/app-setup react-flask

# 2. Evaluate feature approaches
/app-self-evaluate "Add export functionality"
# → Review evaluation, approve approach

# 3. Implement approved approach
/app-code "Implement export feature (Approach B from evaluation)"

# 4. Run tests
/app-test

# 5. Validate
/app-validate
```

---

## Reference Documentation

This command uses these evaluation framework documents:

**Primary**:
- `app-evaluation-template.md` - Complete evaluation template
- `HOW_TO_USE_EVALUATION_TEMPLATE.md` - Usage guide with Approach 2

**Supporting**:
- `App_Features_Version_Summary.md` - Example evaluation
- `code-analysis.md` - Detailed code comparison example

**Location**: `/Users/Wolverine/agent-ai/profiles/app-builder/.claude/system-docs/app-evaluation-template/`

---

## Best Practices

### DO ✅

1. **Generate 3 distinct approaches** - Minimalist, Standard, Advanced
2. **Use consistent scoring** - Apply same criteria to all approaches
3. **Provide reasoning** - Explain why each score was given
4. **Consider all factors** - Features, cost, timeline, UX, security
5. **Wait for approval** - Don't implement until user confirms
6. **Document decisions** - Record why approach was chosen
7. **Update with actuals** - After implementation, compare estimates vs reality

### DON'T ❌

1. **Don't implement during evaluation** - This command is analysis only
2. **Don't skip scoring matrix** - Structured comparison prevents bias
3. **Don't over-engineer** - Recommend simplest approach that meets requirements
4. **Don't ignore constraints** - Timeline and budget are hard limits
5. **Don't forget security** - Always include security assessment
6. **Don't skip alternatives** - Show what happens if conditions change
7. **Don't use for core features** - Those need Approach 1 (actual implementations)

---

## Troubleshooting

### "Too many options, can't decide"
→ Use scoring matrix objectively, highest score wins

### "All scores are similar"
→ Focus on requirements alignment and constraints (timeline/budget)

### "User wants a 4th approach"
→ Evaluate it using same template, add to comparison

### "Requirements changed mid-evaluation"
→ Restart evaluation with new requirements

### "Need actual code to decide"
→ Switch to Approach 1 (implement all 3 versions)

---

## Success Metrics

Track these to improve evaluation accuracy:

```markdown
## Evaluation Effectiveness

| Metric | Target | Actual |
|--------|--------|--------|
| Correct approach chosen | >90% | ___ |
| Estimate accuracy (time) | ±20% | ___ |
| Estimate accuracy (LOC) | ±30% | ___ |
| Refactoring needed | <10% | ___ |
| User satisfaction | >8/10 | ___ |
```

---

## Related Commands

- `/app-setup` - Initialize project before evaluation
- `/app-code` - Implement approved approach
- `/app-test` - Test implementation
- `/app-validate` - Validate completed feature

---

**Command Status**: Production Ready ✅

**Version**: 1.0

**Created**: 2025-10-29

**Profile**: app-builder

**Approach**: Self-Evaluating (Approach 2)
