import React from "react";

interface ButtonOutlineProps {
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const ButtonOutline: React.FC<ButtonOutlineProps> = ({
  onClick,
  label,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        border
        bg-background
        border-black text-foreground
        `}
    >
      {label}
    </button>
  );
};

export default ButtonOutline;
