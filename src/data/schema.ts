import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const taskSchema = z.object({
  listingId: z.string(),
  eventName: z.string(),
  obo: z.boolean(),
  eventDate: z.date(),
  price: z.string(),
  ticketCount: z.number(),
  posterName: z.string(),
  posterNumber: z.string(),
  tier: z.string().optional(),
  eventAddress: z.string().optional(),
  notes: z.string().optional(),
});

//validates that an incoming string is a positive integer and transforms a blank string to 0
const validateTicketPrice = z.string().transform((val, ctx) => {
  if (val === "") {
    return "0";
  }
  const parsed = parseInt(val);
  //validate that the string can be parsed to an integer
  if (isNaN(parsed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Value must be a number.",
    });
    return z.NEVER;
  }
  //validate that the parsed integer is 0 or greater
  if (parsed < 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Ticket price must be 0 or greater.",
    });
    return z.NEVER;
  }
  return parsed.toString();
});

export const listingFormSchema = z.object({
  eventName: z.string().min(1, "Event name cannot be blank."),
  eventDate: z.date({ required_error: "Please enter a date." }),
  // ticketCount: z.number().min(1, "Ticket count must be at least 1."),
  ticketCount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Number of tickets cannot be blank.",
  }),
  allOrNothing: z.boolean(),
  obo: z.boolean(),
  price: validateTicketPrice,
  tier: z.string().optional(),
  eventAddress: z.string().optional(),
  posterName: z.string().min(1, "Seller name cannot be blank."),
  posterNumber: z.string().min(1, "Seller contact cannot be blank."),
  notes: z
    .string()
    .max(250, "Please keep notes under 250 characters.")
    .optional(),
  postDate: z.date(),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof listingFormSchema>>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      eventName: "",
      ticketCount: "",
      allOrNothing: false,
      obo: false,
      price: "",
      tier: "",
      eventAddress: "",
      posterName: "",
      posterNumber: "",
      notes: "",
    },
  });
  return form;
}

export type Task = z.infer<typeof taskSchema>;
