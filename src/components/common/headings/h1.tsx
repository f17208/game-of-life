import { FC, DetailedHTMLProps, HTMLAttributes } from 'react';

interface H4Props extends DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> {}

export const H4: FC<H4Props> = ({ children, ...props }) => {
  return (
    <h4
      className="
        font-medium text-5xl
        leading-tight
        mt-0 mb-2
        text-primary
      "
      {...props}
    >
      {children}
    </h4>
  );
};
