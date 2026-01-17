import * as React from 'react';
import clsx from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('glass', className)}
        style={{ borderRadius: 'var(--radius-lg)', padding: '2rem', ...props.style }}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
