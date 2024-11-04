const axios = require('axios');
const config = require('../config');

class WeatherService {
  constructor() {
    this.apiKey = config.weatherApiKey;
    this.baseUrl = config.weatherApiBaseUrl;
  }

  async getCurrentWeather(location) {
    try {
      const response = await axios.get(`${this.baseUrl}/current.json`, {
        params: {
          key: this.apiKey,
          q: location
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch current weather: ${error.message}`);
    }
  }

  async getForecast(location, days = 7) {
    try {
      const response = await axios.get(`${this.baseUrl}/forecast.json`, {
        params: {
          key: this.apiKey,
          q: location,
          days: days
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch forecast: ${error.message}`);
    }
  }

  async searchLocations(query) {
    try {
      const response = await axios.get(`${this.baseUrl}/search.json`, {
        params: {
          key: this.apiKey,
          q: query
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to search locations: ${error.message}`);
    }
  }
}

module.exports = new WeatherService();