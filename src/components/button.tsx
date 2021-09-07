import React from "react";

interface IButtonProps {
  loading: boolean;
  canClick: boolean;
  actionText: string;
}

const Button: React.FC<IButtonProps> = ({ loading, canClick, actionText }) => {
  return (
    <button
      role="button"
      className={`text-lg font-medium focus:outline-none text-white py-3 transition-colors ${
        canClick ? "bg-lime-600 bg-lime-700" : "bg-gray-300 pointer-events-none"
      }`}
    >
      {loading ? "Loading...." : actionText}
    </button>
  );
};

export default Button;
