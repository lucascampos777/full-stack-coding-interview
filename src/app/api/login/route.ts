import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const { email, password } = body;

  // Just a fake login
  if (email === 'testing@testing.com' && password === 'password123') {
    return NextResponse.json({ token: 'mock-token' });
  }

  return NextResponse.json(
    { error: 'Invalid credentials' },
    { status: 401 }
  );
}
