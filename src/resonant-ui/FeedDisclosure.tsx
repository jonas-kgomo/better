import * as React from 'react';
import clsx from 'clsx';
import { ArrowUpDown, Sparkles } from 'lucide-react';

export type FeedType = 'algorithmic' | 'chronological';

interface FeedDisclosureProps extends React.HTMLAttributes<HTMLDivElement> {
  currentType: FeedType;
  onFeedChange: (type: FeedType) => void;
}

export const FeedDisclosure = React.forwardRef<HTMLDivElement, FeedDisclosureProps>(
  ({ className, currentType, onFeedChange, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'w-full p-4 rounded-lg border transition-all duration-300',
          currentType === 'algorithmic' 
            ? 'bg-purple-500/5 border-purple-500/20' 
            : 'bg-emerald-500/5 border-emerald-500/20',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={clsx(
              "p-2 rounded-full",
              currentType === 'algorithmic' ? "bg-purple-500/10 text-purple-400" : "bg-emerald-500/10 text-emerald-400"
            )}>
              {currentType === 'algorithmic' ? <Sparkles size={18} /> : <ArrowUpDown size={18} />}
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">
                {currentType === 'algorithmic' ? 'Discovery Feed' : 'Chronological Feed'}
              </h4>
              <p className="text-xs text-foreground/60 mt-0.5">
                {currentType === 'algorithmic' 
                  ? 'Optimized for discovery. May contain persuasive patterns.' 
                  : 'Sorted by time. No algorithmic filtering.'}
              </p>
            </div>
          </div>

          <div className="flex bg-surface rounded-lg p-1 border border-border">
            <button
              onClick={() => onFeedChange('algorithmic')}
              className={clsx(
                "px-3 py-1.5 rounded text-xs font-medium transition-all",
                currentType === 'algorithmic' 
                  ? "bg-background shadow-sm text-foreground" 
                  : "text-foreground/50 hover:text-foreground"
              )}
            >
              Discovery
            </button>
            <button
              onClick={() => onFeedChange('chronological')}
              className={clsx(
                "px-3 py-1.5 rounded text-xs font-medium transition-all",
                currentType === 'chronological' 
                  ? "bg-background shadow-sm text-foreground" 
                  : "text-foreground/50 hover:text-foreground"
              )}
            >
              Time
            </button>
          </div>
        </div>
      </div>
    );
  }
);

FeedDisclosure.displayName = 'FeedDisclosure';
