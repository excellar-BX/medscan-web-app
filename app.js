import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Initialize constants for file and directory names
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create an Express application
const app = express();

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle all GET requests by sending the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server on the specified port
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});