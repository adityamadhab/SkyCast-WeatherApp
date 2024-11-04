import { motion } from 'framer-motion';

const WeatherCard = ({ title, value, unit, subtitle, icon, customContent }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-3xl shadow-md"
        >
            <h3 className="text-gray-500 text-sm font-medium mb-4">{title}</h3>
            
            {customContent || (
                <div className="space-y-2">
                    <div className="flex items-end space-x-2">
                        <span className="text-4xl font-bold text-gray-800">
                            {value}
                        </span>
                        {unit && (
                            <span className="text-xl font-medium text-gray-500 mb-1">
                                {unit}
                            </span>
                        )}
                    </div>
                    
                    {subtitle && (
                        <p className="text-gray-500 text-sm">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default WeatherCard;