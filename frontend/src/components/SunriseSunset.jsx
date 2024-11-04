import { motion } from 'framer-motion';

const SunriseSunset = ({ time, type }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all"
        >
            <div className={`p-2 rounded-xl ${
                type === 'sunrise' 
                    ? 'bg-gradient-to-br from-yellow-100 to-orange-100' 
                    : 'bg-gradient-to-br from-orange-100 to-purple-100'
            }`}>
                <svg
                    className={`w-6 h-6 ${
                        type === 'sunrise' ? 'text-yellow-500' : 'text-orange-500'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={type === 'sunrise'
                            ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            : "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        }
                    />
                </svg>
            </div>
            <div>
                <p className="text-sm text-gray-500">{type === 'sunrise' ? 'Sunrise' : 'Sunset'}</p>
                <p className="text-md font-semibold text-gray-800">{time}</p>
            </div>
        </motion.div>
    );
};

export default SunriseSunset;