import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Users, Plus } from 'lucide-react'
import { toast } from 'react-toastify'
import { jobs as jobsAPI } from '../services/api'

export default function Recruitment() {
  const [jobs, setJobs] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ title: '', applicants: 0 })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const { data } = await jobsAPI.getAll()
      setJobs(data)
    } catch (error) {
      toast.error('Failed to fetch jobs')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await jobsAPI.create(formData)
      toast.success('Job opening created successfully')
      setShowModal(false)
      setFormData({ title: '', applicants: 0 })
      fetchJobs()
    } catch (error) {
      toast.error('Failed to create job opening')
    }
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">JOB OPENINGS</h2>

      <div className="flex gap-3">
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">Add Job</button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">Filter</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job, i) => (
          <motion.div key={job.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">
            <h3 className="font-semibold text-lg dark:text-white mb-3">Position: {job.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Applicants: <span className="font-semibold dark:text-white">{job.applicants}</span></p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Status: <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded text-xs font-medium">{job.status}</span></p>
            <button onClick={() => toast.info(`Viewing applicants for ${job.title}`)} className="w-full py-2 bg-primary text-white rounded-lg hover:bg-blue-600">View Applicants</button>
          </motion.div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Create Job Opening</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Job Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required placeholder="e.g. Software Engineer" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Initial Applicants</label>
                <input type="number" value={formData.applicants} onChange={(e) => setFormData({...formData, applicants: e.target.value})} className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="0" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">Create Job</button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
