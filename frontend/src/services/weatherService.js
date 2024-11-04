const API_KEY = '271272cec52244cc818180234231310';
const BASE_URL = 'http://api.weatherapi.com/v1';

export const weatherService = {
  async getCurrentWeather(location = 'Guwahati') {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=yes`
    );
    return response.json();
  },

  async getForecast(location = 'Guwahati', days = 7) {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=${days}&aqi=yes`
    );
    return response.json();
  },

  async searchLocations(query) {
    const response = await fetch(
      `${BASE_URL}/search.json?key=${API_KEY}&q=${query}`
    );
    return response.json();
  }
};