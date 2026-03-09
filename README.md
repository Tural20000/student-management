# Student Management System

## Project Name & Description

**Student Management** is a full-stack web application designed to manage student records in an educational environment. The system provides secure user registration and authentication, role-based access control, and complete CRUD operations for student data. It serves as a demonstrative project showcasing modern Spring Boot backend practices with a React frontend.

The application enables administrators and users to:
- Register and authenticate securely
- View, add, edit, and delete student records
- Search and sort students by various fields
- Manage data through a responsive dark-themed UI

---

## Tech Stack

### Backend
| Technology | Version / Details |
|------------|------------------|
| **Java** | 17 |
| **Spring Boot** | 3.4.2 |
| **Maven** | Build tool |
| **Spring Web** | REST API |
| **Spring Data JPA** | ORM & repositories |
| **Spring Security** | Authentication & authorization |
| **Spring Validation** | Jakarta Bean Validation |
| **Spring Data Redis** | Caching |
| **H2 Database** | In-memory (development) |
| **MySQL Connector** | Runtime (production-ready) |
| **JWT (JJWT)** | 0.11.5 – Access tokens (1h), Refresh tokens (7d) |
| **BCrypt** | Password encoding |
| **Lombok** | Boilerplate reduction |
| **SpringDoc OpenAPI** | 2.6.0 – Swagger UI / API docs |
| **Logback** | Logging (console + file, daily rolling) |
| **Spring DevTools** | Hot reload |

### Frontend
| Technology | Version / Details |
|------------|------------------|
| **React** | 19.2.0 |
| **Vite** | 7.3.1 |
| **Axios** | HTTP client |
| **React Router DOM** | 7.x |

### Infrastructure
| Technology | Details |
|------------|---------|
| **Redis** | Caching (localhost:6379) |
| **Docker** | Optional: Redis + app containers |

---

## Features

### Authentication & Authorization
- **User Registration** – New users register with username and password (BCrypt)
- **JWT Login** – Returns access token (1 hour) and refresh token (7 days)
- **Refresh Token** – Exchange refresh token for a new access token
- **Role-Based Access** – Roles: `ROLE_GET`, `ROLE_ADD`, `ROLE_UPDATE`, `ROLE_DELETE`
- **Stateless Security** – SessionCreationPolicy.STATELESS

### Student Management
- **List Students** – Get all students (ID, name, surname, email, age, created_at)
- **Get by ID** – Fetch single student (cached via Redis)
- **Create Student** – Add student with validation
- **Update Student** – Edit existing student
- **Delete Student** – Remove student by ID

### Validation
- **StudentRequestDto**: `@NotBlank` name/surname, `@Email`, `@Min(18)` age
- **Global Exception Handler** – Returns structured field errors (field + message)

### Caching
- **Redis** – Caching for `getStudentById` (10 min TTL)
- **Cache Manager** – RedisCacheManager with `disableCachingNullValues`

### CORS
- Allowed origins: `http://localhost:5173`, `http://127.0.0.1:5173`
- Methods: GET, POST, PUT, DELETE, OPTIONS
- Credentials: allowed

### Frontend
- Registration and login modals
- Student table with search (by name/surname) and sortable columns
- Add / Edit / Delete with client-side validation
- Session storage for JWT (logout on tab close)
- Dark theme UI

---

## API Endpoints

### Authentication (`/apis`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/apis/login` | No | Login – returns `{ jwt, refreshToken }` |
| POST | `/apis/refresh-token` | No | Refresh access token (body: `{ refreshToken }`) |
| GET | `/apis/add` | Yes (ROLE_ADD) | Test endpoint |
| GET | `/apis/get` | Yes (ROLE_GET) | Test endpoint |
| GET | `/apis/update` | Yes (ROLE_UPDATE) | Test endpoint |
| GET | `/apis/delete` | Yes (ROLE_DELETE) | Test endpoint |

### Registration
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/reg-user` | No | Register – body: `{ username, password }` |

### Students (`/api/students`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/students` | Yes | Get all students |
| GET | `/api/students/{id}` | Yes | Get student by ID |
| POST | `/api/students` | Yes | Create student |
| PUT | `/api/students/{id}` | Yes | Update student |
| DELETE | `/api/students/{id}` | Yes | Delete student |

### Swagger / OpenAPI
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/swagger-ui.html` | No | Swagger UI |
| GET | `/v3/api-docs/**` | No | OpenAPI spec |

### H2 Console
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/h2-console/**` | No | H2 web console |

---

## How to Run

### Prerequisites
- **Java 17** or higher
- **Maven** 3.6+
- **Node.js** 18+ and **npm**
- **Redis** (optional for caching – app starts without it, but cache will fail)

### 1. Run Redis (Optional)
```bash
# Using Docker
docker run -d -p 6379:6379 redis:latest

# Or using docker-compose (runs Redis on port 6380)
cd backend
docker-compose up -d student_redis
```
If Redis is not running, consider disabling cache in `application.properties` or the app may log cache errors.

### 2. Run the Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
- Backend: **http://localhost:8050**
- Swagger UI: **http://localhost:8050/swagger-ui.html**
- H2 Console: **http://localhost:8050/h2-console**  
  - JDBC URL: `jdbc:h2:mem:studentdb`  
  - Username: `sa`  
  - Password: *(empty)*

### 3. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
- Frontend: **http://localhost:5173**

### 4. Default Users (from `data.sql`)
| Username | Password | Notes |
|----------|----------|-------|
| admin | *(BCrypt hash in data.sql)* | Full roles |
| u2 | *(BCrypt hash in data.sql)* | Full roles |

For local testing, you can register a new user via the UI or `/reg-user`.

### 5. Run with Docker (Backend + Redis)
```bash
cd backend
mvn clean package
docker-compose up --build
```
- App: **http://localhost:8050**
- Redis: internal to Docker network

---

## Project Structure

```
student-management/
├── backend/                 # Spring Boot API
│   ├── src/main/java/az/developia/student_management/
│   │   ├── config/          # Security, CORS, Redis, OpenAPI
│   │   ├── controller/      # Auth, Registration, Student
│   │   ├── dto/             # Request/Response DTOs
│   │   ├── entity/          # Student, User, Role
│   │   ├── exception/       # Custom exceptions
│   │   ├── filters/         # JWT filter
│   │   ├── handler/         # Global exception handler
│   │   ├── repository/      # JPA repositories
│   │   ├── service/         # Business logic
│   │   └── utils/           # JwtUtil, RefreshTokenUtil
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   ├── data.sql
│   │   └── logback-spring.xml
│   └── pom.xml
├── frontend/                # React + Vite
│   ├── src/
│   │   ├── api/             # Axios client, auth, students
│   │   ├── components/       # Register, Login, Student modals & table
│   │   └── context/         # AuthContext
│   └── package.json
└── README.md
```

---

## License

Demo project for educational purposes.

## Deployment & Live Demo

The application is fully containerized and deployed on a **Contabo VPS** (Ubuntu).

- **Environment:** Docker & Docker Compose
- **Status:** Running on a remote server 🟢
- **Access:** The API is accessible via the server's public IP on port `8050`.
- **Infrastructure:** Managed with SSH and deployed using a custom Docker configuration for Spring Boot and Redis.
