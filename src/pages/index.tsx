import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { HomeNav } from "../components/Home/HomeNav";
import { type NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { data: boards } = trpc.boards.getAllBoards.useQuery();

  useEffect(() => {
    if (!sessionData?.user) {
      void router.push("/login");
    }
  }, [sessionData?.user]);

  if (boards?.length) {
    void router.push(`/boards/${boards?.[0]?.id}`);
    return null;
  } else {
    return (
      <>
        <Head>
          <title>Kanban</title>
          <meta name="description" content="Kanban" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className="absolute top-1/2 left-[50%] flex w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col items-center ">
            <h1 className="heading-l  text-center text-medium_gray">
              There are no boards available. Create a new board to get started
            </h1>
          </div>
        </main>
      </>
    );
  }
};
export default Home;
