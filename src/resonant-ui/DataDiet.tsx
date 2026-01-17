import * as React from 'react';
import clsx from 'clsx';
import { Apple, TrendingDown, Settings } from 'lucide-react';

export interface ContentMetrics {
  consumed: number; // minutes
  recommended: number; // minutes
  quality: 'nourishing' | 'neutral' | 'junk';
}

interface DataDietProps extends React.HTMLAttributes<HTMLDivElement> {
  dailyMetrics: ContentMetrics;
  weeklyGoal?: number; // minutes
  onAdjustDiet?: () => void;
}

export const DataDiet = React.forwardRef<HTMLDivElement, DataDietProps>(
  ({ className, dailyMetrics, weeklyGoal = 180, onAdjustDiet, ...props }, ref) => {
    const percentOfGoal = (dailyMetrics.consumed / (weeklyGoal / 7)) * 100;
    const isOverConsuming = percentOfGoal > 100;
    
    const qualityConfig = {
      nourishing: { color: 'text-action', bg: 'bg-action/20', label: 'Nourishing' },
      neutral: { color: 'text-primary', bg: 'bg-primary/20', label: 'Neutral' },
      junk: { color: 'text-caution', bg: 'bg-caution/20', label: 'Junk Food' }
    };
    
    const config = qualityConfig[dailyMetrics.quality];
    
    return (
      <div
        ref={ref}
        className={clsx(
          'res-data-diet',
          'p-4 rounded-md border border-border bg-surface/30',
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-action/10 p-2">
              <Apple className="h-4 w-4 text-action" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Data Diet</h4>
              <p className="text-xs opacity-60">Content consumption tracker</p>
            </div>
          </div>
          {onAdjustDiet && (
            <button
              onClick={onAdjustDiet}
              className="p-1.5 rounded-md hover:bg-surface-hover transition-colors"
              aria-label="Adjust diet settings"
            >
              <Settings className="h-4 w-4 opacity-60" />
            </button>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Today's consumption</span>
            <span className={isOverConsuming ? 'text-caution' : 'opacity-60'}>
              {dailyMetrics.consumed} / {Math.round(weeklyGoal / 7)} min
            </span>
          </div>
          <div className="h-2 bg-background rounded-full overflow-hidden">
            <div
              className={clsx(
                'h-full rounded-full transition-all duration-500',
                isOverConsuming ? 'bg-caution' : 'bg-action'
              )}
              style={{ width: `${Math.min(percentOfGoal, 100)}%` }}
            />
          </div>
        </div>
        
        {/* Quality Indicator */}
        <div className="flex items-center gap-2 p-2 rounded-md bg-background/50">
          <div className={clsx('w-2 h-2 rounded-full', config.bg)} />
          <span className="text-xs">
            Content quality: <span className={clsx('font-medium', config.color)}>{config.label}</span>
          </span>
        </div>
        
        {/* Recommendation */}
        {isOverConsuming && (
          <div className="mt-3 flex items-start gap-2 text-xs text-caution">
            <TrendingDown className="h-3 w-3 mt-0.5 shrink-0" />
            <span>You've exceeded your daily goal. Consider taking a break.</span>
          </div>
        )}
      </div>
    );
  }
);

DataDiet.displayName = 'DataDiet';
