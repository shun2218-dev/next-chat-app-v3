import { Fragment, useEffect } from 'react';
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
import { QRCodeSVG } from 'qrcode.react';
import { useSession } from 'next-auth/react';

import { REQUIRED_ONLY } from '@/schema/formSchema';
import { useFriend } from '@/hooks/useFriend';

export const AddFriend = () => {
  const { data: session } = useSession();
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
        console.error(err.message);
      }
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    reset();
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
                {session?.user && (
                  <div className="flex justify-center mb-4">
                    <QRCodeSVG value={session?.user.id} />
                  </div>
                )}

                <Input
                  {...register('friendId')}
                  errorMessage={errors.friendId?.message}
                  isInvalid={!!errors.friendId?.message}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Add
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};
