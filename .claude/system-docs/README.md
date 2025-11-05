# System Documentation

**Purpose**: Reference documentation for the ML agent system.

These files explain how to use the agents, commands, and workflows. They are **read-only reference materials** - do not copy or modify them for your projects.

---

## What's in This Folder

### Reference Documentation

#### `ML_BLUEPRINT_COMMANDS_REFERENCE.md` ⭐
**Complete documentation** for the two master ML blueprint commands:

- **`/ml-origin-blueprint`** - Creates comprehensive master specification
  - 7 agents execute in 3 phases
  - Generates 8 output files
  - Duration: ~2.5 hours
  - Output: 30-section master blueprint

- **`/ml-blueprint-kickstart`** - Executes complete ML project build
  - 19 agents execute in 15 phases
  - Creates production-ready ML system
  - Duration: ~16 weeks (8 sprints)
  - Output: Deployed ML system with monitoring

**Contents**:
- Detailed phase-by-phase breakdown
- Agent assignments and responsibilities
- Expected outputs and timelines
- Technology stack deployed
- Troubleshooting guide
- Success metrics

**Size**: ~1,150 lines, ~15,000 words

---

## How to Use This Documentation

### 1. Learning the System
Start here to understand how the ML agent system works:
```bash
# Read the complete command reference
cat .claude/system-docs/ML_BLUEPRINT_COMMANDS_REFERENCE.md

# Or open in your editor
vim .claude/system-docs/ML_BLUEPRINT_COMMANDS_REFERENCE.md
```

### 2. Understanding Workflows
The documentation explains:
- How commands orchestrate agents
- What files are created where
- How long each phase takes
- What inputs are needed
- What outputs are generated

### 3. Planning Your Project
Use this documentation to:
- Estimate project timelines
- Understand resource requirements
- Plan agent utilization
- Set realistic expectations

---

## Difference: System Docs vs Templates vs Workspace

### System Docs (This Folder)
**Purpose**: Reference documentation
- **You read them** to understand the system
- **Never copy or edit** for projects
- **System-wide**, not project-specific
- **Example**: Command usage guides

### Templates (`.claude/templates/`)
**Purpose**: Starting points for project files
- **You copy them** to start new files
- **You fill them out** with your project details
- **Project-specific** after copying
- **Example**: `intro-project-spec.md.template` → `workspace/docs/intro-project-spec.md`

### Workspace (`.claude/workspace/`)
**Purpose**: Project-specific outputs
- **Agents create them** automatically
- **You don't edit them** (auto-generated)
- **Project-specific** content
- **Example**: `workspace/specs/{project-name}_blueprint.md`

---

## Quick Reference

| Location | Type | Who Edits | Purpose |
|----------|------|-----------|---------|
| `system-docs/` | Reference | No one (read-only) | Learn how system works |
| `templates/` | Templates | You copy, then fill out | Starting points for files |
| `workspace/` | Outputs | Agents (auto-generated) | Project-specific results |
| `agents/` | Definitions | No one (system files) | Agent behavior specs |
| `commands/` | Definitions | No one (system files) | Command orchestration |
| `standards/` | Guidelines | No one (reference) | Best practices |
| `workflows/` | Patterns | No one (reference) | Process templates |

---

## Documentation Index

### Current Files
1. **ML_BLUEPRINT_COMMANDS_REFERENCE.md** - Complete command documentation

### Future Documentation (TBD)
- Agent usage guide
- Workflow patterns reference
- Template customization guide
- Troubleshooting FAQ
- Best practices guide

---

## Getting Started

### New to ML Agents?
1. **Read**: `ML_BLUEPRINT_COMMANDS_REFERENCE.md`
2. **Review**: Main `.claude/README.md`
3. **Explore**: `.claude/examples/medical-nlp-lean/`
4. **Try**: Run `/ml-plan-product` on a test project

### Ready to Start a Project?
1. **Copy template**:
   ```bash
   cp .claude/templates/project-plan/intro-project-spec.md.template \
      .claude/workspace/docs/intro-project-spec.md
   ```

2. **Fill out requirements**: Edit `workspace/docs/intro-project-spec.md`

3. **Run commands**:
   ```bash
   /ml-origin-blueprint      # Create blueprint
   /ml-blueprint-kickstart   # Execute implementation
   ```

---

## Need More Help?

- **Main README**: `.claude/README.md` - Overview of ml-projects profile
- **Commands**: `.claude/commands/` - Individual command definitions
- **Agents**: `.claude/agents/` - Individual agent definitions
- **Standards**: `.claude/standards/` - MLOps best practices
- **Workflows**: `.claude/workflows/` - Process patterns
- **Examples**: `.claude/examples/medical-nlp-lean/` - Reference implementation
- **Templates**: `.claude/templates/` - File templates for projects

---

## Contributing

To improve this documentation:
1. Test the commands on real projects
2. Note areas that need clarification
3. Submit feedback or suggestions
4. Help expand the documentation index

---

**System Version**: ml-projects profile v2.0 (Workspace Model)
**Last Updated**: 2025-10-27
**Documentation Status**: Active - ML Blueprint Commands Complete
