import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import { leaves as leavesAPI } from '../services/api'

export default function Leave() {
  const [leaveRequests, setLeaveRequests] = useState([])

  useEffect(() => {
    fetchLeaves()
  }, [])

  const fetchLeaves = async () => {
    try {
      const { data } = await leavesAPI.getAll()
      setLeaveRequests(data)
    } catch (error) {
      toast.error('Failed to fetch leaves')
    }
  }

  const handleApprove = async (id, name) => {
    try {
      await leavesAPI.updateStatus(id, 'Approved')
      toast.success(`${name}'s leave approved`)
      fetchLeaves()
    } catch (error) {
      toast.error('Failed to approve leave')
    }
  }

  const handleReject = async (id, name) => {
    try {
      await leavesAPI.updateStatus(id, 'Rejected')
      toast.error(`${name}'s leave rejected`)
      fetchLeaves()
    } catch (error) {
      toast.error('Failed to reject leave')
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">LEAVE REQUESTS</h2>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 rounded-lg font-medium">Pending</button>
        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Approved</button>
        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Rejected</button>
      </div>

      <div className="space-y-4">
        {leaveRequests.map((req, i) => (
          <motion.div key={req.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Name: <span className="font-semibold text-gray-900 dark:text-white">{req.name}</span></p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Type: <span className="font-medium dark:text-gray-300">{req.type}</span></p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Dates: <span className="font-medium dark:text-gray-300">{req.dates}</span></p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Status: <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 rounded text-xs font-medium">{req.status}</span></p>
              </div>
              <div className="flex gap-2 items-start">
                <button onClick={() => handleApprove(req._id, req.name)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">Approve</button>
                <button onClick={() => handleReject(req._id, req.name)} className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 text-sm">Reject</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
