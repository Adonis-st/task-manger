import Link from "next/link";
interface ProjectDataProps {
  singleBoard: any;
  getAllBoards: any;
}

export const ProjectData = ({
  singleBoard,
  getAllBoards,
}: ProjectDataProps) => {
  return (
    <>
      <h4 className="heading-s ml-4 mb-2 justify-self-center uppercase text-medium_gray sm:mb-0">
        all boards &#40;{getAllBoards?.length}&#41;
      </h4>

      {getAllBoards?.map((board: any) => (
        <Link
          key={board.id}
          href={`/boards/${board.id}`}
          className={`${
            singleBoard?.id === board.id
              ? "bg-purple fill-white text-white"
              : "fill-medium_gray text-medium_gray hover:bg-purple/10 hover:fill-purple hover:text-purple dark:hover:bg-white"
          } -m-2 flex items-center rounded-full rounded-l-none px-2 py-4 sm:py-3`}
        >
          <div className="ml-4 flex h-4 w-5 shrink-0 items-center justify-center sm:ml-6">
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
            </svg>
          </div>
          <div className="ml-4">
            <h4 className="heading-m">{board.title}</h4>
          </div>
        </Link>
      ))}
    </>
  );
};
