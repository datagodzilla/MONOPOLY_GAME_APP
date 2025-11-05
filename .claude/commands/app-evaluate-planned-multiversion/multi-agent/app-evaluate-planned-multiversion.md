# App Feature Multi-Version Evaluation Command

**Purpose**: Implement and evaluate 3 actual versions of a feature for comparison (Approach 1)

**Command**: `/app-evaluate-planned-multiversion <feature-description>`

**Duration**: 3x implementation time + evaluation (e.g., 30-50 hours for complex features)

**Profile**: app-builder

**Philosophy**: Build all options, compare with real data, choose best - Reduces long-term risk for critical features

---

## What This Command Does

Implements **Approach 1 (Pre-Planned Multi-Version)** from the evaluation framework:
- Implements 3 complete versions on separate branches
- Tests each implementation with real code
- Evaluates using actual metrics (LOC, performance, complexity)
- Presents comprehensive comparison with scoring
- Recommends best version or hybrid approach

**This involves actual code implementation** - all 3 versions are built and tested.

---

## When to Use This Command

✅ **Use for 20% of features (high-impact):**
- Core features (authentication, payments, data sync)
- High-complexity architecture decisions
- High-risk features where wrong choice is expensive
- Cases with no clear "best practice"
- Long-term strategic features
- Features requiring team learning

❌ **Don't use for 80% of features:**
- Standard features with known patterns
- Time-critical delivery (< 2 weeks)
- Low-risk supporting features
- Clear best approach exists
- Limited budget projects

Use `/app-self-evaluate` instead for standard features.

---

## Usage

### Basic Usage

```bash
/app-evaluate-planned-multiversion "Add user authentication system"
```

### With Requirements

```bash
/app-evaluate-planned-multiversion "Add user authentication system

Requirements:
- Email/password login
- JWT or session-based (evaluate both)
- Password reset flow
- Protected routes
- Timeline: 3-4 weeks
- Budget: 80-120 dev hours
- Team: 2 developers"
```

### With Context

```bash
/app-evaluate-planned-multiversion "Add payment processing

Requirements:
- Credit card payments
- Support Stripe and PayPal
- Subscription billing
- Invoice generation
- Timeline: 6 weeks

Context:
- Next.js 14 + TypeScript
- Revenue-critical feature
- Must handle $100K+/month
- PCI compliance required
- Team has no payments experience

Evaluation needed:
Version 1: Stripe only (simple)
Version 2: Stripe + PayPal (flexible)
Version 3: Abstract payment service (future-proof)"
```

---

## Implementation Workflow

### Step 1: Define 3 Distinct Versions

**Create detailed specifications for each version:**

#### Version 1: Minimalist/Simple
- **Focus**: Core functionality only
- **Complexity**: Low (300-500 LOC)
- **Time**: 8-12 hours
- **Best for**: MVPs, prototypes, tight budgets
- **Example**: Session-based auth with NextAuth

#### Version 2: Standard/Balanced
- **Focus**: Professional feature set
- **Complexity**: Medium (600-900 LOC)
- **Time**: 16-24 hours
- **Best for**: Production apps, standard requirements
- **Example**: JWT auth with refresh tokens

#### Version 3: Advanced/Full-Featured
- **Focus**: Complete solution with extras
- **Complexity**: High (900-1200 LOC)
- **Time**: 24-30 hours
- **Best for**: Enterprise, long-term products
- **Example**: OAuth + social logins + MFA

---

### Step 2: Implement Each Version

**For each version, create separate branch and implement fully:**

```bash
# Version 1: Minimalist
git checkout main
git checkout -b feature-[name]-v1

# Implement Version 1 completely
# - All files
# - All functionality
# - Basic tests
# - Documentation

git add .
git commit -m "feat: implement [feature] version 1 (minimalist)"

# Version 2: Standard
git checkout main
git checkout -b feature-[name]-v2

# Implement Version 2 completely
# - Different architecture
# - Different approach
# - More features
# - Comprehensive tests

git add .
git commit -m "feat: implement [feature] version 2 (standard)"

# Version 3: Advanced
git checkout main
git checkout -b feature-[name]-v3

# Implement Version 3 completely
# - Advanced architecture
# - Full feature set
# - Extensive tests
# - Complete documentation

git add .
git commit -m "feat: implement [feature] version 3 (advanced)"
```

