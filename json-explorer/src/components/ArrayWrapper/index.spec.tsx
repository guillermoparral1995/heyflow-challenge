import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import ArrayWrapper from ".";

describe("ArrayWrapper", () => {
  it("should render with children", () => {
    const listItems = [1, 2, 3].map((item, index) => (
      <li key={index}>{item}</li>
    ));
    const component = render(<ArrayWrapper>{listItems}</ArrayWrapper>);
    expect(component).toMatchSnapshot();
  });

  it("should render without children", () => {
    const component = render(<ArrayWrapper />);
    expect(component).toMatchSnapshot();
  });

  it("should contain the correct structure", () => {
    const listItems = [1, 2, 3].map((item, index) => (
      <li key={index}>{item}</li>
    ));
    const { container } = render(<ArrayWrapper>{listItems}</ArrayWrapper>);
    const spans = container.querySelectorAll("span");
    const ul = container.querySelector("ul");

    expect(spans.length).toBe(2);
    expect(spans[0].textContent).toBe(" [");
    expect(spans[1].textContent).toBe("]");
    expect(ul).toBeInTheDocument();
    expect(ul?.children.length).toBe(3);
  });
});
