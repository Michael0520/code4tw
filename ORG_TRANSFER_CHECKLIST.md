# Organization Transfer Checklist

## 🎯 Goal
Transfer repository from `Michael0520/code4tw` to `code-for-Taiwan/code4tw`

## ⚠️ Critical Information

### Current Setup
- **GitHub**: `Michael0520/code4tw` (public)
- **Vercel**: Personal account deployment
- **Domain**: (if any, please fill in)
- **CI/CD**: GitHub Actions with secrets

### Target Setup
- **GitHub**: `code-for-Taiwan/code4tw`
- **Vercel**: Keep on personal account (recommended)
- **CI/CD**: Same workflows, update secrets in organization

---

## 📋 Pre-Transfer Checklist

### 1. Document Current Secrets
Record these secret values (DO NOT commit them):

- [ ] `TURBO_TOKEN` - Turborepo Remote Cache token
- [ ] `TURBO_TEAM` - Turborepo team identifier
- [ ] `CODECOV_TOKEN` - Code coverage reporting token
- [ ] `SONAR_TOKEN` - SonarCloud analysis token

**Action**: Save these values in a secure location (password manager)

### 2. Update Configuration Files
- [x] Update SonarCloud config in `.github/workflows/sonarcloud.yml`
  - projectKey: `Michael0520_code4tw` → `code-for-Taiwan_code4tw`
  - organization: `michael0520` → `code-for-taiwan`
- [ ] Verify all workflows reference correct paths
- [ ] Check for any hardcoded repository references

### 3. SonarCloud Setup
Before transfer, need to:
- [ ] Create new project in SonarCloud for `code-for-Taiwan` organization
  - Or transfer existing project to new organization
- [ ] Generate new `SONAR_TOKEN` for the organization
- [ ] Update project key and organization settings

### 4. Vercel Setup (No Action Required)
- [ ] Confirm: Vercel will auto-detect repository transfer
- [ ] After transfer: Verify Vercel project settings show correct GitHub repo
- [ ] Test: Trigger a deployment to ensure connection works

---

## 🚀 Transfer Process

### Step 1: Merge Preparation Branch
1. [ ] Review all changes in `chore/prepare-org-transfer` branch
2. [ ] Create PR to main
3. [ ] Verify CI passes
4. [ ] Merge to main
5. [ ] Wait for successful deployment on Vercel

### Step 2: Execute GitHub Transfer
1. [ ] Go to https://github.com/Michael0520/code4tw/settings
2. [ ] Scroll to "Danger Zone" → "Transfer ownership"
3. [ ] Enter new owner: `code-for-Taiwan`
4. [ ] Confirm repository name: `code4tw`
5. [ ] Complete transfer

### Step 3: Configure New Organization
1. [ ] Go to https://github.com/code-for-Taiwan/code4tw/settings/secrets/actions
2. [ ] Add all required secrets:
   - [ ] `TURBO_TOKEN`
   - [ ] `TURBO_TEAM`
   - [ ] `CODECOV_TOKEN`
   - [ ] `SONAR_TOKEN` (new token from updated SonarCloud project)

### Step 4: Update SonarCloud
1. [ ] Verify SonarCloud project exists for `code-for-Taiwan` organization
2. [ ] Update project key to `code-for-Taiwan_code4tw`
3. [ ] Configure repository connection
4. [ ] Test analysis runs successfully

---

## ✅ Post-Transfer Verification

### Immediate Checks
1. [ ] Update local repository remote:
   ```bash
   git remote set-url origin https://github.com/code-for-Taiwan/code4tw.git
   git remote -v  # Verify
   git pull       # Test connection
   ```

2. [ ] Verify GitHub Actions:
   - [ ] Push a commit to trigger CI
   - [ ] Check all workflows run successfully
   - [ ] Verify secrets are accessible

3. [ ] Verify Vercel:
   - [ ] Check Vercel dashboard shows correct repository
   - [ ] Trigger a deployment
   - [ ] Verify production site works correctly
   - [ ] Check deployment logs for any errors

4. [ ] Verify SonarCloud:
   - [ ] Check latest analysis runs
   - [ ] Verify quality gate status
   - [ ] Confirm metrics are reporting correctly

### Team Access
- [ ] Verify organization members have correct access levels
- [ ] Test that team members can clone repository
- [ ] Confirm team members can create PRs
- [ ] Verify team members can see CI results

---

## 🔄 Rollback Plan (If Needed)

If something goes wrong:

1. **GitHub**: Organization owners can transfer repository back
2. **Vercel**: Will auto-reconnect to original repository
3. **Secrets**: Re-add to original repository settings
4. **Local**: Update remote URL back to original

---

## 📝 Notes

### Why Keep Vercel on Personal Account?
- ✅ Free for public open-source projects
- ✅ Zero configuration needed after transfer
- ✅ Automatic reconnection to new repository
- ✅ No service interruption
- ✅ Organization members can still see deployment status via GitHub

### Alternative: Vercel Team
- ⚠️ Costs $20/month per member
- Only needed if you want:
  - Multiple team members to manage deployments directly
  - Team-level resource limits
  - Centralized billing

---

## 🎓 Reference Links

- [GitHub: Transfer a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository)
- [Vercel: GitHub Integration](https://vercel.com/docs/concepts/git/vercel-for-github)
- [SonarCloud: Organizations](https://docs.sonarcloud.io/organizations/overview/)

---

## 🔐 Security Reminders

- ✅ All `.env` files are in `.gitignore`
- ✅ No secrets committed to repository
- ✅ Secrets stored in GitHub Actions secrets
- ✅ SonarCloud tokens scoped to organization
- ✅ Vercel deployment uses environment variables

---

**Status**: 🟡 In Progress
**Created**: 2025-01-19
**Owner**: @Michael0520
**Reviewers**: Code for Taiwan team