---

### Step 3: Systematic Evaluation

**Use the complete evaluation template for ALL sections:**

#### Required Evaluation Sections

Use `app-evaluation-template.md` - **ALL 14 parts**:

**Part 1: Implementation Overview**
- 1.1 Version Summary Table (actual metrics)
- 1.2 One-Sentence Descriptions
- 1.3 Target Use Case for Each Version

**Part 2: Technical Architecture Analysis**
- 2.1 Architecture Pattern Comparison
- 2.2 File Organization (actual structure)
- 2.3 Key Technical Decisions

**Part 3: Feature Comparison Matrix**
- 3.1 Core Functionality
- 3.2 User Experience Features
- 3.3 Advanced Capabilities

**Part 4: Code Quality Metrics**
- 4.1 Complexity Analysis (cyclomatic, cognitive)
- 4.2 Type Safety Score
- 4.3 Error Handling
- 4.4 Test Coverage Potential

**Part 5: Performance Analysis**
- 5.1 Bundle Size Impact (measured)
- 5.2 Runtime Performance (benchmarked)
- 5.3 Scalability Assessment (tested)

**Part 6: Maintainability & Extensibility**
- 6.1 Maintainability Score
- 6.2 Extensibility Assessment
- 6.3 Refactoring Opportunities

**Part 7: Security Analysis**
- 7.1 Security Checklist
- 7.2 Vulnerability Assessment

**Part 8: Development & Operational Costs**
- 8.1 Development Cost Breakdown (actual time)
- 8.2 Ongoing Maintenance Cost (estimated)
- 8.3 Infrastructure Cost (if applicable)

**Part 9: User Experience Evaluation**
- 9.1 User Journey Comparison (actual testing)
- 9.2 UX Quality Metrics
- 9.3 User Feedback Categories

**Part 10: Decision Framework**
- 10.1 Requirements Alignment
- 10.2 Constraint Analysis
- 10.3 Risk Assessment
- 10.4 Decision Tree
- 10.5 Final Scoring Matrix

**Part 11: Recommendations**
- 11.1 Primary Recommendation
- 11.2 Alternative Recommendations
- 11.3 Hybrid Approach (if applicable)
- 11.4 Migration Path

**Part 12: Production Readiness Checklist**
- Per-version production readiness assessment

**Part 13: Lessons Learned & Insights**
- What worked, what didn't, insights, anti-patterns

**Part 14: Next Steps**
- Immediate actions, post-decision tasks, monitoring plan

---

### Step 4: Branch-by-Branch Analysis

**Switch between branches to gather real metrics:**

```bash
# Analyze Version 1
git checkout feature-[name]-v1

# Gather metrics
- Run app and test thoroughly
- Measure bundle size: npm run build (check output)
- Count lines: cloc src/ (or wc -l)
- Test performance: lighthouse, performance profiler
- Review code complexity: eslint, code review
- Run tests: npm test (check coverage)
- Document findings in evaluation template

# Analyze Version 2
git checkout feature-[name]-v2

# Repeat all metric gathering
- Same measurements as V1
- Compare side-by-side
- Note differences in architecture
- Test same scenarios for comparison

# Analyze Version 3
git checkout feature-[name]-v3

# Complete all measurements
- Full metric suite
- Performance comparison
- Security review
- Complete evaluation template
```

---

### Step 5: Comprehensive Comparison

**Create detailed evaluation report:**

