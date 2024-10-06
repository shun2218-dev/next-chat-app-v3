import { FC } from 'react';

type Props = {
  errorMsg: string | null;
};

export const ErrorPanel: FC<Props> = ({ errorMsg }) => {
  return (
    <>
      {errorMsg !== null && (
        <p className="ErrorPanel text-red-500 bg-red-500 bg-opacity-10 text-center p-3 mb-3 rounded-md">
          {errorMsg}
        </p>
      )}
    </>
  );
};
