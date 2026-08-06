const express = require('express');
const path = require('path');
const app = express();

// Serve all files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// For any route, serve index.html (for SPA + translations)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`CHIGALEX1 V2 Live on port ${port}`);
});