```markdown
# Feature Evaluation: [Feature Name]
## Multi-Version Implementation Comparison (Approach 1)

**Evaluation Date**: [Date]
**Evaluator**: [Name/Team]
**Versions Implemented**: 3 (V1: Minimalist, V2: Standard, V3: Advanced)

---

## Executive Summary

**Feature**: [Name and description]
**Evaluation Type**: Pre-planned multi-version (Approach 1)
**Implementations**: All 3 versions fully implemented and tested
**Recommended**: Version [X] [with/without hybrid features]
**Confidence**: High (based on actual code metrics)

### Quick Comparison

| Metric | V1 | V2 | V3 |
|--------|----|----|-----|
| **LOC** | [actual] | [actual] | [actual] |
| **Files** | [actual] | [actual] | [actual] |
| **Time** | [actual hours] | [actual hours] | [actual hours] |
| **Bundle** | [actual KB] | [actual KB] | [actual KB] |
| **Tests** | [actual %] | [actual %] | [actual %] |
| **Score** | [XX/100] | [XX/100] | [XX/100] |

---

## Version 1: Minimalist

### Implementation Details
**Branch**: feature-[name]-v1
**Commit**: [hash]
**LOC**: [actual count] lines
**Files**: [actual count] files
**Implementation Time**: [actual hours] hours

### Architecture
[Describe actual architecture implemented]

### Features Implemented
✅ [Feature 1]
✅ [Feature 2]
✅ [Feature 3]
❌ [Feature 4] (not included)
❌ [Feature 5] (not included)

### Actual Performance
- Bundle size: [measured KB]
- Load time: [measured ms]
- Operation time: [measured ms]

### Code Quality
- Cyclomatic complexity: [measured]
- Type coverage: [measured %]
- Test coverage: [measured %]

### Pros (From Real Implementation)
- ✅ [Actual pro discovered during implementation]
- ✅ [Actual pro discovered during testing]

### Cons (From Real Implementation)
- ❌ [Actual limitation found]
- ❌ [Actual issue encountered]

### Score: [XX/100]

---

## Version 2: Standard

[Same detailed analysis as V1, with actual metrics]

---

## Version 3: Advanced

[Same detailed analysis as V1, with actual metrics]

---

## Comprehensive Scoring Matrix

| Category | Weight | V1 (Actual) | V2 (Actual) | V3 (Actual) |
|----------|--------|-------------|-------------|-------------|
| **Features** | x3 | [score] ([weighted]) | [score] ([weighted]) | [score] ([weighted]) |
| **Code Quality** | x2 | [score] ([weighted]) | [score] ([weighted]) | [score] ([weighted]) |
| **Performance** | x2 | [measured score] | [measured score] | [measured score] |
| **Maintainability** | x2 | [reviewed score] | [reviewed score] | [reviewed score] |
| **Security** | x2 | [assessed score] | [assessed score] | [assessed score] |
| **UX** | x2 | [tested score] | [tested score] | [tested score] |
| **Cost** | x2 | [actual score] | [actual score] | [actual score] |
| **Timeline** | x2 | [actual score] | [actual score] | [actual score] |
| **Scalability** | x1 | [tested score] | [tested score] | [tested score] |
| **Extensibility** | x1 | [assessed score] | [assessed score] | [assessed score] |
| **Total** | | **[XXX]** | **[XXX]** | **[XXX]** |

---

## Detailed Findings

### Performance Comparison (Measured)

| Metric | V1 | V2 | V3 | Winner |
|--------|----|----|-----|--------|
| Bundle Size | [KB] | [KB] | [KB] | [VX] |
| Initial Load | [ms] | [ms] | [ms] | [VX] |
| Time to Interactive | [ms] | [ms] | [ms] | [VX] |
| Memory Usage | [MB] | [MB] | [MB] | [VX] |
| Operation Speed (100 items) | [ms] | [ms] | [ms] | [VX] |
| Operation Speed (1000 items) | [ms] | [ms] | [ms] | [VX] |

### Code Quality Comparison (Analyzed)

| Metric | V1 | V2 | V3 | Winner |
|--------|----|----|-----|--------|
| Cyclomatic Complexity | [X.X] | [X.X] | [X.X] | [VX] |
| Type Coverage | [%] | [%] | [%] | [VX] |
| Test Coverage | [%] | [%] | [%] | [VX] |
| ESLint Warnings | [count] | [count] | [count] | [VX] |
| File Size (avg) | [lines] | [lines] | [lines] | [VX] |
| Function Size (avg) | [lines] | [lines] | [lines] | [VX] |

### Development Cost Comparison (Actual)

| Cost Type | V1 | V2 | V3 |
|-----------|----|----|-----|
| Implementation | [actual hours] | [actual hours] | [actual hours] |
| Testing | [actual hours] | [actual hours] | [actual hours] |
| Documentation | [actual hours] | [actual hours] | [actual hours] |
| Total | [hours] | [hours] | [hours] |
| Cost @ $100/hr | $[amount] | $[amount] | $[amount] |

---

## Recommendation: Version [X]

### Primary Recommendation

**Choose**: Version [X]

**Reasoning**:
1. **Highest score** ([XXX]/100) in weighted comparison
2. **Meets requirements** with [key features]
3. **Best balance** of [trade-offs]
4. **Validated by testing** - [key finding]
5. **Acceptable cost** - [hours] within [budget] budget

### Why Not Others

**Version [Y]**:
- [Specific finding from implementation]
- [Actual limitation discovered]
- [Measured metric that fell short]

**Version [Z]**:
- [Specific finding from implementation]
- [Actual limitation discovered]
- [Measured metric that fell short]

### Hybrid Approach

**Recommended**: Take Version [X] as base, add features from [Y] and [Z]

**From Version [Y]**:
- [Feature/component]: [Why - based on actual code]
- [Pattern/approach]: [Why - based on testing]
- **Effort**: [estimated hours] to cherry-pick

**From Version [Z]**:
- [Feature/component]: [Why - based on actual code]
- [Pattern/approach]: [Why - based on testing]
- **Effort**: [estimated hours] to integrate

**Total Hybrid Effort**: [hours] additional work
**Total Time**: [X hours] + [Y hours hybrid] = [Z hours]

### Migration Path

**Phase 1 (Immediate)**:
- Merge Version [X] to main
- Deploy to production
- Monitor: [metrics]

**Phase 2 (Month 2)**:
- Add features from hybrid plan
- User feedback integration
- Performance optimization

**Phase 3 (Month 3+)**:
- Evaluate remaining features from other versions
- Iterative improvements

---

## Implementation Strategy

### Merge Plan

```bash
# Primary recommendation: Version 2
git checkout main
git merge feature-[name]-v2 --no-ff

