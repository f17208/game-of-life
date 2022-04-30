import { FC, DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface InputProps extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {}

export const Input: FC<InputProps> = ({ ...props }) => {
  return (
    <input
      className="border border-primary rounded-md"
      {...props}
    />
  );
};
