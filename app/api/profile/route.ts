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
      where: { email: session.user.email },
    });

    if (!currentUser)
      return NextResponse.json(
        { message: 'Not found your account' },
        { status: 422 }
      );

    return NextResponse.json(
      {
        userId: currentUser.id,
        username: currentUser.name,
        imageUrl: currentUser.image,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error)
      return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
