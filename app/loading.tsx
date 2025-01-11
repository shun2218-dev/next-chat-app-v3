import { Spinner } from '@nextui-org/spinner';

export default function RootLoadingPage() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Spinner label="loading..." />
    </div>
  );
}
