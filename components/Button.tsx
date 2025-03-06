import clsx from "clsx";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "warning" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  className?: string;
};

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  className = "",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isLoading || isDisabled}
      className={clsx(
        "rounded-md transition font-medium focus:outline-none focus:ring-2 cursor-pointer",
        {
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500": variant === "primary",
          "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400": variant === "secondary",
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500": variant === "danger",
          "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500": variant === "warning",
          "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300": variant === "ghost",
          "text-gray-600 hover:text-gray-800": variant === "icon",

          "px-2 py-1 text-sm": size === "sm",
          "px-4 py-2 text-base": size === "md",
          "px-6 py-3 text-lg": size === "lg",

          "w-full": fullWidth,

          "bg-gray-400 cursor-not-allowed hover:bg-gray-400": isLoading || isDisabled,
        },
        className
      )}
    >
      {isLoading ? "Processing..." : children}
    </button>
  );
};

export default Button;
