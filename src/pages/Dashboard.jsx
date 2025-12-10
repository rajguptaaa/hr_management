import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar, DollarSign, Bell, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { employees as employeesAPI, leaves as leavesAPI, attendance as attendanceAPI } from '../services/api'

const data = [
  { name: 'Jan', attendance: 85 },
  { name: 'Feb', attendance: 88 },
  { name: 'Mar', attendance: 82 },
  { name: 'Apr', attendance: 90 },
  { name: 'May', attendance: 87 },
  { name: 'Jun', attendance: 92 },
]

export default function Dashboard() {
  const [stats, setStats] = useState({ employees: 0, leaves: 0, present: 0, absent: 0 })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [empRes, leaveRes, attRes] = await Promise.all([
        employeesAPI.getAll(),
        leavesAPI.getAll(),
        attendanceAPI.getAll()
      ])
      const today = new Date().toDateString()
      const todayAtt = attRes.data.filter(a => new Date(a.date).toDateString() === today)
      setStats({
        employees: empRes.data.length,
        leaves: leaveRes.data.filter(l => l.status === 'Pending').length,
        present: todayAtt.filter(a => a.status === 'Present').length,
        absent: todayAtt.filter(a => a.status === 'Absent').length
      })
    } catch (error) {
      console.error('Failed to fetch stats')
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">DASHBOARD</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Attendance Summary</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Present: <strong>{stats.present}</strong></p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Absent: <strong>{stats.absent}</strong></p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Leave Requests</h3>
          <p className="text-2xl font-bold text-orange-600">{stats.leaves}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending approvals</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Total Employees</h3>
          <p className="text-2xl font-bold text-primary">{stats.employees}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Payroll Status</h3>
          <p className="text-sm text-green-600 font-medium">Ready to run</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp size={20} />
          Graph: Monthly Attendance Trend
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="attendance" stroke="#2d7ef7" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
          <Bell size={20} />
          Notifications Panel
        </h3>
        <div className="space-y-2">
          <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded text-sm dark:text-gray-200">Policy update: New leave policy</div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded text-sm dark:text-gray-200">System maintenance on 15th</div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded text-sm dark:text-gray-200">{stats.leaves} pending leave approvals</div>
        </div>
      </motion.div>
    </motion.div>
  )
}
