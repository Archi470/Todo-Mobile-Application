# Todo Application - Mobile Frontend

<div align="center">

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

*A sophisticated task management application built with React Native and Expo*

[Features](#features) • [Technology_Stack](#technology_stack) • [Architecture](#architecture) • [Installation](#installation) • [Configuration](#configuration) • [Application Flow](#application_flow) 

</div>

---

## Overview

This repository contains the mobile frontend for a full-stack Todo application. Built with React Native and Expo, it provides a seamless cross-platform experience for iOS, Android, and web. The application connects to a FastAPI backend through a robust REST API architecture, implementing industry-standard JWT authentication and modern state management patterns.

## Features
🔐 Secure Auth: JWT-based authentication with protected routes and safe token storage using AsyncStorage.

✅ Task Management: Full CRUD for todos with real-time updates and persistent sync.

🎨 User Experience: Clean, modern UI with cross-platform support (iOS, Android, Web) and responsive toast errors.

⚙️ Tech Stack: Context API for state, Axios interceptors for API handling, and environment-based configuration.

## Screenshots

<div align="center">

| Login | Signup |  Dashboard | Profile |
|:---:|:---:|:---:|:---:|
| <img src="./screenshots/login.png" alt="Login Interface" width="200"/> | <img src="./screenshots/signup.png" alt="Registration Interface" width="200"/> | <img src="./screenshots/dashboard.png" alt="Login Interface" width="200"/>  | <img src="./screenshots/profile.png" alt="Login Interface" width="200"/>  |

### Cross-Platform Implementation
<img src="./screenshots/web-view.png" alt="Web Interface" width="420"/>

*Consistent experience across all platforms*

</div>

## Technology_stack

| Category | Technology |
|----------|-----------|
| **Core Framework** | React Native |
| **Development Platform** | Expo SDK |
| **Navigation** | React Navigation v6 |
| **HTTP Client** | Axios |
| **State Management** | React Context API |
| **Persistent Storage** | AsyncStorage |
| **UI Components** | Custom components with Ionicons |
| **Language** | JavaScript (ES6+) |

## Architecture

```
frontend/
│
├── src/
│   ├── api/
│   │   └── client.js                 # API configuration and interceptors
│   │
│   ├── context/
│   │   ├── AuthContext.js            # Authentication state provider
│   │   └── ToastContext.js           # Notification system provider
│   │
│   ├── navigation/
│   │   ├── AppNavigator.js           # Root navigation container
│   │   └── AuthStack.js              # Authentication flow navigation
│   │
│   ├── screens/
│   │   ├── LoginScreen.js            # User authentication
│   │   ├── SignupScreen.js           # User registration
│   │   ├── DashboardScreen.js        # Task management interface
│   │   └── ProfileScreen.js          # User profile management
│   │
│   ├── styles/
│   │   └── globalStyles.js           # Application-wide styling constants
│   │
│   └── utils/
│       └── errorHandler.js           # Centralized error handling
│
├── screenshots/                            # Static resources
├── App.js                             # Application entry point
├── package.json                       # Dependency management
├── .env.example                       # Environment configuration template
└── README.md                          # Project documentation
```

## Installation

### Prerequisites

- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn** package manager
- **Expo CLI** installed globally
- **Android Studio** (optional, for Android emulator)
- **Xcode** (optional, for iOS simulator - macOS only)

### Setup Process

1. **Clone the repository**
```bash
git clone https://github.com/Archi470/Todo-Mobile-Application.git
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Update the `.env` file with your backend API URL:
```env
EXPO_PUBLIC_API_URL_DEVICE=http://192.168.1.100:8000
```

4. **Launch development server**
```bash
npx expo start
```

5. **Run the application**

Choose your preferred platform:
- **Android Emulator**: Press `a` or run `npx expo start --android`
- **iOS Simulator**: Press `i` or run `npx expo start --ios` (macOS only)
- **Web Browser**: Press `w` or run `npx expo start --web`
- **Physical Device**: Install Expo Go and scan the QR code

## Configuration

### Environment Variables

The application requires environment-specific configuration through a `.env` file:

```env
EXPO_PUBLIC_API_URL_DEVICE=http://192.168.1.100:8000
```

**Configuration Guidelines:**

| Platform | URL Format | Example |
|----------|-----------|---------|
| Physical Device | `http://LOCAL_IP:PORT` | `http://192.168.1.100:8000` |

**Determining Your Local IP:**

```bash
ipconfig
```

**Universal Method:**
```bash
npx expo start
# The Metro bundler will display your network IP
```

## Application_flow

```
Authentication → Task Management → Profile Management
     ↓                 ↓                    ↓
  Login/Signup    Create/Update/Delete   View/Logout
```

## API Integration

### Endpoint Overview

| Method | Endpoint | Purpose | Authentication |
|--------|----------|---------|----------------|
| POST | `/auth/signup` | User registration | Not required |
| POST | `/auth/login` | User authentication | Not required |
| GET | `/todos` | Retrieve user tasks | Required |
| POST | `/todos` | Create new task | Required |
| PATCH | `/todos/{id}` | Update existing task | Required |
| DELETE | `/todos/{id}` | Remove task | Required |
| GET | `/me` | Retrieve user profile | Required |


## Authentication

### Implementation Architecture

```
User Credentials → API Request → JWT Token → AsyncStorage
                                      ↓
                            Axios Interceptor → All API Calls
                                      ↓
                            Protected Resources Access
```

### Token Management

```javascript
// Token storage
await AsyncStorage.setItem('userToken', token);

// Token retrieval
const token = await AsyncStorage.getItem('userToken');

// Automatic token attachment
axios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Token removal
await AsyncStorage.removeItem('userToken');
```