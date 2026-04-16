# Skill Registry — eclipse-di-luna

## Project Conventions

| File | Purpose |
|------|---------|
| CLAUDE.md | Points to AGENTS.md |
| AGENTS.md | Next.js 16 breaking changes — read docs before writing code |

## User Skills (non-SDD)

| Skill | Trigger | Path |
|-------|---------|------|
| judgment-day | "judgment day", "dual review", "juzgar" | ~/.claude/skills/judgment-day/SKILL.md |
| go-testing | Go tests, Bubbletea TUI testing | ~/.claude/skills/go-testing/SKILL.md |
| skill-creator | Creating new AI skills | ~/.claude/skills/skill-creator/SKILL.md |
| branch-pr | Creating pull requests | ~/.claude/skills/branch-pr/SKILL.md |
| issue-creation | Creating GitHub issues | ~/.claude/skills/issue-creation/SKILL.md |

## Compact Rules

### AGENTS.md
- Next.js 16 has breaking changes vs training data
- MUST read `node_modules/next/dist/docs/` before writing any code
- Heed deprecation notices
