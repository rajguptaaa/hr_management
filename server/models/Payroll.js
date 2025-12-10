import mongoose from 'mongoose'

const payrollSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  name: { type: String, required: true },
  basic: { type: Number, required: true },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  net: { type: Number, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true }
}, { timestamps: true })

export default mongoose.model('Payroll', payrollSchema)
