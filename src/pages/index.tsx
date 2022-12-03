import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { HomeNav } from "../components/Home/HomeNav";

export default function HomePage() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { data: boards } = trpc.boards.getAllBoards.useQuery();
  if (sessionData) {
    if (boards) {
      router.push(`/boards/${boards?.[0]?.id}`);
    }
  }

  return (
    <>
      <Head>
        <title>Kanban</title>
        <meta name="description" content="Kanban" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" sm:-ml-[260px] xl:-ml-[300px]">
        <HomeNav />
        {/* <button onClick={() => signIn()} className="btn-primary-s  ">
          Sign in
        </button> */}
        <Hero />
      </main>
    </>
  );
}

const Hero = () => {
  return (
    <div className="mx-auto w-11/12 sm:w-full sm:text-center">
      <div className="mb-2">
        <h2 className="heading-l">One place with everything you need.</h2>
        <span className="body-m font-medium">
          Plan better. Get work done faster.
        </span>
      </div>
      <div className="mx-auto mb-4 w-10/12 max-w-[650px] lg:mb-8 ">
        <img
          src="img/landingPage1.svg"
          alt="Product Example"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="mx-auto w-10/12 max-w-[650px] ">
        <img
          src="img/landingPage2.svg"
          alt="Product Example"
          className="rounded-lg shadow-lg "
        />
      </div>
    </div>
  );
};
