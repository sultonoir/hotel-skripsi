import React from "react";
import { IconType } from "react-icons";

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
        rounded-lg
        hover:opacity-80
        transition
        w-full
        btn
        hover:bg-info/90
        hover:border-info/90
        ${disabled ? "btn loading" : ""}
        ${
          outline
            ? "bg-white border-black text-black"
            : "bg-info border-info text-white"
        }
        ${
          small
            ? "py-1 text-sm font-light border-[1px]"
            : "py-3 text-base font-semibold border-[2px]"
        }
        `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
