import { FC, DetailedHTMLProps, HTMLAttributes } from 'react';

interface H3Props extends DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> {}

export const H3: FC<H3Props> = ({ children, className, ...props }) => {
  return (
    <h3
      className={`
        font-bold text-3xl
        mt-0 mb-2
        text-primary
        ${className || ''}
      `}
      {...props}
    >
      {children}
    </h3>
  );
};
