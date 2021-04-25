import { useAuth } from "@auth/Auth";
import { createSupabaseBackendClient } from "@auth/supabase";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SubmitSignatoryForm } from "@components/SubmitSignatoryForm";
import { Feedback } from "@components/Feedback";
import { useSignatories } from "@lib/hooks/useSignatories";
import { getSignatories } from "@lib/requests/getSignatories";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { SignatoryType } from "../src/types/supabase";
import { OpenLetterText } from "@components/OpenLetterText";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import nextI18NextConfig from "../next-i18next.config.js";
import { LanguageSwitch } from "@components/LanguageSwitch";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const supabaseClient = createSupabaseBackendClient();
  const { signatories, error } = await getSignatories(supabaseClient);
  return {
    props: {
      signatories,
      error,
      ...(locale
        ? await serverSideTranslations(
            locale,
            [
              "common",
              "content",
              "cookieBanner",
              "signatureForm",
              "siteMetadata",
            ],
            nextI18NextConfig
          )
        : {}),
    },
  };
};

const HomePage: FC<{
  signatories: SignatoryType[];
  error: Error | null;
}> = ({ signatories: initialSignatories, error }) => {
  const { t: siteMetaT } = useTranslation("siteMetadata");
  const { t: formT } = useTranslation("signatureForm");
  const { t: commonT } = useTranslation("common");
  const {
    signLetter,
    hasSignedLetter,
    isSigningLetter,
    authIsVerified,
    error: authError,
  } = useAuth();
  const { isLoading, error: signatoriesError, signatories } = useSignatories(
    initialSignatories
  );
  const uiError = error?.message || authError || signatoriesError;
  return (
    <>
      <Head>
        <title>{siteMetaT("title")}</title>
        <meta name='description' content={siteMetaT("description")} />
        <meta name='keywords' content={siteMetaT("keywords")} />
      </Head>
      <div className='text-right'>
        <LanguageSwitch />
      </div>
      <OpenLetterText />
      <div className='mx-auto prose-blue prose prose-sm sm:prose lg:prose-lg'>
        <h2 className='pt-8 mb-4 font-bold text-xl'>{formT("heading")}</h2>
        {(uiError || error) && (
          <Feedback type='error'>{uiError || error}</Feedback>
        )}
        {isSigningLetter && (
          <Feedback type='info'>{formT("submissionInProgressText")}</Feedback>
        )}
        {hasSignedLetter && !authIsVerified && (
          <Feedback type='success'>{formT("pendingConfirmationText")}</Feedback>
        )}
        {hasSignedLetter && authIsVerified && (
          <Feedback type='success'>{formT("submissionSuccessText")}</Feedback>
        )}
        {!hasSignedLetter && !authIsVerified && (
          <SubmitSignatoryForm onSubmit={signLetter} />
        )}
        <h2 className='pt-12 mb-2 font-bold text-xl'>
          {commonT("signatoriesHeadline")}
        </h2>
        {isLoading && commonT("loading")}
        {!isLoading && (
          <div className='mt-2'>
            <ul>
              {signatories.map(
                ({ userId, firstName, lastName, organisation }) => (
                  <li key={userId} className='text-lg'>
                    <span className='mr-3'>{`${firstName} ${lastName}`}</span>
                    {organisation && (
                      <small className='text-gray-400 inline-block'>
                        {`( ${organisation} )`}
                      </small>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
