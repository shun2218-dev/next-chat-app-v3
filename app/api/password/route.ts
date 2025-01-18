import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { compare, hash } from 'bcrypt';

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

    const { password } = await req.json();

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser)
      return NextResponse.json(
        { message: 'Not found your account' },
        { status: 422 }
      );

    const isSameAsCurrentPassword = await compare(
      password,
      currentUser.hashedPassword
    );

    if (isSameAsCurrentPassword) {
      return NextResponse.json(
        { message: 'Cannot be the same as your current password' },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 12);
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        hashedPassword,
      },
    });

    if (!user)
      return NextResponse.json(
        { message: 'Failed to change Password' },
        { status: 400 }
      );

    return NextResponse.redirect(new URL('/mypage/password/complete', req.url));
  } catch (err: unknown) {
    if (err instanceof Error)
      NextResponse.json({ message: err.message }, { status: 500 });
  }
};
