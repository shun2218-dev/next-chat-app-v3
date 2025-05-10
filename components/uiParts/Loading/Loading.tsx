import { Spinner } from '@heroui/spinner';

type Props = {
  msg: string;
};

export function Loading({ msg }: Props) {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Spinner label={msg} />
    </div>
  );
}
