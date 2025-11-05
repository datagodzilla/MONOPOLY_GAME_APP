# App Document Generator Command

**Purpose**: Automatically generate both technical developer documentation and user-friendly guides for a new web app feature

**Command**: `/app-document-generator <feature-name>`

**Duration**: 3-5 minutes

**Profile**: app-builder

**Philosophy**: Document once, serve two audiences - Developers need technical details, users need simple guides

---

## Overview

This command analyzes a feature implementation and generates two comprehensive documentation files:
1. **Developer Documentation** - Technical specs, API details, implementation notes
2. **User Documentation** - Simple guide with step-by-step instructions

The command automatically:
- Detects if the feature is frontend/backend/full-stack
- Analyzes relevant code files
- Generates documentation in appropriate directories
- Creates cross-references between dev and user docs
- Adds placeholders for screenshots in user docs
- Links to related existing documentation

---

## Usage

```bash
# Document a feature
/app-document-generator password-reset

# Document a frontend feature
/app-document-generator user-dashboard

# Document a backend feature
/app-document-generator api-authentication

# Document a full-stack feature
/app-document-generator payment-processing
```

---

## What This Command Does

**Steps**:
1. **Analyze feature name** - Determine scope and type
2. **Detect feature type** - Frontend/backend/full-stack
3. **Find relevant files** - Search codebase for feature implementation
4. **Analyze code** - Extract APIs, components, routes, models
5. **Create documentation directories** - Ensure `docs/dev/` and `docs/user/` exist
6. **Generate developer docs** - Technical specifications
7. **Generate user docs** - User-friendly guide
8. **Add cross-references** - Link between docs
9. **Link related docs** - Find and link existing documentation
10. **Verify output** - Ensure both files created successfully

**Total Time**: 3-5 minutes (depending on feature complexity)

---

## Step 1: Analyze Feature Name and Detect Type

**Task**: Determine what type of feature we're documenting

```bash
#!/bin/bash

FEATURE_NAME="$1"

if [ -z "$FEATURE_NAME" ]; then
  echo "❌ Error: Feature name is required"
  echo "Usage: /app-document-generator <feature-name>"
  exit 1
fi

echo "📝 Documenting feature: $FEATURE_NAME"
echo ""

# Search for files related to this feature
echo "🔍 Searching for feature implementation..."

# Search frontend (React/Vue components)
FRONTEND_FILES=$(find src -type f \( -name "*${FEATURE_NAME}*" -o -name "*$(echo $FEATURE_NAME | sed 's/-//g')*" \) 2>/dev/null || echo "")

# Search backend (Flask/Express routes and models)
BACKEND_FILES=$(find backend -type f \( -name "*${FEATURE_NAME}*" -o -name "*$(echo $FEATURE_NAME | sed 's/-//g')*" \) 2>/dev/null || echo "")

# Determine feature type
if [ -n "$FRONTEND_FILES" ] && [ -n "$BACKEND_FILES" ]; then
  FEATURE_TYPE="full-stack"
  echo "🟣 Detected: Full-stack feature (frontend + backend)"
elif [ -n "$FRONTEND_FILES" ]; then
  FEATURE_TYPE="frontend"
  echo "🔵 Detected: Frontend feature"
elif [ -n "$BACKEND_FILES" ]; then
  FEATURE_TYPE="backend"
  echo "🟢 Detected: Backend feature"
else
  echo "⚠️  Warning: No files found, will create generic documentation"
  FEATURE_TYPE="generic"
fi

echo ""
echo "📂 Found files:"
[ -n "$FRONTEND_FILES" ] && echo "Frontend: $FRONTEND_FILES"
[ -n "$BACKEND_FILES" ] && echo "Backend: $BACKEND_FILES"
echo ""
```

---

## Step 2: Create Documentation Directories

**Task**: Ensure documentation folders exist

```bash
#!/bin/bash

# Create documentation directories if they don't exist
mkdir -p docs/dev
mkdir -p docs/user

echo "✅ Documentation directories ready:"
echo "   - docs/dev/ (developer documentation)"
echo "   - docs/user/ (user guides)"
echo ""
```

---

## Step 3: Analyze Code Files

