import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiUsers, FiMessageCircle, FiCheckSquare, FiBarChart3, FiMenu } = FiIcons;

const menuItems = [
  { icon: FiHome, label: 'Dashboard', path: '/' },
  { icon: FiUsers, label: 'Contacts', path: '/contacts' },
  { icon: FiMessageCircle, label: 'Interactions', path: '/interactions' },
  { icon: FiCheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: FiBarChart3, label: 'Analytics', path: '/analytics' },
];

function Sidebar({ isOpen, onToggle }) {
  const location = useLocation();

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 256 : 64 }}
      className="fixed left-0 top-0 h-full bg-white shadow-lg border-r border-gray-200 z-50"
    >
      <div className="p-4">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center lg:justify-start p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <SafeIcon icon={FiMenu} className="w-6 h-6 text-gray-600" />
          {isOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-3 text-lg font-bold text-gray-800"
            >
              Personal CRM
            </motion.span>
          )}
        </button>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center mx-3 mb-2 p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <SafeIcon
                icon={item.icon}
                className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
              />
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-3 font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}

export default Sidebar;