import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { FC } from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import nextI18NextConfig from "../next-i18next.config.js";
import { LanguageSwitch } from "@components/LanguageSwitch";
import ReactMarkdown from "react-markdown";
import { Footer } from "@components/Footer";
import { CookieBanner } from "@components/CookieBanner";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale
        ? await serverSideTranslations(
            locale,
            ["common", "footer", "imprint", "cookieBanner", "siteMetadata"],
            nextI18NextConfig
          )
        : {}),
    },
    revalidate: 60 * 60,
  };
};

const PrivacyPage: FC = () => {
  const { t: siteMetaT } = useTranslation("siteMetadata");
  const { t: imprintT } = useTranslation("imprint");
  return (
    <>
      <Head>
        <title>
          {siteMetaT("title")} - {imprintT("headline")}
        </title>
        <meta name='description' content={siteMetaT("description")} />
        <meta name='keywords' content={siteMetaT("keywords")} />
      </Head>
      <div className='text-right'>
        <LanguageSwitch />
      </div>
      <div className='mx-auto prose-blue prose prose-sm sm:prose lg:prose-lg'>
        <h1 className='pt-8 mb-4 font-bold text-xl'>{imprintT("headline")}</h1>
        <ReactMarkdown>{imprintT("contentMD")}</ReactMarkdown>
      </div>
      <Footer />
      <CookieBanner />
    </>
  );
};

export default PrivacyPage;
