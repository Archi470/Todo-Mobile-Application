# Todo Application - Backend API

<div align="center">

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

*A robust REST API backend for task management built with FastAPI and modern Python practices*

[Features](#features) • [Installation](#installation) • [API Documentation](#api-documentation) 

</div>

---

## Overview

This repository contains the backend API service for a full-stack Todo application. Built with FastAPI, it provides a high-performance, scalable REST API with comprehensive authentication, data validation, and database management. The service implements industry-standard security practices including JWT authentication, password hashing, and secure session management.

## Features

**Authentication & Security**
- JWT-based authentication system with secure token generation
- Password hashing using bcrypt algorithm
- CORS configuration for cross-origin requests

**Data Management**
- RESTful CRUD operations for todo items
- User-specific data isolation
- Data validation with Pydantic models

**API Architecture**
- Automatic interactive API documentation (Swagger UI)
- OpenAPI schema generation
- Request/response validation

**Technical Highlights**
- Asynchronous request handling
- SQLAlchemy ORM integration
- Modular route organization

## Technology Stack

| Category | Technology |
|----------|-----------|
| **Framework** | FastAPI 0.104+ |
| **Language** | Python 3.8+ |
| **Database** | PostgreSQL / SQLite |
| **ORM** | SQLAlchemy 2.0+ |
| **Authentication** | JWT (PyJWT) |
| **Password Hashing** | Passlib with bcrypt |
| **Validation** | Pydantic v2 |
| **ASGI Server** | Uvicorn |
| **Environment** | python-dotenv |

## Architecture

```
backend/
│
├── app/
│   ├── main.py                        # FastAPI application entry point
│   ├── auth.py                        # Authentication logic (JWT, password hashing)
│   ├── database.py                    # Database connection and session management
│   ├── models.py                      # SQLAlchemy ORM models (User, Todo)
│   ├── schemas.py                     # Pydantic validation schemas
│   ├── crud.py                        # Database CRUD operations
│   │
│   └── routes/
│       ├── todos.py                   # Todo endpoints (GET, POST, PATCH, DELETE)
│       └── users.py                   # User management endpoints
│
├── requirements.txt                   # Python package dependencies
├── .env.example                       # Environment variables template
├── .gitignore                         # Git ignore configuration
└── README.md                          # Project documentation
```

## Installation

### Prerequisites

- **Python** 3.8 or higher
- **PostgreSQL** 12+ (or SQLite for development)
- **pip** package manager
- **virtualenv** (recommended)

### Setup Process

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/todo-app-backend.git
cd backend
```

2. **Create virtual environment**
```bash
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
SECRET_KEY=replace_this_with_a_random_secret
DATABASE_URL=sqlite:///./todos.db # or postgres://user:pass@host:port/dbname
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

5. **Initialize database**
```bash
# Create database tables
python -m app.core.database

# Or using Alembic migrations
alembic upgrade head
```

6. **Launch development server**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
# For SQLite (development):
# DATABASE_URL=sqlite:///./todo.db

# Security Configuration
SECRET_KEY=your-super-secret-key-keep-it-safe
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://localhost:19006

# Server Configuration
API_V1_PREFIX=/api/v1
PROJECT_NAME=Todo API
DEBUG=True
```

### Security Configuration

**Generating a Secure Secret Key:**
```bash
# Using Python
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Using OpenSSL
openssl rand -hex 32
```

### Database Configuration

**PostgreSQL Setup:**
```bash
# Create database
createdb tododb

# Verify connection
psql -U username -d tododb
```

**SQLite Setup (Development):**
```env
DATABASE_URL=sqlite:///./todo.db
```

## API Documentation

### Interactive Documentation

Once the server is running, access the interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI Schema**: `http://localhost:8000/openapi.json`

### Authentication Endpoints

#### Register New User
```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
}
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
}
```

#### User Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

## Database Schema

### User Model

| Column | Type | Constraints |
|--------|------|-------------|
| id | Integer | Primary Key |
| email | String(255) | Unique, Not Null |
| hashed_password | String(255) | Not Null |

### Todo Model

| Column | Type | Constraints |
|--------|------|-------------|
| id | Integer | Primary Key |
| title | String(255) | Not Null |
| description | Text | - |
| completed | Boolean | Default: False |
| user_id | Integer | Foreign Key (users.id) |

**Relationships:**
- User → Todos: One-to-Many
- Todo → User: Many-to-One (owner)

## Acknowledgments

This project leverages the following technologies:

- **FastAPI** - Modern, high-performance web framework
- **SQLAlchemy** - Comprehensive database toolkit
- **Pydantic** - Data validation using Python type annotations
- **Uvicorn** - Lightning-fast ASGI server
- **Alembic** - Database migration management
- **Passlib** - Password hashing library
- **PyJWT** - JSON Web Token implementation

## Roadmap

**Completed Features:**
-  JWT authentication system
-  User registration and management
-  Todo CRUD operations
-  Database relationship management
-  API documentation generation

---
