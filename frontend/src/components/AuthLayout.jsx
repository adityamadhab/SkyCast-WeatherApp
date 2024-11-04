import { motion } from 'framer-motion';

const AuthLayout = ({ children, title }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8"
            >
                <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.2 
                            }}
                            className="mx-auto h-16 w-16 relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl transform rotate-6 opacity-60" />
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl transform -rotate-6 opacity-60" />
                            <div className="absolute inset-0 bg-white rounded-xl flex items-center justify-center">
                                <svg 
                                    className="h-8 w-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                            </div>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                        >
                            {title}
                        </motion.h2>
                    </div>
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

export default AuthLayout;