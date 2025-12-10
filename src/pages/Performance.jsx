import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, TrendingUp } from 'lucide-react'
import { toast } from 'react-toastify'
import { employees as employeesAPI } from '../services/api'

export default function Performance() {
  const [performanceData, setPerformanceData] = useState([])

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const { data } = await employeesAPI.getAll()
      const perfData = data.map(emp => ({
        id: emp._id,
        name: emp.name,
        kpi: (Math.random() * 2 + 3).toFixed(1),
        lastReview: '01 Sep 2025',
        nextReview: '01 Mar 2026'
      }))
      setPerformanceData(perfData)
    } catch (error) {
      toast.error('Failed to fetch performance data')
    }
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">PERFORMANCE OVERVIEW</h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="font-semibold text-lg dark:text-white mb-4">Goal Progress Graph</h3>
        <div className="h-64 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 rounded-lg flex flex-col items-center justify-center p-8 text-center">
          <svg className="w-20 h-20 mb-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">"Success is the sum of small efforts repeated day in and day out."</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">- Robert Collier</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-lg dark:text-white">Reviews Due This Month: <span className="font-bold text-primary">12</span></p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">KPI Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">Last Review</th>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">Next Review</th>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {performanceData.map((emp, i) => (
                <motion.tr key={emp.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 font-medium dark:text-white">{emp.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">{emp.kpi}</span>
                  </td>
                  <td className="px-6 py-4 dark:text-gray-300">{emp.lastReview}</td>
                  <td className="px-6 py-4 dark:text-gray-300">{emp.nextReview}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => toast.info(`Viewing ${emp.name}'s performance`)} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 text-sm">View Details</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
