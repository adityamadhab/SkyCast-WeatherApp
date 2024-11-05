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
            <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-md">
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {forecast.slice(0, 3).map((day, index) => (
                        <motion.div
                            key={day.date}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-2 sm:p-4 rounded-2xl cursor-pointer transition-all ${selectedDay === index
                                    ? 'bg-[#6366F1] text-white'
                                    : 'hover:bg-gray-50'
                                }`}
                            onClick={() => setSelectedDay(index)}
                        >
                            <div className="text-center">
                                <p className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${selectedDay === index ? 'text-white' : 'text-gray-500'
                                    }`}>
                                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                                </p>
                                <div className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3">
                                    <img
                                        src={day.day.condition.icon}
                                        alt={day.day.condition.text}
                                        className="w-full h-full"
                                    />
                                </div>
                                <p className={`text-base sm:text-xl font-semibold ${selectedDay === index ? 'text-white' : 'text-gray-700'
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
                        title="Feels Like"
                        value={convertTemp(current.feelslike_c).toString()}
                        unit={`°${unit}`}
                        subtitle="How it actually feels"
                        icon="thermometer"
                    />
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
                        title="Humidity"
                        value={current.humidity.toString()}
                        unit="%"
                        subtitle={getHumidityDescription(current.humidity)}
                        icon="droplet"
                    />
                    <WeatherCard
                        title="Pressure"
                        value={current.pressure_mb.toString()}
                        unit="hPa"
                        subtitle={getPressureDescription(current.pressure_mb)}
                        icon="gauge"
                    />
                    <WeatherCard
                        title="Visibility"
                        value={current.vis_km.toString()}
                        unit="km"
                        subtitle={getVisibilityDescription(current.vis_km)}
                        icon="eye"
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

const getHumidityDescription = (humidity) => {
    if (humidity <= 30) return "Low - Dry conditions";
    if (humidity <= 60) return "Moderate - Comfortable";
    return "High - Humid conditions";
};

const getPressureDescription = (pressure) => {
    if (pressure < 1000) return "Low pressure system";
    if (pressure > 1020) return "High pressure system";
    return "Normal pressure";
};

const getVisibilityDescription = (visibility) => {
    if (visibility >= 10) return "Excellent";
    if (visibility >= 5) return "Good";
    if (visibility >= 2) return "Moderate";
    return "Poor";
};

export default WeatherDetails;