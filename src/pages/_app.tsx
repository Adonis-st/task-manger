import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { Nav } from "../components/navigation/Nav";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [toggleSideBar, setToggleSideBar] = useState(true);
  return (
    <SessionProvider session={session}>
      <Nav toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar} />
      <div className={`${toggleSideBar ? "sm:ml-[260px] xl:ml-[300px]" : ""}`}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
