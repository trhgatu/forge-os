# Forge OS Backend

This is the backend service for **Forge OS**, a personal project built with **NestJS** and following strict **Domain-Driven Design (DDD)** principles.

## 🏗 Architecture

The project adopts a robust architectural style combining **Hexagonal Architecture (Ports & Adapters)** and **CQRS (Command Query Responsibility Segregation)** to ensure scalability, maintainability, and strict separation of concerns.

### Core Principles

- **Domain-Driven Design (DDD)**:
  - **Entities**: Rich domain models with encapsulated logic (e.g., `User`, `Role`, `AuditLog`).
  - **Value Objects**: Immutable objects ensuring type safety and validation (e.g., `UserId`, `Email`).
  - **Aggregates**: Clusters of domain objects treated as a single unit.

- **CQRS**:
  - **Commands**: Write operations (Create, Update, Delete) handled by specific Command Handlers.
  - **Queries**: Read operations handled by Query Handlers.
  - **Events**: Domain events used for side effects (e.g., Cache Invalidation) via Event Bus.

- **Hexagonal Architecture**:
  - **Domain Layer**: Pure business logic, no external dependencies.
  - **Application Layer**: Use cases (Handlers), Ports (Interfaces).
  - **Infrastructure Layer**: Adapters for Databases (Mongoose), External Services, and Framework implementations.
  - **Presentation Layer**: HTTP Controllers (REST API).

---

## 📦 Modules Overview

### 1. IAM Context (Identity & Access Management)

Fully refactored to strict DDD standards.

- **Users**: User management with soft-delete, restore, and caching.
- **Roles**: Role-based access control (RBAC).
- **Permissions**: Granular permission management.
- **Features**:
  - **Strict Encapsulation**: Primitives are only exposed via DTOs/Mappers.
  - **Reactive Caching**: Cache invalidation triggered by Domain Events (`UserModifiedEvent`, etc.).
  - **Soft Delete**: Built-in support for `isDeleted`, `deletedAt`, and `restore()` functionality.

### 2. System Context

- **AuditLog**:
  - Tracks all system activities.
  - Implements **Strict DDD** with `AuditLogId` and `AuditLog` Entity.
  - Uses `AuditLogMapper` to safely handle MongoDB population.
  - Separate `Create` and `Get` handlers following CQRS.

### 3. Reflection Context

- The reference implementation for high-standard DDD patterns in this codebase.

---

## 🛠 Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB (Mongoose)
- **Language**: TypeScript
- **Architecture**: DDD, CQRS
- **Validation**: class-validator, class-transformer
- **Linting**: ESLint, Prettier

---

**Forge OS** - Personal Project (2025)
