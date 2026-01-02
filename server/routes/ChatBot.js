const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log("OPENAI_API_KEY Loaded:", process.env.OPENAI_API_KEY?.slice(0, 10));

router.post('/', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ answer: 'No query provided' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',  // Or 'gpt-3.5-turbo' if you prefer
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: query },
      ],
    });

    const text = completion.choices[0].message.content;
    res.json({ answer: text });
  } catch (err) {
    console.error('OpenAI API Error:', err);
    res.status(500).json({ answer: 'Failed to get response from OpenAI.' });
  }
});

module.exports = router;
