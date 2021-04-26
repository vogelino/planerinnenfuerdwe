import { render, screen } from "@testing-library/react";
import { FormTextInput } from ".";

describe("FormTextInput component", () => {
  it("should render an input", () => {
    render(<FormTextInput name='name' />);
    const input = document.querySelector("input");
    expect(input).toBeInTheDocument();
  });
  it("should not render a label when not provided", () => {
    render(<FormTextInput name='name' />);
    const label = document.querySelector("label");
    expect(label).not.toBeInTheDocument();
  });
  it("should render a label when provided", () => {
    render(<FormTextInput name='name' label='Name' />);
    const label = screen.getByText(/Name/g);
    expect(label).toBeInTheDocument();
  });
  it("should render an optional mention when provided", () => {
    render(<FormTextInput name='name' label='Name' optional />);
    const optional = screen.getByText(/optionalFieldText/g);
    expect(optional).toBeInTheDocument();
  });
  it("should render errors when provided", () => {
    render(<FormTextInput name='name' errors={["hey", "how"]} />);
    const hey = screen.getByText(/hey/g);
    expect(hey).toBeInTheDocument();
    const how = screen.getByText(/how/g);
    expect(how).toBeInTheDocument();
  });
});
