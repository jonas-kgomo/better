import * as React from 'react';
import clsx from 'clsx';
import { Clock, Pause, Play, RotateCcw } from 'lucide-react';

interface TimeWellSpentProps extends React.HTMLAttributes<HTMLDivElement> {
  sessionDuration: number; // in minutes
  breakInterval?: number; // in minutes
  onPauseSession?: () => void;
  onResumeSession?: () => void;
  onEndSession?: () => void;
}

export const TimeWellSpent = React.forwardRef<HTMLDivElement, TimeWellSpentProps>(
  ({ 
    className, 
    sessionDuration, 
    breakInterval = 25, 
    onPauseSession,
    onResumeSession,
    onEndSession,
    ...props 
  }, ref) => {
    const [isPaused, setIsPaused] = React.useState(false);
    const minutesUntilBreak = breakInterval - (sessionDuration % breakInterval);
    const shouldBreak = sessionDuration > 0 && sessionDuration % breakInterval === 0;
    
    const handlePause = () => {
      setIsPaused(true);
      onPauseSession?.();
    };
    
    const handleResume = () => {
      setIsPaused(false);
      onResumeSession?.();
    };
    
    return (
      <div
        ref={ref}
        className={clsx(
          'res-time-well-spent',
          'p-4 rounded-md border bg-surface/30',
          shouldBreak ? 'border-caution' : 'border-border',
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={clsx(
              'rounded-full p-2',
              shouldBreak ? 'bg-caution/20' : 'bg-safety/10'
            )}>
              <Clock className={clsx(
                'h-4 w-4',
                shouldBreak ? 'text-caution' : 'text-safety'
              )} />
            </div>
            <div>
              <h4 className="font-medium text-sm">Time Well Spent</h4>
              <p className="text-xs opacity-60">
                {isPaused ? 'Session paused' : 'Active session'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Session Duration */}
        <div className="mb-3">
          <div className="text-2xl font-serif mb-1">
            {Math.floor(sessionDuration / 60)}h {sessionDuration % 60}m
          </div>
          <p className="text-xs opacity-60">
            {shouldBreak 
              ? '⏰ Time for a break!' 
              : `${minutesUntilBreak} min until suggested break`
            }
          </p>
        </div>
        
        {/* Progress to next break */}
        <div className="h-1.5 bg-background rounded-full overflow-hidden mb-3">
          <div
            className={clsx(
              'h-full rounded-full transition-all duration-300',
              shouldBreak ? 'bg-caution' : 'bg-safety'
            )}
            style={{ width: `${((sessionDuration % breakInterval) / breakInterval) * 100}%` }}
          />
        </div>
        
        {/* Controls */}
        <div className="flex gap-2">
          {!isPaused ? (
            <button
              onClick={handlePause}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-md bg-background border border-border hover:bg-surface-hover transition-colors"
            >
              <Pause className="h-3 w-3" />
              Pause
            </button>
          ) : (
            <button
              onClick={handleResume}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-md bg-action text-primary-foreground hover:bg-action/90 transition-colors"
            >
              <Play className="h-3 w-3" />
              Resume
            </button>
          )}
          <button
            onClick={onEndSession}
            className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-md bg-background border border-border hover:bg-surface-hover transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            End
          </button>
        </div>
        
        {shouldBreak && (
          <div className="mt-3 p-2 rounded-md bg-caution/10 border border-caution/30">
            <p className="text-xs text-caution">
              <strong>Break reminder:</strong> You've been focused for {breakInterval} minutes. 
              Consider a 5-minute break to maintain productivity.
            </p>
          </div>
        )}
      </div>
    );
  }
);

TimeWellSpent.displayName = 'TimeWellSpent';