**Task**: Extract relevant information from code

**For Frontend Features**:
```bash
# Analyze React/Vue components
# Look for:
# - Component props/interfaces
# - Exported functions
# - State management (useState, Vuex)
# - API calls
# - Event handlers

# Example analysis:
grep -E "(export|function|const|interface|type)" src/components/${FEATURE_NAME}*.jsx
grep -E "(useState|useEffect|props|emit)" src/components/${FEATURE_NAME}*.jsx
grep -E "(fetch|axios|api)" src/components/${FEATURE_NAME}*.jsx
```

**For Backend Features**:
```bash
# Analyze Flask/Express routes
# Look for:
# - Route definitions (@app.route, router.get/post)
# - Request/response schemas
# - Database models
# - Business logic functions

# Example analysis:
grep -E "(@app.route|@.*_bp.route|router\.(get|post|put|delete))" backend/api/routes/${FEATURE_NAME}*.py
grep -E "(class.*Model|Table|Column|relationship)" backend/models/${FEATURE_NAME}*.py
grep -E "(def |async def)" backend/api/routes/${FEATURE_NAME}*.py
```

---

## Step 4: Generate Developer Documentation

**Task**: Create technical documentation for developers

**Template**: `docs/dev/<feature-name>-implementation.md`

```markdown
# [Feature Name] - Developer Documentation

**Feature Type**: [Frontend/Backend/Full-Stack]
**Status**: [Implemented/In Progress/Planned]
**Last Updated**: [Date]

---

## Overview

[Brief description of what this feature does from a technical perspective]

---

## Architecture

### Component/Module Structure

[For Frontend]
\`\`\`
src/
├── components/
│   └── [FeatureName].jsx          # Main component
├── hooks/
│   └── use[FeatureName].js        # Data fetching logic
└── utils/
    └── [featureName]Validation.js # Validation utilities
\`\`\`

[For Backend]
\`\`\`
backend/
├── api/routes/
│   └── [feature_name].py          # API routes
├── models/
│   └── [feature_name].py          # Database models
└── utils/
    └── [feature_name]_helpers.py  # Helper functions
\`\`\`

---

## API Endpoints

[For Backend/Full-Stack features]

### Endpoint: [Method] /api/[route]

**Description**: [What this endpoint does]

**Request**:
\`\`\`json
{
  "field1": "value",
  "field2": "value"
}
\`\`\`

**Response**:
\`\`\`json
{
  "status": "success",
  "data": {
    "result": "value"
  }
}
\`\`\`

**Authentication**: [Required/Optional]

**Validation**:
- Field1: [validation rules]
- Field2: [validation rules]

**Error Codes**:
- 400: [Bad request reasons]
- 401: [Unauthorized reasons]
- 500: [Server error reasons]

---

## Components

[For Frontend/Full-Stack features]

### Component: [ComponentName]

**File**: `src/components/[ComponentName].jsx`

**Props**:
\`\`\`typescript
interface [ComponentName]Props {
  prop1: string;
  prop2: number;
  onAction?: () => void;
}
\`\`\`

**State**:
- `state1`: [description]
- `state2`: [description]

**Hooks Used**:
- `use[Feature]`: [description]
- `useEffect`: [description]

**Events**:
- `onClick`: [description]
- `onSubmit`: [description]

---

## Database Models

[For Backend/Full-Stack features]

### Model: [ModelName]

**File**: `backend/models/[model_name].py`

**Schema**:
\`\`\`python
class [ModelName](db.Model):
    id = Column(Integer, primary_key=True)
    field1 = Column(String(255), nullable=False)
    field2 = Column(DateTime, default=datetime.utcnow)
    # ... additional fields
\`\`\`

**Relationships**:
- `relationship_name`: [description]

**Indexes**:
- `field1`: [description]

---

## Business Logic

### Key Functions

#### Function: [functionName]

**File**: `[path/to/file]`

**Purpose**: [What this function does]

**Parameters**:
- `param1`: [type] - [description]
- `param2`: [type] - [description]

**Returns**: [return type] - [description]

**Example**:
\`\`\`[language]
const result = functionName(param1, param2);
// Returns: [example output]
\`\`\`

---

## State Management

[For Frontend features with state management]

**State Location**: [Redux/Vuex/Context/Local]

**Actions**:
- `ACTION_NAME`: [description]

**Reducers**:
- `reducerName`: [description]

**Selectors**:
- `selectFeature`: [description]

---

## Validation Rules

### Frontend Validation

\`\`\`javascript
// Validation schema
const schema = {
  field1: {
    required: true,
    minLength: 3,
    pattern: /regex/
  },
  field2: {
    required: false,
    type: 'email'
  }
};
\`\`\`

### Backend Validation

\`\`\`python
# Validation rules
def validate_[feature](data):
    if not data.get('field1'):
        raise ValidationError('field1 is required')

    if len(data.get('field1')) < 3:
        raise ValidationError('field1 must be at least 3 characters')

    return True
\`\`\`

---

## Testing

### Unit Tests

**Frontend Tests**: `tests/components/[ComponentName].test.jsx`
- Test 1: [description]
- Test 2: [description]

**Backend Tests**: `tests/backend/unit/test_[feature_name].py`
- Test 1: [description]
- Test 2: [description]

### Integration Tests

**File**: `tests/integration/test_[feature_name]_integration.py`
- Test 1: [description]
- Test 2: [description]

### E2E Tests

**File**: `tests/e2e/[feature-name].spec.js`
- Scenario 1: [description]
- Scenario 2: [description]

**Run Tests**:
\`\`\`bash
# Unit tests
npm test -- [ComponentName]
pytest tests/backend/unit/test_[feature_name].py

# Integration tests
pytest tests/integration/test_[feature_name]_integration.py

# E2E tests
npm run test:e2e -- [feature-name].spec.js
\`\`\`

---

## Dependencies

### Frontend Dependencies
- `package-name@version`: [purpose]

### Backend Dependencies
- `package-name==version`: [purpose]

---

## Configuration

### Environment Variables

\`\`\`bash
# .env
FEATURE_API_KEY=your_api_key_here
FEATURE_TIMEOUT=5000
FEATURE_ENABLED=true
\`\`\`

### Feature Flags

\`\`\`javascript
// config/features.js
export const FEATURES = {
  [FEATURE_NAME]_ENABLED: process.env.FEATURE_ENABLED === 'true',
  [FEATURE_NAME]_BETA: false
};
\`\`\`

---

## Performance Considerations

### Frontend Performance
- **Bundle Size**: [impact on bundle size]
- **Render Performance**: [optimization techniques used]
- **Lazy Loading**: [if components are lazy loaded]

### Backend Performance
- **Query Optimization**: [database query optimizations]
- **Caching**: [caching strategy used]
- **Rate Limiting**: [rate limiting configuration]

---

## Security Considerations

### Frontend Security
- **Input Sanitization**: [how inputs are sanitized]
- **XSS Prevention**: [XSS prevention measures]
- **CSRF Protection**: [CSRF token handling]

### Backend Security
- **Authentication**: [authentication mechanism]
- **Authorization**: [authorization rules]
- **Input Validation**: [server-side validation]
- **SQL Injection Prevention**: [ORM usage, parameterized queries]

---

## Error Handling

### Frontend Error Handling
\`\`\`javascript
try {
  // Feature logic
} catch (error) {
  // Error handling
  showErrorNotification(error.message);
  logError(error);
}
\`\`\`

### Backend Error Handling
\`\`\`python
try:
    # Feature logic
except ValidationError as e:
    return jsonify({'error': str(e)}), 400
except Exception as e:
    logger.error(f"Error in [feature]: {str(e)}")
    return jsonify({'error': 'Internal server error'}), 500
\`\`\`

---

## Debugging

### Common Issues

**Issue 1**: [Description]
- **Cause**: [Root cause]
- **Solution**: [How to fix]

**Issue 2**: [Description]
- **Cause**: [Root cause]
- **Solution**: [How to fix]

### Debug Logs

**Frontend**:
\`\`\`javascript
console.log('[Feature]:', debugInfo);
\`\`\`

**Backend**:
\`\`\`python
logger.debug(f"[Feature] Debug info: {debug_info}")
\`\`\`

---

## Deployment

### Build Steps

\`\`\`bash
# Build frontend
npm run build

# Run migrations (if database changes)
flask db migrate -m "Add [feature] support"
flask db upgrade
\`\`\`

### Rollback Plan

If issues occur:
1. Revert frontend deployment
2. Rollback database migrations: `flask db downgrade`
3. Restore previous configuration

---

## Future Enhancements

- [ ] Enhancement 1: [description]
- [ ] Enhancement 2: [description]
- [ ] Enhancement 3: [description]

---

## Related Documentation

**Developer Docs**:
- [Related Feature 1](./related-feature-1-implementation.md)
- [Related Feature 2](./related-feature-2-implementation.md)

**User Docs**:
- [How to Use [Feature]](../user/how-to-use-[feature].md)

**External Resources**:
- [Library Documentation](https://example.com)
- [API Reference](https://api-docs.example.com)

---

## Change Log

| Date | Author | Changes |
|------|--------|---------|
| [Date] | [Name] | Initial implementation |
| [Date] | [Name] | Added [enhancement] |

---

**Questions or Issues?** Contact the development team or open an issue in the project repository.
```

