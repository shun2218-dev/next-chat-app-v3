import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

import prisma from '@/libs/db';

export const POST = async (req: Request, _: NextResponse) => {
  try {
    if (req.method !== 'POST')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 });

    const { name, email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser)
      return NextResponse.json({ message: 'Email taken' }, { status: 422 });

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error)
      NextResponse.json({ message: err.message }, { status: 500 });
  }
};
