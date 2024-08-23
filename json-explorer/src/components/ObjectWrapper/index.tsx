import { PropsWithChildren } from "react";

const ObjectWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <span>{"{"}</span>
      <div className="pl-4">
        <ul>{children}</ul>
      </div>
      <span>{"}"}</span>
    </>
  );
};

export default ObjectWrapper;
