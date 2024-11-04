import { motion } from 'framer-motion';
import WeatherCard from './WeatherCard';
import SunriseSunset from './SunriseSunset';

const WeatherDetails = ({ weatherData, unit, selectedDay, setSelectedDay, toggleUnit, convertTemp }) => {
    const forecast = weatherData.forecast.forecastday;
    const current = weatherData.current;

    return (
        <div className="space-y-8 p-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-[#6366F1]">
                    Weather Details
                </h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleUnit}
                    className="w-12 h-12 rounded-2xl bg-[#6366F1] text-white flex items-center justify-center text-lg font-medium shadow-lg"
                >
                    °{unit}
                </motion.button>
            </div>

            {/* Weekly Forecast */}
            <div className="bg-white rounded-3xl p-4 shadow-md">
                <div className="grid grid-cols-3 gap-4">
                    {forecast.slice(0, 3).map((day, index) => (
                        <motion.div
                            key={day.date}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-2xl cursor-pointer transition-all ${
                                selectedDay === index 
                                    ? 'bg-[#6366F1] text-white' 
                                    : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedDay(index)}
                        >
                            <div className="text-center">
                                <p className={`text-sm font-medium mb-3 ${
                                    selectedDay === index ? 'text-white' : 'text-gray-500'
                                }`}>
                                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                                </p>
                                <div className="w-12 h-12 mx-auto mb-3">
                                    <img 
                                        src={day.day.condition.icon}
                                        alt={day.day.condition.text}
                                        className="w-full h-full" 
                                    />
                                </div>
                                <p className={`text-xl font-semibold ${
                                    selectedDay === index ? 'text-white' : 'text-gray-700'
                                }`}>
                                    {convertTemp(day.day.avgtemp_c)}°
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Today's Highlights */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#6366F1]">
                    Today's Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <WeatherCard 
                        title="UV Index" 
                        value={current.uv.toString()}
                        subtitle={getUVDescription(current.uv)}
                        icon="sun"
                    />
                    <WeatherCard 
                        title="Wind Status" 
                        value={current.wind_kph.toString()}
                        unit="km/h"
                        subtitle={`Direction: ${current.wind_dir}`}
                        icon="wind"
                    />
                    <WeatherCard
                        title="Sunrise & Sunset"
                        customContent={
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-yellow-50 rounded-xl">
                                        <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Sunrise</p>
                                        <p className="text-lg font-semibold">{forecast[0].astro.sunrise}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-orange-50 rounded-xl">
                                        <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Sunset</p>
                                        <p className="text-lg font-semibold">{forecast[0].astro.sunset}</p>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

// Helper function
const getUVDescription = (uv) => {
    if (uv <= 2) return "Low";
    if (uv <= 5) return "Moderate";
    if (uv <= 7) return "High";
    if (uv <= 10) return "Very High";
    return "Extreme";
};

export default WeatherDetails;