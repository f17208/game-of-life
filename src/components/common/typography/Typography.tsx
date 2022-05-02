import { FC, DetailedHTMLProps, HTMLAttributes, createElement } from 'react';

interface TypographyProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>,
  HTMLParagraphElement | HTMLHeadingElement
> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
}

function getTypographyClassName(variant: TypographyProps['variant']) {
  switch (variant) {
    case 'h1': return `
      font-bold text-5xl
      mt-0 mb-2
      text-primary
    `;
    case 'h2': return `
      font-bold text-4xl
      mt-0 mb-2
      text-primary
    `;
    case 'h3': return `
      font-bold text-3xl
      mt-0 mb-2
      text-primary
    `;
    case 'h4': return `
      font-medium text-xl
      leading-tight
      text-gray-500
    `;
    default: return `
      font-light
    `;
  }
}

export const Typography: FC<TypographyProps> = ({
  variant = 'p',
  children,
  className,
  ...props
}) => {
  return createElement(
    variant,
    {
      ...props,
      className: `${getTypographyClassName(variant)} ${className}`,
    },
    children,
  );
};
