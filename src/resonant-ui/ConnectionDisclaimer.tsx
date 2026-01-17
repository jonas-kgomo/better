import * as React from 'react';
import clsx from 'clsx';
import { WifiOff, AlertCircle } from 'lucide-react';

interface ConnectionDisclaimerProps extends React.HTMLAttributes<HTMLDivElement> {
  serviceName?: string;
  reason?: string;
  variant?: 'info' | 'warning';
  showIcon?: boolean;
}

export const ConnectionDisclaimer = React.forwardRef<HTMLDivElement, ConnectionDisclaimerProps>(
  ({ 
    className, 
    serviceName = "external services",
    reason = "This feature operates entirely locally to protect your privacy.",
    variant = 'info',
    showIcon = true,
    ...props 
  }, ref) => {
    const variantStyles = {
      info: 'bg-primary/10 border-primary/30 text-foreground',
      warning: 'bg-caution/10 border-caution/30 text-foreground'
    };
    
    return (
      <div
        ref={ref}
        className={clsx(
          'res-connection-disclaimer',
          'flex items-start gap-3 p-4 rounded-md border',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {showIcon && (
          <div className={clsx(
            'rounded-full p-2 shrink-0',
            variant === 'info' ? 'bg-primary/20' : 'bg-caution/20'
          )}>
            <WifiOff className={clsx(
              'h-4 w-4',
              variant === 'info' ? 'text-primary' : 'text-caution'
            )} />
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">
              No connection to {serviceName}
            </span>
            {variant === 'warning' && (
              <AlertCircle className="h-3 w-3 text-caution" />
            )}
          </div>
          <p className="text-xs opacity-80 leading-relaxed">
            {reason}
          </p>
        </div>
      </div>
    );
  }
);

ConnectionDisclaimer.displayName = 'ConnectionDisclaimer';
