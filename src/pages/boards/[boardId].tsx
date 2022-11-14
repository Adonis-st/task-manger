import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Error from "next/error";
import { useForm } from "react-hook-form";
import { CreateColumnInput } from "../../schema/column.schema";
import { useState } from "react";
import { Task } from "../components/Task";
import { Column } from "../components/Column";
import { Spinner } from "../components/Spinner";

export default function BoardPage() {
  const router = useRouter();
  const boardId = router.query.boardId as string;
  const { data: singleBoard, isLoading } = trpc.boards.singleBoard.useQuery({
    boardId,
  });

  const [addCol, setAddCol] = useState({
    boardId,
    data: {
      title: "New Col title",
    },
  });
  const isEmpty = singleBoard?.columns.length === 0;
  const currentColumns = singleBoard?.columns;

  const { mutate } = trpc.boards.addColumn.useMutation();

  if (isLoading) {
    return <Spinner />;
  }

  if (!singleBoard) {
    return <Error statusCode={404} />;
  }

  const onSubmit = () => mutate(addCol);
  return (
    <div>
      {isEmpty && (
        <div>
          This board is empty Create a new Column to get Started.
          <button onClick={onSubmit} className="btn-primary-s">
            + Add New Column
          </button>
        </div>
      )}
      <div className="flex max-w-[200vw] gap-x-4">
        {singleBoard?.columns.map((col) => {
          return (
            <Column key={col.id} col={col} currentColumns={currentColumns} />
          );
        })}
      </div>
    </div>
  );
}
