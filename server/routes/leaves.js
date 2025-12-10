import express from 'express'
import Leave from '../models/Leave.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const leaves = await Leave.find().populate('employeeId')
    res.json(leaves)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const leave = new Leave(req.body)
    await leave.save()
    res.status(201).json(leave)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.patch('/:id', auth, async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
    res.json(leave)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
