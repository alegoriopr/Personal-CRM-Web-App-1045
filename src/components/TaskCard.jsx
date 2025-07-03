import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck, FiClock, FiTrash2 } = FiIcons;

function TaskCard({ task, onToggle, onDelete }) {
  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <motion.div
      whileHover={{ y: -1 }}
      className={`bg-white p-6 rounded-xl shadow-sm border transition-all ${
        task.completed
          ? 'border-green-200 bg-green-50'
          : isOverdue
          ? 'border-red-200 bg-red-50'
          : 'border-gray-100 hover:shadow-md'
      }`}
    >
      <div className="flex items-start space-x-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {task.completed && <SafeIcon icon={FiCheck} className="w-3 h-3" />}
        </button>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`font-semibold ${
              task.completed ? 'text-green-700 line-through' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                <SafeIcon icon={FiTrash2} className="w-4 h-4" />
              </button>
            </div>
          </div>

          {task.description && (
            <p className={`text-sm mb-3 ${
              task.completed ? 'text-green-600' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}

          <div className="flex items-center text-sm">
            <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
            <span className={
              isOverdue && !task.completed
                ? 'text-red-600 font-medium'
                : task.completed
                ? 'text-green-600'
                : 'text-gray-500'
            }>
              Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </span>
            {isOverdue && !task.completed && (
              <span className="ml-2 text-red-600 text-xs font-medium">OVERDUE</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskCard;