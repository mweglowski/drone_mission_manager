import React, { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  classNames?: string;
}

const Section: React.FC<SectionProps> = ({ children, classNames }) => {
  return <div className={"flex flex-col p-4 pb-[100px] justify-center " + classNames}>{children}</div>;
};

export default Section;
