import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import WeatherOverview from '../components/WeatherOverview';
import WeatherDetails from '../components/WeatherDetails';
import { weatherService } from '../services/weatherService';

const WeatherDashboard = () => {
    const [unit, setUnit] = useState('C');
    const [selectedDay, setSelectedDay] = useState(0);
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('Guwahati');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const toggleUnit = () => setUnit(unit === 'C' ? 'F' : 'C');

    const convertTemp = (temp) => {
        if (unit === 'F') {
            return Math.round((temp * 9) / 5 + 32);
        }
        return Math.round(temp);
    };

    const handleLocationSelect = (loc) => {
        setLocation(loc);
        setLoading(true);
    };

    const fetchWeatherData = async (loc) => {
        try {
            setError(null);
            const forecast = await weatherService.getForecast(loc);
            setWeatherData(forecast);
        } catch (err) {
            setError('Failed to fetch weather data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData(location);
    }, [location]);

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <SearchBar onLocationSelect={handleLocationSelect} />
                </motion.div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center h-[600px]"
                        >
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
                                </div>
                            </div>
                        </motion.div>
                    ) : error ? (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center justify-center h-[600px] text-center"
                        >
                            <div className="w-24 h-24 mb-6 text-red-500">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Weather Data</h3>
                            <p className="text-gray-600 mb-6">{error}</p>
                            <button
                                onClick={() => fetchWeatherData(location)}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 active:scale-95"
                            >
                                Try Again
                            </button>
                        </motion.div>
                    ) : weatherData && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        >
                            <WeatherOverview
                                weatherData={weatherData}
                                unit={unit}
                                convertTemp={convertTemp}
                            />
                            <WeatherDetails
                                weatherData={weatherData}
                                unit={unit}
                                selectedDay={selectedDay}
                                setSelectedDay={setSelectedDay}
                                toggleUnit={toggleUnit}
                                convertTemp={convertTemp}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
};

export default WeatherDashboard;