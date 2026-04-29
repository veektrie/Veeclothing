import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

// Setup Sanity Client with WRITE access
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, // This must be your Editor/Write token
  apiVersion: "2026-02-01",
  useCdn: false,
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Basic validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    // Check if the email is already subscribed to prevent duplicates
    const existingSubscriber = await client.fetch(
      `*[_type == "subscriber" && email == $email][0]`,
      { email },
    );

    if (existingSubscriber) {
      return NextResponse.json(
        { error: "You are already subscribed!" },
        { status: 400 },
      );
    }

    // Save to Sanity
    await client.create({
      _type: "subscriber",
      email: email,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Newsletter Subscription Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
