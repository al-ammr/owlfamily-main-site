import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Use service role key since order creation shouldn't strictly require RLS auth bypass 
// but it's safe for backend inserts
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      reference, 
      customer_name, 
      customer_email, 
      customer_phone, 
      customer_address, 
      items, 
      subtotal, 
      shipping, 
      total 
    } = body;

    if (!reference || !customer_email || !total) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          reference,
          customer_name,
          customer_email,
          customer_phone,
          customer_address,
          items,
          subtotal,  // Expected to be stored in kobo based on schema
          shipping,  // Expected to be stored in kobo
          total,     // Expected to be stored in kobo
          status: 'pending',
          payment_method: 'paystack'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase Insert Error:', error);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    return NextResponse.json({ success: true, order: data });

  } catch (error) {
    console.error('Create Order Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
