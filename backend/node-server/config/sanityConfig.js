import {createClient} from '@sanity/client'; // Use ES6 import syntax

const client = createClient({
  projectId: "tblgw5x3",
  dataset: "production",
  apiVersion: '2024-09-02',

  useCdn: true, // Use CDN for faster requests
  // token: process.env.SANITY_API_TOKEN, // Auth token for authenticated requests
});

const connectToSanity = () => {
  console.log('Connected to Sanity');
};

export { client, connectToSanity };
