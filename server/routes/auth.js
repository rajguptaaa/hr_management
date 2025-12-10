import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    console.log('Register request:', req.body)
    const { name, email, password, role } = req.body
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' })
    }
    
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }
    
    const user = new User({ name, email, password, role: role || 'admin' })
    await user.save()
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.status(201).json({ user: { name: user.name, email: user.email, role: user.role }, token })
  } catch (error) {
    console.error('Register error:', error)
    res.status(400).json({ error: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    console.log('Login request:', req.body)
    const { email, password } = req.body
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }
    
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.json({ user: { name: user.name, email: user.email, role: user.role }, token })
  } catch (error) {
    console.error('Login error:', error)
    res.status(400).json({ error: error.message })
  }
})

export default router
