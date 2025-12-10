import express from 'express'
import Payroll from '../models/Payroll.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const payroll = await Payroll.find().populate('employeeId')
    res.json(payroll)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const payroll = new Payroll(req.body)
    await payroll.save()
    res.status(201).json(payroll)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
