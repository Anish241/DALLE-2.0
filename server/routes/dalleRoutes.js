import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  console.log('Hello from DALL-E!');
  res.status(200).json( 'Hello from DALL-E!' );
  console.log('Bye from DALL-E!');
});

router.route('/').post(async (req, res) => {
  try {
    console.log('Request body: ');
    const { prompt } = req.body;
    console.log(prompt);

    console.log('Calling DALL-E...');
    const aiResponse = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });
    console.log('Response: ');
    const image = aiResponse.data.data[0].b64_json;
    console.log("image");
    res.status(200).json({ photo: image });
    console.log('Bye from DALL-E!');
  } catch (error) {
    console.error('Errort: ');
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;