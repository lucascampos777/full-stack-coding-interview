export const runtime = "nodejs";

import { NextRequest, NextResponse } from 'next/server';

const likeMap: Record<string, boolean> = {};

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  if (token !== 'mock-token') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: photoId } = await params
  const current = likeMap[photoId] || false;
  likeMap[photoId] = !current;

  return NextResponse.json({ id: photoId, liked: !current });
}