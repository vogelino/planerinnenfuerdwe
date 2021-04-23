import useSWR, { mutate } from "swr";
import { supabase } from "@auth/supabase";
import { SignatoryType, AuthenticatedUserType } from "../../../types/supabase";
import { useAuth } from "@auth/Auth";
import { useState } from "react";

type UserFetcherSignature = (
  userId?: AuthenticatedUserType["id"],
  isLoadingAuth?: boolean
) => Promise<SignatoryType | null>;

const fetchUser: UserFetcherSignature = async (userId, isLoadingAuth) => {
  if (isLoadingAuth || isLoadingAuth === undefined) return null;
  if (!userId) throw new Error("Not authenticated");

  const { data: user, error } = await supabase
    .from<SignatoryType>("users")
    .select("name")
    .eq("userId", userId)
    .single();

  if (error) throw error;
  else if (!user) throw new Error(`User with id "${userId} was not found"`);

  return user;
};

const deleteUser = async (userId: string | undefined): Promise<void> => {
  if (!userId) throw new Error("Not authenticated");

  const { error } = await supabase.rpc("delete_user");

  if (error) throw error;
};

export const useUserData = (): {
  isLoading: boolean;
  authenticatedUser: AuthenticatedUserType | null;
  user: SignatoryType | null;
  error: Error | null;
  deleteUser: () => Promise<void>;
} => {
  const [actionError, setActionError] = useState<Error | null>(null);
  const { authenticatedUser, isLoadingAuth } = useAuth();
  const userId = authenticatedUser?.id;

  const userParams = ["userData", userId, isLoadingAuth];
  const user = useSWR<SignatoryType | null, Error>(userParams, () =>
    fetchUser(userId, isLoadingAuth)
  );

  return {
    isLoading: !user.error && !user.data,
    authenticatedUser: authenticatedUser || null,
    user: user.data || null,
    error: user.error || actionError || null,
    deleteUser: async () => {
      void mutate(userParams, null, false);
      await deleteUser(userId).catch(setActionError);
      void mutate(userParams);
    },
  };
};
