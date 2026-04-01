import React, { useState } from 'react';
import Layout from './components/Layout';
import SummaryCards from './components/Dashboard/SummaryCards';
import Charts from './components/Dashboard/Charts';
import TransactionList from './components/Transactions/TransactionList';
import Insights from './components/Insights/Insights';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <SummaryCards />
            <Charts />
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Recent Transactions</h3>
              <TransactionList />
            </div>
          </>
        );
      case 'transactions':
        return <TransactionList />;
      case 'insights':
        return <Insights />;
      default:
        return <SummaryCards />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
