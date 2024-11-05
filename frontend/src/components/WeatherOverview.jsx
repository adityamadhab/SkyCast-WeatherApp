import { motion } from 'framer-motion';

const WeatherOverview = ({ weatherData, unit, convertTemp }) => {
    const current = weatherData.current;
    const location = weatherData.location;
    const forecast = weatherData.forecast.forecastday[0];

    const getDayLength = (sunrise, sunset) => {
        const start = new Date(`2000/01/01 ${sunrise}`);
        const end = new Date(`2000/01/01 ${sunset}`);
        const diff = end - start;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        return `${hours}h ${minutes}m`;
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 rounded-3xl bg-white/80 backdrop-blur-lg shadow-xl border border-white/20"
            >
                {/* Existing content remains the same */}
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

            {/* New Sunrise/Sunset Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-3xl bg-white/80 backdrop-blur-lg shadow-xl border border-white/20"
            >
                <div className="flex flex-col space-y-6">
                    <div className="relative">
                        {/* Sun path arc */}
                        <div className="absolute w-full h-[100px] top-0">
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                                <path
                                    d="M 0 100 A 100 100 0 0 1 200 100"
                                    fill="none"
                                    stroke="#E2E8F0"
                                    strokeWidth="2"
                                />
                                <circle cx="100" cy="100" r="4" fill="#FDB813" />
                            </svg>
                        </div>

                        {/* Sunrise/Sunset times */}
                        <div className="flex justify-between pt-[60px]">
                            <div className="flex flex-col items-center">
                                <div className="p-2 rounded-xl bg-amber-100">
                                    <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-600 mt-2">Sunrise</span>
                                <span className="text-lg font-semibold text-gray-800">{forecast.astro.sunrise}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="p-2 rounded-xl bg-orange-100">
                                    <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-600 mt-2">Sunset</span>
                                <span className="text-lg font-semibold text-gray-800">{forecast.astro.sunset}</span>
                            </div>
                        </div>
                    </div>

                    {/* Day duration */}
                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="text-sm">Day Length: {getDayLength(forecast.astro.sunrise, forecast.astro.sunset)}</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default WeatherOverview;