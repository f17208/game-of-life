import { FC, DetailedHTMLProps, HTMLAttributes } from 'react';

interface H4Props extends DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> {}

export const H4: FC<H4Props> = ({ children, className, ...props }) => {
  return (
    <h4
      className={`
        font-medium text-xl
        leading-tight
        text-gray-500
        ${className || ''}
      `}
      {...props}
    >
      {children}
    </h4>
  );
};
