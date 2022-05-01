import { ButtonHTMLAttributes, FC, useMemo } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'error' | 'info';
}

export const Button: FC<ButtonProps> = ({ children, className, variant = 'info', disabled, ...rest }) => {
  const variantClasses = useMemo(() => {
    switch (variant) {
      case 'error': return 'bg-red-500 hover:bg-red-600 disabled:bg-red-500';
      default: return 'bg-primary hover:bg-secondary disabled:bg-primary';
    }
  }, [variant]);

  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        ${variantClasses}
        text-white
        disabled:opacity-50 disabled:cursor-not-allowed
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
