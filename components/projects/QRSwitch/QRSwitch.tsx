import { useSwitch, SwitchProps } from '@nextui-org/switch';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import QrCode2Icon from '@mui/icons-material/QrCode2';

export const QRSwitch = (props: SwitchProps) => {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);

  return (
    <div className="flex flex-col items-end gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              'w-8 h-8',
              'flex items-center justify-center',
              'rounded-lg bg-default-100 hover:bg-default-200',
            ],
          })}
        >
          {isSelected ? <QrCode2Icon /> : <PhotoCameraIcon />}
        </div>
      </Component>
    </div>
  );
};
