import { z } from 'zod';

// CREATE SCHEMA
export const createSchema = z.object({
  name: z.string().trim().min(5, { message: "Must be 5 or more characters long" }),
  description: z.string().min(10, { message: "Must be 10 or more characters long" }),
  content: z.string().min(10, { message: "Must be 10 or more characters long" }),
  model: z.number().min(1, { message: "Must be 1 or greater" })
});

export type CreateForm = z.infer<typeof createSchema>


// EDIT SCHEMA
export const editSchema = z.object({
  name: z.string().trim().min(5, { message: "Must be 5 or more characters long" }),
  description: z.string().min(10, { message: "Must be 10 or more characters long" }),
  content: z.string().min(10, { message: "Must be 10 or more characters long" }),
  model: z.number().min(1, { message: "Must be 1 or greater" })
});

export type EditForm = z.infer<typeof editSchema>


// FORK SCHEMA
export const forkSchema = z.object({
  name: z.string().trim().min(5, { message: "Must be 5 or more characters long" }),
  description: z.string().min(10, { message: "Must be 10 or more characters long" }),
  content: z.string().min(10, { message: "Must be 10 or more characters long" }),
  model: z.number().min(1, { message: "Must be 1 or greater" })
});

export type ForkForm = z.infer<typeof forkSchema>