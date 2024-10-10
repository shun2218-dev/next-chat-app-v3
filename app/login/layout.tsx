'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  if (session) {
    redirect('/mypage');
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        {children}
      </div>
    </section>
  );
}
