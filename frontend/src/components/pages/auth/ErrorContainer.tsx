import React from "react";

interface ErrorContainerProps {
  visible: boolean;
}

const ErrorContainer = ({ visible }: ErrorContainerProps) => {
  return (
    <div
      className={
        "mx-auto text-lg mt-[10px] text-red-500 " +
        (visible ? "visible" : "invisible")
      }
    >
      Error
    </div>
  );
};

export default ErrorContainer;
