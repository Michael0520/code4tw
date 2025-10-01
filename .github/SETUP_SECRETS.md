# GitHub Actions Secrets Setup Guide

This guide explains how to configure the required secrets for GitHub Actions CI/CD workflows.

## Required Secrets

### 1. Turborepo Remote Cache Secrets

#### `TURBO_TOKEN`
**Purpose**: Authentication token for Vercel Remote Cache

**How to get it**:
```bash
# Login to Vercel via Turborepo CLI
pnpm dlx turbo login

# Link your repository (if not already done)
pnpm dlx turbo link
```

After login, you can find your token at:
- Vercel Dashboard → Settings → Tokens
- Create a new token with "Read and Write" access

**How to set in GitHub**:
1. Go to your repository Settings
2. Navigate to `Secrets and variables` → `Actions`
3. Click `New repository secret`
4. Name: `TURBO_TOKEN`
5. Value: Paste your Vercel token
6. Click `Add secret`

#### `TURBO_TEAM`
**Purpose**: Your Vercel team slug for remote cache scoping

**How to get it**:
```bash
# After running `turbo link`, your team slug is displayed
# Or find it in Vercel Dashboard URL:
# https://vercel.com/<YOUR_TEAM_SLUG>/...
```

**How to set in GitHub**:
1. Go to your repository Settings
2. Navigate to `Secrets and variables` → `Actions`
3. Click `New repository secret`
4. Name: `TURBO_TEAM`
5. Value: Your team slug (e.g., `michael0520s-projects`)
6. Click `Add secret`

---

### 2. Code Coverage Secret (Optional)

#### `CODECOV_TOKEN`
**Purpose**: Upload test coverage reports to Codecov

**How to get it**:
1. Go to https://codecov.io
2. Sign in with GitHub
3. Add your repository
4. Copy the upload token

**How to set in GitHub**:
1. Repository Settings → `Secrets and variables` → `Actions`
2. Click `New repository secret`
3. Name: `CODECOV_TOKEN`
4. Value: Paste your Codecov token
5. Click `Add secret`

**Note**: This is optional. CI will still pass without it.

---

## Verification

After setting up secrets, you can verify the setup:

### Check Secrets are Set
1. Go to repository Settings
2. Navigate to `Secrets and variables` → `Actions`
3. You should see:
   - ✅ `TURBO_TOKEN`
   - ✅ `TURBO_TEAM`
   - ⚙️ `CODECOV_TOKEN` (optional)

### Test CI Workflow
1. Create a new branch
2. Make a small change
3. Push and create a Pull Request
4. GitHub Actions should run automatically
5. Check the Actions tab to see:
   - ✅ Lint & Type Check job
   - ✅ Test job
   - ✅ Build job

### Verify Remote Cache is Working
In the GitHub Actions logs, you should see:
```
• Remote caching enabled
Cache hit, replaying logs ...
```

If you see "Remote caching disabled", check:
1. `TURBO_TOKEN` is set correctly
2. `TURBO_TEAM` matches your Vercel team
3. Token has correct permissions

---

## Troubleshooting

### "Remote caching disabled"
**Cause**: Missing or invalid `TURBO_TOKEN` or `TURBO_TEAM`

**Solution**:
1. Verify secrets are set in GitHub
2. Check token is valid: `turbo login` again
3. Ensure team slug is correct

### "unauthorized" error
**Cause**: Invalid or expired token

**Solution**:
1. Generate a new token in Vercel Dashboard
2. Update `TURBO_TOKEN` secret in GitHub

### CI fails with "pnpm: command not found"
**Cause**: pnpm setup step failed

**Solution**:
- Workflow already includes `pnpm/action-setup@v4`
- Check Node.js version is correct (18+)

---

## Next Steps

After setting up secrets:

1. ✅ Merge the PR that adds GitHub Actions workflows
2. ✅ Future PRs will automatically run CI checks
3. ✅ Remote cache will speed up builds by 70-90%
4. ✅ Monitor cache hit rates in Actions logs

For more information:
- [Turborepo CI Documentation](https://turborepo.com/docs/guides/ci-vendors/github-actions)
- [Vercel Remote Cache](https://vercel.com/docs/monorepos/remote-caching)
