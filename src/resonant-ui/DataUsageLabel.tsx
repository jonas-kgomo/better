import * as React from 'react';
import clsx from 'clsx';
import { Database, Eye, Share2, Trash2 } from 'lucide-react';

export type DataUsageType = 'analytics' | 'personalization' | 'advertising' | 'sharing' | 'storage';

export interface DataUsage {
  type: DataUsageType;
  description: string;
  retention?: string;
  thirdParties?: string[];
}

interface DataUsageLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  usages: DataUsage[];
  compact?: boolean;
}

export const DataUsageLabel = React.forwardRef<HTMLDivElement, DataUsageLabelProps>(
  ({ className, usages, compact = false, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(!compact);
    
    const getIconForType = (type: DataUsageType) => {
      switch (type) {
        case 'analytics':
          return Eye;
        case 'personalization':
          return Database;
        case 'advertising':
          return Share2;
        case 'sharing':
          return Share2;
        case 'storage':
          return Database;
      }
    };
    
    const getColorForType = (type: DataUsageType) => {
      switch (type) {
        case 'analytics':
          return 'text-primary';
        case 'personalization':
          return 'text-safety';
        case 'advertising':
          return 'text-caution';
        case 'sharing':
          return 'text-alert';
        case 'storage':
          return 'text-primary';
      }
    };
    
    if (compact && !isExpanded) {
      return (
        <button
          onClick={() => setIsExpanded(true)}
          className={clsx(
            'inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-surface/30 hover:bg-surface-hover transition-colors text-xs',
            className
          )}
        >
          <Database className="h-3 w-3 opacity-60" />
          <span>Data Usage ({usages.length})</span>
        </button>
      );
    }
    
    return (
      <div
        ref={ref}
        className={clsx(
          'res-data-usage-label',
          'rounded-md border border-border bg-surface/30',
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="p-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 opacity-60" />
            <h5 className="text-sm font-medium">Data Usage</h5>
          </div>
          {compact && (
            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs opacity-60 hover:opacity-100"
            >
              Collapse
            </button>
          )}
        </div>
        
        {/* Usage List */}
        <div className="p-3 space-y-2">
          {usages.map((usage, idx) => {
            const Icon = getIconForType(usage.type);
            const color = getColorForType(usage.type);
            
            return (
              <div
                key={idx}
                className="p-2 rounded-md bg-background/50 border border-border"
              >
                <div className="flex items-start gap-2 mb-1">
                  <Icon className={clsx('h-3 w-3 mt-0.5 shrink-0', color)} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium capitalize">{usage.type}</span>
                      {usage.retention && (
                        <span className="text-xs opacity-60 flex items-center gap-1">
                          <Trash2 className="h-2 w-2" />
                          {usage.retention}
                        </span>
                      )}
                    </div>
                    <p className="text-xs opacity-70 leading-relaxed">
                      {usage.description}
                    </p>
                    {usage.thirdParties && usage.thirdParties.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-border/30">
                        <p className="text-xs opacity-60">
                          <strong>Shared with:</strong> {usage.thirdParties.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

DataUsageLabel.displayName = 'DataUsageLabel';
