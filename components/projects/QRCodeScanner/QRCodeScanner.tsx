import Link from 'next/link';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { useQRCodeScanner } from '@/hooks/useQRCodeScanner';
import { useFriend } from '@/hooks/useFriend';

export const QRCodeScanner = () => {
  const { data: session } = useSession();
  const { videoRef, canvasRef, result, error } = useQRCodeScanner();
  const { addFriend } = useFriend();

  useEffect(() => {
    if (session) {
      (async () => {
        await addFriend(session.user.id);
      })();
    }
  }, [result]);

  return (
    <div>
      {!result && (
        <div className="flex justify-center">
          <div className="relative h-[300px] w-[300px]">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute left-0 top-0 -z-50 h-[300px] w-[300px]"
            >
              <track
                kind="captions"
                label="No captions available"
                srcLang="en"
              />
            </video>
            <canvas
              ref={canvasRef}
              className="absolute left-0 top-0"
              height="300"
              width="300"
            />
          </div>
        </div>
      )}
      {result && (
        <div className="flex justify-center">
          <Link href={result}>
            <button>push</button>
          </Link>
        </div>
      )}
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
    </div>
  );
};
