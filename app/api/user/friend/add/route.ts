import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { v4 as uuid } from 'uuid';

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

    const { friendId } = (await req.json()) as { friendId: string };

    if (req.method !== 'POST')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 });

    const friendUser = await prisma.user.findUniqueOrThrow({
      where: {
        id: friendId,
      },
      select: {
        friend: true,
      },
    });

    const roomId = uuid();

    const needAddFriend = !friendUser.friend.some(({ userId }) =>
      userId.includes(friendId)
    );

    if (needAddFriend) {
      // Add the other person to your friends list
      await prisma.friend.create({ data: { userId: session.user.id, roomId } });

      // Add yourself to the other person's friends list
      await prisma.friend.create({ data: { userId: friendId, roomId } });
    } else {
      return NextResponse.json(
        {
          message:
            'Failed to add the friend, because you already add the friend',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Friend added successfully', roomId },
      { status: 201 }
    );
  } catch (err: unknown) {
    if (err instanceof Error)
      return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
