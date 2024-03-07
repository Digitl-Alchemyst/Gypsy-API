import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

// Define openai at a higher scope level
let openai;
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Log the received message from the front end
  console.log('Received Message from Frontend:', req.body);

  if (!openai) {
    res.status(400).send('OpenAI instance not initialized yet.');
    return;
  }

  const { messages, currentModel } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      messages,
      model: currentModel,
      temperature: 0.7,
      maxTokens: 25,
    });
    console.log(completion.choices[0].text);

    res.json({
      messageReply: completion.choices[0].text,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
}