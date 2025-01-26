// pages/api/forecast.js
export default async function handler(req, res) {
    const response = await fetch('https://backend-nh65.onrender.com/forecast');
    const forecastData = await response.json();
    
    res.status(200).json(forecastData);
  }
  