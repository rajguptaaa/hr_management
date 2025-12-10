import express from 'express'
import Employee from '../models/Employee.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const employees = await Employee.find()
    res.json(employees)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const employee = new Employee(req.body)
    await employee.save()
    res.status(201).json(employee)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(employee)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id)
    res.json({ message: 'Employee deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
