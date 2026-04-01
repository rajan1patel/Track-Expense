import { createSlice } from '@reduxjs/toolkit';
import { mockTransactions } from '../data/mockData';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('financeState');
    if (serializedState === null) {
      return {
        transactions: mockTransactions,
        role: 'admin',
        filters: { category: 'All', type: 'All', search: '' },
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const initialState = loadState();

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem('financeState', JSON.stringify(state));
    },
    addTransaction: (state, action) => {
      state.transactions.unshift({
        ...action.payload,
        id: Date.now(),
      });
      localStorage.setItem('financeState', JSON.stringify(state));
    },
    editTransaction: (state, action) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
        localStorage.setItem('financeState', JSON.stringify(state));
      }
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
      localStorage.setItem('financeState', JSON.stringify(state));
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setRole, addTransaction, editTransaction, deleteTransaction, setFilters } = financeSlice.actions;
export default financeSlice.reducer;
