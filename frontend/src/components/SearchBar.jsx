import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weatherService } from '../services/weatherService';

const SearchBar = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (value) => {
    setQuery(value);
    if (value.length > 2) {
      setIsLoading(true);
      try {
        const locations = await weatherService.searchLocations(value);
        setSuggestions(locations);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelect = (location) => {
    setQuery(location.name);
    setShowSuggestions(false);
    onLocationSelect(location.name);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-6 py-4 text-lg rounded-2xl bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
        />
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 py-2 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 z-50"
          >
            {suggestions.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelect(location)}
                className="px-6 py-3 hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-800 font-medium">{location.name}</p>
                    <p className="text-sm text-gray-500">{location.region}, {location.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;