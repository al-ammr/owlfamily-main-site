import { NextResponse } from 'next/server';
import { validateAdminRequest, logAdminActivity } from '@/lib/admin-api';

export async function GET(req: Request) {
  const { error, status, supabase } = await validateAdminRequest(req);
  if (error || !supabase) return NextResponse.json({ error }, { status });

  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const collection_id = searchParams.get('collection_id');

  let query = supabase.from('products').select('*').order('created_at', { ascending: false });
  
  if (category) query = query.eq('category', category);
  if (collection_id) query = query.eq('collection_id', collection_id);

  const { data, error: dbError } = await query;
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { error, status, supabase, user } = await validateAdminRequest(req);
  if (error || !supabase || !user) return NextResponse.json({ error }, { status });

  try {
    const body = await req.json();
    const { data, error: dbError } = await supabase
      .from('products')
      .insert(body)
      .select()
      .single();

    if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

    const ip = req.headers.get('x-forwarded-for') || undefined;
    await logAdminActivity(supabase, user.email!, 'CREATE', 'product', data.id, ip);

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const { error, status, supabase, user } = await validateAdminRequest(req);
  if (error || !supabase || !user) return NextResponse.json({ error }, { status });

  try {
    const body = await req.json();
    const { id, ...updates } = body;
    
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const { data, error: dbError } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

    const ip = req.headers.get('x-forwarded-for') || undefined;
    await logAdminActivity(supabase, user.email!, 'UPDATE', 'product', data.id, ip);

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const { error, status, supabase, user } = await validateAdminRequest(req);
  if (error || !supabase || !user) return NextResponse.json({ error }, { status });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const { error: dbError } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

    const ip = req.headers.get('x-forwarded-for') || undefined;
    await logAdminActivity(supabase, user.email!, 'DELETE', 'product', id, ip);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  const { error, status, supabase, user } = await validateAdminRequest(req);
  if (error || !supabase || !user) return NextResponse.json({ error }, { status });

  try {
    const { ids, updates } = await req.json();
    if (!ids || !Array.isArray(ids) || !updates) {
      return NextResponse.json({ error: 'ids array and updates object are required' }, { status: 400 });
    }

    const { data, error: dbError } = await supabase
      .from('products')
      .update(updates)
      .in('id', ids)
      .select();

    if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

    const ip = req.headers.get('x-forwarded-for') || undefined;
    await logAdminActivity(supabase, user.email!, 'BULK_UPDATE', 'product', `Count: ${ids.length}`, ip);

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
