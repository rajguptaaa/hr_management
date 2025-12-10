import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Plus } from 'lucide-react'
import { toast } from 'react-toastify'
import { payroll as payrollAPI, employees as employeesAPI } from '../services/api'

export default function Payroll() {
  const [payrollData, setPayrollData] = useState([])
  const [employees, setEmployees] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    basic: '',
    allowances: '',
    deductions: '',
    month: new Date().toLocaleString('default', { month: 'long' }),
    year: new Date().getFullYear()
  })

  useEffect(() => {
    fetchPayroll()
    fetchEmployees()
  }, [])

  const fetchPayroll = async () => {
    try {
      const { data } = await payrollAPI.getAll()
      setPayrollData(data)
    } catch (error) {
      toast.error('Failed to fetch payroll')
    }
  }

  const fetchEmployees = async () => {
    try {
      const { data } = await employeesAPI.getAll()
      setEmployees(data)
    } catch (error) {
      toast.error('Failed to fetch employees')
    }
  }

  const handleEmployeeChange = (e) => {
    const emp = employees.find(e => e._id === e.target.value)
    if (emp) {
      setFormData({...formData, employeeId: emp._id, name: emp.name})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const net = parseFloat(formData.basic) + parseFloat(formData.allowances) - parseFloat(formData.deductions)
    try {
      await payrollAPI.create({...formData, net})
      toast.success('Payroll generated successfully')
      setShowModal(false)
      setFormData({ employeeId: '', name: '', basic: '', allowances: '', deductions: '', month: new Date().toLocaleString('default', { month: 'long' }), year: new Date().getFullYear() })
      fetchPayroll()
    } catch (error) {
      toast.error('Failed to generate payroll')
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">PAYROLL DASHBOARD</h2>

      <div className="flex flex-wrap gap-3">
        <button onClick={() => setShowModal(true)} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">Generate Payroll</button>
        <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">Salary Structure</button>
        <button onClick={() => toast.success('Payslips generated')} className="px-6 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">Generate Payslips</button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="font-semibold text-lg dark:text-white mb-4">Payroll Summary</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Employees</p>
            <p className="text-2xl font-bold dark:text-white">{employees.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">This Month Status</p>
            <p className="text-lg font-semibold text-orange-600">In Progress</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">Basic</th>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">Allowances</th>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">Deductions</th>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">Net Pay</th>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {payrollData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">No payroll records. Click "Generate Payroll" to create one.</td>
                </tr>
              ) : (
                payrollData.map((emp, i) => (
                  <motion.tr key={emp._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 font-medium dark:text-white">{emp.name}</td>
                    <td className="px-6 py-4 dark:text-gray-300">₹{emp.basic?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 dark:text-gray-300">₹{emp.allowances?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 dark:text-gray-300">₹{emp.deductions?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 font-semibold text-green-600">₹{emp.net?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => toast.info(`Downloading payslip for ${emp.name}`)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition">
                        <Download size={18} className="dark:text-white" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Generate Payroll</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Employee</label>
                <select onChange={handleEmployeeChange} className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp._id} value={emp._id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Basic Salary</label>
                <input type="number" value={formData.basic} onChange={(e) => setFormData({...formData, basic: e.target.value})} className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Allowances</label>
                <input type="number" value={formData.allowances} onChange={(e) => setFormData({...formData, allowances: e.target.value})} className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Deductions</label>
                <input type="number" value={formData.deductions} onChange={(e) => setFormData({...formData, deductions: e.target.value})} className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">Generate</button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
