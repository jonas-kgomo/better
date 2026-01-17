import * as React from 'react';
import clsx from 'clsx';
import { AlertTriangle, Users, Clock, Tag } from 'lucide-react';

type InsightType = 'urgency' | 'social-proof' | 'obstruction' | 'personalization';

interface InsightBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  type: InsightType;
  text?: string;
  explanation?: string;
  showExplanation?: boolean;
  onToggleExplanation?: () => void;
}

export const InsightBadge = React.forwardRef<HTMLDivElement, InsightBadgeProps>(
  ({ 
    className, 
    type, 
    text, 
    explanation,
    showExplanation = false,
    onToggleExplanation,
    ...props 
  }, ref) => {
    const getIconForType = (type: InsightType) => {
      switch (type) {
        case 'urgency':
          return <Clock className="h-3 w-3" />;
        case 'social-proof':
          return <Users className="h-3 w-3" />;
        case 'obstruction':
          return <AlertTriangle className="h-3 w-3" />;
        case 'personalization':
          return <Tag className="h-3 w-3" />;
        default:
          return <AlertTriangle className="h-3 w-3" />;
      }
    };
    
    const getLabelForType = (type: InsightType) => {
      switch (type) {
        case 'urgency':
          return 'Urgency Tactic';
        case 'social-proof':
          return 'Social Proof';
        case 'obstruction':
          return 'Obstruction';
        case 'personalization':
          return 'Personalization';
        default:
          return 'Pattern';
      }
    };
    
    return (
      <div
        ref={ref}
        className={clsx(
          'res-insight-badge',
          'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-aegis-caution/10 text-aegis-caution border border-aegis-caution/30',
          'cursor-pointer transition-colors hover:bg-aegis-caution/20',
          className
        )}
        onClick={onToggleExplanation}
        {...props}
      >
        {getIconForType(type)}
        <span>{text || `Insight: ${getLabelForType(type)}`}</span>
        
        {showExplanation && explanation && (
          <div className="absolute z-10 mt-8 p-3 max-w-xs bg-background border border-border rounded-md shadow-lg animate-fade-in">
            <p className="text-sm">{explanation}</p>
          </div>
        )}
      </div>
    );
  }
);

InsightBadge.displayName = 'InsightBadge';
