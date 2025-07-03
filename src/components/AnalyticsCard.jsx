import React from 'react';
import { motion } from 'framer-motion';

function AnalyticsCard({ title, value, suffix, color }) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">
            {value}{suffix}
          </p>
        </div>
        <div className={`w-3 h-12 rounded-full ${colorClasses[color]}`} />
      </div>
    </motion.div>
  );
}

export default AnalyticsCard;