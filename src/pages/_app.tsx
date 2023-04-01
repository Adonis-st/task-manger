import { useAtom } from "jotai";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { showSideBarAtom } from "~/store";
import { Nav } from "../components/navigation/Nav";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [showSideBar] = useAtom(showSideBarAtom);
  return (
    <SessionProvider session={session}>
      <Nav />
      <div className={`${showSideBar ? "sm:-[260px] xl:ml-[300px]" : ""}`}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
