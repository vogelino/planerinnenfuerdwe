import { SupabaseClient } from "@supabase/supabase-js";
import { SignatoryType } from "src/types/supabase";

export const getSignatories = async (
  supabaseClient: SupabaseClient
): Promise<{
  signatories: SignatoryType[] | null;
  error: string | null;
}> => {
  const { data: signatories, error } = await supabaseClient
    .from<SignatoryType>("signatories")
    .select("*");
  if (error) return { signatories: [], error: error.message };
  return { signatories: signatories || [], error: null };
};
