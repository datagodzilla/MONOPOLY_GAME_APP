# app-builder Templates

This directory contains reusable templates for the app-builder profile. Templates are designed to be copied, modified, and adapted for your specific use cases.

---

## 🚀 Quick Start

**New to multi-version evaluation?** Start here:

👉 **[EXAMPLE_USAGE.md](./multi-version-prompts/EXAMPLE_USAGE.md)** - Complete walkthrough showing exactly how to use the 3 templates with `/app-evaluate-planned-multiversion` from start to finish.

This example covers:
- Running the command with all 3 templates
- Implementation phase for each version
- Metrics gathering and testing
- Comprehensive evaluation report
- Decision-making process
- Hybrid approach selection
- Post-decision actions

---

## Available Templates

### Multi-Version Prompts

Located in [`multi-version-prompts/`](./multi-version-prompts/)

These templates show how to create detailed prompts for the **Pre-Planned Multi-Version** evaluation approach (Approach 1). Use these when implementing the `/app-evaluate-planned-multiversion` command.

#### Template Files

| Template | Description | Use Case |
|----------|-------------|----------|
| [export-feature-v1-simple.md](./multi-version-prompts/export-feature-v1-simple.md) | **Minimalist implementation** - Simple, functional approach with no dependencies | Baseline version, MVP features |
| [export-feature-v2-advanced.md](./multi-version-prompts/export-feature-v2-advanced.md) | **Advanced UI implementation** - Professional business app with rich options | Power user features, local processing |
| [export-feature-v3-cloud.md](./multi-version-prompts/export-feature-v3-cloud.md) | **Cloud-integrated implementation** - SaaS-style with sharing and integrations | Modern cloud service, collaboration |
| [**EXAMPLE_USAGE.md**](./multi-version-prompts/EXAMPLE_USAGE.md) | **Complete walkthrough** - Full example of using the 3 templates with `/app-evaluate-planned-multiversion` | Learn the entire workflow |

#### Example Context: Expense Tracker Export Feature

These templates demonstrate three completely different approaches to implementing the same feature (data export):

**Version 1 (Simple)**:
- Single CSV export button
- Standard browser APIs only
- Immediate download
- ~50 lines of code
- 1-2 hours implementation

**Version 2 (Advanced)**:
- Export modal with rich options
- Multiple formats (CSV, JSON, PDF)
- Date/category filtering
- Data preview
- Custom filenames
- ~300 lines of code
- 4-6 hours implementation

**Version 3 (Cloud)**:
- Email/share functionality
- Google Sheets integration
- Export scheduling
- Export history tracking
- Service integrations (Dropbox, OneDrive)
- ~500 lines of code
- 8-12 hours implementation

---

## How to Use These Templates

### For the `/app-evaluate-planned-multiversion` Command

1. **Copy a template** from `multi-version-prompts/`
2. **Adapt it to your feature**:
   - Replace "Export Feature" with your feature name
   - Modify requirements to match your use case
   - Adjust the implementation approach
   - Update version control branch names
3. **Create 3 versions** with distinct approaches:
   - V1: Minimalist (essential features only)
   - V2: Standard (balanced feature set)
   - V3: Advanced (comprehensive solution)
4. **Follow the evaluation workflow** in `/app-evaluate-planned-multiversion`

### Template Adaptation Example

Original template (export feature):
```markdown
## VERSION 2 REQUIREMENTS
- Export modal/dialog with multiple options
- Multiple export formats: CSV, JSON, and PDF
- Date range filtering for exports
```

Adapted for authentication feature:
```markdown
## VERSION 2 REQUIREMENTS
- Authentication modal with multiple options
- Multiple auth methods: Email/password, OAuth, Magic link
- Session configuration options (duration, remember me)
```

---

## When to Use Multi-Version Evaluation

Use the **Pre-Planned Multi-Version** approach (and these templates) for:

### High-Risk Features (20% of cases)
- Core application features (authentication, payments, data sync)
- Architectural decisions (state management, API design)
- Complex integrations (third-party services)
- Features with high implementation cost
- Features that are difficult to change later

### Decision Criteria

Use multi-version when **ANY** of these are true:
- ✅ Wrong choice would be expensive to fix
- ✅ Feature is core to application functionality
- ✅ Multiple viable approaches exist
- ✅ Architecture/design patterns unclear
- ✅ Performance/scalability critical
- ✅ Security implications significant

---

## Alternative: Self-Evaluate Approach

For **80% of features** (standard, low-risk), use `/app-self-evaluate` instead:
- No actual implementations (conceptual only)
- 1x implementation time
- Still uses evaluation framework
- Sufficient for most features

See: [`system-docs/app-evaluation-template/HOW_TO_USE_EVALUATION_TEMPLATE.md`](../.claude/system-docs/app-evaluation-template/HOW_TO_USE_EVALUATION_TEMPLATE.md)

---

## Creating Your Own Templates

When creating multi-version prompts for your features:

