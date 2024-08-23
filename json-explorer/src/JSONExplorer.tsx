import { useCallback, useState } from "react";
import JSONViewer from "./components/JSONViewer";
import { buildPathArray, resolveValueAndPath } from "./utils";

interface JSONExplorerProps {
  json: string;
}

const JSONExplorer: React.FC<JSONExplorerProps> = ({ json }) => {
  const [path, setPath] = useState<string>("");
  const [property, setProperty] = useState<string>("");
  let jsonObject: Record<string, any>;
  try {
    jsonObject = JSON.parse(json);
  } catch (error) {
    jsonObject = {};
  }

  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const path = buildPathArray(e.target.value);
    const [resolvedValue, _resolvedPath] = resolveValueAndPath(
      path,
      jsonObject
    );
    setPath(e.target.value);
    setProperty(resolvedValue?.toString());
  };

  const handlePropClick = useCallback((key: string, path: string[]) => {
    const completePath = [...path, key];
    const [resolvedValue, resolvedPath] = resolveValueAndPath(
      completePath,
      jsonObject
    );
    setProperty(resolvedValue?.toString());
    setPath(resolvedPath);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="property">Property</label>
        <input
          className="rounded-md p-4 border bg-slate-100"
          name="property"
          value={path}
          onChange={(e) => handlePropertyChange(e)}
        />
        <span className="text-slate-500">{property}</span>
      </div>
      <JSONViewer json={jsonObject} onPropClick={handlePropClick} />
    </>
  );
};

export default JSONExplorer;
