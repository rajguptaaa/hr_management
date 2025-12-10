# HR Management System - Full Stack Setup

## Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

## Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies (already done):
```bash
npm install
```

3. Configure MongoDB:
- Update `server/.env` with your MongoDB URI
- Default: `mongodb://localhost:27017/hr_management`

4. Start backend server:
```bash
npm run dev
```
Server runs on: http://localhost:5000

## Frontend Setup

1. Navigate to root directory:
```bash
cd ..
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start frontend:
```bash
npm run dev
```
Frontend runs on: http://localhost:5173

## First Time Setup

1. Register a user via API or create directly in MongoDB:
```bash
POST http://localhost:5000/api/auth/register
{
  "email": "admin@hrhub.com",
  "password": "admin123",
  "name": "Admin User",
  "role": "admin"
}
```

2. Login with credentials:
- Email: admin@hrhub.com
- Password: admin123

## Features Implemented

### Backend (Node.js + Express + MongoDB)
✅ JWT Authentication
✅ User Management
✅ Employee CRUD Operations
✅ Attendance Management
✅ Leave Management (Approve/Reject)
✅ Payroll Management
✅ Job/Recruitment Management
✅ CORS enabled
✅ Protected Routes

### Frontend (React + Tailwind)
✅ Login/Logout with JWT
✅ Protected Routes
✅ Employee Management (Fetch from API)
✅ Leave Management (Approve/Reject via API)
✅ Dark/Light Theme
✅ Responsive Design
✅ Toast Notifications
✅ Framer Motion Animations

## API Endpoints

All endpoints require JWT token (except auth endpoints)

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Employees
- GET /api/employees
- POST /api/employees
- PUT /api/employees/:id
- DELETE /api/employees/:id

### Attendance
- GET /api/attendance
- POST /api/attendance

### Leaves
- GET /api/leaves
- POST /api/leaves
- PATCH /api/leaves/:id

### Payroll
- GET /api/payroll
- POST /api/payroll

### Jobs
- GET /api/jobs
- POST /api/jobs

## Running Both Servers

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

## Default Login
After creating a user, login at: http://localhost:5173/login
