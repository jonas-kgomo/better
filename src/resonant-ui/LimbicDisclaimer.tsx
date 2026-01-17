import * as React from 'react';
import clsx from 'clsx';
import { HeartPulse, Shield } from 'lucide-react';

interface LimbicDataPoint {
  type: 'biometric' | 'biodata' | 'emotion' | 'physiology';
  label: string;
  description: string;
  sensitivity: 'low' | 'medium' | 'high';
}

interface LimbicDisclaimerProps extends React.HTMLAttributes<HTMLDivElement> {
  dataPoints: LimbicDataPoint[];
  purpose: string;
  onLearnMore?: () => void;
}

export const LimbicDisclaimer = React.forwardRef<HTMLDivElement, LimbicDisclaimerProps>(
  ({ className, dataPoints, purpose, onLearnMore, ...props }, ref) => {
    const hasHigh = dataPoints.some(dp => dp.sensitivity === 'high');
    const severity = hasHigh ? 'warning' : 'info';
    const config = {
      info: {
        bg: 'bg-primary/10',
        border: 'border-primary/30',
        icon: 'text-primary',
        iconBg: 'bg-primary/20'
      },
      warning: {
        bg: 'bg-caution/10',
        border: 'border-caution/30',
        icon: 'text-caution',
        iconBg: 'bg-caution/20'
      }
    }[severity];
    
    return (
      <div
        ref={ref}
        className={clsx(
          'res-limbic-disclaimer',
          'rounded-md border p-4',
          config.bg,
          config.border,
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3 mb-3">
          <div className={clsx('rounded-full p-2 shrink-0', config.iconBg)}>
            <HeartPulse className={clsx('h-5 w-5', config.icon)} />
          </div>
          <div>
            <h4 className="font-medium text-sm">Limbic Data Disclaimer</h4>
            <p className="text-xs opacity-70">{purpose}</p>
          </div>
        </div>
        <ul className="list-disc list-inside space-y-1 text-xs opacity-80 mb-3">
          {dataPoints.map((dp, i) => (
            <li key={i} className={dp.sensitivity === 'high' ? 'text-caution' : ''}>
              <strong>{dp.label}</strong> ({dp.type}) – {dp.description} [{dp.sensitivity} sensitivity]
            </li>
          ))}
        </ul>
        {onLearnMore && (
          <button
            onClick={onLearnMore}
            className={clsx('flex items-center gap-1 text-xs underline', config.icon)}
          >
            <Shield className="h-3 w-3" />
            Learn more about data handling
          </button>
        )}
      </div>
    );
  }
);

LimbicDisclaimer.displayName = 'LimbicDisclaimer';
