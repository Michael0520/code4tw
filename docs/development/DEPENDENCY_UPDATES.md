# Dependency Updates Guide

This guide explains how Code4TW manages and updates project dependencies using **taze**, a modern CLI tool that keeps dependencies fresh.

## Overview

Code4TW uses **automated dependency updates** via GitHub Actions to keep packages up-to-date while maintaining stability. The system:

- ✅ Runs automatically every Monday at 9:00 AM (Taiwan time)
- ✅ Can be triggered manually with different update modes
- ✅ Validates all changes with full test suite
- ✅ Creates Pull Requests for review before merging
- ✅ Supports monorepo recursive updates

## Tools

- **[taze](https://github.com/antfu-collective/taze)**: Modern dependency update checker and updater
- **GitHub Actions**: Automated workflow execution
- **pnpm**: Package manager with workspace support

## Configuration

### Taze Configuration (`taze.config.ts`)

The project's dependency update behavior is configured in `taze.config.ts`:

```typescript
export default defineConfig({
  // Packages excluded from auto-updates
  exclude: [
    "next", // Framework - requires manual migration
    "react", // Core library - breaking changes need review
    "react-dom", // Core library
    "typescript", // Language - major versions need migration
    "@testing-library/react", // Test tools
    "@testing-library/jest-dom",
  ],

  // Monorepo support
  recursive: true,

  // Update mode
  mode: "default", // Respects semver ranges in package.json

  // Package-specific modes
  packageMode: {
    turbo: "latest", // Always latest
    vitest: "minor", // Latest minor only
    eslint: "minor",
    prettier: "minor",
  },
});
```

### GitHub Actions Workflow

Location: `.github/workflows/dependencies.yml`

**Triggers**:

- **Scheduled**: Every Monday at 01:00 UTC (09:00 Taiwan)
- **Manual**: Via GitHub Actions UI with mode selection

**Quality Checks**:

1. Runs full test suite with coverage
2. Executes ESLint validation
3. Performs TypeScript type checking
4. Validates build success

**Output**:

- Creates PR with all dependency updates
- Includes quality check results
- Labels PR based on test outcomes
- Posts warnings if checks fail

## Manual Usage

### Check for Available Updates

See what dependencies can be updated without making changes:

```bash
pnpm deps:check
```

This will display:

- Current versions
- Available versions
- Update recommendations

### Update Dependencies

#### Default Mode (Respects semver ranges)

Updates within the ranges specified in `package.json`:

```bash
pnpm deps:update
```

#### Patch Updates Only

Only update patch versions (e.g., 1.2.3 → 1.2.4):

```bash
pnpm deps:patch
```

#### Minor Updates

Update to latest minor versions (e.g., 1.2.3 → 1.5.0):

```bash
pnpm deps:minor
```

#### Major Updates

Update to latest major versions including breaking changes:

```bash
pnpm deps:major
```

⚠️ **Warning**: Major updates may include breaking changes. Always review changelogs!

#### Latest Versions

Update to absolute latest versions regardless of semver:

```bash
pnpm deps:latest
```

### Update Workflow

1. **Check for updates**:

   ```bash
   pnpm deps:check
   ```

2. **Review the output** and identify packages to update

3. **Run appropriate update command**:

   ```bash
   pnpm deps:update  # or deps:minor, deps:major, etc.
   ```

4. **Verify changes** with quality checks:

   ```bash
   pnpm test:coverage  # Run tests
   pnpm lint           # Check code quality
   pnpm check-types    # Verify TypeScript
   pnpm build          # Ensure build succeeds
   ```

5. **Commit changes** if all checks pass:
   ```bash
   git add package.json pnpm-lock.yaml
   git commit -m "chore(deps): update dependencies"
   ```

## Automated Updates

### Weekly Scheduled Updates

Every Monday at 9:00 AM Taiwan time, the system automatically:

1. Checks for dependency updates
2. Updates packages according to `taze.config.ts`
3. Runs full quality check suite
4. Creates a Pull Request with results

### Manual Trigger

Trigger dependency updates manually from GitHub:

1. Go to **Actions** tab
2. Select **Update Dependencies** workflow
3. Click **Run workflow**
4. Choose update mode:
   - `default` - Respects semver ranges
   - `major` - Include major updates
   - `minor` - Latest minor versions
   - `patch` - Patch updates only
   - `latest` - Absolute latest
5. Click **Run workflow**

## Reviewing Update PRs

When a dependency update PR is created, review the following:

### ✅ Quality Checks

Check the PR description for quality check results:

| Check      | Status | Action if Failed                                |
| ---------- | ------ | ----------------------------------------------- |
| Tests      | ✅/❌  | Review test failures and fix or exclude package |
| Linter     | ✅/❌  | Fix lint errors or update ESLint config         |
| Type Check | ✅/❌  | Fix type errors or update TypeScript config     |
| Build      | ✅/❌  | Fix build errors or check for breaking changes  |

### 📋 Review Checklist

- [ ] **Check `package.json` changes**: Review each updated package
- [ ] **Examine version changes**: Pay attention to major version bumps
- [ ] **Review changelogs**: Read release notes for breaking changes
- [ ] **Verify quality checks**: Ensure all automated checks passed
- [ ] **Test critical flows**: Manually test important user journeys
- [ ] **Check documentation**: Update docs if APIs changed

### 🚫 When to Reject

Reject the PR if:

- Critical tests are failing
- Major breaking changes are introduced without migration plan
- Dependencies conflict with each other
- Build is broken

### ✅ When to Approve

Approve the PR when:

- All quality checks pass
- Changes reviewed and understood
- No breaking changes or migration complete
- Documentation updated if needed

## Excluding Packages

To exclude a package from automated updates, add it to `taze.config.ts`:

```typescript
export default defineConfig({
  exclude: ["your-package-name"],
});
```

To set specific update mode for a package:

```typescript
export default defineConfig({
  packageMode: {
    "your-package": "minor", // or 'major', 'patch', 'ignore'
  },
});
```

## Update Modes Explained

### `default` Mode (Recommended)

Updates within the semver ranges specified in `package.json`:

- `^1.2.3` → Updates to latest `1.x.x`
- `~1.2.3` → Updates to latest `1.2.x`
- `1.2.3` → No update (exact version)

**Use when**: Regular maintenance updates

### `major` Mode

Updates to latest major versions, including breaking changes:

- `1.2.3` → `3.0.0` (if available)

**Use when**: Planning major refactors or upgrades

⚠️ **Warning**: Always review breaking changes before merging!

### `minor` Mode

Updates to latest minor versions within the same major version:

- `1.2.3` → `1.9.0` (if available)
- Never updates: `1.2.3` → `2.0.0`

**Use when**: Want new features but avoid breaking changes

### `patch` Mode

Only updates patch versions (bug fixes):

- `1.2.3` → `1.2.9` (if available)
- Never updates: `1.2.3` → `1.3.0`

**Use when**: Only want critical bug fixes

### `latest` Mode

Updates to absolute latest versions regardless of semver:

**Use when**: Experimental testing or starting fresh

## Troubleshooting

### Update Fails Quality Checks

1. **Review the error messages** in the PR or workflow logs
2. **Identify the problematic package**:
   ```bash
   git diff package.json
   ```
3. **Check the package changelog** for breaking changes
4. **Options**:
   - Fix the code to work with new version
   - Exclude the package in `taze.config.ts`
   - Downgrade by reverting the change

### Conflicts in package.json

If you have local changes:

```bash
git stash
git pull origin main
git stash pop
# Resolve conflicts
pnpm install
```

### Update Appears Stuck

Check GitHub Actions status:

1. Go to **Actions** tab
2. Find the **Update Dependencies** workflow
3. Check run status and logs

## Best Practices

### 1. Regular Updates

- Let the weekly automation run
- Review PRs promptly
- Don't let dependencies fall too far behind

### 2. Test Before Merging

Always verify:

```bash
pnpm install          # Install new dependencies
pnpm test:coverage    # Run full test suite
pnpm build            # Verify build works
pnpm dev              # Test locally
```

### 3. Read Changelogs

Before merging major updates:

- Read package release notes
- Check for breaking changes
- Review migration guides

### 4. Update Documentation

If dependency updates affect:

- Public APIs
- Configuration
- Development workflow

Update relevant documentation!

### 5. Incremental Updates

For major version bumps:

- Update one package at a time
- Test thoroughly after each update
- Commit working state before next update

## Resources

- [taze Documentation](https://github.com/antfu-collective/taze)
- [Semantic Versioning (semver)](https://semver.org/)
- [pnpm Workspace](https://pnpm.io/workspaces)
- [Turborepo Caching](https://turbo.build/repo/docs/core-concepts/caching)

## FAQ

### Q: Why are some packages excluded from updates?

**A**: Critical packages like React, Next.js, and TypeScript require careful manual migration due to potential breaking changes that could affect the entire application.

### Q: Can I run updates on a specific package only?

**A**: Yes, use taze directly with package filter:

```bash
npx taze --include "package-name"
```

### Q: What if I want to update an excluded package?

**A**: Remove it from the `exclude` list in `taze.config.ts`, or update it manually:

```bash
pnpm add package-name@latest
```

### Q: How often should I merge dependency updates?

**A**: Weekly automated updates are recommended. For security patches, merge immediately after review.

### Q: Can I disable automated updates?

**A**: Yes, disable the scheduled trigger in `.github/workflows/dependencies.yml` by commenting out the `schedule` section. You can still trigger updates manually.

---

**Last Updated**: 2025-10-01
**Maintainer**: Code4TW Team
