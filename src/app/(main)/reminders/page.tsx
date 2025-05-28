// src/app/(main)/reminders/page.tsx
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { bloodTypeOptions, type BloodType } from "@/types";
import { format, differenceInDays } from "date-fns";
import { CalendarIcon, MailCheck, MessageSquareText, Send, Loader2 } from "lucide-react";
import { donationReminder, type DonationReminderInput, type DonationReminderOutput } from "@/ai/flows/donation-reminder";

const reminderFormSchema = z.object({
  donorName: z.string().min(2, "Donor name is required."),
  donorEmail: z.string().email("Invalid email address."),
  donorPhone: z.string().min(10, "Invalid phone number.").regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format."),
  lastDonationDate: z.date({ required_error: "Last donation date is required." }),
  bloodType: z.enum(bloodTypeOptions.map(bt => bt.value) as [BloodType, ...BloodType[]], {
    errorMap: () => ({ message: "Please select a valid blood type." }),
  }),
});

type ReminderFormValues = z.infer<typeof reminderFormSchema>;

export default function DonationReminderPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [reminderOutput, setReminderOutput] = useState<DonationReminderOutput | null>(null);

  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderFormSchema),
    defaultValues: {
      donorName: "",
      donorEmail: "",
      donorPhone: "",
    },
  });

  async function onSubmit(data: ReminderFormValues) {
    setIsLoading(true);
    setReminderOutput(null);

    const daysSinceLastDonation = differenceInDays(new Date(), data.lastDonationDate);

    const input: DonationReminderInput = {
      ...data,
      lastDonationDate: format(data.lastDonationDate, "yyyy-MM-dd"),
      daysSinceLastDonation,
    };

    try {
      const output = await donationReminder(input);
      setReminderOutput(output);
      toast({
        title: "Reminders Generated",
        description: "Personalized email and SMS content are ready.",
      });
    } catch (error) {
      console.error("Error generating reminders:", error);
      toast({
        title: "Error",
        description: "Failed to generate reminders. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <MailCheck className="mx-auto h-12 w-12 text-primary mb-2" />
          <CardTitle className="text-3xl font-bold text-primary">Generate Donation Reminders</CardTitle>
          <CardDescription className="text-lg">
            Create personalized email and SMS reminders for previous donors.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="donorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Donor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="donorEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Donor Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="jane.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="donorPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Donor Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+15551234567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="lastDonationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Last Donation Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-full pl-3 text-left font-normal",!field.value && "text-muted-foreground")}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bloodTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating...</>
                ) : (
                  <><Send className="mr-2 h-5 w-5" /> Generate Reminders</>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {reminderOutput && (
        <Card className="shadow-xl mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Generated Reminders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center"><MailCheck className="mr-2 h-5 w-5 text-accent" /> Email Content</h3>
              <Textarea value={reminderOutput.emailContent} readOnly rows={8} className="bg-muted/50" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center"><MessageSquareText className="mr-2 h-5 w-5 text-accent" /> SMS Content</h3>
              <Textarea value={reminderOutput.smsContent} readOnly rows={4} className="bg-muted/50" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
