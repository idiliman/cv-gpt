'use client';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Card, CardContent } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

import { VibeType } from '@/types';
import { FormEvent, useRef, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useChat } from 'ai/react';
import { Textarea } from './ui/Textarea';
import { formSchema, formSchemaType } from '@/validators/form';
import { useRouter } from 'next/navigation';

let vibes: VibeType[] = ['Professional', 'Casual', 'Funny'];

const InputForm = () => {
  const [body, setBody] = useState<formSchemaType | null>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  const router = useRouter();

  const { messages, reload, setMessages, setInput, handleSubmit, isLoading } = useChat({
    body: {
      company: body?.company,
      name: body?.name,
      about: body?.about,
      education: body?.education,
      position: body?.position,
      vibe: body?.vibe,
    },
  });
  console.log('🚀 ~ InputForm ~ messages:', messages);

  const secondObject = messages.filter((obj) => obj.role === 'assistant')[0];

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: '',
      name: '',
      about: '',
      education: '',
      position: '',
      vibe: 'Professional',
    },
  });

  async function onSubmit(values: formSchemaType, e: any) {
    if (messages.length > 0) {
      console.log('GOT MSG');
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
          <p className='text-center text-lg tracking-wide leading-loose ' ref={pRef}>
            {secondObject?.content}
          </p>
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
