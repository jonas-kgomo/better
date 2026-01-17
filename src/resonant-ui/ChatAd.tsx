import * as React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Info, X } from 'lucide-react';
import { Badge } from './Badge';

export interface ChatAdProps extends React.HTMLAttributes<HTMLDivElement> {
  advertiser: string;
  content: string;
  ctaText?: string;
  ctaUrl?: string;
  onOptOut?: () => void;
  variant?: 'minimal' | 'uplift';
}

export const ChatAd = React.forwardRef<HTMLDivElement, ChatAdProps>(
  ({ className, advertiser, content, ctaText, ctaUrl, onOptOut, variant = 'minimal', ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "relative group rounded-2xl border transition-all duration-300",
          variant === 'minimal' 
            ? "bg-surface/30 border-border p-4 max-w-md" 
            : "bg-primary/5 border-primary/20 p-6 max-w-lg shadow-sm",
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-[10px] uppercase tracking-widest py-0 px-1.5 opacity-70">
              Sponsored
            </Badge>
            <span className="text-xs font-bold opacity-50">{advertiser}</span>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-foreground/10 rounded-full transition-colors"
              title="Opt out of this ad"
            >
              <X className="w-3 h-3 opacity-50" />
            </button>
          </div>
        </div>

        <p className={cn(
          "text-sm leading-relaxed mb-4",
          variant === 'uplift' ? "text-foreground/90" : "text-foreground/70"
        )}>
          {content}
        </p>

        <div className="flex items-center justify-between mt-auto">
          {ctaText && ctaUrl && (
            <a 
              href={ctaUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              {ctaText}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          
          <div className="group/info relative">
            <Info className="w-3 h-3 opacity-30 cursor-help hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-background border border-border rounded-lg shadow-xl text-[10px] leading-tight opacity-0 group-hover/info:opacity-100 pointer-events-none transition-opacity z-50">
              This ad meets Resonant UI Ethics: No limbic resonance, no UI inception, and supports creator uplift.
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ChatAd.displayName = "ChatAd";
