import useSWR from "swr";
import { supabase } from "@auth/supabase";
import { SignatoryType } from "../../../types/supabase";
import { useAuth } from "@auth/Auth";
import { getSignatories } from "@lib/requests/getSignatories";

export const useSignatories = (
  initialSignatories: SignatoryType[] = []
): {
  isLoading: boolean;
  signatories: SignatoryType[];
  error: Error | null;
} => {
  const { authIsVerified } = useAuth();

  const userParams = ["signatories", authIsVerified];
  const { data, error: executionError } = useSWR<
    {
      signatories: SignatoryType[] | null;
      error: string | null;
    },
    Error
  >(userParams, async () => await getSignatories(supabase), {
    initialData: {
      signatories: initialSignatories,
      error: null,
    },
  });

  return {
    isLoading: !data?.error && !executionError && !data?.signatories,
    signatories: data?.signatories || [],
    error: data?.error ? new Error(data?.error) : executionError || null,
  };
};
