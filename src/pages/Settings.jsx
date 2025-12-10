import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { toast } from 'react-toastify'

const settings = [
  { id: 1, title: 'Company Details', desc: 'Manage company information' },
  { id: 2, title: 'Policies', desc: 'Configure HR policies' },
  { id: 3, title: 'Attendance Rules', desc: 'Set attendance parameters' },
  { id: 4, title: 'Roles & Permissions', desc: 'Manage user access' },
  { id: 5, title: 'Notification Controls', desc: 'Configure notifications' },
]

export default function Settings() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">SETTINGS</h2>

      <div className="space-y-3">
        {settings.map((setting, i) => (
          <motion.div key={setting.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} onClick={() => toast.info(`Opening ${setting.title}`)} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow border dark:border-gray-700 hover:shadow-md transition cursor-pointer flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg dark:text-white">{setting.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{setting.desc}</p>
            </div>
            <ChevronRight className="text-gray-400 dark:text-gray-500" size={24} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
