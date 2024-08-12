import React, { useState } from 'react';
import SyncSearch from './SyncSearch'; 
import { Currency } from '../types/Currency';
import AutoComplete from './AutoComplete';

const CurrencyContainer: React.FC = () => {
  const [selectedCurrencies, setSelectedCurrencies] = useState<Currency[]>([]);

  const handleCheckboxChange = (currency: Currency) => {
    setSelectedCurrencies(prevSelected =>
      prevSelected.some(c => c.code === currency.code)
        ? prevSelected.filter(c => c.code !== currency.code) // Deselect
        : [...prevSelected, currency] // Select
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <SyncSearch onCheckboxChange={handleCheckboxChange} selectedCurrencies={selectedCurrencies} />
      <AutoComplete onCheckboxChange={handleCheckboxChange} selectedCurrencies={selectedCurrencies} />
    </div>
  );
};

export default CurrencyContainer;
