import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CRMContext = createContext();

const initialState = {
  contacts: [],
  interactions: [],
  tasks: [],
  loading: false,
  error: null,
};

function crmReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'ADD_CONTACT':
      const newContact = { ...action.payload, id: Date.now().toString() };
      return { ...state, contacts: [...state.contacts, newContact] };
    
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload),
      };
    
    case 'ADD_INTERACTION':
      const newInteraction = { ...action.payload, id: Date.now().toString() };
      return { ...state, interactions: [...state.interactions, newInteraction] };
    
    case 'ADD_TASK':
      const newTask = { ...action.payload, id: Date.now().toString() };
      return { ...state, tasks: [...state.tasks, newTask] };
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
}

export function CRMProvider({ children }) {
  const [state, dispatch] = useReducer(crmReducer, initialState);

  useEffect(() => {
    // Load data from localStorage on app start
    const savedData = localStorage.getItem('crmData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever state changes
    const dataToSave = {
      contacts: state.contacts,
      interactions: state.interactions,
      tasks: state.tasks,
    };
    localStorage.setItem('crmData', JSON.stringify(dataToSave));
  }, [state.contacts, state.interactions, state.tasks]);

  return (
    <CRMContext.Provider value={{ state, dispatch }}>
      {children}
    </CRMContext.Provider>
  );
}

export function useCRM() {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
}