# Cherry-pick from Version 3
git cherry-pick [commit-hash] # Feature X from V3

# Test hybrid approach
npm test
npm run build

# Commit hybrid
git commit -m "feat: hybrid [feature] (V2 base + V3 features)"
```

### Cleanup

```bash
# Archive non-selected branches
git tag archive/feature-[name]-v1 feature-[name]-v1
git tag archive/feature-[name]-v3 feature-[name]-v3

# Delete working branches (archived in tags)
git branch -d feature-[name]-v1
git branch -d feature-[name]-v3

# Keep final implementation
git branch -d feature-[name]-v2  # merged to main
```

---

## Lessons Learned

### Unexpected Findings

1. **[Finding 1]**: [What we discovered during implementation]
   - **Impact**: [How it changed our thinking]

2. **[Finding 2]**: [What testing revealed]
   - **Impact**: [How it affected the decision]

3. **[Finding 3]**: [Performance insight]
   - **Impact**: [Optimization applied]

### What Worked

- **Version 1**: [Specific success]
- **Version 2**: [Specific success]
- **Version 3**: [Specific success]

### What Didn't Work

- **Version 1**: [Specific issue]
- **Version 2**: [Specific issue]
- **Version 3**: [Specific issue]

### Key Insights

1. [Insight about architecture]
2. [Insight about performance]
3. [Insight about user experience]

---

## Post-Implementation Update

**Chosen Approach**: [Final decision]
**Deployment Date**: [Date]
**Actual vs Estimated**:

| Metric | Estimated | Actual | Variance |
|--------|-----------|--------|----------|
| Implementation Time | [hours] | [hours] | [%] |
| Bundle Size | [KB] | [KB] | [%] |
| Performance | [ms] | [ms] | [%] |
| User Satisfaction | [score] | [score] | [%] |

---

**Status**: ✅ Complete
**Confidence**: High (actual implementations tested)
**Documentation**: Complete evaluation in app-evaluation-template.md
```

---

### Step 6: Make Decision

**Present findings to stakeholders:**

1. **Executive Summary** (5 minutes)
   - Quick comparison table
   - Recommendation
   - Key findings

2. **Detailed Analysis** (as needed)
   - Performance data
   - Code quality metrics
   - Cost comparison
   - Risk assessment

3. **Q&A and Decision**
   - Address concerns
   - Discuss hybrid options
   - Finalize choice

4. **Implementation Plan**
   - Merge strategy
   - Timeline
   - Success metrics

