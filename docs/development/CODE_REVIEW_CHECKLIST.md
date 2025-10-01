# Code Review Checklist - Code4TW Development Standards

## 🚫 Critical Requirements (Must Pass)

### English-Only Codebase

- [ ] **No Chinese characters** in variable names, function names, class names
- [ ] **No Chinese characters** in comments or documentation
- [ ] **No Chinese characters** in commit messages
- [ ] **Exception**: Chinese content only allowed in i18n/translation files
- [ ] All identifiers use proper English words (not transliterated Chinese)

### Test-Driven Development (TDD)

- [ ] **Tests written before implementation** (Red-Green-Refactor cycle followed)
- [ ] **Domain layer**: 100% test coverage
- [ ] **Application layer**: 80%+ test coverage
- [ ] **Tests use AAA pattern** (Arrange, Act, Assert with clear comments)
- [ ] **Test names descriptive**: "should [expected behavior] when [condition]"
- [ ] **No test modifications** to make failing code pass (tests are immutable contracts)

### Domain-Driven Design (DDD) Architecture

- [ ] **Clear layer separation**: Domain, Application, Infrastructure, Presentation
- [ ] **Dependency rule respected**: Dependencies point inward (UI → App → Domain)
- [ ] **Domain layer pure**: No external dependencies (no database, API, UI dependencies)
- [ ] **Value Objects immutable**: Cannot be modified after creation
- [ ] **Entities have clear identity**: Proper ID management
- [ ] **Repository interfaces** in Domain, implementations in Infrastructure

### Configuration-Driven Development

- [ ] **No magic numbers**: All constants have semantic names and are configurable
- [ ] **Business rules externalized**: Logic in configuration objects, not hardcoded
- [ ] **Feature flags used**: For conditional functionality
- [ ] **Environment-specific config**: Proper environment variable usage
- [ ] **No hardcoded URLs or strings**: All externalized to configuration

## 📋 Code Quality Standards

### Function Design

- [ ] **Single Responsibility**: Each function has one clear purpose
- [ ] **Pure functions preferred**: No side effects when possible
- [ ] **Max 3 parameters**: Use objects for complex parameter sets
- [ ] **Meaningful names**: Function name describes exact behavior
- [ ] **Max 50 lines**: Functions longer than 50 lines should be split
- [ ] **Max complexity 10**: Reduce nested conditionals and loops

### Error Handling

- [ ] **Result pattern used**: Return success/failure objects instead of throwing
- [ ] **Type-safe errors**: Use discriminated unions for error types
- [ ] **Meaningful error messages**: Include context and next steps
- [ ] **No generic try-catch**: Handle specific error cases
- [ ] **Domain errors separate**: Business logic errors vs system errors

### TypeScript Standards

- [ ] **No `any` type**: All types explicitly defined
- [ ] **Strict mode enabled**: Full TypeScript strict configuration
- [ ] **Return types explicit**: All functions have explicit return types
- [ ] **Interface over type**: Use interfaces for object shapes
- [ ] **Readonly where appropriate**: Immutable data structures preferred

### Naming Conventions

- [ ] **Files**: kebab-case (`user-service.ts`)
- [ ] **Directories**: kebab-case (`value-objects/`)
- [ ] **Variables/Functions**: camelCase (`getUserById`)
- [ ] **Classes**: PascalCase (`UserService`)
- [ ] **Constants**: SCREAMING_SNAKE_CASE (`MAX_RETRIES`)
- [ ] **Types/Interfaces**: PascalCase (`UserEntity`)

## 🏗️ Architecture Compliance

### DDD Layer Verification

- [ ] **Domain entities**: No infrastructure dependencies
- [ ] **Value objects**: Immutable and self-validating
- [ ] **Repository interfaces**: Abstract, no implementation details
- [ ] **Use cases**: Clear input/output, orchestrate domain logic
- [ ] **Infrastructure**: Implements domain interfaces
- [ ] **Presentation**: Depends only on application layer

### Test Structure

- [ ] **Test files co-located**: `__tests__` folder next to source
- [ ] **Test naming**: Descriptive describe blocks and test cases
- [ ] **Factory functions**: For creating test data
- [ ] **Mock management**: Clear mocking strategy
- [ ] **Setup/teardown**: Proper test environment management

### Configuration Architecture

- [ ] **Centralized config**: Single configuration entry point
- [ ] **Environment overrides**: Environment variables override defaults
- [ ] **Type-safe config**: All configuration typed
- [ ] **Validation**: Configuration validation on startup
- [ ] **Feature flags**: Proper feature flag implementation

## 🔍 Code Review Process

### Before Review

- [ ] **Self-review completed**: Author has reviewed their own code
- [ ] **Tests passing**: All tests pass locally
- [ ] **Linting clean**: No ESLint errors or warnings
- [ ] **Type checking**: No TypeScript errors
- [ ] **Build successful**: Code builds without errors

### During Review

- [ ] **Architecture alignment**: Follows DDD principles
- [ ] **Test quality**: Tests are comprehensive and well-written
- [ ] **Configuration usage**: Business logic properly externalized
- [ ] **English usage**: All code elements in English
- [ ] **Security considerations**: No exposed secrets or vulnerabilities

### Review Comments

- [ ] **Constructive feedback**: Specific, actionable suggestions
- [ ] **Learning opportunities**: Explain better patterns when suggesting changes
- [ ] **Praise good practices**: Acknowledge well-written code
- [ ] **Reference standards**: Link to relevant documentation when correcting

## 🚨 Rejection Criteria (Automatic Rejection)

The following will result in automatic code rejection:

1. **Any Chinese characters** in code, comments, or commit messages
2. **No tests** for new functionality
3. **Modification of existing tests** to make new code pass
4. **Magic numbers or hardcoded values** in business logic
5. **Domain layer dependencies** on infrastructure
6. **Use of `any` type** without proper justification
7. **Functions longer than 50 lines** without refactoring
8. **Missing error handling** for expected failure cases

## ✅ Approval Criteria

Code can be approved when:

1. **All critical requirements met**: English-only, TDD, DDD, Config-driven
2. **Test coverage adequate**: Meets layer-specific coverage goals
3. **Architecture sound**: Proper layer separation and dependency management
4. **Configuration externalized**: No hardcoded business logic
5. **Code quality high**: Readable, maintainable, well-structured
6. **Documentation complete**: Proper JSDoc and inline comments
7. **Security validated**: No vulnerabilities introduced

## 📚 References

- [CLAUDE.md](./CLAUDE.md) - Complete development standards
- [DDD Architecture Guide](./docs/ddd-architecture.md)
- [TDD Workflow](./docs/tdd-workflow.md)
- [Configuration Patterns](./docs/configuration-patterns.md)
- [TypeScript Style Guide](./docs/typescript-style.md)

---

**Remember**: These standards exist to ensure maintainable, scalable, and high-quality code. They are non-negotiable principles that define our development culture.
