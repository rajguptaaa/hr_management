import mongoose from 'mongoose'

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  timeIn: { type: String },
  timeOut: { type: String },
  hours: { type: Number, default: 0 },
  status: { type: String, enum: ['Present', 'Absent', 'Late'], required: true }
}, { timestamps: true })

export default mongoose.model('Attendance', attendanceSchema)
