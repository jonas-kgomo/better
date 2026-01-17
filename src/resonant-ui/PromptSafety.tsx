import * as React from 'react';
import clsx from 'clsx';
import { Brain, MapPin, Clock, User, ChevronDown, ChevronUp } from 'lucide-react';

export interface InferredContext {
  type: 'location' | 'time' | 'user-state' | 'intent' | 'custom';
  label: string;
  value: string;
  confidence: number; // 0-100
}

interface PromptSafetyProps extends React.HTMLAttributes<HTMLDivElement> {
  inferredContexts: InferredContext[];
  aiResponse?: string;
  showConfidence?: boolean;
  onContextChallenge?: (context: InferredContext) => void;
}

export const PromptSafety = React.forwardRef<HTMLDivElement, PromptSafetyProps>(
  ({ 
    className, 
    inferredContexts,
    aiResponse,
    showConfidence = true,
    onContextChallenge,
    ...props 
  }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    
    const getIconForType = (type: InferredContext['type']) => {
      switch (type) {
        case 'location':
          return MapPin;
        case 'time':
          return Clock;
        case 'user-state':
          return User;
        case 'intent':
          return Brain;
        default:
          return Brain;
      }
    };
    
    const getConfidenceColor = (confidence: number) => {
      if (confidence >= 80) return 'text-action';
      if (confidence >= 50) return 'text-caution';
      return 'text-alert';
    };
    
    return (
      <div
        ref={ref}
        className={clsx(
          'res-prompt-safety',
          'border border-border rounded-md overflow-hidden bg-surface/30',
          className
        )}
        {...props}
      >
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 flex items-center justify-between hover:bg-surface-hover transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <Brain className="h-4 w-4 text-primary" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-sm">AI Context Awareness</h4>
              <p className="text-xs opacity-60">
                {inferredContexts.length} inferred context{inferredContexts.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 opacity-60" />
          ) : (
            <ChevronDown className="h-4 w-4 opacity-60" />
          )}
        </button>
        
        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-border p-4 space-y-4 animate-fade-in">
            {/* AI Response Preview */}
            {aiResponse && (
              <div className="p-3 bg-background/50 rounded-md border border-border">
                <p className="text-xs font-medium mb-1 opacity-60">AI's Internal Context:</p>
                <p className="text-sm italic opacity-80">"{aiResponse}"</p>
              </div>
            )}
            
            {/* Inferred Contexts */}
            <div className="space-y-2">
              <p className="text-xs font-medium opacity-60">Inferred Information:</p>
              {inferredContexts.map((context, idx) => {
                const Icon = getIconForType(context.type);
                return (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-3 p-3 bg-background/30 rounded-md border border-border"
                  >
                    <div className="flex items-start gap-2 flex-1">
                      <Icon className="h-4 w-4 opacity-60 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium">{context.label}</span>
                          {showConfidence && (
                            <span className={clsx(
                              'text-xs font-medium',
                              getConfidenceColor(context.confidence)
                            )}>
                              {context.confidence}%
                            </span>
                          )}
                        </div>
                        <p className="text-xs opacity-70">{context.value}</p>
                      </div>
                    </div>
                    
                    {onContextChallenge && (
                      <button
                        onClick={() => onContextChallenge(context)}
                        className="text-xs px-2 py-1 rounded-md bg-background border border-border hover:bg-surface-hover transition-colors shrink-0"
                      >
                        Challenge
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Privacy Note */}
            <div className="pt-3 border-t border-border">
              <p className="text-xs opacity-60 leading-relaxed">
                <strong>Privacy Note:</strong> This AI has inferred the above information about you 
                to personalize its response. You can challenge any incorrect assumptions.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

PromptSafety.displayName = 'PromptSafety';
