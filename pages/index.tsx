import { useAuth } from "@auth/Auth";
import { createSupabaseBackendClient } from "@auth/supabase";
import { SubmitSignatoryForm } from "@components/SubmitSignatoryForm";
import { Feedback } from "@components/Feedback";
import { useSignatories } from "@lib/hooks/useSignatories";
import { getSignatories } from "@lib/requests/getSignatories";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { SignatoryType } from "../src/types/supabase";
import { OpenLetterText } from "@components/OpenLetterText";

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
      <OpenLetterText />
      <h2 className='pt-8 mb-4 font-bold text-xl'>Sign the letter</h2>
      {uiError ||
        (error && <Feedback type='error'>{uiError || error}</Feedback>)}
      {isSigningLetter && (
        <Feedback type='info'>{"Ihr Eintrag wird übermittelt..."}</Feedback>
      )}
      {hasSignedLetter && !authIsVerified && (
        <Feedback type='info'>
          Danke! Ihr Eintrag wurde erfolgreich übermittelt! Wir haben Ihnen eine
          E-Mail geschickt, um Ihre Identität zu überprüfen.
        </Feedback>
      )}
      {hasSignedLetter && authIsVerified && (
        <Feedback type='success'>
          Vielen Dank! Sie haben den offenen Brief erfolgreich unterzeichnet!
        </Feedback>
      )}
      {!hasSignedLetter && !authIsVerified && (
        <SubmitSignatoryForm onSubmit={signLetter} />
      )}
      <h2 className='pt-12 mb-2 font-bold text-xl'>Those who already signed</h2>
      {isLoading && "Loading..."}
      {!isLoading && (
        <div className='mt-2'>
          <ul>
            {signatories.map(({ userId, firstName, lastName }) => (
              <li
                key={userId}
                className='text-lg py-2 border-b border-gray-200'
              >{`${firstName} ${lastName}`}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default HomePage;
