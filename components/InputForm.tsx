'use client';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Card, CardContent } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';

import { VibeType } from '@/types';
import { useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useChat } from 'ai/react';
import { formSchema, formSchemaType } from '@/validators/form';

import { toast } from '@/hooks/use-toast';

let vibes: VibeType[] = ['Professional', 'Casual', 'Funny'];

const InputForm = () => {
  const [body, setBody] = useState<formSchemaType | null>(null);
  const cvRef = useRef<null | HTMLDivElement>(null);

  const scrollToCv = () => {
    if (cvRef.current !== null) {
      cvRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { messages, reload, setMessages, setInput, handleSubmit, isLoading } = useChat({
    body: {
      company: body?.company,
      name: body?.name,
      about: body?.about,
      education: body?.education,
      position: body?.position,
      vibe: body?.vibe,
    },
    onResponse() {
      scrollToCv();
    },
  });

  const lastMessage = messages[messages.length - 1];
  const generatedCv = lastMessage?.role === 'assistant' ? lastMessage.content : null;

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: 'google',
      name: 'idil',
      about: 'hardworking',
      education: 'diploma in it',
      position: 'data analyst',
      vibe: 'Professional',
    },
  });

  async function onSubmit(values: formSchemaType, e: any) {
    if (messages.length > 0) {
      setMessages([]);
      form.reset();
      handleSubmit(e);
    }
    await setBody(values);
    handleSubmit(e);
  }

  return (
    <div className='w-screen p-4'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
        <output className='col-span-2 flex min-h-[80px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
          {generatedCv
            ?.substring(generatedCv.indexOf('10') * generatedCv.length)
            .split('10')
            .map((cv) => {
              return (
                <div
                  className='cursor-copy'
                  ref={cvRef}
                  onClick={() => {
                    navigator.clipboard?.writeText(cv);
                    toast({
                      title: 'CV copied to clipboard',
                    });
                  }}
                  key={cv}
                >
                  <p className='text-center text-lg tracking-wide leading-loose'>{cv}</p>
                </div>
              );
            })}
        </output>
        <Card className='w-full'>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                  control={form.control}
                  name='company'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Googlee..' {...field} />
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
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder='zayn..' {...field} />
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
                      <FormLabel>About me</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Tell us a little bit about yourself'
                          className='resize-none'
                          value={field.value}
                          onChange={(e) => {
                            setInput(e.target.value);
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormDescription>Tell abit about yourself</FormDescription>
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
                        <Input placeholder='Data Analyst..' {...field} />
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
                        <Input placeholder='Master in..' {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='vibe'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vibe</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Set the cover letter vibe' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {vibes.map((vibe, i) => (
                            <SelectItem key={i} value={vibe}>
                              {vibe}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Set the cover letter vibe.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' isLoading={isLoading}>
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InputForm;
