import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Header/>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
