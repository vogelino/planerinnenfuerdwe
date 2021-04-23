import { createSupabaseBackendClient } from "@auth/supabase";
import { getSignatories } from "@lib/requests/getSignatories";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { SignatoryType } from "src/types/supabase";

export const getServerSideProps: GetServerSideProps = async () => {
  const supabaseClient = createSupabaseBackendClient();
  const { signatories, error } = await getSignatories(supabaseClient);
  return { props: { signatories, error } };
};

const HomePage: FC<{
  signatories: SignatoryType[];
  error: Error | null;
}> = ({ signatories, error }) => {
  if (error) throw error;
  return (
    <ul>
      {signatories.map(({ userId, firstName, lastName }) => (
        <li key={userId}>{`${firstName} ${lastName}`}</li>
      ))}
    </ul>
  );
};

export default HomePage;
