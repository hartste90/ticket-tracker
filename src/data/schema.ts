import { z } from "zod";
import { Listing } from "@/api/listing";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  listingId: z.string(),
  eventName: z.string(),
  obo: z.boolean(),
  //   status: z.string(),
  //   label: z.string(),
  //   priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
