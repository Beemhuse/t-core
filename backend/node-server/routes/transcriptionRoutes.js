import express from 'express';
import { client } from '../config/sanityConfig.js'; // Use ES6 import with .js extension for local modules

const router = express.Router();

// GET route to fetch all transcriptions
router.get('/all', async (req, res) => {
  try {
    const query = `*[_type == "transcription"] | order(_createdAt desc)`;
    const transcriptions = await client.fetch(query);

    res.json(transcriptions);
  } catch (error) {
    console.error('Error fetching transcriptions:', error.message);
    res.status(500).json({ error: 'Failed to fetch transcriptions' });
  }
});

export default router; // Use ES6 export default
