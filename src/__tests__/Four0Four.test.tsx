import { render } from "@testing-library/react";
import Four0FourPage from "../../pages/404";

describe("404 page", () => {
  it("should render without failing", () => {
    render(<Four0FourPage />);
  });
});