---

## Decision Matrix

Use this to determine if multi-version approach is appropriate:

```
Is this a core feature?
    NO → Use /app-self-evaluate
    YES → Continue

Are requirements unclear?
    YES → Continue (multi-version helps clarify)
    NO → Check risk

Is wrong choice expensive?
    NO → Use /app-self-evaluate
    YES → Continue

Do you have 3+ weeks?
    NO → Use /app-self-evaluate
    YES → Continue

Is budget sufficient (3x time)?
    NO → Use /app-self-evaluate
    YES → Continue

Is this high-complexity?
    NO → Use /app-self-evaluate
    YES → Continue

→ USE THIS COMMAND (/app-evaluate-planned-multiversion)
```

---

## Example Use Cases

### Example 1: Authentication System

**Why Multi-Version**:
- Core feature affecting entire app
- Multiple valid approaches (session vs JWT vs OAuth)
- Wrong choice costly to change later
- Security implications
- No team experience with auth

**Versions**:
1. Session-based (NextAuth, simple)
2. JWT tokens (stateless, scalable)
3. OAuth + social logins (modern UX)

**Time**: ~60 hours (20 hours × 3 versions)

**Outcome**: Chose V2 (JWT) + social login from V3

---

### Example 2: Payment Processing

**Why Multi-Version**:
- Revenue-critical feature
- Multiple vendors (Stripe, PayPal, etc.)
- Complex error handling requirements
- PCI compliance concerns
- High stakes if wrong

**Versions**:
1. Stripe only (focused)
2. Stripe + PayPal (flexible)
3. Abstract payment service (future-proof)

**Time**: ~90 hours (30 hours × 3 versions)

**Outcome**: Chose V3 (abstract service) for long-term flexibility

---

### Example 3: Data Synchronization

**Why Multi-Version**:
- Affects entire application architecture
- Multiple strategies (polling, websockets, SSE)
- Performance critical
- Complex error scenarios
- Scalability concerns

**Versions**:
1. Simple polling (5-second interval)
2. WebSocket real-time sync
3. Hybrid (WebSocket + fallback polling)

**Time**: ~75 hours (25 hours × 3 versions)

**Outcome**: Chose V3 (hybrid) for reliability + UX

---

## Integration with Existing Commands

### Workflow Integration

```bash
# 1. Set up project (if new)
/app-setup react-flask

# 2. Multi-version implementation and evaluation
/app-evaluate-planned-multiversion "Add authentication system"
# → Implements V1, V2, V3 on branches
# → Tests all versions
# → Evaluates with real metrics
# → Presents comprehensive comparison

# 3. Decision point (user reviews)
# "Looks good, merge V2 with social login from V3"

# 4. Merge chosen version
git checkout main
git merge feature-auth-v2
git cherry-pick feature-auth-v3 -- lib/auth/social.ts

# 5. Run tests
/app-test

# 6. Validate
/app-validate
```

---

## Reference Documentation

This command uses these evaluation framework documents:

**Primary**:
- `app-evaluation-template.md` - Complete 14-part evaluation template
- `HOW_TO_USE_EVALUATION_TEMPLATE.md` - Approach 1 workflow
- Location: `.claude/system-docs/app-evaluation-template/`

**Example Templates**:
- `export-feature-v1-simple.md` - Example V1 implementation (minimalist)
- `export-feature-v2-advanced.md` - Example V2 prompt (advanced UI)
- `export-feature-v3-cloud.md` - Example V3 prompt (cloud integration)
- Location: `.claude/templates/multi-version-prompts/`

**Template Index**:
- `.claude/templates/README.md` - Complete templates guide

**Supporting**:
- `App_Features_Version_Summary.md` - User-facing documentation
- `README_EVALUATION_FRAMEWORK.md` - Framework overview
- `code-analysis.md` - Complete evaluation example
- Location: `.claude/system-docs/app-evaluation-template/`

---

## Best Practices

### DO ✅

1. **Implement all 3 versions fully** - No shortcuts or partial implementations
2. **Use separate branches** - Keep versions independent
3. **Test thoroughly** - Real performance metrics, not estimates
4. **Document as you go** - Capture insights during implementation
5. **Be objective** - Don't favor one version during evaluation
6. **Measure everything** - Bundle size, performance, complexity
7. **Consider hybrid** - Best parts from multiple versions
8. **Archive branches** - Tag non-selected versions for reference

