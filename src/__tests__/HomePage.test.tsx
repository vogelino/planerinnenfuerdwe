import { render } from "@testing-library/react";
import HomePage from "../../pages";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("next/router", () => require("next-router-mock"));
describe("page home", () => {
  it("should render without failing", () => {
    render(<HomePage signatories={[]} error={null} />);
  });
});
