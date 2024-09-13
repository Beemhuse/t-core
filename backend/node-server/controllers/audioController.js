import { processAudioFile } from '../services/audioService.js';

// Controller for handling audio transcription request
const transcribeAudioController = async (req, res) => {
  try {
    const filePath = req.file.path;
    const transcription = await processAudioFile(filePath);
    res.json({ transcription });
  } catch (error) {
    console.error('Audio transcription failed:', error.message);
    res.status(500).json({ error: 'Audio transcription failed' });
  }
};

export { transcribeAudioController };
