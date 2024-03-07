// index.cjs
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

// Initialize Express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add Body Parser and CORS
app.use(bodyParser.json());
app.use(cors());

// Variable to store the API key
let apiKey = '';

// Define openai at a higher scope level
let openai;

// Function to initialize the OpenAI instance
function initializeOpenAI() {
  if (!apiKey) {
    console.log('API Key not set yet.');
    return;
  }

  openai = new OpenAI({
    organization: 'org-KQGtXSQgRwgt8k3iUKzHg5uA',
    apiKey: `Bearer ${apiKey}`,
  });
  console.log('OpenAI Initialized');
}

// Your routes and other logic here...

// Export the function that Vercel will use
export default function handler(req, res) {
  app(req, res);
}
