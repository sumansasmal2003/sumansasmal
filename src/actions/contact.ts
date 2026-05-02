"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { Resend } from "resend";

// Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactMessage(formData: FormData) {
  try {
    // 1. Extract form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const projectDate = formData.get("projectDate") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !projectDate || !message) {
      return { error: "All fields are required." };
    }

    // 2. Save to MongoDB (Your permanent archive)
    await connectToDatabase();
    await Contact.create({ name, email, projectDate, message });

    // 3. Send Email Notification directly to you
    await resend.emails.send({
      // Resend allows you to use this testing address before you verify a custom domain
      from: "Portfolio Inquiry <onboarding@resend.dev>",
      to: "sasmalsuman04@gmail.com", // Your actual email address
      subject: `🚀 New Project Inquiry from ${name}`,
      reply_to: email, // This allows you to hit "Reply" in Gmail and it goes straight to the client
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #121212; color: #ffffff; padding: 40px; border-radius: 10px;">
          <h2 style="color: #38bdf8; margin-top: 0;">New Project Inquiry</h2>
          <p style="font-size: 16px; color: #a1a1aa;">You have received a new message from your portfolio.</p>

          <div style="background-color: #1e1e1e; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #38bdf8;">${email}</a></p>
            <p style="margin: 0 0 10px 0;"><strong>Est. Start Date:</strong> ${projectDate}</p>
          </div>

          <h3 style="color: #e4e4e7; margin-top: 30px;">Message Details:</h3>
          <div style="background-color: #1e1e1e; padding: 20px; border-radius: 8px; border-left: 4px solid #38bdf8;">
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="font-size: 14px; color: #71717a; margin-top: 40px; text-align: center;">
            Sent securely from sumansasmal.vercel.app
          </p>
        </div>
      `
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to process inquiry:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}
