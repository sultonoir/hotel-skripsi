import React from "react";
import { IconType } from "react-icons";
import { BiLoaderAlt } from "react-icons/bi";

type Props = {
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${
          outline
            ? "bg-white border-black text-black"
            : "bg-info border-info  text-foreground"
        }
        ${
          small
            ? "py-1 text-sm font-light border-[1px]"
            : "py-3 text-base font-semibold border-[2px]"
        }
        `}
    >
      <span className="flex flex-row gap-2 items-center justify-center">
        {disabled && (
          <BiLoaderAlt
            size={24}
            className="mr-2 animate-spin"
          />
        )}
        {Icon && (
          <Icon
            size={24}
            className="absolute left-4 top-3"
          />
        )}
        {label}
      </span>
    </button>
  );
};

export default Button;
