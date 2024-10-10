import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import authOptions from '@/libs/authOptions';
import prisma from '@/libs/db';

export const GET = async (req: Request, _: NextResponse) => {
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

    const roomIds = friendOfCurrentUser.friend.map(
      (friendUser) => friendUser.roomId
    );

    const friendUsers = await prisma.friend.findMany({
      where: {
        roomId: {
          in: roomIds,
        },
        NOT: {
          userId: currentUser.id,
        },
      },
      select: {
        user: {
          select: {
            id: true,
            email: true,
            image: true,
            name: true,
          },
        },
        roomId: true,
      },
    });

    return NextResponse.json(
      friendUsers.map((friend) => ({ ...friend.user, chatId: friend.roomId })),
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error)
      return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
