import { transcribeAudio, saveToSanity } from '../middlewares/deepspeechMiddleware.js';

// Service to handle audio transcription
const processAudioFile = async (filePath) => {
  try {
    const transcription = await transcribeAudio(filePath);
    await saveToSanity(transcription, 'audio');
    return transcription;
  } catch (error) {
    console.error('Audio transcription error:', error.message);
    throw error;
  }
};

export { processAudioFile };
