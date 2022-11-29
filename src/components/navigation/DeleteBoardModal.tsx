import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { trpc } from "../../utils/trpc";

interface AddBoardsModalProps {
  setDisplayModal: (value: boolean | ((prevState: boolean) => boolean)) => void;
}

export const DeleteBoardModal = ({ setDisplayModal }: AddBoardsModalProps) => {
  const closeModal = () => setDisplayModal(false);
  const router = useRouter();
  const boardId = router.query.boardId as string;
  const { mutate: deleteBoard } = trpc.boards.deleteBoard.useMutation();
  const { data: board } = trpc.boards.getSingleBoard.useQuery({ boardId });

  const deletedBoard = () => {
    deleteBoard(boardId);
    closeModal();
    router.push("/");
  };

  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-dark_gray">
                  <Dialog.Title as="h3" className="heading-l mb-2 text-danger">
                    Delete this board?
                  </Dialog.Title>
                  <div className="flex flex-col gap-y-4">
                    <p className="body-l my-1 text-medium_gray">
                      Are you sure you want to delete the &#39;
                      <span className="font-bold">{board?.title}</span>
                      &#39; This action will remove all columns and tasks and
                      cannot be reversed.
                    </p>
                    <button
                      type="button"
                      onClick={deletedBoard}
                      className="btn-primary-s bg-danger hover:bg-danger_hover "
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="btn-secondary-s"
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
