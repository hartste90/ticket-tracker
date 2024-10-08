import { ProfileForm } from "@/data/schema";

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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { addListing } from "@/api/listings";
import { createListingFromForm } from "@/api/listing";
import { useToast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CreateListingDialogProps {
  setCreateListingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshListingData: () => void;
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const CreateListingDialog: React.FC<CreateListingDialogProps> = (props) => {
  const form = ProfileForm();
  const { toast } = useToast();

  function clearForm() {
    form.reset();
  }

  async function onSubmitCreateListingForm(values: any, callback: () => void) {
    console.log("form values: ", values);
    let listing = createListingFromForm(values);
    const res = await addListing(listing)
      .then(() => {
        console.log("success posting listing");
        clearForm();
        props.refreshListingData();
        callback();
        toast({
          title: "Success!",
          description:
            "Listing ID: " +
            listing.listingId +
            " for " +
            listing.eventName +
            " posted!",
          variant: "success",
        });
      })
      .catch((error) => {
        console.error("Error adding listing: ", error);
      })
      .finally(() => {
        console.log("finally");
      });
  }

  return (
    <DialogContent className="overflow-hidden">
      <ScrollArea className="max-h-[90vh] py-5 overflow-hidden">
        {/* <ScrollArea className="h-[305px] w-[350px] rounded-md border p-4">
        Jokester began sneaking into the castle in the middle of the night and
        leaving jokes all over the place: under the king's pillow, in his soup,
        even in the royal toilet. The king was furious, but he couldn't seem to
        stop Jokester. And then, one day, the people of the kingdom discovered
        that the jokes left by Jokester were so funny that they couldn't help
        but laugh. And once they started laughing, they couldn't stop.
      </ScrollArea> */}

        <DialogHeader>
          <DialogTitle>Create a Listing</DialogTitle>
          <DialogDescription></DialogDescription>
          <Form {...form}>
            <form
              onKeyDownCapture={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  console.log("key down", event);
                }
              }}
              onSubmit={form.handleSubmit(
                (values) => {
                  onSubmitCreateListingForm(values, () =>
                    props.setCreateListingModalOpen(false)
                  );
                },
                (errors) => console.log("errors: ", errors)
              )}
              className="space-y-3"
            >
              <div className="space-y-4 bg-slate-200 p-2 rounded">
                <FormDescription className="">Required Fields</FormDescription>
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
                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel></FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Date of event</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              let yesterday = new Date();
                              yesterday.setDate(yesterday.getDate() - 1);
                              return date < yesterday;
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <DatePickerForm
                onValueChanged={(date) => {
                  form.setValue("eventDate", date);
                }}
              /> */}
                <FormField
                  control={form.control}
                  name="ticketCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Number of tickets"
                          type="number"
                          min={1}
                          step={1}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {/* How many tickets are you trying to sell? */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="">
                  <div className="inline">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="inline">
                          <div className="inline space-y-0.5">
                            {/* <FormLabel className="mr-2">Offer Price</FormLabel> */}
                            <FormControl className="inline w-20">
                              <Input
                                className=""
                                placeholder="$0"
                                type="number"
                                min={0}
                                step={1}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="ml-2 inline">
                              Asking price per ticket
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="inline ml-4">
                    <FormField
                      control={form.control}
                      name="obo"
                      render={({ field }) => (
                        <FormItem className="inline my-2">
                          <FormControl className="">
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormDescription className="ml-2 inline">
                            or-best-offer?
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="posterName"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Event Name</FormLabel> */}
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="posterNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="How to contact you? [phone#, email, insta, Telegram..]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        *consider using a{" "}
                        <a
                          href="https://voice.google.com/about"
                          className="underline"
                          target="_blank"
                        >
                          Google Voice
                        </a>{" "}
                        number if you want to keep your personal number private
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />
              <FormDescription>Optional Fields</FormDescription>
              <FormField
                control={form.control}
                name="tier"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Event Name</FormLabel> */}
                    <FormControl>
                      <Input
                        placeholder="Ticket Tier (optional) [VIP, GA, Early Bird, etc..]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventAddress"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Event Name</FormLabel> */}
                    <FormControl>
                      <Input
                        placeholder="Event Address (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information you'd like to share with potential buyers. (optional) (250 characters max)"
                        className="resize-none"
                        maxLength={250}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className=" bg-blue-500 mr-2" type="submit">
                Create Listing
              </Button>
              <Button
                variant={"link"}
                className="text-slate-400"
                onClick={clearForm}
                type="button"
              >
                Clear
              </Button>
            </form>
          </Form>
        </DialogHeader>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </DialogContent>
  );
};
export default CreateListingDialog;
