import dotenv from 'dotenv';
import app from './app.js';

// Load environment variables from .env file
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Use the PORT environment variable, defaulting to 5000 if not set
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
