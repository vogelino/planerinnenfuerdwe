import { StrictMode, FC } from "react";
import Head from "next/head";
import { CookieBanner } from "@components/CookieBanner";
import { AuthProvider } from "@auth/Auth";

import "../src/style/global.css";

const publicURL = process.env.NEXT_PUBLIC_WEB_URL || "";

const App: FC<{
  Component: FC;
  pageProps: Record<string, unknown>;
}> = ({ Component, pageProps }) => (
  <StrictMode>
    <AuthProvider>
      <Head>
        <link rel='icon' href={`${publicURL}/favicon.ico`} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
        <meta name='description' content='FIXME' />
        <link rel='apple-touch-icon' href={`${publicURL}/logo192.png`} />
        <link rel='manifest' href={`${publicURL}/manifest.json`} />
        <title>Enteignen ⨉ Arch - Open Letter</title>
      </Head>
      <main
        className='z-0 relative p-6'
        style={{
          minHeight: "calc(100vh - 215px)",
        }}
      >
        <Component {...pageProps} />
      </main>
      <CookieBanner />
    </AuthProvider>
  </StrictMode>
);

export default App;
