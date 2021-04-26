import { render, screen } from "@testing-library/react";
import { Footer } from ".";

describe("component Footer", () => {
  it("should render a button trigger and the content", () => {
    render(<Footer />);
    const content = screen.getByText("contentMD");
    const link = screen.getByText("privacyLinkText");
    expect(content).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
});
