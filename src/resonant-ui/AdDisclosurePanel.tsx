import * as React from 'react';
import clsx from 'clsx';
import { DollarSign, Eye } from 'lucide-react';

interface AdDisclosurePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  advertiser: string;
  targetingReason: string;
  dataUsed: string;
  children: React.ReactNode;
  onMuteAdvertiser?: () => void;
  onControlAdPreferences?: () => void;
}

export const AdDisclosurePanel = React.forwardRef<HTMLDivElement, AdDisclosurePanelProps>(
  ({ 
    className, 
    advertiser, 
    targetingReason, 
    dataUsed, 
    children,
    onMuteAdvertiser,
    onControlAdPreferences,
    ...props 
  }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    
    return (
      <div
        ref={ref}
        className={clsx(
          'res-ad-disclosure',
          'relative border border-border rounded-lg p-4 bg-muted/30',
          className
        )}
        {...props}
      >
        {/* Disclosure Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Sponsored Content</span>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs text-aegis-caution hover:underline"
          >
            <Eye className="h-3 w-3" />
            Why am I seeing this?
          </button>
        </div>
        
        {/* Ad Content */}
        <div className="mb-3">
          {children}
        </div>
        
        {/* Expanded Disclosure Info */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-3 animate-fade-in">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Advertiser:</span>
                <span className="font-medium">{advertiser}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Targeting Reason:</span>
                <span className="font-medium">{targetingReason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Used:</span>
                <span className="font-medium">{dataUsed}</span>
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              <button
                onClick={onMuteAdvertiser}
                className="px-3 py-1 text-xs rounded-md bg-background border border-border hover:bg-muted transition-colors"
              >
                Mute This Advertiser
              </button>
              <button
                onClick={onControlAdPreferences}
                className="px-3 py-1 text-xs rounded-md bg-aegis-safety text-primary-foreground hover:bg-aegis-safety/90 transition-colors"
              >
                Control My Ad Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

AdDisclosurePanel.displayName = 'AdDisclosurePanel';
