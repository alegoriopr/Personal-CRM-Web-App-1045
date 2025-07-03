import React from 'react';
import { motion } from 'framer-motion';
import { useCRM } from '../context/CRMContext';
import ContactsChart from '../components/ContactsChart';
import InteractionsChart from '../components/InteractionsChart';
import TasksChart from '../components/TasksChart';
import AnalyticsCard from '../components/AnalyticsCard';

function Analytics() {
  const { state } = useCRM();
  const { contacts, interactions, tasks } = state;

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  
  const thisMonth = new Date();
  thisMonth.setDate(1);
  
  const interactionsThisMonth = interactions.filter(
    interaction => new Date(interaction.date) >= thisMonth
  ).length;
  
  const contactsByCategory = contacts.reduce((acc, contact) => {
    acc[contact.category] = (acc[contact.category] || 0) + 1;
    return acc;
  }, {});

  const analyticsData = [
    {
      title: 'Task Completion Rate',
      value: tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0,
      suffix: '%',
      color: 'green',
    },
    {
      title: 'Monthly Interactions',
      value: interactionsThisMonth,
      suffix: '',
      color: 'blue',
    },
    {
      title: 'Professional Contacts',
      value: contactsByCategory.professional || 0,
      suffix: '',
      color: 'purple',
    },
    {
      title: 'Segreles Contacts',
      value: contactsByCategory.segreles || 0,
      suffix: '',
      color: 'orange',
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
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Insights into your CRM data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((data, index) => (
          <motion.div
            key={data.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AnalyticsCard {...data} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ContactsChart contacts={contacts} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <InteractionsChart interactions={interactions} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <TasksChart tasks={tasks} />
      </motion.div>
    </motion.div>
  );
}

export default Analytics;