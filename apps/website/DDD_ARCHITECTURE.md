# DDD Architecture Overview

## Domain-Driven Design Implementation for Code4TW Website

This document outlines the complete DDD architecture implementation for the Code for Taiwan website application.

## Architecture Layers

### 1. Domain Layer (`src/domain/`)
Pure business logic with no external dependencies.

#### Entities
- **Project** (`entities/project.ts`) - Core project aggregate root
- **News** (`entities/news.ts`) - News article management
- **Event** (`entities/event.ts`) - Community event handling

#### Value Objects
- **ProjectId, NewsId, EventId** - Strongly typed identifiers
- **ProjectStatus** - Project lifecycle states (active, completed, planning, archived)
- **ProjectCategory** - Project categorization (government, education, etc.)
- **NewsCategory** - News categorization (announcement, release, event, community)
- **EventType** - Event types (workshop, hackathon, meetup, conference)
- **Location** - Event location handling (online/physical)
- **DateRange** - Time period management for events
- **Slug** - URL-friendly identifiers
- **Url** - Valid URL handling

#### Domain Services
- **ProjectAnalytics** (`services/project-analytics.ts`) - Project statistics and analysis

#### Domain Events
- **ProjectCreatedEvent** - Raised when new project is created
- **ProjectStatusChangedEvent** - Raised when project status changes
- **ProjectStatsUpdatedEvent** - Raised when GitHub stats update
- **ProjectTagsChangedEvent** - Raised when project tags change

#### Aggregates
- **ProjectAggregate** (`aggregates/project-aggregate.ts`) - Manages project state changes with domain events

### 2. Application Layer (`src/application/`)
Orchestrates domain logic and defines use cases.

#### Use Cases
- **GetFeaturedProjects** - Retrieve featured/popular projects
- **GetRecentNews** - Retrieve latest news articles
- **GetUpcomingEvents** - Retrieve upcoming community events

#### Repository Interfaces
- **ProjectRepository** - Project data access contract
- **NewsRepository** - News data access contract
- **EventRepository** - Event data access contract

#### DTOs
All use cases return properly typed DTOs to prevent domain leakage.

### 3. Infrastructure Layer (`src/infrastructure/`)
External system adapters and implementations.

#### Repository Implementations
- **InMemoryProjectRepository** - In-memory implementation for testing/development

### 4. Presentation Layer (Next.js App Router)
User interface and API endpoints built with Next.js.

## Key DDD Principles Implemented

### 1. Ubiquitous Language
- All domain concepts use consistent terminology (Project, Event, News)
- Business language reflected in code structure
- Clear value object names (ProjectStatus, EventType, etc.)

### 2. Bounded Contexts
- Project Management context
- News/Content Management context
- Event Management context
- Community Management context

### 3. Aggregate Design
- Project as aggregate root with proper invariants
- Domain events for state change notifications
- Encapsulated business rules within aggregates

### 4. Repository Pattern
- Abstract data access through interfaces
- Domain-focused query methods
- Separation of persistence concerns

### 5. Domain Events
- Loose coupling between aggregates
- Audit trail of business events
- Integration with external systems

## Business Rules Enforced

### Project Rules
- Title cannot be empty (max 100 chars)
- Description required (max 1000 chars)
- Star/fork counts cannot be negative
- Status transitions must follow business rules
- Tags are unique per project

### News Rules
- Title required (max 200 chars)
- Excerpt required (max 500 chars)
- Content required (max 50,000 chars)
- Slug auto-generated from title
- Published date set only when publishing

### Event Rules
- Title required (max 150 chars)
- Description required (max 2000 chars)
- Start date must be before end date
- Current participants cannot exceed max participants
- Registration can be opened/closed

## Domain Model Relationships

```
ProjectAggregate
├── Project (Entity)
├── ProjectId (Value Object)
├── ProjectStatus (Value Object)
├── ProjectCategory (Value Object)
└── ProjectEvents (Domain Events)

NewsAggregate
├── News (Entity)
├── NewsId (Value Object)
├── NewsCategory (Value Object)
├── AuthorId (Value Object)
└── Slug (Value Object)

EventAggregate
├── Event (Entity)
├── EventId (Value Object)
├── EventType (Value Object)
├── Location (Value Object)
└── DateRange (Value Object)
```

## Usage Examples

### Creating a Project
```typescript
const project = ProjectAggregate.create({
  title: "vTaiwan Platform",
  description: "Digital regulation platform for citizen participation",
  category: ProjectCategory.government(),
  status: ProjectStatus.active(),
  githubUrl: Url.create("https://github.com/g0v/vtaiwan.tw"),
  tags: ["Vue.js", "Node.js", "Policy Participation"]
});

// Domain events are automatically raised
const events = project.getDomainEvents(); // [ProjectCreatedEvent]
```

### Using Repository
```typescript
const useCase = new GetFeaturedProjects(projectRepository);
const result = await useCase.execute({ limit: 6 });
// Returns properly typed DTOs, not domain entities
```

## Benefits Achieved

1. **Business Logic Centralization** - All rules in domain layer
2. **Testability** - Pure domain logic easy to test
3. **Maintainability** - Clear separation of concerns
4. **Flexibility** - Easy to change infrastructure without affecting business logic
5. **Type Safety** - Strong typing throughout all layers
6. **English-Only Codebase** - Fully compliant with development standards

## Next Steps

Phase 3 will implement comprehensive TDD test coverage for all domain logic, ensuring the business rules are properly validated and maintained.