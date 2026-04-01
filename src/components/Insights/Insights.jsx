import React from 'react';
import { useSelector } from 'react-redux';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

const Insights = () => {
  const transactions = useSelector((state) => state.finance.transactions);

  // Highest spending category
  const expenses = transactions.filter(t => t.type === 'expense');
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const highestCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  // Monthly comparison (simple)
  const currentMonth = new Date().getMonth();
  const currentMonthSpending = expenses
    .filter(t => new Date(t.date).getMonth() === currentMonth)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const prevMonthSpending = expenses
    .filter(t => new Date(t.date).getMonth() === (currentMonth - 1 + 12) % 12)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const spendingChange = prevMonthSpending === 0 ? 0 : ((currentMonthSpending - prevMonthSpending) / prevMonthSpending) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
            <AlertCircle size={24} />
          </div>
          <h3 className="font-bold text-gray-800 dark:text-gray-100">Top Spending Category</h3>
        </div>
        {highestCategory ? (
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">You spent most on <span className="font-bold text-gray-900 dark:text-white">{highestCategory[0]}</span> this period.</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">${highestCategory[1].toLocaleString()}</p>
          </div>
        ) : (
          <p className="text-gray-500 italic">No data available</p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            <TrendingUp size={24} />
          </div>
          <h3 className="font-bold text-gray-800 dark:text-gray-100">Monthly Spending Trend</h3>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {spendingChange > 0 
              ? `Your spending increased by ${spendingChange.toFixed(1)}% compared to last month.`
              : `Great! Your spending decreased by ${Math.abs(spendingChange).toFixed(1)}% compared to last month.`
            }
          </p>
          <div className="flex items-center space-x-2 mt-2">
            {spendingChange > 0 ? (
              <TrendingUp className="text-red-500" size={20} />
            ) : (
              <TrendingDown className="text-green-500" size={20} />
            )}
            <span className={spendingChange > 0 ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
              {Math.abs(spendingChange).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm md:col-span-2">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
            <CheckCircle size={24} />
          </div>
          <h3 className="font-bold text-gray-800 dark:text-gray-100">Financial Health Score</h3>
        </div>
        <div className="flex items-center space-x-8">
           <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200 dark:text-gray-800" />
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - 0.75)} className="text-green-500" />
              </svg>
              <span className="absolute text-xl font-bold dark:text-white">75%</span>
           </div>
           <div>
             <p className="text-gray-600 dark:text-gray-400">Your financial health is <span className="text-green-600 font-bold uppercase">Good</span>.</p>
             <ul className="text-sm text-gray-500 dark:text-gray-400 mt-2 list-disc list-inside space-y-1">
               <li>Income exceeds expenses by 40%</li>
               <li>You've categorized 100% of your transactions</li>
               <li>Savings goal is on track</li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
