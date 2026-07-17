# CodeArena Milestone 2 — Complete Full Stack

This package is developed **up to Milestone 2**.

## Milestone 1 included

- Spring Boot project structure
- MySQL connection
- Flyway migrations
- User, Problem, ProblemHint, TestCase, Submission, SubmissionResult and LeaderboardEntry entities
- All repositories
- Validation-ready schema

## Milestone 2 included

- User registration
- Normal email/password login
- BCrypt password hashing
- JWT token generation and validation
- JWT authentication filter
- Protected APIs
- USER and ADMIN roles
- Google login and backend ID-token verification
- Current-user profile API
- User dashboard API
- Admin dashboard API
- Admin list-users API
- Admin update-user-role API
- Swagger JWT authorization
- CORS configuration
- Professional responsive React website
- Protected frontend routes
- User dashboard and profile
- Admin dashboard and user management

## Local development accounts

The backend creates this local administrator on first run:

```text
Email: admin@codearena.local
Password: Admin@123
```

Change these development credentials before deployment.

## Run backend

First open:

```text
backend/src/main/resources/application.properties
```

Change:

```properties
spring.datasource.password=CHANGE_THIS_TO_YOUR_MYSQL_PASSWORD
```

Then run:

```powershell
cd backend
.\mvnw.cmd clean spring-boot:run
```

Swagger:

```text
http://localhost:8080/swagger-ui/index.html
```

## Run frontend

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

Open:

```text
http://localhost:5173
```

## Database

The project automatically creates and uses:

```text
codearena_milestone2_db
```

This keeps your older CodeArena database safe.
