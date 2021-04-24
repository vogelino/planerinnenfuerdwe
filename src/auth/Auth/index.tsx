import { useState, createContext, FC, useContext, useCallback } from "react";
import { LetterSigningFormType } from "../../types/letterSigningFormType";
interface AuthContextType {
  signLetter: (data: LetterSigningFormType) => Promise<void> | void;
  hasSignedLetter: boolean | null;
  isSigningLetter: boolean;
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
  isSigningLetter: true,
  error: null,
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export const AuthProvider: FC = ({ children }) => {
  const [hasSignedLetter, setHasSignedLetter] = useState<
    AuthContextType["hasSignedLetter"]
  >(null);
  const [isSigningLetter, setIsSigningLetter] = useState<
    AuthContextType["isSigningLetter"]
  >(true);
  const [error, setError] = useState<AuthContextType["error"]>(null);

  const signLetter = useCallback(
    async (data: LetterSigningFormType): Promise<void> => {
      setIsSigningLetter(true);
      const { error } = await callSignLetter(data);

      if (error) setError(error.message);
      if (!error) setHasSignedLetter(true);
      setIsSigningLetter(false);
    },
    [setHasSignedLetter, setIsSigningLetter, setError]
  );

  const value = {
    signLetter,
    hasSignedLetter,
    isSigningLetter,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);
  return authContext;
};
