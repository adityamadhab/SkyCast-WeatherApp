const express = require('express');
const router = express.Router();
const weatherService = require('../services/weatherService');

// Get current weather
router.get('/current/:location', async (req, res) => {
  try {
    const weather = await weatherService.getCurrentWeather(req.params.location);
    res.json(weather);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get weather forecast
router.get('/forecast/:location', async (req, res) => {
  try {
    const days = req.query.days || 7;
    const forecast = await weatherService.getForecast(req.params.location, days);
    res.json(forecast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search locations
router.get('/search', async (req, res) => {
  try {
    const locations = await weatherService.searchLocations(req.query.q);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;