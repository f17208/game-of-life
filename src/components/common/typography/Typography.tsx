import { FC, DetailedHTMLProps, HTMLAttributes } from 'react';

interface TypographyProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> {
  variant?: 'h3' | 'h4'; // TODO add more
}

export const Typography: FC<TypographyProps> = ({
  variant = 'subtitle1',
  children,
  className,
  ...props
}) => {
  if (variant === 'h3') {
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
  }
  if (variant === 'h4') {
    return <h4
      className={`
        font-medium text-xl
        leading-tight
        text-gray-500
        ${className || ''}
      `}
      {...props}
    >
      {children}
    </h4>;
  }

  return <p
    className={`font-light ${className}`}
    {...props}
  >
    {children}
  </p>;
};
