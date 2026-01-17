import * as React from 'react';
import clsx from 'clsx';
import { Flag, Info } from 'lucide-react';

interface PoliticalPersuasionProps extends React.HTMLAttributes<HTMLDivElement> {
  campaign?: string;
  tactic?: string;
  fundingSource?: string;
}

export const PoliticalPersuasion = React.forwardRef<HTMLDivElement, PoliticalPersuasionProps>(
  ({ className, campaign, tactic = "Political Persuasion", fundingSource, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'p-4 rounded-lg border bg-primary/5 border-primary/20 flex flex-col gap-3',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2 text-primary">
          <Flag className="h-5 w-5" />
          <span className="font-bold text-sm uppercase tracking-wider">Political Persuasion Disclosure</span>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-lg font-serif">{tactic}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaign && (
              <div className="text-sm">
                <span className="opacity-60 block text-xs uppercase mb-1">Campaign</span>
                <span className="font-medium">{campaign}</span>
              </div>
            )}
            {fundingSource && (
              <div className="text-sm">
                <span className="opacity-60 block text-xs uppercase mb-1">Funding Source</span>
                <span className="font-medium">{fundingSource}</span>
              </div>
            )}
          </div>
          <p className="text-sm opacity-80 leading-relaxed mt-2">
            This content uses specific psychological framing common in political campaigns to influence opinion or behavior.
          </p>
        </div>

        <div className="flex items-start gap-2 p-2 rounded bg-background/50 border border-border/50 text-xs opacity-70">
          <Info className="h-3 w-3 mt-0.5 shrink-0" />
          <span>Transparency in political messaging is essential for democratic agency.</span>
        </div>
      </div>
    );
  }
);

PoliticalPersuasion.displayName = 'PoliticalPersuasion';
