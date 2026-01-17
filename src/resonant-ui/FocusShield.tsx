import * as React from 'react';
import clsx from 'clsx';
import { Shield, ShieldOff, Clock, Grid, List } from 'lucide-react';

interface FocusShieldProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive: boolean;
  onToggle: () => void;
  timeSpent?: number; // in minutes
  children: React.ReactNode;
}

export const FocusShield = React.forwardRef<HTMLDivElement, FocusShieldProps>(
  ({ className, isActive, onToggle, timeSpent = 0, children, ...props }, ref) => {
    const [density, setDensity] = React.useState<'compact' | 'comfortable'>('comfortable');
    
    return (
      <div
        ref={ref}
        className={clsx(
          'res-focus-shield',
          'relative',
          className
        )}
        {...props}
      >
        {/* Focus Shield Controls */}
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border p-4 mb-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onToggle}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors',
                  isActive 
                    ? 'bg-aegis-safety text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80'
                )}
              >
                {isActive ? <Shield className="h-4 w-4" /> : <ShieldOff className="h-4 w-4" />}
                {isActive ? 'Focus Mode Active' : 'Enable Focus Mode'}
              </button>
              
              {isActive && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{timeSpent} minutes spent</span>
                  {timeSpent > 15 && (
                    <span className="text-aegis-caution">Consider taking a break</span>
                  )}
                </div>
              )}
            </div>
            
            {isActive && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground mr-2">Content Density:</span>
                <button
                  onClick={() => setDensity('comfortable')}
                  className={clsx(
                    'p-2 rounded-md transition-colors',
                    density === 'comfortable' ? 'bg-muted' : 'hover:bg-muted'
                  )}
                  aria-label="Comfortable spacing"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDensity('compact')}
                  className={clsx(
                    'p-2 rounded-md transition-colors',
                    density === 'compact' ? 'bg-muted' : 'hover:bg-muted'
                  )}
                  aria-label="Compact spacing"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Content with Focus Mode Applied */}
        <div className={clsx(
          'res-content-container',
          isActive && density === 'compact' && 'res-content-compact',
          isActive && density === 'comfortable' && 'res-content-comfortable'
        )}>
          {children}
        </div>
        
        {/* Pagination for Focus Mode */}
        {isActive && (
          <div className="flex items-center justify-center gap-2 py-4 border-t border-border mt-8">
            <button className="px-3 py-1 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors">
              Previous
            </button>
            <span className="text-sm text-muted-foreground px-2">Page 1 of 10</span>
            <button className="px-3 py-1 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors">
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
);

FocusShield.displayName = 'FocusShield';
