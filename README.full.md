# 2FA Authentication Project

> **Production-ready Two-Factor Authentication (2FA) mini-project showcasing secure multi-layer authentication**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Here-2ea44f?style=for-the-badge)](https://2fa-ideft.vercel.app)

## Overview

This project demonstrates a **Two-Factor Authentication (2FA)** system with **secure multi-layer authentication** to enhance user security. Built to showcase advanced authentication skills, it features a React-based frontend and an Express.js backend, using NeDB for user data storage.

**Architecture:**
- **Frontend**: React application ([https://2fa-ideft.vercel.app](https://2fa-ideft.vercel.app))
- **Backend**: Node.js + Express API server ([https://twofa-two-factor-authentication.onrender.com](https://twofa-two-factor-authentication.onrender.com))

**Key Features:**
- 🔐 Two-factor authentication with TOTP (Time-based One-Time Password)
- 📱 QR Code generation for authenticator app integration
- 🗄️ NeDB embedded database for user data storage
- 🚀 Independent deployment for frontend and backend
- ⚡ Responsive UI with Material-UI components
- 🔔 Real-time notifications with React Toastify
- 📋 Pre-configured demo users for immediate testing

## Technical Highlights

- Implemented TOTP-based 2FA with industry-standard security practices
- Built QR code generation for seamless authenticator app integration
- Utilized NeDB embedded database for lightweight and secure user data storage
- Integrated comprehensive 2FA authentication flow with TOTP verification

## Technical Implementation

**Frontend** (`http://localhost:5173`)
```bash
cd react-web
yarn install
yarn dev
```

**Backend** (`http://localhost:8018`)
```bash
cd node-api
yarn install
yarn dev
```

**Technology Stack:**
- **Frontend**: React 18.x, Vite, Material-UI, React Hook Form
- **Backend**: Node.js 20.x, Express, Babel transpilation
- **Authentication**: TOTP (Time-based One-Time Password), NeDB for user data
- **2FA Integration**: QR Code generation, Authenticator app support
- **Deployment**: Vercel (frontend), Render (backend)

## Authentication Flow
<div align="center">
<div>
  <img src="https://github.com/user-attachments/assets/f58baab4-ec96-470c-ba0d-fd21a5ca5a22" width="400" alt="Login without 2FA" style="display:inline-block; margin:8px;">
  <img src="https://github.com/user-attachments/assets/522a1b75-d22f-4f84-8938-0a892fbd07f5" width="400" alt="Enable 2FA with QR Code" style="display:inline-block; margin:8px;">
  <img src="https://github.com/user-attachments/assets/dee13721-1154-4164-b412-7b8ff32e942c" width="400" alt="Login success with 2FA" style="display:inline-block; margin:8px;">
</div>

***Login → Enable 2FA (QR Code) → Successful Login with TOTP***

</div>


1. **Initial Login (2FA disabled)**  
   - User logs in with pre-configured demo account credentials (`require_2fa=false`).  

2. **Enable 2FA**  
   - User clicks the **"Enable 2FA"** button.  
   - System generates a secret key and displays a **QR code** for setup.  

3. **QR Code Scan & Verification**  
   - User scans the QR code with an authenticator app (e.g., Google Authenticator, Authy).  
   - User enters the **TOTP code** from the authenticator app.  
   - On success, `require_2fa=true` is updated in the NeDB database.  

4. **Subsequent Logins**  
   - User logs in again with **email + password**.  
   - System requires the **current TOTP code** from the authenticator app.  
   - Access is granted upon successful verification.  

5. **Data Security**  
   - NeDB securely stores user authentication data, including the **2FA status** and secret key.  


**Demo Users:**

| Email                        | Password                                    |
|-------------------------     |-------------------------|
| `congthongdeft@gmail.com`    | `congthongdeft@123`     |


**2FA Features:**
- **TOTP Integration**: Compatible with Google Authenticator, Authy, Microsoft Authenticator
- **QR Code Generation**: Easy setup with authenticator apps
- **Session Management**: Secure session handling with NeDB

## Project Structure

```
project/
├── react-web/   # React frontend application
├── node-api/   # Express API server
└── README.md                 
└── README.full.md                 # This file
```

## Development & Production Scripts

**Frontend Commands:**
```bash
yarn dev             # Start Vite development server
npm run build        # Create production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code validation
```

**Backend Commands:**
```bash
yarn dev             # Start development server with Babel and Nodemon
npm run build        # Clean and transpile code with Babel for production
npm run production   # Run production server
npm run lint         # Run ESLint for code validation
```

## Key Dependencies

**Frontend:**
- `@mui/material`, `@mui/icons-material` - Material-UI components for UI
- `axios` - HTTP client for API communication
- `react-hook-form` - Form management and validation
- `react-router-dom` - Client-side routing
- `react-toastify` - Notification system
- `qrcode` - QR code generation for 2FA setup
- `@vitejs/plugin-react-swc`, `vite` - Fast build and refresh with Vite

**Backend:**
- `otplib` - TOTP implementation for 2FA
- `qrcode` - QR code generation for authenticator apps
- `cors` - Cross-Origin Resource Sharing configuration
- `cookie-parser` - Cookie handling middleware
- `nedb-promises` - Embedded database for user data
- `@babel/core` - ES6+ transpilation for Node.js compatibility

## Configuration Requirements

This project requires Node.js >= 20.x:

```bash
git clone <repository-url>
cd react-web
yarn install
cd node-api
yarn install
```

## Deployment

- **Frontend**: Deployed on Vercel with automatic deployment from Git
- **Backend**: Deployed on Render with automatic deployment from Git
- **Environment**: Production-ready with secure CORS and NeDB-based authentication

## Security Features

**Two-Factor Authentication:**
- TOTP-based verification with 30-second time windows
- QR code generation for easy authenticator app setup
- Secure secret key storage in NeDB
- Dynamic 2FA activation with `require_2fa` flag stored in NeDB


## Business Value

**Problem Solved:** Demonstrates a robust 2FA implementation to enhance user account security, showcasing advanced authentication system development skills.

**Technical Benefits:**
- Enhanced security with multi-factor authentication
- Industry-standard TOTP implementation
- Seamless user experience with QR code integration
- Scalable authentication system architecture with NeDB
- Flexible 2FA activation process

**What I Learned:** Implementing 2FA provided insights into advanced security concepts, including TOTP algorithms, QR code integration, dynamic 2FA activation, and balancing security with user experience.

## Getting Started

1. **Clone the repository**
2. **Install dependencies** for both frontend and backend
3. **Start development servers**:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8018`
4. **Test 2FA flow** with demo accounts:
   - First-time login: Log in with demo credentials, enable 2FA via QR code
   - Subsequent logins: Log in with password and TOTP code
5. **Use an authenticator app** (e.g., Google Authenticator, Authy) to scan QR codes


---

**Note:** This mini-project showcases a comprehensive Two-Factor Authentication implementation with TOTP, QR code integration, and dynamic 2FA activation, designed to demonstrate advanced authentication security skills for enterprise applications.
