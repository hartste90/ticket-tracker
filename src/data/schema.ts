import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const taskSchema = z.object({
  listingId: z.string(),
  eventName: z.string(),
  obo: z.boolean(),
  eventDate: z.date(),
  price: z.number(),
  ticketCount: z.number(),
});

export const listingFormSchema = z.object({
  eventName: z.string().min(2, "Event name must be at least 2 characters."),
  eventDate: z.date({
    required_error: "An upcoming date is required.",
  }),
  // ticketCount: z.number().min(1, "Ticket count must be at least 1."),
  ticketCount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
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

export function ProfileForm() {
  const form = useForm<z.infer<typeof listingFormSchema>>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      eventName: "",
      ticketCount: "",
      allOrNothing: false,
      obo: false,
      price: 0,
      tier: "",
      city: "",
      posterName: "",
      posterNumber: "",
      notes: "",
    },
  });
  return form;
}

export function onSubmitCreateListingForm(
  values: z.infer<typeof listingFormSchema>
) {
  console.log("hey the form is submitted: ", values);
}

export type Task = z.infer<typeof taskSchema>;
