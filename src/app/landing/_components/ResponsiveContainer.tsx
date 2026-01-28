import { ReactNode } from 'react';

type ResponsiveContainerProps = {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const ResponsiveContainer = ({
  children,
  className = '',
  as: Component = 'div'
}: ResponsiveContainerProps) => {
  return (
    <Component className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Component>
  );
};