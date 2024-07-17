import { ProfileForm, onSubmitCreateListingForm } from "@/data/schema";

import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerForm } from "@/components/date-picker-form";

interface CreateListingDialogProps {}

const CreateListingDialog: React.FC<CreateListingDialogProps> = (props) => {
  const form = ProfileForm();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a Listing</DialogTitle>
        <DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitCreateListingForm)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="eventName"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Event Name</FormLabel> */}
                    <FormControl>
                      <Input placeholder="Event Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      {/* This is your public display name. */}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DatePickerForm
                onValueChanged={(date) => {
                  form.setValue("eventDate", date);
                }}
              />
              <FormField
                control={form.control}
                name="ticketCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      How many tickets are you trying to sell?
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="0" type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      {/* How many tickets are you trying to sell? */}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};
export default CreateListingDialog;
