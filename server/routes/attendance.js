import express from 'express'
import Attendance from '../models/Attendance.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('employeeId')
    res.json(attendance)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const attendance = new Attendance(req.body)
    await attendance.save()
    res.status(201).json(attendance)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
