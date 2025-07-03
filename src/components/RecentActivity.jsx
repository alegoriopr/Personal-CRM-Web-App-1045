import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../context/CRMContext';

const { FiActivity, FiUsers, FiMessageCircle, FiCheckSquare } = FiIcons;

function RecentActivity() {
  const { state } = useCRM();
  const { contacts, interactions, tasks } = state;

  const recentActivities = [
    ...contacts.slice(-3).map(contact => ({
      type: 'contact',
      title: `Added ${contact.name}`,
      subtitle: contact.company || contact.category,
      icon: FiUsers,
      color: 'blue',
      time: new Date(),
    })),
    ...interactions.slice(-3).map(interaction => {
      const contact = contacts.find(c => c.id === interaction.contactId);
      return {
        type: 'interaction',
        title: `${interaction.type} with ${contact?.name || 'Unknown'}`,
        subtitle: interaction.notes.substring(0, 50) + '...',
        icon: FiMessageCircle,
        color: 'green',
        time: new Date(interaction.date),
      };
    }),
    ...tasks.slice(-3).map(task => ({
      type: 'task',
      title: task.completed ? `Completed: ${task.title}` : `Added: ${task.title}`,
      subtitle: `Due ${format(new Date(task.dueDate), 'MMM dd')}`,
      icon: FiCheckSquare,
      color: task.completed ? 'green' : 'orange',
      time: new Date(),
    })),
  ].sort((a, b) => b.time - a.time).slice(0, 5);

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center mb-6">
        <SafeIcon icon={FiActivity} className="w-5 h-5 text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>

      <div className="space-y-4">
        {recentActivities.length > 0 ? (
          recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3"
            >
              <div className={`p-2 rounded-lg ${colorClasses[activity.color]}`}>
                <SafeIcon icon={activity.icon} className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.subtitle}</p>
              </div>
              <span className="text-xs text-gray-400">
                {format(activity.time, 'MMM dd')}
              </span>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No recent activity</p>
        )}
      </div>
    </motion.div>
  );
}

export default RecentActivity;