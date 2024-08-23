import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import JSONExplorer from "./JSONExplorer";
import { buildPathArray, resolveValueAndPath } from "./utils";

jest.mock("./utils", () => ({
  buildPathArray: jest.fn(),
  resolveValueAndPath: jest.fn(),
}));

describe("JSONExplorer", () => {
  const mockJson = '{"name": "John", "age": 30}';
  const mockInvalidJson = '{"name": "John", "age": 30';
  const mockComplexJson =
    '{"name": "John", "age": 30, "address": {"city": "New York", "zip": "10001"}, "hobbies": ["reading", "traveling"]}';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render with valid JSON", () => {
    render(<JSONExplorer json={mockJson} />);
    expect(screen.getByText("'John'")).toBeInTheDocument();
  });

  it("should render with invalid JSON", () => {
    render(<JSONExplorer json={mockInvalidJson} />);
    expect(screen.queryByText("'John'")).toBeNull();
  });

  it("should handle property change", () => {
    const mockResolvedValue = "John";
    const mockResolvedPath = ["name"];
    (buildPathArray as jest.Mock).mockReturnValue(["name"]);
    (resolveValueAndPath as jest.Mock).mockReturnValue([
      mockResolvedValue,
      mockResolvedPath,
    ]);

    render(<JSONExplorer json={mockJson} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "name" } });

    expect(buildPathArray).toHaveBeenCalledWith("name");
    expect(resolveValueAndPath).toHaveBeenCalledWith(
      ["name"],
      JSON.parse(mockJson)
    );
    expect(input).toHaveValue("name");
    expect(screen.getByText(mockResolvedValue)).toBeInTheDocument();
  });

  it("should handle property click", () => {
    (resolveValueAndPath as jest.Mock).mockReturnValue(["John", ["name"]]);

    render(<JSONExplorer json={mockJson} />);
    const jsonViewer = screen.getByText("name:");

    fireEvent.click(jsonViewer);

    expect(resolveValueAndPath).toHaveBeenCalledWith(
      ["name"],
      JSON.parse(mockJson)
    );
    expect(screen.getByText("'John'")).toBeInTheDocument();
  });

  it("should render nested properties", () => {
    render(<JSONExplorer json={mockComplexJson} />);
    expect(screen.getByText("'New York'")).toBeInTheDocument();
    expect(screen.getByText("'10001'")).toBeInTheDocument();
  });

  it("should render array elements", () => {
    render(<JSONExplorer json={mockComplexJson} />);
    expect(screen.getByText("'reading'")).toBeInTheDocument();
    expect(screen.getByText("'traveling'")).toBeInTheDocument();
  });

  it("should handle nested property change", () => {
    const mockResolvedValue = "New York";
    const mockResolvedPath = ["address", "city"];
    (buildPathArray as jest.Mock).mockReturnValue(["address", "city"]);
    (resolveValueAndPath as jest.Mock).mockReturnValue([
      mockResolvedValue,
      mockResolvedPath,
    ]);

    render(<JSONExplorer json={mockComplexJson} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "address.city" } });

    expect(buildPathArray).toHaveBeenCalledWith("address.city");
    expect(resolveValueAndPath).toHaveBeenCalledWith(
      ["address", "city"],
      JSON.parse(mockComplexJson)
    );
    expect(input).toHaveValue("address.city");
    expect(screen.getByText(mockResolvedValue)).toBeInTheDocument();
  });

  it("should handle array element change", () => {
    const mockResolvedValue = "reading";
    const mockResolvedPath = ["hobbies", "0"];
    (buildPathArray as jest.Mock).mockReturnValue(["hobbies", "0"]);
    (resolveValueAndPath as jest.Mock).mockReturnValue([
      mockResolvedValue,
      mockResolvedPath,
    ]);

    render(<JSONExplorer json={mockComplexJson} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "hobbies.0" } });

    expect(buildPathArray).toHaveBeenCalledWith("hobbies.0");
    expect(resolveValueAndPath).toHaveBeenCalledWith(
      ["hobbies", "0"],
      JSON.parse(mockComplexJson)
    );
    expect(input).toHaveValue("hobbies.0");
    expect(screen.getByText(mockResolvedValue)).toBeInTheDocument();
  });
});
