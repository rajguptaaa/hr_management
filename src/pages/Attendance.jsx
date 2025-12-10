import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Edit } from 'lucide-react'
import { toast } from 'react-toastify'
import { employees as employeesAPI, attendance as attendanceAPI } from '../services/api'

export default function Attendance() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [employees, setEmployees] = useState([])
  const [attendance, setAttendance] = useState([])
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    fetchEmployees()
    fetchAttendance()
  }, [date])

  const fetchEmployees = async () => {
    try {
      const { data } = await employeesAPI.getAll()
      setEmployees(data)
    } catch (error) {
      toast.error('Failed to fetch employees')
    }
  }

  const fetchAttendance = async () => {
    try {
      const { data } = await attendanceAPI.getAll()
      setAttendance(data)
    } catch (error) {
      console.error('Failed to fetch attendance')
    }
  }

  const markAttendance = async (employee, status) => {
    const alreadyMarked = todayAttendance.find(a => a.employeeId === employee._id)
    if (alreadyMarked) {
      toast.warning('Attendance already marked for today')
      return
    }

    const timeIn = status === 'Absent' ? '-' : status === 'Late' ? '09:35' : '09:00'
    const timeOut = status === 'Absent' ? '-' : '18:00'
    const hours = status === 'Absent' ? 0 : status === 'Late' ? 8.4 : 9

    try {
      await attendanceAPI.create({
        employeeId: employee._id,
        name: employee.name,
        date: new Date(date),
        timeIn,
        timeOut,
        hours,
        status
      })
      toast.success(`${employee.name} marked as ${status}`)
      fetchAttendance()
    } catch (error) {
      toast.error('Failed to mark attendance')
    }
  }

  const todayAttendance = attendance.filter(a => new Date(a.date).toDateString() === new Date(date).toDateString())

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">ATTENDANCE DASHBOARD</h2>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center justify-center gap-4">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white rounded">&lt;</button>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white rounded">&gt;</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Present</p>
          <p className="text-2xl font-bold text-green-600">{todayAttendance.filter(a => a.status === 'Present').length}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Absent</p>
          <p className="text-2xl font-bold text-red-600">{todayAttendance.filter(a => a.status === 'Absent').length}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Late</p>
          <p className="text-2xl font-bold text-yellow-600">{todayAttendance.filter(a => a.status === 'Late').length}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Employees</p>
          <p className="text-2xl font-bold text-blue-600">{employees.length}</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">Time In</th>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">Time Out</th>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">Hours</th>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-200">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {employees.map((emp, i) => {
                const empAttendance = todayAttendance.find(a => a.employeeId === emp._id)
                const timeIn = empAttendance?.timeIn || '-'
                const timeOut = empAttendance?.timeOut || '-'
                const hours = empAttendance?.hours || 0
                const status = empAttendance?.status || 'Not Marked'
                
                return (
                  <motion.tr key={emp._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 dark:text-white">{emp.name}</td>
                    <td className="px-6 py-4 dark:text-gray-300">{timeIn}</td>
                    <td className="px-6 py-4 dark:text-gray-300">{timeOut}</td>
                    <td className="px-6 py-4 dark:text-gray-300">{hours}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        status === 'Present' ? 'bg-green-100 text-green-700' :
                        status === 'Late' ? 'bg-yellow-100 text-yellow-700' :
                        status === 'Absent' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4 relative">
                      <button onClick={() => setOpenDropdown(openDropdown === emp._id ? null : emp._id)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition">
                        <Edit size={18} className="dark:text-white" />
                      </button>
                      {openDropdown === emp._id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-10 border dark:border-gray-600">
                          <button onClick={() => { markAttendance(emp, 'Present'); setOpenDropdown(null) }} className="w-full text-left px-4 py-2 hover:bg-green-50 dark:hover:bg-green-900 text-green-700 dark:text-green-300 text-sm rounded-t-lg">Present</button>
                          <button onClick={() => { markAttendance(emp, 'Late'); setOpenDropdown(null) }} className="w-full text-left px-4 py-2 hover:bg-yellow-50 dark:hover:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-sm">Late</button>
                          <button onClick={() => { markAttendance(emp, 'Absent'); setOpenDropdown(null) }} className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900 text-red-700 dark:text-red-300 text-sm rounded-b-lg">Absent</button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
