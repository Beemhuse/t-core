import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';
import { client } from '../config/sanityConfig.js'; // Ensure .js extension is included

// Path to DeepSpeech pre-trained model files
// const MODEL_PATH = path.resolve('model/deepspeech.pbmm');
// const SCORER_PATH = path.resolve('model/deepspeech.scorer');

// const transcribeAudio = (filePath) => {
//   return new Promise((resolve, reject) => {
//     const deepspeech = spawn('deepspeech', ['--model', MODEL_PATH, '--scorer', SCORER_PATH, '--audio', filePath]);

//     let transcript = '';
//     deepspeech.stdout.on('data', (data) => {
//       transcript += data.toString();
//     });

//     deepspeech.stderr.on('data', (data) => {
//       console.error(`DeepSpeech Error: ${data}`);
//     });

//     deepspeech.on('close', (code) => {
//       if (code === 0) {
//         resolve(transcript.trim());
//       } else {
//         reject(new Error(`DeepSpeech process exited with code ${code}`));
//       }
//     });
//   });
// };

import axios from 'axios';

const transcribeAudio = async (filePath) => {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const response = await axios.post('http://python-server:5000/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data.transcription;
  } catch (error) {
    console.error('Error during transcription:', error.message);
    throw error;
  }
};

// export { transcribeAudio };


const saveToSanity = async (transcription, type) => {
  try {
    const doc = {
      _type: 'transcription',
      text: transcription,
      type: type,
      timestamp: new Date().toISOString(),
    };

    await client.create(doc);
    console.log('Transcription saved to Sanity');
  } catch (error) {
    console.error('Error saving to Sanity:', error.message);
  }
};

export { transcribeAudio, saveToSanity };
