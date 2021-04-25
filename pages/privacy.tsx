import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { FC } from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import nextI18NextConfig from "../next-i18next.config.js";
import { LanguageSwitch } from "@components/LanguageSwitch";
import ReactMarkdown from "react-markdown";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(locale
        ? await serverSideTranslations(
            locale,
            ["common", "privacy", "cookieBanner", "siteMetadata"],
            nextI18NextConfig
          )
        : {}),
    },
  };
};

const PrivacyPage: FC = () => {
  const { t: siteMetaT } = useTranslation("siteMetadata");
  const { t: privacyT } = useTranslation("privacy");
  return (
    <>
      <Head>
        <title>
          {siteMetaT("title")} - {privacyT("headline")}
        </title>
        <meta name='description' content={siteMetaT("description")} />
        <meta name='keywords' content={siteMetaT("keywords")} />
      </Head>
      <div className='text-right'>
        <LanguageSwitch />
      </div>
      <div className='mx-auto prose-blue prose prose-sm sm:prose lg:prose-lg'>
        <h1 className='pt-8 mb-4 font-bold text-xl'>{privacyT("headline")}</h1>
        <ReactMarkdown>{privacyT("contentMD")}</ReactMarkdown>
      </div>
    </>
  );
};

export default PrivacyPage;
