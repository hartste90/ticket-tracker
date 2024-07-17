import { z } from "zod";

export const taskSchema = z.object({
  listingId: z.string(),
  eventName: z.string(),
  obo: z.boolean(),
  eventDate: z.date(),
  price: z.number(),
  ticketCount: z.number(),
});

export const listingFormSchema = z.object({
  eventName: z.string(),
  eventDate: z.date(),
  ticketCount: z.number(),
  allOrNothing: z.boolean(),
  obo: z.boolean(),
  price: z.number(),
  tier: z.string().optional(),
  city: z.string().optional(),
  posterName: z.string(),
  posterNumber: z.string(),
  notes: z
    .string()
    .max(250, "Please keep notes under 250 characters.")
    .optional(),
});

export type Task = z.infer<typeof taskSchema>;
