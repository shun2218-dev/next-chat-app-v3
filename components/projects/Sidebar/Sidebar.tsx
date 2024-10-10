'use client';
import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Sidebar: FC<Props> = ({ children }) => (
  <div className="Sidebar w-full md:max-w-[260px] max-w-[90px] h-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
