const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

const frontendPath = path.join(__dirname, '../frontend');
console.log(`Serving frontend from: ${frontendPath}`);

app.use(cors({ origin: '*' }));
app.use(express.json());

// Serve static files (css, images, etc)
app.use(express.static(frontendPath));

// Load scheduler
require('./scheduler');

// Routes
app.use('/api/articles', require('./routes/articles'));
app.use('/api/featured', require('./routes/featured'));

// Friendly URL Route: /ten-bai-bao-post123.tpo
app.get(/.*-post(\d+)\.tpo$/, (req, res) => {
  const id = req.params[0];
  console.log(`Serving detail page for post ID: ${id}`);
  res.sendFile(path.join(frontendPath, 'detail.html'));
});

// Root route (Fallback if static didn't catch it)
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});
