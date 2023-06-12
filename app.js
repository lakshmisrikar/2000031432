const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8008;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url || [];
  const numbers = [];

  for (const url of urls) {
    try {
      const response = await axios.get(url, { timeout: 500 });
      const data = response.data;
      if (data && data.numbers) {
        numbers.push(...data.numbers);
      }
    } catch (error) {
      console.error(`Error fetching numbers from ${url}:`, error.message);
    }
  }

  const mergedNumbers = [...new Set(numbers)].sort((a, b) => a - b);
  res.json({ numbers: mergedNumbers });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
