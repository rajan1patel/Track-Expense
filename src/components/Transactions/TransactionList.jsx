import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters, deleteTransaction, addTransaction } from '../../store/financeSlice';
import { Search, Filter, Plus, Trash2, Edit2, MoreVertical, X, Download } from 'lucide-react';
import { cn } from '../../lib/utils';
import { categories } from '../../data/mockData';

const TransactionList = () => {
  const { transactions, filters, role } = useSelector((state) => state.finance);
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTx, setNewTx] = useState({ date: new Date().toISOString().split('T')[0], amount: '', category: 'Food', type: 'expense', description: '' });

  const filteredTransactions = transactions.filter(t => {
    const matchesCategory = filters.category === 'All' || t.category === filters.category;
    const matchesType = filters.type === 'All' || t.type === filters.type;
    const matchesSearch = t.description.toLowerCase().includes(filters.search.toLowerCase()) || 
                          t.category.toLowerCase().includes(filters.search.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addTransaction({ ...newTx, amount: parseFloat(newTx.amount) }));
    setShowAddModal(false);
    setNewTx({ date: new Date().toISOString().split('T')[0], amount: '', category: 'Food', type: 'expense', description: '' });
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredTransactions));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "transactions.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      {/* Table Header / Toolbar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 flex-1">
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg w-full md:w-64">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              className="bg-transparent border-none outline-none text-sm w-full dark:text-gray-200"
              value={filters.search}
              onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
            />
          </div>

          <select 
            className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm outline-none dark:text-gray-200"
            value={filters.category}
            onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
          >
            <option value="All">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select 
            className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm outline-none dark:text-gray-200"
            value={filters.type}
            onChange={(e) => dispatch(setFilters({ type: e.target.value }))}
          >
            <option value="All">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={exportData}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
            title="Export JSON"
          >
            <Download size={18} />
          </button>

          {role === 'admin' && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors shadow-sm"
            >
              <Plus size={18} />
              <span>Add Transaction</span>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Type</th>
              {role === 'admin' && <th className="px-6 py-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {filteredTransactions.length > 0 ? filteredTransactions.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.date}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{t.description}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                    {t.category}
                  </span>
                </td>
                <td className={cn("px-6 py-4 text-sm font-bold", t.type === 'income' ? 'text-green-600' : 'text-red-600')}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={cn("px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider", 
                    t.type === 'income' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400')}>
                    {t.type}
                  </span>
                </td>
                {role === 'admin' && (
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => dispatch(deleteTransaction(t.id))}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  No transactions found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-800">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add Transaction</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-lg px-4 py-2 text-sm outline-none dark:text-white"
                  value={newTx.description}
                  onChange={(e) => setNewTx({...newTx, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                  <input 
                    required
                    type="number" 
                    className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-lg px-4 py-2 text-sm outline-none dark:text-white"
                    value={newTx.amount}
                    onChange={(e) => setNewTx({...newTx, amount: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                  <select 
                    className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-lg px-4 py-2 text-sm outline-none dark:text-white"
                    value={newTx.type}
                    onChange={(e) => setNewTx({...newTx, type: e.target.value})}
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select 
                    className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-lg px-4 py-2 text-sm outline-none dark:text-white"
                    value={newTx.category}
                    onChange={(e) => setNewTx({...newTx, category: e.target.value})}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                  <input 
                    type="date" 
                    className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-lg px-4 py-2 text-sm outline-none dark:text-white"
                    value={newTx.date}
                    onChange={(e) => setNewTx({...newTx, date: e.target.value})}
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-4"
              >
                Save Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
