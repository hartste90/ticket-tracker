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
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";

interface CreateListingDialogProps {
  setCreateListingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const CreateListingDialog: React.FC<CreateListingDialogProps> = (props) => {
  const form = ProfileForm();
  const [open, setOpen] = React.useState(false);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a Listing</DialogTitle>
        <DialogDescription></DialogDescription>
        <Form {...form}>
          <form
            onSubmit={(event) => {
              wait().then(() => props.setCreateListingModalOpen(false));
              event.preventDefault();
            }}
            // onSubmit={form.handleSubmit(onSubmitCreateListingForm, (errors) => {
            //   console.log("errors: ", errors);
            // })}
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
                console.log("changed date: ", date);
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
            <div className="">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0"
                          type="number"
                          min={1}
                          step={1}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        How much would you like to offer each ticket for?
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="obo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>OBO?</FormLabel>
                      <FormDescription>
                        Are you willing to accept lower offers?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogHeader>
    </DialogContent>
  );
};
export default CreateListingDialog;
