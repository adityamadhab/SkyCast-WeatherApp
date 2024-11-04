require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    weatherApiKey: process.env.WEATHER_API_KEY || '271272cec52244cc818180234231310',
    weatherApiBaseUrl: 'http://api.weatherapi.com/v1',
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/weather-app',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiresIn: '7d'
};