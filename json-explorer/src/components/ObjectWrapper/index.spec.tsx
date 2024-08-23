import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ObjectWrapper from ".";

describe("ObjectWrapper", () => {
  it("should render correctly", () => {
    const { container } = render(<ObjectWrapper />);
    expect(container).toMatchSnapshot();
  });

  it("should render children correctly", () => {
    const children = (
      <>
        <li>Item 1</li>
        <li>Item 2</li>
      </>
    );
    const { getByText } = render(<ObjectWrapper>{children}</ObjectWrapper>);
    expect(getByText("Item 1")).toBeInTheDocument();
    expect(getByText("Item 2")).toBeInTheDocument();
  });

  it("should match snapshot with children", () => {
    const children = (
      <>
        <li>Item 1</li>
        <li>Item 2</li>
      </>
    );
    const { container } = render(<ObjectWrapper>{children}</ObjectWrapper>);
    expect(container).toMatchSnapshot();
  });
});
