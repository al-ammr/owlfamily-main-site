import { NextRequest, NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

/**
 * POST /api/paystack/initialize
 * 
 * Initialize a Paystack transaction.
 * Accepts: { email, amount, reference, metadata }
 * - amount: in kobo (smallest currency unit)
 * - reference: unique OWL-[timestamp]-[random] string
 * - metadata: optional object with order details
 * 
 * Returns: { authorization_url, access_code, reference }
 */
export async function POST(req: NextRequest) {
  try {
    if (!PAYSTACK_SECRET_KEY) {
      console.error('PAYSTACK_SECRET_KEY is not configured');
      return NextResponse.json(
        { error: 'Payment service is not configured' },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { email, amount, reference, metadata } = body;

    // Validate required fields
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: 'Amount must be a positive number (in kobo)' }, { status: 400 });
    }
    if (!reference || typeof reference !== 'string') {
      return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
    }

    // Call Paystack API to initialize transaction
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount, // Already in kobo
        reference,
        callback_url: `${APP_URL}/order-success?reference=${reference}`,
        currency: 'NGN',
        metadata: metadata || {},
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok || !paystackData.status) {
      console.error('Paystack Initialize Error:', paystackData);
      return NextResponse.json(
        { error: paystackData.message || 'Failed to initialize payment' },
        { status: paystackResponse.status || 502 }
      );
    }

    // Return only the data the client needs
    return NextResponse.json({
      authorization_url: paystackData.data.authorization_url,
      access_code: paystackData.data.access_code,
      reference: paystackData.data.reference,
    });

  } catch (error) {
    console.error('Paystack Initialize Error:', error);
    return NextResponse.json(
      { error: 'Internal server error during payment initialization' },
      { status: 500 }
    );
  }
}
