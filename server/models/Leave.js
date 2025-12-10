import mongoose from 'mongoose'

const leaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  dates: { type: String, required: true },
  days: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  reason: { type: String }
}, { timestamps: true })

export default mongoose.model('Leave', leaveSchema)
