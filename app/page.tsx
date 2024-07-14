import { Link } from '@nextui-org/link';
import { button as buttonStyles } from '@nextui-org/theme';

import { title } from '@/components/primitives';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center h-3/6 gap-10 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({ color: 'foreground' })}>Next Chat App&nbsp;</h1>
        <h1 className={title({ color: 'violet', size: 'sm' })}>v3</h1>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: 'primary',
            radius: 'full',
            variant: 'shadow',
          })}
          href={'/register'}
        >
          Get Started
        </Link>
        <Link
          className={buttonStyles({ variant: 'bordered', radius: 'full' })}
          href={'/login'}
        >
          Sign In
        </Link>
      </div>
    </section>
  );
}
