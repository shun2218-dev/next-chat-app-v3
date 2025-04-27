import { QRCodeSVG } from 'qrcode.react';
import { memo } from 'react';

type Props = {
  value?: string;
};

const QRCodeMemo = ({ value }: Props) => {
  if (!value) {
    return <p className="text-danger">Failed to display QRCode</p>;
  }

  return <QRCodeSVG level="H" value={value} />;
};

const QRCode = memo(QRCodeMemo);

export { QRCode };
