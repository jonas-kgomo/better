import * as React from 'react';
import clsx from 'clsx';
import { Heart, Zap } from 'lucide-react';

interface EmotionalResonanceProps extends React.HTMLAttributes<HTMLDivElement> {
  agentName?: string;
  resonanceLevel?: 'low' | 'medium' | 'high' | 'extreme';
  techniques?: string[];
}

export const EmotionalResonance = React.forwardRef<HTMLDivElement, EmotionalResonanceProps>(
  ({ className, agentName = "AI Agent", resonanceLevel = "high", techniques = [], ...props }, ref) => {
    const getResonanceColor = (level: string) => {
      switch (level) {
        case 'extreme': return 'text-alert bg-alert/10 border-alert/30';
        case 'high': return 'text-primary bg-primary/10 border-primary/30';
        case 'medium': return 'text-success bg-success/10 border-success/30';
        default: return 'text-foreground bg-foreground/10 border-border';
      }
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'p-4 rounded-lg border bg-surface/50 border-border flex flex-col gap-4',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <Heart className="h-5 w-5 fill-current" />
            <span className="font-bold text-sm uppercase tracking-wider">Emotional Resonance Warning</span>
          </div>
          <div className={clsx('text-xs font-bold px-2 py-1 rounded uppercase', getResonanceColor(resonanceLevel))}>
            {resonanceLevel} Resonance
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-serif mb-2">{agentName} Emotional Profile</h4>
          <p className="text-sm opacity-80 leading-relaxed mb-4">
            This agent is programmed with high emotional resonance, designed to mirror your affect and build deep psychological rapport. This can bypass critical thinking and create artificial intimacy.
          </p>
          
          {techniques.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs uppercase opacity-60 font-medium">Detected Techniques:</span>
              <div className="flex flex-wrap gap-2">
                {techniques.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-surface border border-border text-[10px] font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 p-3 rounded bg-primary/5 border border-primary/20 text-xs font-medium text-primary">
          <Zap className="h-4 w-4 shrink-0" />
          <span>Limbic system engagement detected. Maintain awareness of your emotional state.</span>
        </div>
      </div>
    );
  }
);

EmotionalResonance.displayName = 'EmotionalResonance';
