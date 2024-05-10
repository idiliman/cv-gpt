import { StreamingTextResponse, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { formSchema } from '@/validators/form';

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const { about, company, education, name, position } = formSchema.parse(prompt);

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages: [
      {
        role: 'assistant',
        content: `Generate a cover letter for a job application, make sure the cover letter is concise and short. Contex: ${about}`,
      },
      {
        role: 'user',
        content: `Here is the detail for the cover letter, applying at: ${company}, applied for position: ${position}, user name: ${name},user email: your@email.com, user education: ${education}`,
      },
    ],
  });

  return new StreamingTextResponse(result.toAIStream());
}
