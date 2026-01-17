import * as React from 'react';
import clsx from 'clsx';
import { Lightbulb, X, ArrowRight } from 'lucide-react';

export type NudgeType = 'suggestion' | 'reminder' | 'encouragement' | 'warning';

interface NudgeUIProps extends React.HTMLAttributes<HTMLDivElement> {
  type: NudgeType;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  dismissible?: boolean;
}

export const NudgeUI = React.forwardRef<HTMLDivElement, NudgeUIProps>(
  ({ 
    className, 
    type,
    title,
    message,
    actionLabel,
    onAction,
    onDismiss,
    dismissible = true,
    ...props 
  }, ref) => {
    const [isDismissed, setIsDismissed] = React.useState(false);
    
    const handleDismiss = () => {
      setIsDismissed(true);
      onDismiss?.();
    };
    
    if (isDismissed) return null;
    
    const typeStyles = {
      suggestion: {
        bg: 'bg-primary/10',
        border: 'border-primary/30',
        icon: 'text-primary',
        iconBg: 'bg-primary/20'
      },
      reminder: {
        bg: 'bg-action/10',
        border: 'border-action/30',
        icon: 'text-action',
        iconBg: 'bg-action/20'
      },
      encouragement: {
        bg: 'bg-safety/10',
        border: 'border-safety/30',
        icon: 'text-safety',
        iconBg: 'bg-safety/20'
      },
      warning: {
        bg: 'bg-caution/10',
        border: 'border-caution/30',
        icon: 'text-caution',
        iconBg: 'bg-caution/20'
      }
    };
    
    const styles = typeStyles[type];
    
    return (
      <div
        ref={ref}
        className={clsx(
          'res-nudge-ui',
          'relative flex items-start gap-3 p-4 rounded-md border',
          styles.bg,
          styles.border,
          'animate-fade-in',
          className
        )}
        {...props}
      >
        <div className={clsx('rounded-full p-2 shrink-0', styles.iconBg)}>
          <Lightbulb className={clsx('h-4 w-4', styles.icon)} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm mb-1">{title}</h4>
          <p className="text-xs opacity-80 leading-relaxed mb-3">
            {message}
          </p>
          
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className={clsx(
                'inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-md',
                'bg-background border border-border hover:bg-surface-hover transition-colors'
              )}
            >
              {actionLabel}
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
        
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="p-1 rounded-md hover:bg-background/50 transition-colors shrink-0"
            aria-label="Dismiss nudge"
          >
            <X className="h-4 w-4 opacity-60" />
          </button>
        )}
      </div>
    );
  }
);

NudgeUI.displayName = 'NudgeUI';
