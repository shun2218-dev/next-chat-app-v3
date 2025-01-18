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

    const { searchParams } = new URL(req.url);
    const friendId = searchParams.get('friendId');

    if (friendId === null) {
      return NextResponse.json(
        {
          message: 'Error: Unable to process the request due to invalid input',
        },
        { status: 400 }
      );
    }

    if (req.method !== 'GET')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 });

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        friend: true,
      },
    });

    if (!currentUser)
      return NextResponse.json(
        { message: 'Not found your account' },
        { status: 422 }
      );

    return NextResponse.json(
      currentUser.friend.some(({ id }) => id.includes(friendId)),
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error)
      return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
