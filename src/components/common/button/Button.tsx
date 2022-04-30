import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = ({ children, className, disabled, ...rest }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        bg-primary hover:bg-secondary disabled:bg-primary text-white 
        disabled:opacity-50 
        px-4 py-1
        rounded-lg
        flex space-x-2 items-center
        ${className || ''}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};
