import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import employeeRoutes from './routes/employees.js'
import attendanceRoutes from './routes/attendance.js'
import leaveRoutes from './routes/leaves.js'
import payrollRoutes from './routes/payroll.js'
import jobRoutes from './routes/jobs.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://your-frontend-domain.com'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

app.use('/api/auth', authRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/leaves', leaveRoutes)
app.use('/api/payroll', payrollRoutes)
app.use('/api/jobs', jobRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