### DON'T ❌

1. **Don't skip versions** - Need all 3 for comparison
2. **Don't estimate metrics** - Use actual measurements
3. **Don't rush evaluation** - Thorough analysis is the point
4. **Don't ignore findings** - Unexpected discoveries are valuable
5. **Don't delete branches immediately** - May need to reference later
6. **Don't use for simple features** - Massive overkill (use /app-self-evaluate)
7. **Don't skip documentation** - Future you needs this evaluation
8. **Don't ignore stakeholder input** - This is a team decision

---

## Cost-Benefit Analysis

### Costs

**Time**: 3x implementation time + evaluation time
- Version 1: 10-20 hours
- Version 2: 15-30 hours
- Version 3: 20-40 hours
- Evaluation: 5-10 hours
- **Total**: 50-100 hours for typical feature

**Effort**: Requires discipline and organization
- Branch management
- Consistent testing
- Thorough documentation
- Stakeholder coordination

### Benefits

**Long-term risk reduction**:
- See actual trade-offs, not theoretical
- Discover issues before committing
- Make data-driven decisions
- Avoid costly refactors later

**Team learning**:
- Hands-on experience with patterns
- Knowledge sharing across approaches
- Build pattern library for future

**Better decisions**:
- Real metrics vs estimates
- Unexpected findings surface
- Confidence in chosen approach
- Clear justification for stakeholders

### When Benefits Outweigh Costs

✅ **Use when**:
- Feature will live for years
- Wrong choice costs months to fix
- Team learning is valuable
- Budget allows exploration
- Risk is high

❌ **Skip when**:
- Quick prototype needed
- Clear best practice exists
- Low-risk supporting feature
- Tight budget/timeline
- Single obvious solution

---

## Troubleshooting

### "Taking too long"
→ May be wrong approach for this feature - consider /app-self-evaluate

### "All versions similar scores"
→ Good! Means any choice is valid - pick simplest (usually V1 or V2)

### "Can't decide between two versions"
→ Implement hybrid - take best parts from each

### "Found critical issue in all versions"
→ Step back and reconsider approach - may need new versions

### "Requirements changed mid-implementation"
→ Pivot - update versions or start fresh with new requirements

### "Stakeholders can't agree"
→ Use scoring matrix objectively, let data decide

---

## Success Metrics

Track these to validate the multi-version approach:

```markdown
## Multi-Version Evaluation Effectiveness

| Metric | Target | Actual |
|--------|--------|--------|
| Correct choice made | >95% | ___ |
| Avoided refactor | >90% | ___ |
| Team learning gained | High | ___ |
| Unexpected issues found | >2 | ___ |
| Decision confidence | >9/10 | ___ |
| Long-term satisfaction | >8/10 | ___ |
```

---

## Comparison: Approach 1 vs Approach 2

| Aspect | Approach 1 (This Command) | Approach 2 (/app-self-evaluate) |
|--------|---------------------------|----------------------------------|
| **Implementation** | All 3 versions (actual code) | 0 versions (conceptual) |
| **Time Cost** | 3x (50-100 hours) | 1x (15-30 hours) |
| **Data Quality** | Real metrics | Estimates |
| **Risk Mitigation** | Very high | Medium |
| **Use Cases** | Core/complex (20%) | Standard (80%) |
| **Confidence** | Very high (tested) | Medium (estimated) |
| **Learning Value** | Very high | Medium |
| **Best For** | Auth, payments, architecture | Exports, forms, filters |

---

## Related Commands

- `/app-setup` - Initialize project before evaluation
- `/app-self-evaluate` - Alternative for standard features (80% of cases)
- `/app-code` - Implement individual versions
- `/app-test` - Test each version
- `/app-validate` - Validate chosen implementation

---

**Command Status**: Production Ready ✅

**Version**: 1.0

**Created**: 2025-10-29

**Profile**: app-builder

**Approach**: Pre-Planned Multi-Version (Approach 1)

**Time Investment**: 3x upfront, reduces long-term risk

**Best For**: Core features, complex decisions, high-risk situations (20% of features)
