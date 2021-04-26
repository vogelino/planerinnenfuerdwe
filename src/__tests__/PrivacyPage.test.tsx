import { render } from "@testing-library/react";
import PrivacyPage from "../../pages/privacy";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("next/router", () => require("next-router-mock"));
describe("page home", () => {
  it("should render without failing", () => {
    render(<PrivacyPage />);
  });
});
