import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import authOptions from '@/libs/authOptions';
import prisma from '@/libs/db';

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.email)
      return NextResponse.json(
        {
          message: 'Invalid session. Please try again after login.',
        },
        { status: 401 }
      );

    if (req.method !== 'POST')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 });

    const { email } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser)
      return NextResponse.json({ message: 'Email taken' }, { status: 422 });

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        email,
      },
    });

    if (!user)
      return NextResponse.json(
        { message: 'Failed to change Email' },
        { status: 400 }
      );

    return NextResponse.redirect(new URL('/mypage/email/complete', req.url));
  } catch (err: unknown) {
    if (err instanceof Error)
      NextResponse.json({ message: err.message }, { status: 500 });
  }
};
