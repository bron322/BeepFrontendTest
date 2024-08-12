import React, { useState, useEffect, useRef } from 'react';
import { Currency } from '../types/Currency';
import { currencies } from '../data/currencies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import loadingGif from '../assets/loading.gif';

interface AutoCompleteProps {
    onCheckboxChange: (currency: Currency) => void;
    selectedCurrencies: Currency[];
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ onCheckboxChange, selectedCurrencies }) => {
  const [query, setQuery] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);
  const [isListVisible, setIsListVisible] = useState(false); // State to control list visibility
  const [isLoading, setIsLoading] = useState(false);

  // Refs for the reference and floating elements
  const referenceRef = useRef<HTMLDivElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (query === '') {
      setFilteredCurrencies([]);
    } else {
      setIsLoading(true); // Show loading
      const timer = setTimeout(() => {
        const results = currencies.filter(currency =>
          currency.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCurrencies(results);
        setIsLoading(false); 
      }, 500);

      return () => clearTimeout(timer); 
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (referenceRef.current && !referenceRef.current.contains(e.target as Node) &&
          floatingRef.current && !floatingRef.current.contains(e.target as Node)) {
        setIsListVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsListVisible(true); // Show the list when typing
  };

  const handleInputClick = () => {
    setIsListVisible(true); // Show the list when the input is clicked
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-4 relative">
      <div ref={referenceRef} className="relative">
        <div
          className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-blue-500"
          onClick={handleInputClick}
        >
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 ml-3 mr-3" />
          <input
            placeholder="Type to begin searching"
            onChange={handleInputChange}
            className="w-full py-2 px-3 border-none rounded-md focus:outline-none"
          />
        </div>
        {isListVisible && (
          <div
            ref={floatingRef}
            className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto border border-gray-300"
          >
            {isLoading ? (
              <div className="px-4 py-2 flex justify-center items-center">
                <img src={loadingGif} alt="Loading..." className="w-8 h-8" />
              </div>
            ) : filteredCurrencies.length === 0 ? (
              <div className="px-4 py-2 text-gray-500 text-center">No results found</div>
            ) : (
              filteredCurrencies.map((currency) => (
                <div
                  key={currency.code}
                  onClick={() => onCheckboxChange(currency)}
                  className="cursor-pointer select-none relative py-2 px-4 text-gray-900 hover:bg-blue-600 hover:text-white flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedCurrencies.some(c => c.code === currency.code)}
                    readOnly
                    className="mr-2"
                  />
                  <img src={currency.flag} alt={currency.name} className="w-8 h-6 mr-2" />
                  <div className="flex flex-col">
                    <span className="font-medium">{currency.name}</span>
                    <span className="text-gray-700 text-sm">Country: {currency.code}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoComplete;
