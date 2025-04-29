import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ErrorPanel: FC<Props> = ({ children }) => {
  return (
    <p
      className="ErrorPanel text-red-500 bg-red-500 bg-opacity-10 text-center p-3 mb-3 rounded-md"
      data-testid="error-panel"
    >
      {children}
    </p>
  );
};
