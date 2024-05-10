'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';

import { VibeType } from '@/types';
import { useEffect, useRef, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCompletion } from 'ai/react';
import { formSchema, formSchemaType } from '@/validators/form';
import { marked } from 'marked';
import { toast } from 'sonner';

let vibes: VibeType[] = ['Professional', 'Casual', 'Funny'];

export default function InputForm() {
  const [html, setHtml] = useState<string | Promise<string>>();
  const [isPending, startTransition] = useTransition();

  const cvRef = useRef<null | HTMLDivElement>(null);

  const scrollToCv = () => {
    if (cvRef.current !== null) {
      cvRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { completion, handleSubmit, isLoading, setInput } = useCompletion({
    api: '/api/completion',
    headers: {
      Authorization: process.env.OPENAI_API_KEY!,
    },
    credentials: 'same-origin',
    onFinish: () => {
      toast.success('CV generated successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to generate CV, please try again');
    },
  });

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: '',
      name: '',
      about: '',
      education: '',
      position: '',
    },
  });

  useEffect(() => {
    setHtml(marked(completion));
  }, [completion]);

  const company = form.watch('company');
  const name = form.watch('name');
  const about = form.watch('about');
  const education = form.watch('education');
  const position = form.watch('position');

  useEffect(() => {
    setInput(form.getValues() as any);
  }, [company, name, about, education, position, setInput, form]);

  return (
    <div className='w-full h-full px-2 mx-auto md:px-4 lg:px-0'>
      <div className='grid grid-cols-1 md:grid-cols-7 gap-y-4 md:gap-y-0 md:gap-x-4 h-[800px]'>
        <output className='col-span-5 px-3 py-2 text-sm bg-white border rounded-md border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
          {
            <div
              className='space-y-4 leading-loose tracking-wide text-left cursor-copy'
              dangerouslySetInnerHTML={{ __html: html || '' }}
              onClick={() => {
                navigator.clipboard?.writeText(completion);
                toast.success('Copied to clipboard');
              }}
            />
          }
        </output>
        <Card className='col-span-2 p-8'>
          <Form {...form}>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <FormField
                control={form.control}
                name='company'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Zes coffee..' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='...' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='about'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Looking for part time....' className='resize-none' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='position'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder='Barista..' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='education'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education</FormLabel>
                    <FormControl>
                      <Input placeholder='Bachelor of...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                isLoading={isLoading}
                className='w-full'
                disabled={!form.formState.isValid || isLoading}
              >
                Generate CV
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
