import { useAuth } from "@auth/Auth";
import { createSupabaseBackendClient } from "@auth/supabase";
import { SubmitSignatoryForm } from "@components/SubmitSignatoryForm";
import { useSignatories } from "@lib/hooks/useSignatories";
import { getSignatories } from "@lib/requests/getSignatories";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { SignatoryType } from "../src/types/supabase";

export const getServerSideProps: GetServerSideProps = async () => {
  const supabaseClient = createSupabaseBackendClient();
  const { signatories, error } = await getSignatories(supabaseClient);
  return { props: { signatories, error } };
};

const HomePage: FC<{
  signatories: SignatoryType[];
  error: Error | null;
}> = ({ signatories: initialSignatories, error }) => {
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
      {uiError || error}
      {isSigningLetter && "Ihr Eintrag wird übermittelt..."}
      {hasSignedLetter &&
        !authIsVerified &&
        "Danke! Ihr Eintrag wurde erfolgreich übermittelt! Wir haben Ihnen eine E-Mail geschickt, um Ihre Identität zu überprüfen."}
      {hasSignedLetter &&
        authIsVerified &&
        "Vielen Dank! Sie haben den offenen Brief erfolgreich unterzeichnet!"}
      {!hasSignedLetter && !authIsVerified && (
        <SubmitSignatoryForm onSubmit={signLetter} />
      )}
      {isLoading && "Loading..."}
      {!isLoading && (
        <ul>
          {signatories.map(({ userId, firstName, lastName }) => (
            <li key={userId}>{`${firstName} ${lastName}`}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default HomePage;
