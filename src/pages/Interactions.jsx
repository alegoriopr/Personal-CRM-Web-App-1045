import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCRM } from '../context/CRMContext';
import InteractionCard from '../components/InteractionCard';
import InteractionModal from '../components/InteractionModal';
import SearchBar from '../components/SearchBar';

const { FiPlus, FiFilter } = FiIcons;

function Interactions() {
  const { state } = useCRM();
  const { interactions, contacts } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredInteractions = interactions.filter(interaction => {
    const contact = contacts.find(c => c.id === interaction.contactId);
    const contactName = contact ? contact.name : '';
    
    const matchesSearch = contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interaction.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || interaction.type === filterType;
    
    return matchesSearch && matchesFilter;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  const interactionTypes = ['all', 'call', 'email', 'meeting', 'message', 'other'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Interactions</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
          Add Interaction
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search interactions..."
          />
        </div>
        <div className="flex items-center gap-2">
          <SafeIcon icon={FiFilter} className="w-4 h-4 text-gray-500" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {interactionTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredInteractions.map((interaction, index) => (
            <motion.div
              key={interaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <InteractionCard
                interaction={interaction}
                contact={contacts.find(c => c.id === interaction.contactId)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredInteractions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No interactions found</p>
          <p className="text-gray-400 mt-2">Start adding interactions to track your communications</p>
        </div>
      )}

      <InteractionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
}

export default Interactions;