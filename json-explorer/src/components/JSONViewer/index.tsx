import ArrayWrapper from "../ArrayWrapper";
import ObjectWrapper from "../ObjectWrapper";

interface JSONViewerProps {
  json: Record<string, any>;
  onPropClick: (...args: any) => void;
}

const JSONViewer: React.FC<JSONViewerProps> = ({ json, onPropClick }) => {
  const renderJson = (obj: any, path: string[] = []) => {
    if (typeof obj !== "object" || obj === null) {
      return (
        <span>
          {typeof obj === "string" ? `'${String(obj)}'` : String(obj)}
        </span>
      );
    }

    if (Array.isArray(obj)) {
      return (
        <ArrayWrapper>
          {obj.map((item, index) => (
            <li key={index}>{renderJson(item, [...path, `[${index}]`])},</li>
          ))}
        </ArrayWrapper>
      );
    }

    return (
      <ObjectWrapper>
        {Object.keys(obj).map((key) => (
          <li key={key}>
            <span
              className={
                typeof obj[key] !== "object"
                  ? "cursor-pointer text-blue-400 hover:underline"
                  : ""
              }
              onClick={
                typeof obj[key] !== "object"
                  ? () => onPropClick(json, key, path)
                  : undefined
              }
            >
              {key}:
            </span>{" "}
            {renderJson(obj[key], [...path, key])},
          </li>
        ))}
      </ObjectWrapper>
    );
  };

  return (
    <div>
      <pre className="bg-slate-800 p-8 rounded-md">
        <code className="text-white">{renderJson(json)}</code>
      </pre>
    </div>
  );
};

export default JSONViewer;
