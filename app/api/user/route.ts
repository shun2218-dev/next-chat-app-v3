import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import authOptions from '@/libs/authOptions';
import prisma from '@/libs/db';

export const GET = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.email)
      return NextResponse.json(
        {
          message: 'Invalid session. Please try again after login.',
        },
        { status: 401 }
      );

    if (req.method !== 'GET')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 });

    const usersOtherThanMe = await prisma.user.findMany({
      where: {
        NOT: {
          email: session.user.email,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    if (usersOtherThanMe.length < 0)
      return NextResponse.json(
        { message: 'Not found your account' },
        { status: 422 }
      );

    return NextResponse.json(
      usersOtherThanMe.map((user) => ({
        id: user.id,
        username: user.name,
        email: user.email,
        imageUrl: user.image,
      })),
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error)
      return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
