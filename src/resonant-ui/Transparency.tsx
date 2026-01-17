import * as React from 'react';
import clsx from 'clsx';
import { Info, Cookie, X } from 'lucide-react';

interface DisclosureProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'ad' | 'affiliate' | 'sponsored';
}

export const Disclosure = React.forwardRef<HTMLDivElement, DisclosureProps>(
  ({ className, type, ...props }, ref) => {
    const getLabel = () => {
      switch (type) {
        case 'ad': return 'Advertisement';
        case 'affiliate': return 'Affiliate Link';
        case 'sponsored': return 'Sponsored Content';
      }
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold border border-foreground/20 text-foreground/60 select-none',
          className
        )}
        title={`Transparency: This content is a ${getLabel()}.`}
        {...props}
      >
        <Info size={10} />
        {getLabel()}
      </div>
    );
  }
);
Disclosure.displayName = 'Disclosure';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export const CookieConsent = ({ onAccept, onDecline }: CookieConsentProps) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm w-full z-50 animate-slide-in">
      <div className="glass p-6 rounded-lg shadow-lg border border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 text-primary">
            <Cookie size={20} />
            <h3 className="font-serif font-medium text-lg text-foreground">Digital Nutrition</h3>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-foreground/50 hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <p className="text-sm text-foreground/80 mb-6 leading-relaxed">
          We use cookies not to track you, but to remember your preferences (like your theme). 
          We do not sell your data. We do not follow you across the web.
        </p>

        <div className="flex gap-3">
          <button 
            onClick={() => { onAccept(); setIsVisible(false); }}
            className="flex-1 bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Accept Essential
          </button>
          <button 
            onClick={() => { onDecline(); setIsVisible(false); }}
            className="flex-1 bg-transparent border border-border text-foreground py-2 rounded-md text-sm font-medium hover:bg-surface-hover transition-colors"
          >
            Decline All
          </button>
        </div>
      </div>
    </div>
  );
};
