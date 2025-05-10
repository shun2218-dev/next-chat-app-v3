import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';

import { title } from '@/components/primitives';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-3/6 gap-10 py-8 md:py-10">
      <h2 className={title({ color: 'foreground' })}>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        className="flex items-center gap-x-2 bg-primary p-3 rounded-xl"
        href="/"
      >
        <HomeIcon />
        Return Home
      </Link>
    </div>
  );
}
