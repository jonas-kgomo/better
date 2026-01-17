import * as React from 'react';
import clsx from 'clsx';
import { AlertTriangle, Info } from 'lucide-react';

export type BiasType = 'gender' | 'racial' | 'age' | 'geographic' | 'socioeconomic' | 'other';
export type BiasSeverity = 'low' | 'medium' | 'high';

export interface DetectedBias {
  type: BiasType;
  severity: BiasSeverity;
  description: string;
  mitigation?: string;
}

interface BiasDisclosureProps extends React.HTMLAttributes<HTMLDivElement> {
  biases: DetectedBias[];
  datasetInfo?: string;
  lastAuditDate?: string;
}

export const BiasDisclosure = React.forwardRef<HTMLDivElement, BiasDisclosureProps>(
  ({ className, biases, datasetInfo, lastAuditDate, ...props }, ref) => {
    const getSeverityColor = (severity: BiasSeverity) => {
      switch (severity) {
        case 'low':
          return 'text-action';
        case 'medium':
          return 'text-caution';
        case 'high':
          return 'text-alert';
      }
    };
    
    const getSeverityBg = (severity: BiasSeverity) => {
      switch (severity) {
        case 'low':
          return 'bg-action/10 border-action/30';
        case 'medium':
          return 'bg-caution/10 border-caution/30';
        case 'high':
          return 'bg-alert/10 border-alert/30';
      }
    };
    
    const highSeverityCount = biases.filter(b => b.severity === 'high').length;
    
    return (
      <div
        ref={ref}
        className={clsx(
          'res-bias-disclosure',
          'rounded-md border bg-surface/30',
          highSeverityCount > 0 ? 'border-alert' : 'border-border',
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-start gap-3">
            <div className={clsx(
              'rounded-full p-2',
              highSeverityCount > 0 ? 'bg-alert/20' : 'bg-caution/10'
            )}>
              <AlertTriangle className={clsx(
                'h-5 w-5',
                highSeverityCount > 0 ? 'text-alert' : 'text-caution'
              )} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1">Bias Disclosure</h4>
              <p className="text-xs opacity-60">
                {biases.length} potential bias{biases.length !== 1 ? 'es' : ''} detected
                {lastAuditDate && ` • Last audit: ${lastAuditDate}`}
              </p>
            </div>
          </div>
        </div>
        
        {/* Biases List */}
        <div className="p-4 space-y-3">
          {biases.length === 0 ? (
            <div className="flex items-center gap-2 p-3 rounded-md bg-action/10 border border-action/30">
              <Info className="h-4 w-4 text-action shrink-0" />
              <p className="text-xs text-action">
                No significant biases detected in this model.
              </p>
            </div>
          ) : (
            biases.map((bias, idx) => (
              <div
                key={idx}
                className={clsx(
                  'p-3 rounded-md border',
                  getSeverityBg(bias.severity)
                )}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-sm font-medium capitalize">
                    {bias.type} Bias
                  </span>
                  <span className={clsx(
                    'text-xs font-medium px-2 py-0.5 rounded-full bg-background',
                    getSeverityColor(bias.severity)
                  )}>
                    {bias.severity} severity
                  </span>
                </div>
                <p className="text-xs opacity-80 leading-relaxed mb-2">
                  {bias.description}
                </p>
                {bias.mitigation && (
                  <div className="pt-2 border-t border-border/30">
                    <p className="text-xs opacity-70">
                      <strong>Mitigation:</strong> {bias.mitigation}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
        {/* Dataset Info */}
        {datasetInfo && (
          <div className="p-4 border-t border-border bg-background/30">
            <p className="text-xs opacity-60 leading-relaxed">
              <strong>Dataset:</strong> {datasetInfo}
            </p>
          </div>
        )}
      </div>
    );
  }
);

BiasDisclosure.displayName = 'BiasDisclosure';
