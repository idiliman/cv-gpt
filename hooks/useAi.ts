import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream } from 'ai';
import { Suspense } from 'react';

export const runtime = 'edge';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const useAi = async () => {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: 'hi',
      },
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  const reader = stream.getReader();

  return { reader };
};

export default useAi;
