export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    // Lấy product_names từ body request
    const { product_names } = req.body;
  
    if (!product_names || !Array.isArray(product_names) || product_names.length === 0) {
      return res.status(400).json({ error: 'Missing or invalid product_names in request body' });
    }
  
    try {
      // Gửi yêu cầu đến Flask API với product_names
      const response = await fetch('https://backend-nh65.onrender.com/demand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_names }), // Gửi danh sách product_names
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch from Flask API');
      }
  
      const forecastData = await response.json();
  
      res.status(200).json(forecastData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch forecast data from Flask API' });
      // console.log(error); 
    }
  }
  