---

## Step 5: Generate User Documentation

**Task**: Create user-friendly guide for end users

**Template**: `docs/user/how-to-[feature-name].md`

```markdown
# How to Use [Feature Name]

**Last Updated**: [Date]
**Difficulty**: [Easy/Medium/Advanced]
**Estimated Time**: [X minutes]

---

## What is [Feature Name]?

[Simple explanation of what this feature does and why users would use it]

**Benefits**:
- Benefit 1: [description]
- Benefit 2: [description]
- Benefit 3: [description]

---

## Before You Start

**What You'll Need**:
- [ ] Prerequisite 1
- [ ] Prerequisite 2
- [ ] Prerequisite 3

**Permissions Required**:
- Permission level: [User/Admin/Custom]

---

## Quick Start Guide

### Step 1: [Action Title]

[Clear instruction for the first step]

![Screenshot Placeholder: [Description of what should be shown]](_screenshots/[feature-name]-step-1.png)

**What to do**:
1. Click on [button/link name]
2. Navigate to [location]
3. Look for [element]

**Tips**:
💡 [Helpful tip for this step]

---

### Step 2: [Action Title]

[Clear instruction for the second step]

![Screenshot Placeholder: [Description of what should be shown]](_screenshots/[feature-name]-step-2.png)

**What to do**:
1. Enter [information]
2. Select [option]
3. Click [button]

**Tips**:
💡 [Helpful tip for this step]

⚠️ **Common Mistake**: [Description of common mistake and how to avoid it]

---

### Step 3: [Action Title]

[Clear instruction for the third step]

![Screenshot Placeholder: [Description of what should be shown]](_screenshots/[feature-name]-step-3.png)

**What to do**:
1. Review [information]
2. Confirm [action]
3. Wait for [result]

**What happens next**:
- Result 1: [description]
- Result 2: [description]

---

## Detailed Usage

### [Use Case 1]

**When to use this**: [scenario description]

**Steps**:
1. [Detailed step 1]
2. [Detailed step 2]
3. [Detailed step 3]

**Example**:
> [Real-world example of using this feature in this scenario]

---

### [Use Case 2]

**When to use this**: [scenario description]

**Steps**:
1. [Detailed step 1]
2. [Detailed step 2]
3. [Detailed step 3]

**Example**:
> [Real-world example of using this feature in this scenario]

---

## Advanced Features

### [Advanced Feature 1]

[Description of advanced feature]

**How to access**:
1. [Step 1]
2. [Step 2]

![Screenshot Placeholder: [Advanced feature screenshot]](_screenshots/[feature-name]-advanced-1.png)

**Use cases**:
- Use case 1: [description]
- Use case 2: [description]

---

### [Advanced Feature 2]

[Description of advanced feature]

**How to access**:
1. [Step 1]
2. [Step 2]

![Screenshot Placeholder: [Advanced feature screenshot]](_screenshots/[feature-name]-advanced-2.png)

---

## Frequently Asked Questions (FAQ)

### Q: [Common question 1]?

**A**: [Clear answer to question 1]

**Solution**:
1. [Step to solve]
2. [Step to solve]

---

### Q: [Common question 2]?

**A**: [Clear answer to question 2]

**Solution**:
1. [Step to solve]
2. [Step to solve]

---

### Q: [Common question 3]?

**A**: [Clear answer to question 3]

**Related Guide**: See [Related Feature](./related-feature.md) for more details.

---

## Troubleshooting

### Problem: [Common issue 1]

**Symptoms**:
- Symptom 1
- Symptom 2

**Solution**:
1. Try [solution step 1]
2. If that doesn't work, [solution step 2]
3. If still not working, [solution step 3]

**Still having issues?** [Contact support or link to help]

---

### Problem: [Common issue 2]

**Symptoms**:
- Symptom 1
- Symptom 2

**Solution**:
1. Try [solution step 1]
2. If that doesn't work, [solution step 2]

---

## Tips and Best Practices

### 💡 Best Practice 1
[Description of best practice and why it's important]

### 💡 Best Practice 2
[Description of best practice and why it's important]

### 💡 Best Practice 3
[Description of best practice and why it's important]

### ⚠️ Things to Avoid
- Avoid 1: [what not to do and why]
- Avoid 2: [what not to do and why]

---

## Video Tutorial

📺 **Watch the Video Guide**: [Coming Soon]

[Placeholder for video tutorial link]

**Video Topics**:
- Introduction to [Feature]
- Step-by-step walkthrough
- Advanced tips and tricks

---

## Related Features

**You might also be interested in**:
- [Related Feature 1](./related-feature-1.md) - [Brief description]
- [Related Feature 2](./related-feature-2.md) - [Brief description]
- [Related Feature 3](./related-feature-3.md) - [Brief description]

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+X` | [Action] |
| `Ctrl+Y` | [Action] |
| `Enter`  | [Action] |

