import { Router } from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const router = Router();

// Initialize OpenAI with explicit error handling
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('OPENAI_API_KEY is required in environment variables');
}

const openai = new OpenAI({
  apiKey: apiKey.trim() // Trim any whitespace
});

router.get('/test-openai', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Say 'Hello from OpenAI!'" }],
      model: "gpt-3.5-turbo",
    });

    res.json({
      success: true,
      message: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});

export default router; 