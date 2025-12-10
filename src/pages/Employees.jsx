import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Mail, Phone } from 'lucide-react'
import { toast } from 'react-toastify'
import { employees as employeesAPI } from '../services/api'

export default function Employees() {
  const [search, setSearch] = useState('')
  const [employees, setEmployees] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    dept: '',
    status: 'Active'
  })

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const { data } = await employeesAPI.getAll()
      setEmployees(data)
    } catch (error) {
      toast.error('Failed to fetch employees')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await employeesAPI.create(formData)
      toast.success('Employee added successfully')
      setShowModal(false)
      setFormData({ name: '', email: '', phone: '', role: '', dept: '', status: 'Active' })
      fetchEmployees()
    } catch (error) {
      toast.error('Failed to add employee')
    }
  }

  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">EMPLOYEE DIRECTORY</h2>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Type Name / ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="px-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">Filter</button>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={20} />
          Add New
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold dark:text-gray-200">Profile</th>
                <th className="px-6 py-3 text-left text-sm font-semibold dark:text-gray-200">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold dark:text-gray-200">Dept</th>
                <th className="px-6 py-3 text-left text-sm font-semibold dark:text-gray-200">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold dark:text-gray-200">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold dark:text-gray-200">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {filtered.map((emp, i) => (
                <motion.tr
                  key={emp.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium dark:text-white">{emp.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{emp.dept}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{emp.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{emp.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toast.info(`Viewing ${emp.name}'s profile`)}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      View More
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Add New Employee</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Phone</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Role</label>
                <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Department</label>
                <input type="text" value={formData.dept} onChange={(e) => setFormData({...formData, dept: e.target.value})} className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">Add Employee</button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
