import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Spinner } from "~/components/Spinner";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: sessionData, status: sessionStatus } = useSession();
  const unAuthorized = sessionStatus === "unauthenticated";
  const loading = sessionStatus === "loading";
  const { data: boards } = trpc.boards.getAllBoards.useQuery();

  useEffect(() => {
    // check if the session is loading or the router is not ready
    if (loading || !router.isReady) return;

    // if the user is not authorized, redirect to the login page
    // with a return url to the current page
    if (unAuthorized) {
      void router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    }
  }, [loading, sessionStatus, router, unAuthorized]);

  if (loading) return <Spinner />;

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
