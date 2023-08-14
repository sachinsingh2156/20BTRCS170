const express = require('express');
const axios = require('axios');
const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;
  const numbers = [];

  // Retrieve data from each URL
  await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await axios.get(url, { timeout: 500 });
        numbers.push(...response.data.numbers);
      } catch (error) {
        console.log(`Error retrieving data from ${url}: ${error}`);
      }
    })
  );

  // Remove duplicates and sort in ascending order
  const uniqueNumbers = [...new Set(numbers)].sort((a, b) => a - b);

  res.json({ numbers: uniqueNumbers });
});

app.listen(port, () => {
  console.log(`Number management service listening at http://localhost:${port}`);
});