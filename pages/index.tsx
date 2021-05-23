import { useAuth } from "@auth/Auth";
import { createSupabaseBackendClient } from "@auth/supabase";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SubmitSignatoryForm } from "@components/SubmitSignatoryForm";
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
import { SignaturesList } from "@components/SignaturesList";
import { Footer } from "@components/Footer";
import { CookieBanner } from "@components/CookieBanner";
// import { AuthorsList } from "@components/AuthorsList";

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
              "footer",
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
  const { t } = useTranslation("siteMetadata");
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
        <title>{t("title")}</title>
        <meta name='description' content={t("description")} />
        <meta name='keywords' content={t("keywords")} />
      </Head>
      <LanguageSwitch />
      <OpenLetterText />
      <div className='mx-auto max-w-full sm:max-w-2xl sm:px-6 md:max-w-3xl'>
        <SubmitSignatoryForm
          error={uiError || error || null}
          onSubmit={signLetter}
          isSigningLetter={!!isSigningLetter}
          isPendingConfirmation={!!(hasSignedLetter && !authIsVerified)}
          hasSubmissionCompleted={!!(hasSignedLetter && authIsVerified)}
          hasNeverSigned={!!(!hasSignedLetter && !authIsVerified)}
        />
        {/* <AuthorsList /> */}
        <SignaturesList isLoading={isLoading} signatories={signatories} />
      </div>
      <Footer />
      <CookieBanner />
    </>
  );
};

export default HomePage;
