import { NextResponse } from 'next/server';
import { validateAdminRequest, logAdminActivity } from '@/lib/admin-api';

export async function GET(req: Request) {
  const { error, status, supabase } = await validateAdminRequest(req);
  if (error || !supabase) return NextResponse.json({ error }, { status });

  const { searchParams } = new URL(req.url);
  const reviewStatus = searchParams.get('status');

  let query = supabase.from('reviews').select('*, product:products(name, slug)').order('created_at', { ascending: false });
  
  if (reviewStatus) query = query.eq('status', reviewStatus);

  const { data, error: dbError } = await query;
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const { error, status, supabase, user } = await validateAdminRequest(req);
  if (error || !supabase || !user) return NextResponse.json({ error }, { status });

  try {
    const body = await req.json();
    const { id, ...updates } = body;
    
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const { data, error: dbError } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

    const ip = req.headers.get('x-forwarded-for') || undefined;
    await logAdminActivity(supabase, user.email!, 'UPDATE', 'review', data.id, ip);

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
      .from('reviews')
      .delete()
      .eq('id', id);

    if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

    const ip = req.headers.get('x-forwarded-for') || undefined;
    await logAdminActivity(supabase, user.email!, 'DELETE', 'review', id, ip);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
