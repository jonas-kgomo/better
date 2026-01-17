import * as React from 'react';
import clsx from 'clsx';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, children, dismissible = false, onDismiss, ...props }, ref) => {
    const [isDismissed, setIsDismissed] = React.useState(false);
    
    const handleDismiss = () => {
      setIsDismissed(true);
      onDismiss?.();
    };
    
    if (isDismissed) return null;
    
    const variantConfig = {
      info: {
        icon: Info,
        styles: 'bg-primary/10 border-primary/30 text-foreground',
        iconColor: 'text-primary'
      },
      success: {
        icon: CheckCircle,
        styles: 'bg-action/10 border-action/30 text-foreground',
        iconColor: 'text-action'
      },
      warning: {
        icon: AlertTriangle,
        styles: 'bg-caution/10 border-caution/30 text-foreground',
        iconColor: 'text-caution'
      },
      error: {
        icon: AlertCircle,
        styles: 'bg-alert/10 border-alert/30 text-foreground',
        iconColor: 'text-alert'
      }
    };
    
    const config = variantConfig[variant];
    const Icon = config.icon;
    
    return (
      <div
        ref={ref}
        className={clsx(
          'relative flex gap-3 p-4 rounded-md border',
          config.styles,
          className
        )}
        {...props}
      >
        <Icon className={clsx('h-5 w-5 shrink-0 mt-0.5', config.iconColor)} />
        <div className="flex-1">
          {title && <h5 className="font-medium mb-1">{title}</h5>}
          <div className="text-sm opacity-90">{children}</div>
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="p-1 rounded-md hover:bg-background/50 transition-colors shrink-0"
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4 opacity-60" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
