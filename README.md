# Todo Application - Full Stack

<div align="center">

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)



[Architecture](#architecture) • [Quick Start](#quick-start) • [Documentation](#documentation)

</div>

---

## Overview

Full-stack task management platform combining React Native mobile frontend with FastAPI backend. Cross-platform deployment (iOS, Android, Web) with JWT authentication, real-time CRUD operations, and PostgreSQL persistence. Implements Context API state management, SQLAlchemy ORM, and automated data validation for scalable, production-ready deployment.

## Architecture

### System Design

```
Mobile Clients (iOS/Android/Web)
            ↓
    React Native + Expo
            ↓
    REST API (FastAPI)
            ↓
SQLAlchemy ORM / PostgreSQL Database
```

### Repository Structure

```
todo-app/
├── frontend/          # React Native + Expo application
│   └── [See frontend/README.md for details]
│
├── backend/           # FastAPI REST API
│   └── [See backend/README.md for details]

```

## Technology Stack

| Component | Technology |
|-----------|-----------|
| **Mobile** | React Native, Expo, React Navigation |
| **Backend** | FastAPI, Python 3.8+, Uvicorn |
| **Database** | PostgreSQL, SQLAlchemy ORM |
| **Auth** | JWT, bcrypt, AsyncStorage |
| **API** | Axios, Pydantic validation |

## Quick Start

### Prerequisites
- Node.js 16+, Python 3.8+, PostgreSQL 12+
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
# Clone repository
git clone https://github.com/Archi470/Todo-Mobile-Application.git
cd todo-app
```

## Documentation

Detailed documentation available in respective directories:
- **Frontend:** [frontend/README.md](frontend/README.md)
- **Backend:** [backend/README.md](backend/README.md)
