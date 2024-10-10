import jsQR from 'jsqr';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

export const useQRCodeScanner = () => {
  const { data: session } = useSession();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const scanQrCode = () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (canvas && video) {
        const ctx = canvas.getContext('2d');

        if (ctx) {
          // Drawing the camera image in canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          // Scann QR Code
          const qrCodeData = jsQR(
            imageData.data,
            imageData.width,
            imageData.height
          );

          if (qrCodeData) {
            // Confirm scanned content
            if (qrCodeData.data === session?.user.id) {
              setError('Invalid QR Code');
            }
            setResult(qrCodeData.data);
          }
        }
        requestAnimationFrame(scanQrCode);
      }
    };

    const videoAnimationFrameId = requestAnimationFrame(scanQrCode);

    return () => {
      cancelAnimationFrame(videoAnimationFrameId);
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const constraints = {
          video: {
            facingMode: 'environment',
            width: { ideal: 300 },
            height: { ideal: 300 },
          },
        };
        // Accessing the device's camera
        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        // After successfully accessing the device's camera, set the stream to the video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          // eslint-disable-next-line no-console
          console.error('Error accessing media devices:', err);
        }
      }
    })();

    const currentVideoRef = videoRef.current;

    // Stops the camera stream once the component is unmounted
    return () => {
      if (currentVideoRef && currentVideoRef.srcObject) {
        const stream = currentVideoRef.srcObject as MediaStream;
        const tracks = stream.getTracks();

        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return {
    videoRef,
    canvasRef,
    result,
    error,
  };
};
