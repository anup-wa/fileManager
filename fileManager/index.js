const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Sample folders data (replace with data from your database)
const foldersData = [
  { id: 1, name: 'Folder 1' },
  { id: 2, name: 'Folder 2' },
  // Add more folder objects as needed
];

// Middleware to parse request bodies as JSON
app.use(express.json());

// Endpoint to get the list of folders (no authentication required)
app.get('/api/folders', (req, res) => {
  res.json({ folders: foldersData });
});

// Endpoint to register a new user (no authentication required)
app.post('/api/register', async (req, res) => {
  // ... (your existing code for user registration)
});

// Endpoint to login as a user (no authentication required)
app.post('/api/login', async (req, res) => {
  // ... (your existing code for user login)
});

// Middleware for authentication - verify the JWT token
function authenticateToken(req, res, next) {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401); // Unauthorized if token is not provided
  }

  // Verify the token using the secret (you should use your own secret here)
  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if the token is invalid or expired
    }
    req.user = user;
    next(); // Move to the next middleware/route handler
  });
}

// Protected endpoint to create a new folder (authentication required)
app.post('/api/folders', authenticateToken, async (req, res) => {
  // ... (your existing code for creating folders)
});

// Protected endpoint to fetch and display user's folders (authentication required)
app.get('/api/folders', authenticateToken, async (req, res) => {
  // ... (your existing code for fetching and returning user's folders)
});

// ... other routes and endpoints

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
