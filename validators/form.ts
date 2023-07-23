import { z } from 'zod';

export const formSchema = z.object({
  company: z.string().min(2, {
    message: 'Company Name must be at least 2 characters.',
  }),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  about: z.string().min(2, {
    message: 'About must be at least 2 characters.',
  }),
  position: z.string().min(2, {
    message: 'Position must be at least 2 characters.',
  }),
  education: z.string().min(2, {
    message: 'Education must be at least 2 characters.',
  }),
  vibe: z.string().min(2, {
    message: 'Select 1 vibe.',
  }),
});

export type formSchemaType = z.infer<typeof formSchema>;
