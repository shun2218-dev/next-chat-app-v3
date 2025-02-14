'use client';

export default function LogoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-[100%]">
      <div className="inline-block max-w-lg text-center justify-center w-[100%]">
        {children}
      </div>
    </section>
  );
}
