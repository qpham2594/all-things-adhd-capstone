// need to created this to override the original file for monthlylist and recipes jsx to work due to SessionProvider and useSession

import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import '@/styles/global.css'


export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header/>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
