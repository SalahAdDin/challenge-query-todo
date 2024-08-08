import { render, screen } from "@application/utils/test-utils";

import ErrorBox from "./ErrorBox";

const DUMMY_ERROR = "Connection Error with 400 code.";

describe("ErrorBox", () => {
  it("renders the ErrorBox component with the provided message", () => {
    const message = DUMMY_ERROR;
    render(<ErrorBox message={message} />);

    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();

    const svgElement = screen.getByRole("img", { hidden: true });
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
    expect(svgElement).toHaveAttribute("fill", "none");
    expect(svgElement).toHaveAttribute("viewBox", "0 0 24 24");
    expect(svgElement).toHaveAttribute("height", "100");
    expect(svgElement).toHaveAttribute("width", "100");

    const errorMessage = screen.getByText(DUMMY_ERROR);
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders the default SVG icon", () => {
    render(<ErrorBox message="Error message" />);

    const svgElement = screen.getByRole("img", { hidden: true });
    expect(svgElement).toBeInTheDocument();
  });

  it("renders the heading and message correctly", () => {
    const message = "This is an error message";
    render(<ErrorBox message={message} />);

    const headingElement = screen.getByRole("heading", { name: /Error/i });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass(
      "mt-12 text-3xl text-gray-800 md:text-4xl lg:text-5xl"
    );

    const messageElement = screen.getByText(message).parentElement;

    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass(
      "mt-8 text-gray-600 md:text-lg lg:text-xl"
    );
  });
});
