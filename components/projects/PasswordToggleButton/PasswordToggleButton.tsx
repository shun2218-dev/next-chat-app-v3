import { FC } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type Props = {
  isVisible: boolean;
  toggleVisibility: (newValue: boolean) => void;
};

const PasswordToggleButton: FC<Props> = ({ isVisible, toggleVisibility }) => {
  return (
    <button
      className="focus:outline-none"
      type="button"
      onClick={() => toggleVisibility(!isVisible)}
    >
      {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
    </button>
  );
};

export default PasswordToggleButton;
