import { ButtonHTMLAttributes, FC } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const IconButton: FC<IconButtonProps> = ({ children, disabled, ...rest }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        bg-primary hover:bg-secondary disabled:bg-primary text-white 
        disabled:opacity-50 
        px-2 py-2
        flex space-x-2 items-center
        rounded-full
      `}
      {...rest}
    >
      {children}
    </button>
  );
};
