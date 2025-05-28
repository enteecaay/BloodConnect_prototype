// src/ai/flows/donation-reminder.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for sending personalized donation reminders to previous donors.
 *
 * - donationReminder - A function that triggers the donation reminder flow.
 * - DonationReminderInput - The input type for the donationReminder function.
 * - DonationReminderOutput - The return type for the donationReminder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DonationReminderInputSchema = z.object({
  donorName: z.string().describe('The name of the donor.'),
  donorEmail: z.string().email().describe('The email address of the donor.'),
  donorPhone: z.string().describe('The phone number of the donor.'),
  lastDonationDate: z.string().describe('The date of the donor\'s last donation (YYYY-MM-DD).'),
  bloodType: z.string().describe('The blood type of the donor (e.g., A+, O-).'),
  daysSinceLastDonation: z.number().describe('Number of days since the donor last donated.'),
});
export type DonationReminderInput = z.infer<typeof DonationReminderInputSchema>;

const DonationReminderOutputSchema = z.object({
  emailContent: z.string().describe('The content of the personalized email reminder.'),
  smsContent: z.string().describe('The content of the personalized SMS reminder.'),
});
export type DonationReminderOutput = z.infer<typeof DonationReminderOutputSchema>;

export async function donationReminder(input: DonationReminderInput): Promise<DonationReminderOutput> {
  return donationReminderFlow(input);
}

const donationReminderPrompt = ai.definePrompt({
  name: 'donationReminderPrompt',
  input: {schema: DonationReminderInputSchema},
  output: {schema: DonationReminderOutputSchema},
  prompt: `You are an AI assistant tasked with generating personalized donation reminders for blood donors.

  Generate both an email and an SMS reminder based on the following information:

  Donor Name: {{{donorName}}}
  Donor Email: {{{donorEmail}}}
  Donor Phone: {{{donorPhone}}}
  Last Donation Date: {{{lastDonationDate}}}
  Blood Type: {{{bloodType}}}
  Days Since Last Donation: {{{daysSinceLastDonation}}}

  The email should be friendly and encouraging, reminding the donor of the importance of their contribution and providing information on how to schedule their next donation. It should include a call to action to schedule a donation.

  The SMS should be a concise reminder with a link or contact information for scheduling a donation.
  `,
});

const donationReminderFlow = ai.defineFlow(
  {
    name: 'donationReminderFlow',
    inputSchema: DonationReminderInputSchema,
    outputSchema: DonationReminderOutputSchema,
  },
  async input => {
    const {output} = await donationReminderPrompt(input);
    return output!;
  }
);
