import { render, screen } from "@testing-library/react";
import { CookieBanner } from ".";
describe("CookieBanner component", () => {
  it("should render the data privacy link", () => {
    render(<CookieBanner />);
    const moreInfoLink = screen.getByText(/moreInfoLinkText/gi);
    expect(moreInfoLink).toBeInTheDocument();
  });
  it("should render the Info text", () => {
    render(<CookieBanner />);
    const infoText = screen.getByText(/message/gi);
    expect(infoText).toBeInTheDocument();
  });
  it("should render the Accept button", () => {
    render(<CookieBanner />);
    const acceptButton = screen.getByText(/acceptButtonText/gi);
    expect(acceptButton).toBeInTheDocument();
  });
});
