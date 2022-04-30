import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      type="button"
      className="
        bg-primary hover:bg-secondary text-white
        px-4 py-1
        rounded-lg shadow-lg
      "
      {...rest}
    >
      {children}
    </button>
  );
};
