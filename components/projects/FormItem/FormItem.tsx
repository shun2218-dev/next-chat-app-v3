import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
const FormItem: FC<Props> = ({ children }) => {
  return <div className="FormItem mb-4">{children}</div>;
};

export default FormItem;
