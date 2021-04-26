import { StrictMode } from "react";
import Head from "next/head";
import App from "next/app";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config.js";
import { CookieBanner } from "@components/CookieBanner";
import { AuthProvider } from "@auth/Auth";

import "../src/style/global.css";
import { Footer } from "@components/Footer";

const publicURL = process.env.NEXT_PUBLIC_WEB_URL || "";

class MyApp extends App {
  render(): JSX.Element {
    const { Component } = this.props;
    return (
      <StrictMode>
        <AuthProvider>
          <Head>
            <link rel='icon' href={`${publicURL}/favicon.ico`} />
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
            <meta name='theme-color' content='#000000' />
            <link rel='apple-touch-icon' href={`${publicURL}/logo192.png`} />
            <link rel='manifest' href={`${publicURL}/manifest.json`} />
          </Head>
          <main className='z-0 relative px-6 pt-4 pb-20 min-h-screen'>
            <Component {...(this.props.pageProps || {})} />
            <Footer />
          </main>
          <CookieBanner />
        </AuthProvider>
      </StrictMode>
    );
  }
}

export default appWithTranslation(MyApp, nextI18NextConfig);