### 1. Define Clear Distinctions

Each version should be **fundamentally different**, not just incremental improvements:

**Good** (distinct approaches):
- V1: Client-side only
- V2: Client + server API
- V3: Fully serverless architecture

**Bad** (incremental improvements):
- V1: Basic button
- V2: Basic button with color
- V3: Basic button with color and icon

### 2. Specify Implementation Details

Be explicit about:
- Exact features included/excluded
- Technology choices
- Architecture patterns
- UI/UX flow
- File structure

### 3. Include Git Workflow

Always specify:
```markdown
## VERSION CONTROL
- Start from: main branch (clean state)
- Create branch: feature-[name]-v[number]
- Implement completely
- Commit with descriptive message
```

### 4. Set Clear Success Criteria

Define what "complete" means:
- Feature checklist
- Files created/modified
- Testing performed
- Documentation written

---

## Template Structure

A good multi-version prompt template includes:

```markdown
# PROMPT: [Feature Name] Version [N] - [Approach Name]

## VERSION CONTROL
- Branch strategy
- Starting point

## VERSION N REQUIREMENTS
- Specific features (bulleted list)
- Technology constraints
- UX/UI expectations

## IMPLEMENTATION APPROACH
- Philosophy of this version
- What makes it different
- Target user/use case

## PROCESS
1. Git workflow steps
2. Implementation steps
3. Testing steps
4. Commit strategy
```

---

## Best Practices

### Writing Prompts

1. **Be specific**: "Export modal with date range picker" > "Add export options"
2. **Set constraints**: "Use standard browser APIs only" (prevents dependency bloat)
3. **Define scope**: "V1 does NOT include..." (prevents feature creep)
4. **Show examples**: "Like Notion's export feature" (clarifies expectations)

### Version Differentiation

Make versions **conceptually different**, not just "more features":

| Good Differentiation | Poor Differentiation |
|---------------------|---------------------|
| Local vs. Cloud | 2 buttons vs. 3 buttons |
| Sync vs. Async | Modal vs. Drawer |
| REST vs. GraphQL | Blue vs. Green theme |
| Session vs. JWT | With icon vs. Without icon |

### Evaluation Focus

After implementing all versions, evaluate based on:
- **Code quality** (complexity, maintainability)
- **Performance** (bundle size, speed)
- **User experience** (flow, usability)
- **Development cost** (time, complexity)
- **Maintenance cost** (updates, bugs)
- **Business value** (features, differentiation)

---

## Examples by Feature Type

### Authentication Feature

**V1**: Simple email/password with session storage
**V2**: JWT-based with refresh tokens and OAuth
**V3**: Passwordless magic links with biometric support

### Payment Feature

**V1**: Direct Stripe integration in components
**V2**: Abstract payment service with Stripe implementation
**V3**: Multi-provider (Stripe, PayPal) with provider abstraction

### Data Sync Feature

**V1**: Polling every 30 seconds
**V2**: WebSocket real-time sync
**V3**: Hybrid polling + WebSocket with offline support

### Search Feature

**V1**: Client-side filtering of loaded data
**V2**: Server-side API search with debouncing
**V3**: Full-text search with Elasticsearch/Algolia

---

## Command Integration

These templates are designed for use with:

### `/app-evaluate-planned-multiversion`

Full workflow command that:
1. Creates 3 separate branches
2. Implements each version completely
3. Gathers real metrics (bundle size, performance, complexity)
4. Evaluates using all 14 template parts
5. Provides comprehensive comparison
6. Recommends best approach or hybrid solution

See: [`commands/app-evaluate-planned-multiversion/`](../.claude/commands/app-evaluate-planned-multiversion/)

### Related Commands

- `/app-self-evaluate` - For 80% of features (conceptual evaluation)
- `/app-setup` - Initialize new app-builder project
- `/app-backend` - Backend implementation
- `/app-frontend` - Frontend implementation

---

## Contributing Templates

When adding new templates to this directory:

1. **Follow naming convention**: `[feature-name]-v[n]-[approach].md`
2. **Include all sections**: Version control, requirements, approach, process
3. **Add to this README**: Update the templates table
4. **Test the template**: Verify it produces expected results
5. **Document differences**: Explain what makes each version unique

---

## Additional Resources

- [Evaluation Framework Docs](../.claude/system-docs/app-evaluation-template/)
- [HOW_TO_USE_EVALUATION_TEMPLATE.md](../.claude/system-docs/app-evaluation-template/HOW_TO_USE_EVALUATION_TEMPLATE.md)
- [Full Evaluation Template](../.claude/system-docs/app-evaluation-template/app-evaluation-template.md)

---

## Support

For questions about:
- **Using templates**: See `/app-evaluate-planned-multiversion` command
- **Evaluation framework**: See `system-docs/app-evaluation-template/`
- **Creating templates**: Follow examples in `multi-version-prompts/`

---

**Last Updated**: October 29, 2025
**Template Version**: 1.0
**Profile**: app-builder
