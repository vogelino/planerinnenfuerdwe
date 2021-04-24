import { supabase } from "@auth/supabase";
import { User } from "@supabase/gotrue-js";
import {
  useState,
  createContext,
  FC,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { SignatoryType } from "src/types/supabase";
import { LetterSigningFormType } from "../../types/letterSigningFormType";

const HAS_SIGNED_KEY = "HAS_SIGNED_KEY";
interface AuthContextType {
  signLetter: (data: LetterSigningFormType) => Promise<void> | void;
  hasSignedLetter: boolean | null;
  isSigningLetter: boolean;
  authIsVerified: boolean;
  error: string | null;
}

const callSignLetter = async (
  data: LetterSigningFormType
): Promise<{
  error: Error | null;
}> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow" as const,
  };

  const url = `${process.env.NEXT_PUBLIC_WEB_URL || ""}/api/sign`;
  const res = await fetch(url, requestOptions);
  if (!res.ok) {
    const parsedResponse = (await res.json()) as { message: string };
    return { error: new Error(parsedResponse.message) };
  }
  return { error: null };
};

const defaultValue = {
  signLetter: () => undefined,
  hasSignedLetter: null,
  isSigningLetter: false,
  authIsVerified: false,
  error: null,
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export const AuthProvider: FC = ({ children }) => {
  const [hasSignedLetter, setHasSignedLetter] = useState<
    AuthContextType["hasSignedLetter"]
  >(defaultValue.hasSignedLetter);
  const [isSigningLetter, setIsSigningLetter] = useState<
    AuthContextType["isSigningLetter"]
  >(defaultValue.isSigningLetter);
  const [authIsVerified, setAuthIsVerified] = useState<
    AuthContextType["authIsVerified"]
  >(defaultValue.authIsVerified);
  const [error, setError] = useState<AuthContextType["error"]>(
    defaultValue.error
  );

  useEffect(() => {
    const session = supabase.auth.session();
    const hasSigned = !!window.localStorage.getItem(HAS_SIGNED_KEY);
    hasSigned && setHasSignedLetter(true);

    const verify = async (user?: User): Promise<void> => {
      if (!user) return;

      setHasSignedLetter(true);
      window.localStorage.setItem(HAS_SIGNED_KEY, "true");

      if (!user.confirmed_at) return;

      const { error: confirmationError } = await supabase
        .from<SignatoryType>("signatories")
        .update({ confirmedAt: user.confirmed_at })
        .eq("userId", user.id);

      if (confirmationError) {
        setError(confirmationError.message);
        return;
      }
      setAuthIsVerified(true);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        void verify(session?.user);
      }
    );

    void verify(session?.user);

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const signLetter = useCallback(
    async (data: LetterSigningFormType): Promise<void> => {
      setError(null);
      setIsSigningLetter(true);
      const { error } = await callSignLetter(data);

      if (error) setError(error.message);
      if (!error) {
        setHasSignedLetter(true);
        window.localStorage.setItem(HAS_SIGNED_KEY, "true");
      }
      setIsSigningLetter(false);
    },
    [setHasSignedLetter, setIsSigningLetter, setError]
  );

  const value = {
    signLetter,
    hasSignedLetter,
    isSigningLetter,
    authIsVerified,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);
  return authContext;
};
