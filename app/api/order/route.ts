// app/api/order/route.ts
import { createClient } from 'next-sanity';
import { NextResponse } from 'next/server';

const privateClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-03-23',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Secret server-side token
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Create the document in Sanity
    const result = await privateClient.create({
      _type: 'order',
      ...body,
      status: 'pending',
      orderDate: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, orderId: result._id });
  } catch (error) {
    console.error('Sanity Create Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}