---

## Mobile App Guide

[If feature is available on mobile]

**On iOS**:
1. [iOS-specific step 1]
2. [iOS-specific step 2]

**On Android**:
1. [Android-specific step 1]
2. [Android-specific step 2]

![Screenshot Placeholder: Mobile view](_screenshots/[feature-name]-mobile.png)

---

## Accessibility Features

**Keyboard Navigation**:
- Use `Tab` to navigate between fields
- Use `Enter` to submit
- Use `Esc` to cancel

**Screen Reader Support**:
- All buttons are properly labeled
- Form fields have descriptive labels
- Error messages are announced

**High Contrast Mode**:
- Feature fully supports high contrast mode
- All text is readable

---

## Need More Help?

**Can't find what you're looking for?**

- 📖 Check the [Full Documentation](../dev/[feature-name]-implementation.md) (technical)
- 💬 Ask the Community: [Forum/Discord Link]
- 📧 Contact Support: [support@example.com]
- 🐛 Report a Bug: [Issue Tracker Link]

**Feedback**:
Help us improve this guide! [Feedback Form Link]

---

## Quick Reference Card

**Print this for quick access**:

| Task | Steps |
|------|-------|
| [Common task 1] | 1. [Step] 2. [Step] 3. [Step] |
| [Common task 2] | 1. [Step] 2. [Step] 3. [Step] |
| [Common task 3] | 1. [Step] 2. [Step] 3. [Step] |

