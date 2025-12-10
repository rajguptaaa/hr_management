import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  applicants: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Closed'], default: 'Active' },
  posted: { type: Date, default: Date.now }
}, { timestamps: true })

export default mongoose.model('Job', jobSchema)
