import type { FC, ReactNode } from 'react';

import { memo } from 'react';
import { cn } from '@heroui/theme';

type Props = {
  children: ReactNode;
  className: string;
};

const IconWrapperMemo: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        className,
        'flex items-center rounded-small justify-center w-7 h-7'
      )}
    >
      {children}
    </div>
  );
};

const IconWrapper = memo(IconWrapperMemo);

export { IconWrapper };