---

**Last Updated**: [Date]
**Version**: [Version number]
**Feedback**: [Link to provide feedback]
```

---

## Step 6: Auto-Generate Documentation

**Implementation**: The command will analyze code and fill in templates

```bash
#!/bin/bash

generate_documentation() {
  FEATURE_NAME="$1"
  FEATURE_TYPE="$2"

  # Convert feature name to different formats
  FEATURE_TITLE=$(echo "$FEATURE_NAME" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2));}1')
  FEATURE_SNAKE=$(echo "$FEATURE_NAME" | sed 's/-/_/g')
  FEATURE_CAMEL=$(echo "$FEATURE_NAME" | sed 's/-\([a-z]\)/\U\1/g' | sed 's/^\([a-z]\)/\U\1/')

  # Set paths
  DEV_DOC="docs/dev/${FEATURE_NAME}-implementation.md"
  USER_DOC="docs/user/how-to-${FEATURE_NAME}.md"

  echo "📝 Generating documentation..."
  echo ""

  # Generate developer documentation
  echo "   Creating developer docs: $DEV_DOC"
  # [Use template from Step 4, filled with analyzed data]

  # Generate user documentation
  echo "   Creating user docs: $USER_DOC"
  # [Use template from Step 5, filled with analyzed data]

  # Add cross-references
  echo "   Adding cross-references..."

  # Link to related documentation
  echo "   Linking related documentation..."

  echo ""
  echo "✅ Documentation generated successfully!"
  echo ""
  echo "📄 Files created:"
  echo "   - $DEV_DOC (developer documentation)"
  echo "   - $USER_DOC (user guide)"
  echo ""
}
```

---

## Step 7: Find and Link Related Documentation

**Task**: Auto-discover and link related docs

```bash
#!/bin/bash

