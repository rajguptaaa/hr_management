import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, Users, Clock, Calendar, DollarSign, TrendingUp, Briefcase, FileText, Settings as SettingsIcon, Menu, X, Sun, Moon, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/employees', label: 'Employees', icon: Users },
  { path: '/attendance', label: 'Attendance', icon: Clock },
  { path: '/leave', label: 'Leave', icon: Calendar },
  { path: '/payroll', label: 'Payroll', icon: DollarSign },
  { path: '/performance', label: 'Performance', icon: TrendingUp },
  { path: '/recruitment', label: 'Recruitment', icon: Briefcase },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/settings', label: 'Settings', icon: SettingsIcon },
]

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40"
        >
          <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden dark:text-white">
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-xl font-bold dark:text-white">HR<span className="text-primary">Hub</span></h1>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
              </button>
              <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Help</button>
              <div className="text-sm font-medium dark:text-white">{user?.name || 'User'}</div>
              <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" title="Logout">
                <LogOut size={20} className="dark:text-white" />
              </button>
            </div>
          </div>
        </motion.header>

        <div className="flex flex-1 max-w-[1400px] mx-auto w-full">
          <motion.aside
            initial={false}
            animate={{ x: sidebarOpen ? 0 : '-100%' }}
            className="fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg lg:shadow-none lg:translate-x-0 mt-16 lg:mt-0 overflow-y-auto"
          >
            <nav className="p-4 space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    location.pathname === path
                      ? 'bg-blue-50 dark:bg-blue-900 text-primary dark:text-blue-300 font-medium'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </motion.aside>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
            {children}
          </main>
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-auto"
        >
          <div className="max-w-[1400px] mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                © 2025 HRHub. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
                <a href="#" className="hover:text-primary transition">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition">Terms of Service</a>
                <a href="#" className="hover:text-primary transition">Contact</a>
              </div>
            </div>
          </div>
        </motion.footer>
    </div>
  )
}
