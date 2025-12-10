import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { toast } from 'react-toastify'

const reports = [
  { id: 1, title: 'Attendance Summary', category: 'Attendance' },
  { id: 2, title: 'Payroll Sheet', category: 'Payroll' },
  { id: 3, title: 'Leave Breakdown', category: 'Leaves' },
  { id: 4, title: 'Performance Report', category: 'Performance' },
]

export default function Reports() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">REPORTS</h2>

      <div className="flex gap-2 flex-wrap">
        <button className="px-4 py-2 bg-primary text-white rounded-lg">Attendance</button>
        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Payroll</button>
        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Performance</button>
        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Leaves</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report, i) => (
          <motion.div key={report.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">
            <h3 className="font-semibold text-lg dark:text-white mb-2">{report.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Category: {report.category}</p>
            <button onClick={() => toast.success(`Downloading ${report.title}`)} className="flex items-center gap-2 w-full justify-center py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
              <Download size={18} />
              Download
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
