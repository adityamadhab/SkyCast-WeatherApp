import { motion } from 'framer-motion';

const HourlyForecast = ({ hourlyData, unit, convertTemp }) => {
    return (
        <div className="bg-white rounded-3xl p-4 shadow-md">
            <h3 className="text-xl font-semibold text-[#6366F1] mb-4">
                Today's Hourly Forecast
            </h3>
            <div className="overflow-x-auto">
                <div className="flex space-x-4 min-w-max pb-2">
                    {hourlyData.map((hour, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex flex-col items-center p-3 rounded-2xl hover:bg-gray-50 transition-colors"
                        >
                            <span className="text-sm text-gray-500 mb-2">
                                {new Date(hour.time).toLocaleTimeString('en-US', { 
                                    hour: 'numeric',
                                    hour12: true 
                                })}
                            </span>
                            <img
                                src={hour.condition.icon}
                                alt={hour.condition.text}
                                className="w-8 h-8 mb-2"
                            />
                            <span className="text-lg font-semibold text-gray-700">
                                {convertTemp(hour.temp_c)}°{unit}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HourlyForecast; 