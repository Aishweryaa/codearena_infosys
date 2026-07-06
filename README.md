# CodeArena Backend 

CodeArena is a Spring Boot backend engine designed to accept, compile, and execute user code submissions against specific problem test cases
which is similar to leetcode, codechef etc.

## 🛠️ Tech Stack
Java (Spring Boot)
MySQL (Database)

## ⚙️ Configuration & Port
The backend runs locally on port **8080**.
- **Base URL:** `http://localhost:8080`
- **Database:** `jdbc:mysql://localhost:3306/codearena_db`

## 📊 Code Execution Features
The system compiles raw source code using `javac` and handles compilation errors gracefully.

### Sample API Response (Compilation Error)
When a user submits code with syntax errors, the system returns a `201 Created` status along with raw compiler logs:

```json
{
    "id": 10,
    "language": "JAVA",
    "status": "COMPILATION_ERROR",
    "actualOutput": "Solution.java:1: error: ';' expected..."
}
```
