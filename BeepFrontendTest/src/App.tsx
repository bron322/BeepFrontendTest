import React, { useState } from 'react';
import SyncSearch from './components/SyncSearch'; 
import AutoComplete from './components/AutoComplete'; 
import { Currency } from './types/Currency';

const CurrencyDashboard: React.FC = () => {
  const [selectedCurrencies, setSelectedCurrencies] = useState<Currency[]>([]);

  const handleCheckboxChange = (currency: Currency) => {
    setSelectedCurrencies(prevSelected =>
      prevSelected.some(c => c.code === currency.code)
        ? prevSelected.filter(c => c.code !== currency.code) // Deselect
        : [...prevSelected, currency] // Select
    );
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold">Currency Selection Dashboard</h1>
        <p className="text-gray-600 mt-2">Select currencies using the search boxes below:</p>
      </header>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="bg-white p-4 border border-gray-300 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Sync Search Component</h2>
          <p className="mb-4 text-gray-600">This search box provides real-time search results with a stable dropdown list.</p>
          <SyncSearch 
            onCheckboxChange={handleCheckboxChange} 
            selectedCurrencies={selectedCurrencies} 
          />
        </section>
        
        <section className="bg-white p-4 border border-gray-300 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-4">AutoComplete Component</h2>
          <p className="mb-4 text-gray-600">This search box shows results with a loading indicator during search.</p>
          <AutoComplete 
            onCheckboxChange={handleCheckboxChange} 
            selectedCurrencies={selectedCurrencies} 
          />
        </section>
      </div>

      <div className="mt-8 bg-white p-4 border border-gray-300 rounded-md shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Selected Currencies</h2>
        <p className="text-gray-600">Here you can see the currencies you’ve selected:</p>
        <ul>
          {selectedCurrencies.length > 0 ? (
          selectedCurrencies.map(currency => (
            <li key={currency.code} className="py-2 flex items-center">
              <img src={currency.flag} alt={`${currency.name} flag`} className="w-8 h-6 mr-2" />
              <span>{currency.code} - {currency.name}</span>
            </li>
          ))
        ) : (
          <li className="py-2 text-gray-500">No currencies selected</li>
        )}
      </ul>
      </div>
    </div>
  );
};

export default CurrencyDashboard;
