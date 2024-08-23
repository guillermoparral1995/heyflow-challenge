import { render } from "@testing-library/react";
import JSONViewer from ".";

describe("JSONViewer", () => {
  const mockOnPropClick = jest.fn();

  const renderComponent = (json: any) => {
    return render(<JSONViewer json={json} onPropClick={mockOnPropClick} />);
  };

  it("should render a string", () => {
    const { container } = renderComponent("hello");
    expect(container.textContent).toBe("'hello'");
  });

  it("should render a number", () => {
    const { container } = renderComponent(123);
    expect(container.textContent).toBe("123");
  });

  it("should render a boolean", () => {
    const { container } = renderComponent(true);
    expect(container.textContent).toBe("true");
  });

  it("should render null", () => {
    const { container } = renderComponent(null);
    expect(container.textContent).toBe("null");
  });

  it("should render an array", () => {
    const { container } = renderComponent([1, "two", false]);
    expect(container.textContent).toContain("1");
    expect(container.textContent).toContain("'two'");
    expect(container.textContent).toContain("false");
  });

  it("should render an object", () => {
    const { container } = renderComponent({ a: 1, b: "two", c: false });
    expect(container.textContent).toContain("a: 1");
    expect(container.textContent).toContain("b: 'two'");
    expect(container.textContent).toContain("c: false");
  });

  it("should call onPropClick when a property is clicked", () => {
    const json = { a: 1 };
    const { getByText } = renderComponent(json);
    const prop = getByText("a:");
    prop.click();
    expect(mockOnPropClick).toHaveBeenCalledWith(json, "a", []);
  });
});
