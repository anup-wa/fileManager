// routes/folders.js

const express = require('express');
const router = express.Router();
const pool = require('db'); // Import the configured PostgreSQL database connection
const authenticateToken = require('authMiddleware'); // Import the authentication middleware

// Create Folder
router.post('/create-folder', authenticateToken, async (req, res) => {
  const { folderName } = req.body;
  const userId = req.user.userId;

  try {
    // Check if the folder name is unique for the current user
    const existingFolder = await pool.query('SELECT * FROM "Folders" WHERE name = $1 AND user_id = $2', [folderName, userId]);
    if (existingFolder.rows.length > 0) {
      return res.status(400).json({ error: 'Folder name already exists for this user' });
    }

    // Insert the folder data into the "Folders" table
    const newFolder = await pool.query('INSERT INTO "Folders" (name, user_id) VALUES ($1, $2) RETURNING *', [folderName, userId]);

    res.json(newFolder.rows[0]);
  } catch (error) {
    console.error('Error while creating folder:', error);
    res.status(500).json({ error: 'An error occurred while creating the folder' });
  }
});

// Create Subfolder
router.post('/create-subfolder', authenticateToken, async (req, res) => {
  const { subfolderName, parentFolderId } = req.body;
  const userId = req.user.userId;

  try {
    // Check if the parent folder exists and belongs to the current user
    const parentFolder = await pool.query('SELECT * FROM "Folders" WHERE id = $1 AND user_id = $2', [parentFolderId, userId]);
    if (parentFolder.rows.length === 0) {
      return res.status(404).json({ error: 'Parent folder not found' });
    }

    // Insert the subfolder data into the "Folders" table
    const newSubfolder = await pool.query('INSERT INTO "Folders" (name, user_id, parent_folder_id) VALUES ($1, $2, $3) RETURNING *', [subfolderName, userId, parentFolderId]);

    res.json(newSubfolder.rows[0]);
  } catch (error) {
    console.error('Error while creating subfolder:', error);
    res.status(500).json({ error: 'An error occurred while creating the subfolder' });
  }
});

module.exports = router;
