import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import authOptions from '@/libs/authOptions';
import prisma from '@/libs/db';

export const PATCH = async (req: Request, _: NextResponse) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.email)
      return NextResponse.json(
        {
          message: 'Invalid session. Please try again after login.',
        },
        { status: 401 }
      );

    if (req.method !== 'PATCH')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 });

    const { name, imageUrl } = (await req.json()) as {
      name: string;
      imageUrl?: string;
    };

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser)
      return NextResponse.json(
        { message: 'Not found your account' },
        { status: 422 }
      );

    if (!imageUrl) {
      const user = await prisma.user.update({
        where: { email: session.user.email },
        data: {
          name,
        },
      });

      if (!user)
        return NextResponse.json(
          { message: 'Failed to change Profile' },
          { status: 400 }
        );

      return new Response(null, { status: 204 });
    }

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        image: imageUrl,
      },
    });

    if (!user)
      return NextResponse.json(
        { message: 'Failed to change Profile' },
        { status: 400 }
      );

    return new Response(null, { status: 204 });
  } catch (err: unknown) {
    if (err instanceof Error)
      return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
