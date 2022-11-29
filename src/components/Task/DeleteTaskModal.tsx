import { trpc } from "../../utils/trpc";
import { VscLoading } from "react-icons/vsc";

interface Props {
  refetch: any;
  task: any;
  closeModal: any;
}

export const DeleteTaskModal = ({ task, refetch, closeModal }: Props) => {
  const { mutate: deleteTask, isLoading } = trpc.boards.deleteTask.useMutation({
    onSuccess: () => {
      refetch(), closeModal();
    },
  });

  return (
    <div className="flex flex-col gap-y-4">
      <h3 className="heading-l text-danger">Delete this task?</h3>
      <p className="body-l my-1 text-medium_gray ">
        Are you sure you want to delete the &#39;
        <span className="font-bold">{task.title}</span>
        &#39; task and its subtasks? This action cannot be reversed.
      </p>
      <div className="flex gap-y-4 max-sm:flex-col sm:gap-x-2">
        <button
          type="button"
          onClick={() => deleteTask(task.id)}
          className="btn-primary-s bg-danger text-center hover:bg-danger_hover sm:w-full"
        >
          {isLoading ? (
            <VscLoading className="mx-auto h-6 w-6 animate-spin" />
          ) : (
            "Delete"
          )}
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="btn-secondary-s sm:w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
