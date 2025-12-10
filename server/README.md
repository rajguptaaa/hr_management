# HR Management Backend

## Setup Instructions

1. Install MongoDB locally or use MongoDB Atlas
2. Install dependencies:
```bash
cd server
npm install
```

3. Update `.env` file with your MongoDB URI

4. Start the server:
```bash
npm run dev
```

## Default Admin User
Create a user via API or MongoDB:
```json
{
  "email": "admin@hrhub.com",
  "password": "admin123",
  "name": "Admin User",
  "role": "admin"
}
```

## API Endpoints

### Auth
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user

### Employees
- GET /api/employees - Get all employees
- POST /api/employees - Create employee
- PUT /api/employees/:id - Update employee
- DELETE /api/employees/:id - Delete employee

### Attendance
- GET /api/attendance - Get all attendance
- POST /api/attendance - Create attendance record

### Leaves
- GET /api/leaves - Get all leaves
- POST /api/leaves - Create leave request
- PATCH /api/leaves/:id - Update leave status

### Payroll
- GET /api/payroll - Get all payroll
- POST /api/payroll - Create payroll record

### Jobs
- GET /api/jobs - Get all jobs
- POST /api/jobs - Create job opening
