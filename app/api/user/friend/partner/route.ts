import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import authOptions from '@/libs/authOptions';
import prisma from '@/libs/db';

export const GET = async (req: NextRequest) => {
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

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    const friendOfCurrentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        friend: true,
      },
    });

    if (!friendOfCurrentUser || !currentUser)
      return NextResponse.json(
        { message: 'Not found your account' },
        { status: 422 }
      );

    const searchParams = req.nextUrl.searchParams;
    const roomId = searchParams.get('room_id');

    if (!roomId) {
      return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
    }

    const friendUser = await prisma.friend.findFirstOrThrow({
      where: {
        roomId,
        NOT: {
          userId: currentUser.id,
        },
      },
      select: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      { partnername: friendUser.user.name },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error)
      return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
