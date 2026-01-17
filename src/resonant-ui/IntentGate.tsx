import * as React from 'react';
import clsx from 'clsx';
import { X, Settings, Shield } from 'lucide-react';

interface IntentGateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  onAcceptAll?: () => void;
  onConfigure?: () => void;
  onDismiss?: () => void;
  acceptAllText?: string;
  configureText?: string;
  dismissText?: string;
}

export const IntentGate = React.forwardRef<HTMLDivElement, IntentGateProps>(
  ({ 
    className, 
    title, 
    description, 
    onAcceptAll, 
    onConfigure, 
    onDismiss,
    acceptAllText = "Accept All",
    configureText = "Configure Choices",
    dismissText = "Dismiss",
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'res-intent-gate',
          'fixed bottom-0 left-0 right-0 z-50',
          'bg-background border-t border-border p-4 md:p-6',
          'transform transition-transform duration-300 ease-in-out',
          className
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-aegis-safety/10 p-2">
              <Shield className="h-5 w-5 text-aegis-safety" />
            </div>
            <div className="max-w-lg">
              <h3 className="font-medium text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <button
              onClick={onAcceptAll}
              className="px-4 py-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors"
            >
              {acceptAllText}
            </button>
            <button
              onClick={onConfigure}
              className="px-4 py-2 text-sm font-medium rounded-md bg-aegis-action text-primary-foreground hover:bg-aegis-action/90 transition-colors flex items-center justify-center gap-2"
            >
              <Settings className="h-4 w-4" />
              {configureText}
            </button>
            <button
              onClick={onDismiss}
              className="px-2 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors md:hidden"
            >
              {dismissText}
            </button>
            <button
              onClick={onDismiss}
              className="hidden md:flex px-2 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

IntentGate.displayName = 'IntentGate';
