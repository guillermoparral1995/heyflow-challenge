import { PropsWithChildren } from "react";

const ArrayWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <span>{" ["}</span>
      <br />
      <ul className="pl-4">{children}</ul>
      <span>{"]"}</span>
    </>
  );
};

export default ArrayWrapper;
