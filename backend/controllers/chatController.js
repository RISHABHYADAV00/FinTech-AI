const axios = require('axios');

exports.handleChat = async (req, res) => {
  const { messages, system } = req.body;
  
  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'API Key is missing from the backend configuration. Please ensure GROQ_API_KEY is set in your .env file.' });
  }

  // Groq is OpenAI-compatible
  const groqMessages = [];
  if (system) {
    groqMessages.push({ role: 'system', content: system });
  }
  
  if (messages && Array.isArray(messages)) {
    groqMessages.push(...messages);
  }

  try {
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'llama-3.3-70b-versatile', // High-speed Llama 3.3
      max_tokens: 1024,
      messages: groqMessages
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      }
    });

    // Map back to your frontend's expected format
    const replyText = response.data.choices[0].message.content;
    res.json({ content: [{ text: replyText }] });
    
  } catch (error) {
    console.error('Error calling Groq API:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    res.status(500).json({ error: 'Failed to communicate with the AI model.' });
  }
};
