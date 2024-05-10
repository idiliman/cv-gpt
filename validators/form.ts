import { z } from 'zod';

export const formSchema = z.object({
  company: z.string().min(2, {
    message: 'Company Name is required.',
  }),
  name: z.string().min(2, {
    message: 'Name is required.',
  }),
  about: z.string().min(2, {
    message: 'About is required.',
  }),
  position: z.string().min(2, {
    message: 'Position is required.',
  }),
  education: z.string().min(2, {
    message: 'Education is required.',
  }),
});

export type formSchemaType = z.infer<typeof formSchema>;
