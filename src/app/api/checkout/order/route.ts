import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * GET /api/checkout/order?ref=OWL-xxxxx-XXXX
 * 
 * Fetch a single order by its reference string.
 * Used by the order-success page to display confirmation details.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get('ref');

    if (!ref) {
      return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('orders')
      .select('reference, customer_name, customer_email, customer_phone, items, subtotal, shipping, total, status, payment_method, created_at')
      .eq('reference', ref)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order: data });

  } catch (error) {
    console.error('Fetch Order Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
