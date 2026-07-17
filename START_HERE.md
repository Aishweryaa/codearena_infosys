# CodeArena Milestone 2 — Start Here

This is a separate, complete Milestone 2 project. Your previous project is not deleted.

## 1. Configure MySQL

Open:

```text
backend/src/main/resources/application.properties
```

Replace:

```properties
spring.datasource.password=CHANGE_THIS_TO_YOUR_MYSQL_PASSWORD
```

with your actual local MySQL password.

The backend automatically creates this database:

```text
codearena_milestone2_db
```

## 2. Run backend

```powershell
cd backend
.\mvnw.cmd clean spring-boot:run
```

Wait for:

```text
Started BackendApplication
```

Swagger:

```text
http://localhost:8080/swagger-ui/index.html
```

## 3. Run frontend

Open another terminal:

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

Open:

```text
http://localhost:5173
```

## 4. Test normal user

Register using the professional registration page.

Password example:

```text
Code@123
```

## 5. Test administrator

A local admin is created automatically on first backend run:

```text
Email: admin@codearena.local
Password: Admin@123
```

Login with this account to open the professional admin panel.

## Completed requirements

- Milestone 1 entities, repositories, MySQL and Flyway
- Local registration and login
- BCrypt password hashing
- Google authentication
- JWT token generation and validation
- Protected user APIs
- USER and ADMIN roles
- Protected admin APIs
- Current user profile
- User dashboard
- Admin dashboard
- User management and role update
- Professional responsive React pages
- Swagger bearer-token authorization
