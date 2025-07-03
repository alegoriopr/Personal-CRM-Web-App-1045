import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ContactModal from './ContactModal';
import InteractionModal from './InteractionModal';
import TaskModal from './TaskModal';

const { FiZap, FiUserPlus, FiMessageSquare, FiPlus } = FiIcons;

function QuickActions() {
  const [activeModal, setActiveModal] = useState(null);

  const actions = [
    {
      title: 'Add Contact',
      description: 'Create a new contact',
      icon: FiUserPlus,
      color: 'blue',
      action: () => setActiveModal('contact'),
    },
    {
      title: 'Log Interaction',
      description: 'Record a communication',
      icon: FiMessageSquare,
      color: 'green',
      action: () => setActiveModal('interaction'),
    },
    {
      title: 'Create Task',
      description: 'Add a new task',
      icon: FiPlus,
      color: 'orange',
      action: () => setActiveModal('task'),
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200',
    green: 'bg-green-50 hover:bg-green-100 text-green-600 border-green-200',
    orange: 'bg-orange-50 hover:bg-orange-100 text-orange-600 border-orange-200',
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <div className="flex items-center mb-6">
          <SafeIcon icon={FiZap} className="w-5 h-5 text-gray-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>

        <div className="space-y-3">
          {actions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={action.action}
              className={`w-full p-4 rounded-lg border transition-all text-left ${colorClasses[action.color]}`}
            >
              <div className="flex items-center space-x-3">
                <SafeIcon icon={action.icon} className="w-5 h-5" />
                <div>
                  <h3 className="font-medium">{action.title}</h3>
                  <p className="text-sm opacity-75">{action.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <ContactModal
        isOpen={activeModal === 'contact'}
        onClose={() => setActiveModal(null)}
      />
      <InteractionModal
        isOpen={activeModal === 'interaction'}
        onClose={() => setActiveModal(null)}
      />
      <TaskModal
        isOpen={activeModal === 'task'}
        onClose={() => setActiveModal(null)}
      />
    </>
  );
}

export default QuickActions;