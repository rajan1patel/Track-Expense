import React from 'react';
import { useSelector } from 'react-redux';
import { Wallet, ArrowUpCircle, ArrowDownCircle, Banknote } from 'lucide-react';
import { cn } from '../../lib/utils';

const SummaryCard = ({ title, amount, icon: Icon, color, trend }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-transform hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2 rounded-lg", color)}>
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <span className={cn("text-xs font-medium px-2 py-1 rounded-full", 
            trend > 0 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400")}>
            {trend > 0 ? '+' : ''}{trend}% vs last month
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
          ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h3>
      </div>
    </div>
  );
};

const SummaryCards = () => {
  const transactions = useSelector((state) => state.finance.transactions);

  const totals = transactions.reduce((acc, curr) => {
    if (curr.type === 'income') acc.income += curr.amount;
    else acc.expenses += curr.amount;
    return acc;
  }, { income: 0, expenses: 0 });

  const balance = totals.income - totals.expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <SummaryCard 
        title="Total Balance" 
        amount={balance} 
        icon={Wallet} 
        color="bg-blue-500" 
      />
      <SummaryCard 
        title="Total Income" 
        amount={totals.income} 
        icon={ArrowUpCircle} 
        color="bg-green-500" 
        trend={12}
      />
      <SummaryCard 
        title="Total Expenses" 
        amount={totals.expenses} 
        icon={ArrowDownCircle} 
        color="bg-red-500" 
        trend={-5}
      />
      <SummaryCard 
        title="Net Savings" 
        amount={balance * 0.4} // Mock calculation
        icon={Banknote} 
        color="bg-purple-500" 
      />
    </div>
  );
};

export default SummaryCards;
