import * as React from 'react';
import clsx from 'clsx';
import { Shield, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

export interface ConsentOption {
  id: string;
  title: string;
  description: string;
  required: boolean;
  enabled: boolean;
}

interface ConsentControlProps {
  options: ConsentOption[];
  onToggle: (id: string) => void;
  onSavePreferences?: () => void;
  showDetails?: boolean;
  className?: string;
}

export const ConsentControl = React.forwardRef<HTMLDivElement, ConsentControlProps>(
  ({ className, options, onToggle, onSavePreferences, showDetails = true }, ref) => {
    const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());
    
    const toggleExpanded = (id: string) => {
      setExpandedIds(prev => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    };
    
    const enabledCount = options.filter(opt => opt.enabled).length;
    
    return (
      <div
        ref={ref}
        className={clsx(
          'res-consent-control',
          'rounded-md border border-border bg-surface/30',
          className
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-safety/10 p-2">
              <Shield className="h-5 w-5 text-safety" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1">Privacy & Consent</h4>
              <p className="text-xs opacity-60">
                {enabledCount} of {options.length} permissions enabled
              </p>
            </div>
          </div>
        </div>
        
        {/* Options List */}
        <div className="divide-y divide-border">
          {options.map((option) => (
            <div key={option.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <button
                  onClick={() => showDetails && toggleExpanded(option.id)}
                  className="flex-1 text-left"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{option.title}</span>
                    {option.required && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30">
                        Required
                      </span>
                    )}
                    {showDetails && (
                      expandedIds.has(option.id) ? (
                        <ChevronUp className="h-3 w-3 opacity-60" />
                      ) : (
                        <ChevronDown className="h-3 w-3 opacity-60" />
                      )
                    )}
                  </div>
                  {!expandedIds.has(option.id) && (
                    <p className="text-xs opacity-60 line-clamp-1">
                      {option.description}
                    </p>
                  )}
                </button>
                
                <button
                  onClick={() => !option.required && onToggle(option.id)}
                  disabled={option.required}
                  className={clsx(
                    'w-10 h-6 rounded-full transition-colors relative shrink-0',
                    option.enabled ? 'bg-action' : 'bg-border',
                    option.required && 'opacity-50 cursor-not-allowed'
                  )}
                  aria-label={`Toggle ${option.title}`}
                >
                  <div
                    className={clsx(
                      'absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform',
                      option.enabled ? 'translate-x-4' : 'translate-x-0.5'
                    )}
                  >
                    {option.enabled ? (
                      <Check className="h-3 w-3 text-action m-auto mt-1" />
                    ) : (
                      <X className="h-3 w-3 text-border m-auto mt-1" />
                    )}
                  </div>
                </button>
              </div>
              
              {expandedIds.has(option.id) && (
                <div className="mt-3 p-3 rounded-md bg-background/50 border border-border animate-fade-in">
                  <p className="text-xs leading-relaxed opacity-80">
                    {option.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Save Button */}
        {onSavePreferences && (
          <div className="p-4 border-t border-border">
            <button
              onClick={onSavePreferences}
              className="w-full px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Save Preferences
            </button>
          </div>
        )}
      </div>
    );
  }
);

ConsentControl.displayName = 'ConsentControl';
