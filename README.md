# 2FA Authentication Project

> **Mini-project demonstrating secure Two-Factor Authentication (2FA) with TOTP**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Here-2ea44f?style=for-the-badge)](https://2fa-ideft.vercel.app)

## Overview
A small project showcasing **Two-Factor Authentication (2FA)** using **Time-based One-Time Password (TOTP)** with QR code setup and authenticator app integration.

- **Frontend**: React (Vercel) → [2fa-ideft.vercel.app](https://2fa-ideft.vercel.app)  
- **Backend**: Node.js + Express (Render) → [twofa-two-factor-authentication.onrender.com](https://twofa-two-factor-authentication.onrender.com)  

## Key Features
- 🔐 Login + 2FA verification flow  
- 📱 QR Code generation for Google Authenticator / Authy  
- 🗄️ Lightweight NeDB database for user data  
- ⚡ Responsive UI with Material-UI + React Toastify  

## Tech Stack
- **Frontend**: React 18, Vite, Material-UI, React Hook Form  
- **Backend**: Node.js 20, Express, NeDB, OTPLib, QRCode  
- **Deployment**: Vercel (frontend), Render (backend)  

## Set up

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


## Demo Users

| Email                        | Password                                    |
|-------------------------     |-------------------------|
| `congthongdeft@gmail.com`    | `congthongdeft@123`     |


## Documentation (README full)
👉 [Project Details](./README.full.md)
