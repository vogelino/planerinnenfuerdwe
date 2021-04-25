import { act, render, screen, waitFor } from "@testing-library/react";
import { FC, useEffect } from "react";
import { AuthProvider, useAuth } from ".";
import * as router from "next/router";

const createChildComponent = ({
  isReady = () => true,
  inEffect = () => undefined,
}: {
  isReady?: (auth: ReturnType<typeof useAuth>) => boolean;
  inEffect?: (auth: ReturnType<typeof useAuth>) => Promise<void> | void;
}): FC => {
  const ChildComponent: FC = () => {
    const auth = useAuth();
    useEffect(() => {
      void inEffect(auth);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const ready = isReady(auth);
    return <div>{ready && "READY"}</div>;
  };
  return ChildComponent;
};

const originalUseRouter = router.useRouter;
describe("AuthProvider", () => {
  it("should provide its children with context values", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    router.useRouter = jest.fn().mockReturnValue({ locale: "en" });
    const ChildComponent = createChildComponent({
      isReady: auth =>
        !!(
          typeof auth?.isSigningLetter !== "undefined" &&
          auth?.hasSignedLetter === null &&
          auth?.error === null &&
          typeof auth?.signLetter === "function"
        ),
    });
    act(() => {
      render(
        <AuthProvider>
          <ChildComponent />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("READY")).toBeInTheDocument();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      router.useRouter = originalUseRouter;
    });
  });
});
