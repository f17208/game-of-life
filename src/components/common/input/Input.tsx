import { FC, DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface InputProps extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {}

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={[
        'border border-primary rounded-md',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className || '',
      ].join(' ')}
      {...props}
    />
  );
};
