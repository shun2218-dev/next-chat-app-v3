import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Spinner } from '@heroui/spinner';
import { useRouter } from 'next/navigation';

import { useQRCodeScanner } from '@/hooks/useQRCodeScanner';
import { useFriend } from '#hooks/useFriend';

export const QRCodeScanner = () => {
  const { data: session } = useSession();
  const { videoRef, canvasRef, result, error } = useQRCodeScanner();
  const { addFriend } = useFriend();
  const router = useRouter();

  useEffect(() => {
    if (session && result) {
      (async () => {
        await addFriend(result);
        router.refresh();
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
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
    </div>
  );
};
