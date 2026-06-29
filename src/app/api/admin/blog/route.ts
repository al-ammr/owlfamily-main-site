import { NextResponse } from 'next/server';
import { validateAdminRequest, logAdminActivity } from '@/lib/admin-api';

export async function GET(req: Request) {
  const { error, status, supabase } = await validateAdminRequest(req);
  if (error || !supabase) return NextResponse.json({ error }, { status });

  const { searchParams } = new URL(req.url);
  const includeDrafts = searchParams.get('includeDrafts') === 'true';

  let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
  
  if (!includeDrafts) {
    query = query.eq('published', true);
  }

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
      .from('blog_posts')
      .insert(body)
      .select()
      .single();

    if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

    const ip = req.headers.get('x-forwarded-for') || undefined;
    await logAdminActivity(supabase, user.email!, 'CREATE', 'blog_post', data.id, ip);

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
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

    const ip = req.headers.get('x-forwarded-for') || undefined;
    await logAdminActivity(supabase, user.email!, 'UPDATE', 'blog_post', data.id, ip);

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
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

    const ip = req.headers.get('x-forwarded-for') || undefined;
    await logAdminActivity(supabase, user.email!, 'DELETE', 'blog_post', id, ip);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
