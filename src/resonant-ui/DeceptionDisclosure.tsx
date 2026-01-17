import * as React from 'react';
import clsx from 'clsx';
import { EyeOff, AlertCircle } from 'lucide-react';

interface DeceptionDisclosureProps extends React.HTMLAttributes<HTMLDivElement> {
  tactic?: string;
  confidence?: number;
  description?: string;
}

export const DeceptionDisclosure = React.forwardRef<HTMLDivElement, DeceptionDisclosureProps>(
  ({ className, tactic = "Deceptive Pattern", confidence = 85, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'p-4 rounded-lg border bg-alert/5 border-alert/20 flex flex-col gap-3',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-alert">
            <EyeOff className="h-5 w-5" />
            <span className="font-bold text-sm uppercase tracking-wider">Deception Detected</span>
          </div>
          <div className="text-xs font-medium px-2 py-1 rounded bg-alert/10 text-alert">
            {confidence}% Confidence
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-serif mb-1">{tactic}</h4>
          <p className="text-sm opacity-80 leading-relaxed">
            {description || "This interface element appears to be designed to mislead or deceive users into taking actions they might not otherwise take."}
          </p>
        </div>

        <div className="flex items-start gap-2 p-2 rounded bg-background/50 border border-border/50 text-xs italic opacity-70">
          <AlertCircle className="h-3 w-3 mt-0.5 shrink-0" />
          <span>Resonant UI has flagged this as a potential human deception tactic. Proceed with caution.</span>
        </div>
      </div>
    );
  }
);

DeceptionDisclosure.displayName = 'DeceptionDisclosure';
