import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * GET /api/paystack/verify?reference=OWL-xxxxx-XXXX
 * 
 * Verify a Paystack transaction by reference.
 * - Calls Paystack verify endpoint with the secret key
 * - If successful: updates the Supabase order status to 'paid'
 * - If failed: updates the Supabase order status to 'failed'
 * 
 * Returns: { success, reference, amount }
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json(
        { error: 'Reference query parameter is required' },
        { status: 400 }
      );
    }

    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Payment service is not configured' },
        { status: 503 }
      );
    }

    // Call Paystack API to verify transaction
    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyResponse.ok || !verifyData.status) {
      console.error('Paystack Verify API Error:', verifyData);
      return NextResponse.json(
        { error: verifyData.message || 'Verification request failed' },
        { status: verifyResponse.status || 502 }
      );
    }

    const { status, amount, currency } = verifyData.data;

    if (status === 'success') {
      // Update order status in Supabase to 'paid'
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('reference', reference);

      if (updateError) {
        console.error('Supabase order update failed:', updateError);
        return NextResponse.json(
          { error: 'Payment verified but failed to update order record' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        reference,
        amount,
        currency: currency || 'NGN',
      });
    } else {
      // Transaction not successful — mark order as failed
      await supabase
        .from('orders')
        .update({ status: 'failed' })
        .eq('reference', reference);

      return NextResponse.json(
        {
          success: false,
          reference,
          error: `Transaction status: ${status}`,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Paystack Verify Error:', error);
    return NextResponse.json(
      { error: 'Internal server error during payment verification' },
      { status: 500 }
    );
  }
}
