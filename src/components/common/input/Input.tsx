import { FC, DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface InputProps extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {}

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`border border-primary rounded-md ${className || ''}`}
      {...props}
    />
  );
};
