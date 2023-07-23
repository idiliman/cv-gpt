import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { formSchema } from '@/validators/form';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
  const body = await req.json();
  const { about, company, education, name, position, vibe } = formSchema.parse(body);

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: `Generate a ${vibe} cover letter, based on this context: ${about}. ${
          vibe === 'Funny' && "Make sure there is a joke in there and it's a little ridiculous."
        }. Make sure the cover letter is concise and short. Here is the detail for the cover letter: position: ${position}, name:${name}, phone: 012 345 678 email: tiktok@mail.com, education:${education},  company name:${company}`,
      },
      // {
      //   role: 'user',
      //   content: `Generate a ${vibe} cover letter, based on this context: ${about}. ${
      //     vibe === 'Funny' && "Make sure there is a joke in there and it's a little ridiculous."
      //   }. Make sure the cover letter is concise and short. Here is the detail for the cover letter: position: ${position}, name:${name}, phone: 012 345 678 email: tiktok@mail.com, education:${education}, experience: internship instagram - 3 month, skills: sql , company name:${company}`,
      // },
    ],
  });

  if (response.status === 200) {
    return new Response(OpenAIStream(response), { status: 200 });
  } else {
    return new Response('Internal error', { status: 500 });
  }
}
