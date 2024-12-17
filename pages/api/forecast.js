// pages/api/forecast.js
export default async function handler(req, res) {
    const response = await fetch('http://127.0.0.1:5000/forecast');
    const forecastData = await response.json();
    
    res.status(200).json(forecastData);
  }
  