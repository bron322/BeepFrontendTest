import React, { useState, useEffect, useRef } from 'react';
import { Currency } from '../types/Currency';
import { currencies } from '../data/currencies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import loadingGif from '../assets/loading.gif'; 

interface SyncSearchProps {
  onCheckboxChange: (currency: Currency) => void;
  selectedCurrencies: Currency[];
}

const SyncSearch: React.FC<SyncSearchProps> = ({ onCheckboxChange, selectedCurrencies }) => {
  const [query, setQuery] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const referenceRef = useRef<HTMLDivElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (query === '') {
      setFilteredCurrencies(currencies);
    } else {
      setIsLoading(true);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsListVisible(true);
    setHighlightedIndex(0); // Reset highlight on new search
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isListVisible || filteredCurrencies.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        setHighlightedIndex((prevIndex) =>
          prevIndex === null ? 0 : (prevIndex + 1) % filteredCurrencies.length
        );
        break;
      case 'ArrowUp':
        setHighlightedIndex((prevIndex) =>
          prevIndex === null ? filteredCurrencies.length - 1 : (prevIndex - 1 + filteredCurrencies.length) % filteredCurrencies.length
        );
        break;
      case 'Enter':
        if (highlightedIndex !== null) {
          onCheckboxChange(filteredCurrencies[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsListVisible(false);
        break;
      default:
        break;
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (referenceRef.current && !referenceRef.current.contains(e.target as Node) &&
        floatingRef.current && !floatingRef.current.contains(e.target as Node)) {
      setIsListVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (highlightedIndex !== null && floatingRef.current) {
      const item = floatingRef.current.querySelectorAll('div[data-index]')[highlightedIndex] as HTMLElement;
      item?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [highlightedIndex]);

  return (
    <div className="w-full max-w-xs mx-auto mt-4 relative">
      <div ref={referenceRef} className="relative">
        <div
          className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-blue-500"
          onClick={() => setIsListVisible(true)}
        >
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 ml-3 mr-3" />
          <input
            placeholder="Type to begin searching"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={query}
            className="w-full py-2 px-3 border-none rounded-md focus:outline-none"
          />
        </div>
        {isListVisible && (
          <div
            ref={floatingRef}
            className="absolute mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto"
          >
            {isLoading ? (
              <div className="px-3 py-2 flex justify-center">
                <img src={loadingGif} alt="Loading..." className="w-8 h-8" />
              </div>
            ) : filteredCurrencies.length === 0 ? (
              <div className="px-3 py-2 text-gray-500">No results found</div>
            ) : (
              filteredCurrencies.map((currency, index) => (
                <div
                  key={currency.code}
                  data-index={index}
                  onClick={() => onCheckboxChange(currency)}
                  className={`cursor-pointer select-none relative py-2 pl-3 pr-9 text-gray-900 hover:bg-blue-600 hover:text-white flex items-center
                    ${highlightedIndex === index ? 'bg-blue-600 text-white' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCurrencies.some(c => c.code === currency.code)}
                    readOnly
                    className="mr-2"
                  />
                  {currency.name}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SyncSearch;
