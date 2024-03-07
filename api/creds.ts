import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

// Variable to store the API key and organization ID
let apiKey = '';
let organizationId = '';

// Define openai at a higher scope level
let openai: any;

// Route to update the API key and organization ID
export default async (req: VercelRequest, res: VercelResponse) => {
  if(req.method === 'POST' && req.url === '/creds') {
    console.log('Received request body:', req.body);
    apiKey = req.body.apiKey;
    organizationId = req.body.organizationId;
    console.log('API Key and Organization ID Updated:', apiKey, organizationId);
    initializeOpenAI();
    res.status(200).send('API Key and Organization ID Updated');
  } else {
    res.status(405).send('Method Not Allowed');
  }
};

function initializeOpenAI() {
  if (!apiKey || !organizationId) {
    console.log('API Key or Organization ID not set yet.');
    return;
  }

  openai = new OpenAI({
    organization: organizationId,
    apiKey: `Bearer ${apiKey}`,
  });
  console.log('OpenAI Initialized with Organization ID');
}