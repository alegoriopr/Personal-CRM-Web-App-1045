import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../context/CRMContext';
import StatsCard from '../components/StatsCard';
import RecentActivity from '../components/RecentActivity';
import QuickActions from '../components/QuickActions';

const { FiUsers, FiMessageCircle, FiCheckSquare, FiTrendingUp } = FiIcons;

function Dashboard() {
  const { state } = useCRM();
  const { contacts, interactions, tasks } = state;

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;

  const stats = [
    {
      title: 'Total Contacts',
      value: contacts.length,
      icon: FiUsers,
      color: 'blue',
      change: '+12%',
    },
    {
      title: 'Interactions',
      value: interactions.length,
      icon: FiMessageCircle,
      color: 'green',
      change: '+8%',
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks,
      icon: FiCheckSquare,
      color: 'orange',
      change: '-5%',
    },
    {
      title: 'Completion Rate',
      value: tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) + '%' : '0%',
      icon: FiTrendingUp,
      color: 'purple',
      change: '+15%',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your CRM overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;