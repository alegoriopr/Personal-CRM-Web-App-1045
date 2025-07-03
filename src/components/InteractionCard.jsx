import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPhone, FiMail, FiVideo, FiMessageCircle, FiMoreHorizontal } = FiIcons;

function InteractionCard({ interaction, contact }) {
  const typeIcons = {
    call: FiPhone,
    email: FiMail,
    meeting: FiVideo,
    message: FiMessageCircle,
    other: FiMoreHorizontal,
  };

  const typeColors = {
    call: 'bg-green-100 text-green-600',
    email: 'bg-blue-100 text-blue-600',
    meeting: 'bg-purple-100 text-purple-600',
    message: 'bg-orange-100 text-orange-600',
    other: 'bg-gray-100 text-gray-600',
  };

  return (
    <motion.div
      whileHover={{ y: -1 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${typeColors[interaction.type]}`}>
            <SafeIcon
              icon={typeIcons[interaction.type]}
              className="w-4 h-4"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {contact ? contact.name : 'Unknown Contact'}
            </h3>
            <p className="text-sm text-gray-500">
              {format(new Date(interaction.date), 'MMM dd, yyyy • h:mm a')}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${typeColors[interaction.type]}`}>
          {interaction.type}
        </span>
      </div>

      <p className="text-gray-700 leading-relaxed">{interaction.notes}</p>
    </motion.div>
  );
}

export default InteractionCard;