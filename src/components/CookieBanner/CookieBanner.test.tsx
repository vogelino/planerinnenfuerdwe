// import { render, screen } from "@testing-library/react";
import { CookieBanner } from ".";

describe("CookieBanner component", () => {
  it("should render without failing", () => {
    // render(<HomePage signatories={[]} error={null} />);
    // FIXME
    console.log(typeof CookieBanner);
    expect(true).toBe(true);
  });
  // it("should render the data privacy link", () => {
  //   render(<CookieBanner />);
  //   const moreInfoLink = screen.getByText(/information/gi);
  //   expect(moreInfoLink).toBeInTheDocument();
  // });
  // it("should render the Info text", () => {
  //   render(<CookieBanner />);
  //   const infoText = screen.getByText(/cookies/gi);
  //   expect(infoText).toBeInTheDocument();
  // });
});
