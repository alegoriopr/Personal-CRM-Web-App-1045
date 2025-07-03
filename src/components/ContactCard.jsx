import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMail, FiPhone, FiBuilding, FiEdit2, FiTrash2 } = FiIcons;

function ContactCard({ contact, onEdit, onDelete }) {
  const categoryColors = {
    personal: 'bg-blue-100 text-blue-800',
    professional: 'bg-green-100 text-green-800',
    family: 'bg-purple-100 text-purple-800',
    friends: 'bg-orange-100 text-orange-800',
    segreles: 'bg-indigo-100 text-indigo-800',
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{contact.name}</h3>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${categoryColors[contact.category] || 'bg-gray-100 text-gray-800'}`}>
              {contact.category}
            </span>
          </div>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(contact)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiEdit2} className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <SafeIcon icon={FiMail} className="w-4 h-4 mr-2" />
          <span className="truncate">{contact.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
          <span>{contact.phone}</span>
        </div>
        {contact.company && (
          <div className="flex items-center text-sm text-gray-600">
            <SafeIcon icon={FiBuilding} className="w-4 h-4 mr-2" />
            <span className="truncate">{contact.company}</span>
          </div>
        )}
      </div>

      {contact.notes && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 line-clamp-2">{contact.notes}</p>
        </div>
      )}
    </motion.div>
  );
}

export default ContactCard;