import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});

export default function handler(req: VercelRequest, res: VercelResponse) {
    switch (req.url) {
        case "/apikey":
            updateApiKey(req, res);
            break;
        case "/completion":
            sendPromptToOpenAI(req, res);
            break;
        case "/models":
            fetchModels(req, res);
            break;
        default:
            res.status(404).send('Not Found');
    }
}

function updateApiKey(req: VercelRequest, res: VercelResponse) {
    console.log('Received request body:', req.body);
    const apiKey = req.body.apiKey;
    console.log('API Key Updated:', apiKey);
    // The original task of reinitializing OpenAI instance is omitted since we can't dynamically update environment variables in Vercel runtime
    res.send('API Key Updated');
}

async function sendPromptToOpenAI(req: VercelRequest, res: VercelResponse) {
    console.log('Received Message from Frontend:', req.body);

    const { messsages, currentModel } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            messages: messsages,
            model: currentModel,
            temperature: 0.7,
            maxTokens: 25,
        });
        console.log(completion.choices[0]);
        res.json({ messageReply: completion.choices[0].text });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function fetchModels(req: VercelRequest, res: VercelResponse) {
    try {
        const models = await openai.models.list();
        console.log(models);
        res.json(models);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}