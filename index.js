const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('Welcome to the server')
})

app.post('/api/tts', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.murf.ai/v1/speech/generate',
      {
        text: req.body.text,
        voiceId: req.body.voiceId
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'api-key': process.env.MURF_API_KEY // 👈 MUST be defined in .env
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error('Murf API error:', err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || 'Failed to generate speech' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
