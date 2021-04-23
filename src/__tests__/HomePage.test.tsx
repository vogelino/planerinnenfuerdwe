import { render } from "@testing-library/react";
import HomePage from "../../pages";

describe("page home", () => {
  it("should render without failing", () => {
    render(<HomePage signatories={[]} error={null} />);
  });
});
