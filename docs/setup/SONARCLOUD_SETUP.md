# SonarCloud Integration Setup Guide

This guide walks you through setting up SonarCloud integration for the Code4TW project to ensure continuous code quality monitoring.

## Prerequisites

- GitHub repository admin access
- SonarCloud account

## Step 1: SonarCloud Account Setup

### 1.1 Create SonarCloud Account
1. Go to [SonarCloud.io](https://sonarcloud.io)
2. Sign up with your GitHub account
3. Authorize SonarCloud to access your repositories

### 1.2 Import Project
1. Click **"+"** → **"Analyze new project"**
2. Select your GitHub organization and repository
3. Choose **"Set up"** for the Code4TW repository

### 1.3 Configure Organization
1. In SonarCloud, go to **My Organizations**
2. Create or select organization key: `code4tw`
3. Ensure the organization is public or configure access properly

## Step 2: Project Configuration

### 2.1 Main Project Setup
1. **Project Key**: `Michael0520_code4tw`
2. **Organization**: `michael0520`
3. **Project Name**: `Code for Taiwan - Monorepo`
4. **Main Branch**: `main`

### 2.2 Additional Projects (Optional)
For monorepo analysis, you may want to create separate projects:
- **Website**: `code4tw_website`
- **Shared Packages**: `code4tw_packages`

## Step 3: GitHub Secrets Configuration

### 3.1 Generate SonarCloud Token
1. In SonarCloud, go to **My Account** → **Security**
2. Generate a new token with name: `GitHub Actions Code4TW`
3. Copy the token value

### 3.2 Add GitHub Secrets
1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following repository secrets:

```
SONAR_TOKEN = [Your SonarCloud token from step 3.1]
```

**Note**: `GITHUB_TOKEN` is automatically provided by GitHub Actions.

## Step 4: Verify Configuration Files

The following files have been created in your repository:

### 4.1 GitHub Actions Workflow
- **File**: `.github/workflows/sonarcloud.yml`
- **Action**: `SonarSource/sonarqube-scan-action@v5`
- **Purpose**: Runs SonarCloud analysis on push and PR
- **Features**:
  - Full monorepo analysis
  - Test coverage integration
  - TypeScript support
  - Quality Gate validation
- **Note**: Updated to use the official `sonarqube-scan-action` (replaces deprecated `sonarcloud-github-action`)

### 4.2 SonarCloud Configuration
- **File**: `sonar-project.properties`
- **Purpose**: Main configuration for SonarCloud analysis
- **Key settings**:
  - Project metadata
  - Source and test paths
  - Coverage report paths
  - Exclusions for generated files

### 4.3 Updated Vitest Configuration
- **Files**: `vitest.config.ts`, `apps/website/vitest.config.ts`
- **Changes**: Added `lcov` reporter for SonarCloud compatibility

## Step 5: Quality Gates Configuration

### 5.1 Default Quality Gate
SonarCloud will use the default "Sonar way" quality gate, which includes:
- **Coverage**: > 80%
- **Duplicated Lines**: < 3%
- **Maintainability Rating**: A
- **Reliability Rating**: A
- **Security Rating**: A

### 5.2 Custom Quality Gate (Optional)
To align with your DDD architecture requirements:

1. In SonarCloud, go to **Quality Gates**
2. Create new quality gate: `Code4TW Standards`
3. Add conditions:
   - **Coverage on New Code**: > 90%
   - **Duplicated lines on New Code**: < 3%
   - **Security Hotspots Review Priority**: 100%
   - **Bugs**: 0
   - **Vulnerabilities**: 0

## Step 6: Integration with Existing CI/CD

### 6.1 Workflow Integration
The SonarCloud workflow integrates with your existing quality checks:
- Runs alongside `code-quality.yml`
- Shares the same triggers (push/PR to main/develop)
- Uses same Node.js and pnpm versions
- Leverages existing test coverage

### 6.2 Quality Gate Enforcement
The workflow includes Quality Gate validation:
- ✅ **Pass**: Allows merge/deployment
- ❌ **Fail**: Blocks merge until issues are resolved

## Step 7: First Run and Verification

### 7.1 Trigger First Analysis
1. Create a test branch:
   ```bash
   git checkout -b sonarcloud-setup
   git add .
   git commit -m "feat: add SonarCloud integration"
   git push origin sonarcloud-setup
   ```

2. Create a Pull Request to trigger the workflow

### 7.2 Monitor the Workflow
1. Go to **Actions** tab in GitHub
2. Watch the "SonarCloud Analysis" workflow
3. Check for any errors in the logs

### 7.3 View Results in SonarCloud
1. Go to your SonarCloud project dashboard
2. Review the analysis results
3. Check the Quality Gate status

## Step 8: Badge Integration (Optional)

Add SonarCloud badges to your README:

```markdown
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Michael0520_code4tw&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Michael0520_code4tw)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Michael0520_code4tw&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Michael0520_code4tw)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Michael0520_code4tw&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Michael0520_code4tw)
```

## Troubleshooting

### Common Issues

#### 1. Authentication Error
**Error**: `SONAR_TOKEN` not found
**Solution**: Verify the secret is added correctly in GitHub repository settings

#### 2. Automatic Analysis vs CI Analysis Conflict
**Error**: "You are running CI analysis while Automatic Analysis is enabled"
**Solution**:
- Go to SonarCloud project → Administration → Analysis Method
- Turn OFF "Automatic Analysis"
- Keep "CI-based analysis" ON
- This is the most common setup issue

#### 3. Deprecated Action Warning
**Error**: "This action is deprecated and will be removed in a future release"
**Solution**: Use `SonarSource/sonarqube-scan-action@v5` instead of `sonarcloud-github-action@master`

#### 4. Coverage Not Found
**Error**: No coverage reports found
**Solution**:
- Ensure tests are running successfully
- Check `lcov` reporter is included in vitest config
- Verify coverage paths match `sonar-project.properties`

#### 5. Quality Gate Failure
**Error**: Quality gate failed
**Solution**:
- Review SonarCloud project dashboard
- Fix reported issues (bugs, vulnerabilities, code smells)
- Increase test coverage if needed

#### 6. Monorepo Analysis Issues
**Error**: Some modules not analyzed
**Solution**:
- Check `sonar-project.properties` module configuration
- Ensure all source paths are correctly specified
- Verify test patterns match your project structure

### Debugging Steps

1. **Check GitHub Actions Logs**:
   - Go to Actions tab → Select failed workflow
   - Review "SonarCloud Scan" step logs

2. **Verify SonarCloud Project**:
   - Log into SonarCloud
   - Check project exists and is properly configured
   - Review analysis history

3. **Test Local Coverage**:
   ```bash
   pnpm test:coverage
   ls -la coverage/  # Should see lcov.info file
   ```

4. **Validate Configuration**:
   ```bash
   # Check sonar-project.properties syntax
   grep -E "^[^#]" sonar-project.properties
   ```

## Maintenance

### Regular Tasks
- **Weekly**: Review SonarCloud dashboard for new issues
- **Monthly**: Update quality gate thresholds if needed
- **Per Release**: Ensure all quality gates pass

### Keeping Up to Date
- Monitor SonarCloud for new rules and features
- Update SonarCloud GitHub Action when new versions are released
- Review and update exclusion patterns as project evolves

## Additional Resources

- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [TypeScript Analysis](https://docs.sonarcloud.io/enriching/languages/typescript/)
- [Test Coverage](https://docs.sonarcloud.io/enriching/test-coverage/overview/)
- [Quality Gates](https://docs.sonarcloud.io/improving/quality-gates/)

## Support

If you encounter issues:
1. Check this troubleshooting guide
2. Review SonarCloud documentation
3. Check GitHub Actions workflow logs
4. Contact the project maintainers