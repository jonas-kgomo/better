import * as React from 'react';
import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';

interface ChoiceFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  hiddenContent: React.ReactNode;
  visibleContent: React.ReactNode;
  rationale: string;
}

export const ChoiceFrame = React.forwardRef<HTMLDivElement, ChoiceFrameProps>(
  ({ className, hiddenContent, visibleContent, rationale, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
      <div
        ref={ref}
        className={clsx('res-choice-frame', !isExpanded && 'collapsed', className)}
        {...props}
      >
        <button 
          className="res-choice-frame-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isExpanded ? <EyeOff size={14} /> : <Eye size={14} />}
            {isExpanded ? 'Hide Alternatives' : 'Show Hidden Options'}
          </div>
        </button>
        
        <div className="animate-fade-in">
          {visibleContent}
        </div>

        {isExpanded && (
          <div className="animate-slide-in" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed hsl(var(--border))' }}>
            <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'hsl(var(--caution))', fontStyle: 'italic' }}>
              <strong>Why was this hidden?</strong> {rationale}
            </div>
            {hiddenContent}
          </div>
        )}
      </div>
    );
  }
);

ChoiceFrame.displayName = 'ChoiceFrame';
