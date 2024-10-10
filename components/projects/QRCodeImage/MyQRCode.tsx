import { useSession } from 'next-auth/react';
import { QRCodeSVG } from 'qrcode.react';
import { memo } from 'react';

const MyQRCodeMemo = () => {
  const { data: session } = useSession();

  if (!session) {
    return <p className="text-danger">Failed to display QRCode</p>;
  }

  return <QRCodeSVG level="H" value={session?.user.id} />;
};

const MyQRCode = memo(MyQRCodeMemo);

export { MyQRCode };
