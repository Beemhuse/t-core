import express from 'express';
import multer from 'multer';
import path from 'path';
import { spawn } from 'child_process';
import { transcribeAudio, saveToSanity } from '../middlewares/deepspeechMiddleware.js';

const router = express.Router();

// Setup multer for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'video-files/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST route for video transcription
router.post('/transcribe', upload.single('video'), async (req, res) => {
  try {
    const filePath = path.resolve('video-files', req.file.filename);
    
    // Extract audio from video file using ffmpeg
    const audioFilePath = `${filePath}.wav`;
    const ffmpeg = spawn('ffmpeg', ['-i', filePath, '-q:a', '0', '-map', 'a', audioFilePath]);

    ffmpeg.on('close', async (code) => {
      if (code === 0) {
        const transcription = await transcribeAudio(audioFilePath);
        await saveToSanity(transcription, 'video');
        res.json({ transcription });
      } else {
        res.status(500).json({ error: 'Audio extraction failed' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Transcription failed' });
  }
});

export default router;
