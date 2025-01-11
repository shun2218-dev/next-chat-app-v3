'use client';
import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Sidebar: FC<Props> = ({ children }) => (
  <div className="Sidebar w-full  md:max-w-[50%] h-full border-small mx-auto px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
