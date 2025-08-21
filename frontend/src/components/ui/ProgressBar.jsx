import clsx from "clsx";
import React from "react";

const ProgressBar = () => {
  const progressText = () => "20%";
  return (
    <progress value={20} max={100} className={clsx("progress-bar")}>
      {progressText}
    </progress>
  );
};

export default ProgressBar;
