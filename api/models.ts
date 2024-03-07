import { VercelRequest, VercelResponse } from '@vercel/node';

import OpenAI from 'openai';

// Define openai at a higher scope level
let openai;

// Route to Fetch Models from OpenAI
export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    if (!openai) {
        res.status(400).send('OpenAI instance not initialized yet.');
        return;
    }

    const models = await openai.models.list();

    console.log(models);
    res.json(models);
    console.log('Models Fetched');
}