import { motion } from 'framer-motion';

const WeatherOverview = ({ weatherData, unit, convertTemp }) => {
    const current = weatherData.current;
    const location = weatherData.location;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-white/80 backdrop-blur-lg shadow-xl border border-white/20"
        >
            <div className="flex items-center justify-between mb-8">
                <motion.div
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {location.name}
                    </h1>
                    <p className="text-gray-500 mt-1">{location.region}, {location.country}</p>
                </motion.div>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
                    <img 
                        src={current.condition.icon}
                        alt={current.condition.text}
                        className="w-24 h-24 relative z-10"
                    />
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-end justify-center mb-8"
            >
                <div className="relative">
                    <span className="text-9xl font-thin text-gray-800">
                        {convertTemp(current.temp_c)}
                    </span>
                    <span className="absolute -right-8 top-8 text-4xl font-light text-gray-600">
                        °{unit}
                    </span>
                </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm"
                >
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-500/20 rounded-xl">
                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Condition</p>
                            <p className="text-lg font-medium text-gray-800">{current.condition.text}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm"
                >
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-500/20 rounded-xl">
                            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Precipitation</p>
                            <p className="text-lg font-medium text-gray-800">{current.precip_mm}mm</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default WeatherOverview;