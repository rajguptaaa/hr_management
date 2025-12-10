import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.status(201).json({ user: { name: user.name, email: user.email, role: user.role }, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !(await user.comparePassword(req.body.password))) {
      throw new Error('Invalid credentials')
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.json({ user: { name: user.name, email: user.email, role: user.role }, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
