import express from 'express';
import multer from 'multer';
import path from 'path';
import { transcribeAudio, saveToSanity } from '../middlewares/deepspeechMiddleware.js';

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'audio-files/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST route for audio transcription
router.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const filePath = path.resolve('audio-files', req.file.filename);
    const transcription = await transcribeAudio(filePath);
    await saveToSanity(transcription, 'audio');
    res.json({ transcription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Transcription failed' });
  }
});

export default router;