link_related_docs() {
  FEATURE_NAME="$1"

  echo "🔗 Searching for related documentation..."

  # Search for related features in docs
  RELATED_DEV_DOCS=$(find docs/dev -name "*.md" -not -name "${FEATURE_NAME}*" 2>/dev/null)
  RELATED_USER_DOCS=$(find docs/user -name "*.md" -not -name "how-to-${FEATURE_NAME}*" 2>/dev/null)

  # Analyze feature name for related keywords
  # For example: "password-reset" might relate to "authentication", "user-login", etc.

  # Use grep to find docs mentioning similar topics
  KEYWORDS=$(echo "$FEATURE_NAME" | tr '-' '\n')

  for keyword in $KEYWORDS; do
    # Search in existing docs for this keyword
    grep -l "$keyword" docs/dev/*.md 2>/dev/null
    grep -l "$keyword" docs/user/*.md 2>/dev/null
  done

  echo "✅ Found related documentation"
}
```

---

## Complete Implementation

**Agent Prompt**:

When the user runs `/app-document-generator <feature-name>`, you should:

1. **Analyze the feature**:
   - Extract the feature name from `$ARGUMENTS`
   - Search the codebase for files matching the feature name
   - Determine if it's frontend, backend, or full-stack

2. **Gather information**:
   - For frontend: Analyze components, hooks, utils
   - For backend: Analyze routes, models, services
   - Extract API endpoints, props, state, validation rules

3. **Create documentation structure**:
   - Ensure `docs/dev/` exists (create if not)
   - Ensure `docs/user/` exists (create if not)
   - Ensure `docs/user/_screenshots/` exists for screenshot placeholders

4. **Generate developer documentation** at `docs/dev/<feature-name>-implementation.md`:
   - Use the comprehensive template from Step 4
   - Fill in actual code analysis data
   - Include file paths, function signatures, API endpoints
   - Add code examples from actual implementation
   - Link to related developer documentation

5. **Generate user documentation** at `docs/user/how-to-<feature-name>.md`:
   - Use the user-friendly template from Step 5
   - Focus on what users need to do, not how it works internally
   - Add screenshot placeholders with descriptive names
   - Include step-by-step instructions
   - Add FAQ section based on common patterns
   - Link to related user guides

6. **Add cross-references**:
   - In developer docs: Link to user guide
   - In user docs: Link to technical docs (for advanced users)
   - Link to related features in both docs

7. **Auto-link related documentation**:
   - Search existing docs for related keywords
   - Add "Related Documentation" sections
   - Update index files if they exist

8. **Verify output**:
   - Confirm both files were created
   - Display file paths
   - Show summary of what was documented

---

## Output Example

```bash
$ /app-document-generator password-reset

📝 Documenting feature: password-reset

🔍 Searching for feature implementation...
🟣 Detected: Full-stack feature (frontend + backend)

📂 Found files:
Frontend: src/components/PasswordReset.jsx
Frontend: src/hooks/usePasswordReset.js
Backend: backend/api/routes/password_reset.py
Backend: backend/models/password_reset_token.py

✅ Documentation directories ready:
   - docs/dev/ (developer documentation)
   - docs/user/ (user guides)

📝 Generating documentation...
   Creating developer docs: docs/dev/password-reset-implementation.md
   Creating user docs: docs/user/how-to-password-reset.md
   Adding cross-references...
   Linking related documentation...

✅ Documentation generated successfully!

📄 Files created:
   - docs/dev/password-reset-implementation.md (developer documentation)
   - docs/user/how-to-password-reset.md (user guide)

🔗 Related documentation:
   - docs/dev/authentication-implementation.md (linked)
   - docs/user/how-to-login.md (linked)

📸 Screenshot placeholders added:
   - docs/user/_screenshots/password-reset-step-1.png
   - docs/user/_screenshots/password-reset-step-2.png
   - docs/user/_screenshots/password-reset-step-3.png

💡 Next steps:
   1. Review generated documentation
   2. Add actual screenshots to replace placeholders
   3. Customize user guide with specific examples
   4. Update technical details in developer docs
   5. Commit documentation to repository
```

---

## Feature Detection Logic

The command automatically detects feature type based on file locations:

| Pattern | Feature Type |
|---------|--------------|
| Files in `src/` only | Frontend |
| Files in `backend/` only | Backend |
| Files in both `src/` and `backend/` | Full-stack |
| No files found | Generic (uses templates) |

**Frontend Indicators**:
- `.jsx`, `.tsx`, `.vue` files in `src/components/`
- Hooks in `src/hooks/`
- Utils in `src/utils/`

**Backend Indicators**:
- `.py` files in `backend/api/routes/`
- Models in `backend/models/`
- Services in `backend/services/`

**Full-Stack Indicators**:
- Both frontend and backend files present
- API integration files
- E2E tests in `tests/e2e/`

---

## Screenshot Automation (Bonus)

**Advanced**: Automatically capture screenshots using Playwright

```javascript
// Auto-capture screenshots for user documentation
const { chromium } = require('playwright');

async function captureScreenshots(featureName, steps) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];

    // Navigate to step URL
    await page.goto(step.url);

    // Perform actions
    await step.actions(page);

    // Capture screenshot
    await page.screenshot({
      path: `docs/user/_screenshots/${featureName}-step-${i + 1}.png`,
      fullPage: false
    });
  }

  await browser.close();
}
```

---

## Integration with Existing Workflow

**Use in development workflow**:

```bash
# 1. Implement feature with TDD
/app-code "Create password reset feature"

# 2. Test implementation
/app-test all

# 3. Validate code
/app-validate

# 4. Generate documentation
/app-document-generator password-reset

# 5. Review and customize docs
# Edit docs/dev/password-reset-implementation.md
# Edit docs/user/how-to-password-reset.md

# 6. Add screenshots
# Replace placeholders in docs/user/_screenshots/

# 7. Commit changes
git add docs/
git commit -m "Add password reset feature documentation"
```

---

## Customization

**Adjust templates** by editing the template sections in this command file.

**Add new sections** to templates for project-specific needs.

**Configure auto-linking** by adding keywords to the related documentation search.

**Enable screenshot automation** by implementing Playwright integration.

---

## Benefits

**For Developers**:
- ✅ Automatic extraction of technical details
- ✅ Consistent documentation format
- ✅ Saves 1-2 hours per feature
- ✅ Links to related code automatically

**For Users**:
- ✅ Clear step-by-step guides
- ✅ Visual placeholders for screenshots
- ✅ Troubleshooting section included
- ✅ Beginner-friendly language

**For Teams**:
- ✅ Standardized documentation
- ✅ Reduced documentation debt
- ✅ Easier onboarding
- ✅ Better knowledge sharing

---

## Next Steps After Documentation

1. **Review generated docs** - Verify accuracy
2. **Add screenshots** - Replace placeholders with actual screenshots
3. **Customize examples** - Add project-specific examples
4. **Test user guide** - Have a user follow the guide
5. **Update as needed** - Keep docs in sync with code changes
6. **Commit to repository** - Track docs in version control

---

**Command Complete**: Two comprehensive documentation files created in 3-5 minutes!

**Write Once, Serve Two Audiences - Developers Get Details, Users Get Guidance!**
