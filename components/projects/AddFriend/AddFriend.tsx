import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { MyQRCode } from '../QRCodeImage/MyQRCode';
import { QRSwitch } from '../QRSwitch/QRSwitch';
import { QRCodeScanner } from '../QRCodeScanner/QRCodeScanner';

import { useFriend } from '@/hooks/useFriend';
import { REQUIRED_ONLY } from '@/schema/formSchema';

export const AddFriend = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ friendId: string }>({
    resolver: zodResolver(z.object({ friendId: REQUIRED_ONLY })),
  });
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { addFriend, getFriendUsers } = useFriend();
  const [switchState, setSwitchState] = useState(false);

  const onSubmit: SubmitHandler<{ friendId: string }> = async ({
    friendId,
  }) => {
    try {
      const result = await addFriend(friendId);

      if (result.roomId) {
        await getFriendUsers();
        router.push(`/chatroom/${result.roomId}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(err.message);
      }
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    reset();
    setSwitchState(false);
  }, [isOpen]);

  return (
    <Fragment>
      <Button onPress={onOpen}>Add Friend</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Enter the friend ID
              </ModalHeader>
              <ModalBody>
                <QRSwitch onChange={(e) => setSwitchState(e.target.checked)} />
                <div className="flex justify-center mb-4">
                  {switchState ? <QRCodeScanner /> : <MyQRCode />}
                </div>

                {!switchState && (
                  <Input
                    {...register('friendId')}
                    errorMessage={errors.friendId?.message}
                    isInvalid={!!errors.friendId?.message}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                {!switchState && (
                  <Fragment>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit">
                      Add
                    </Button>
                  </Fragment>
                )}
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};
