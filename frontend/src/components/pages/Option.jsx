import React from "react";

const Option = ({
  option,
  isSelected,
  isCorrect,
  isWrong,
  isAnswered,
  isValidating,
  onClick,
}) => {
  const handleClick = () => {
    if (!isAnswered && !isValidating) {
      onClick(option);
    }
  };

  // Base style
  let baseStyle =
    "w-full flex items-center justify-between p-4 rounded-xl border shadow-md transition-all duration-300 cursor-pointer text-left";

  // States before submitting
  if (!isAnswered) {
    baseStyle +=
      " bg-base-100 border-base-300 hover:border-primary hover:bg-primary/10";
    if (isSelected) {
      baseStyle += " border-primary bg-primary/15";
    }
  }

  // After answer submitted
  if (isAnswered) {
    if (isCorrect) {
      baseStyle +=
        " bg-green-500 border-green-600 text-white shadow-green-300 hover:bg-green-600";
    } else if (isWrong) {
      baseStyle +=
        " bg-red-500 border-red-600 text-white shadow-red-300 hover:bg-red-600";
    } else {
      baseStyle += " bg-base-200 border-base-300 text-base-content/70";
    }
  }

  return (
    <button className={baseStyle} onClick={handleClick} disabled={isAnswered}>
      <span className="font-medium">{option.value}</span>

      {/* Spinner */}
      {isValidating && (
        <span className="loading loading-spinner loading-sm ml-2"></span>
      )}
    </button>
  );
};

export default Option;
