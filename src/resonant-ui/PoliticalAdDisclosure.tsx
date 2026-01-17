import * as React from 'react';
import clsx from 'clsx';
import { Megaphone, Target, ShieldCheck } from 'lucide-react';

interface PoliticalAdDisclosureProps extends React.HTMLAttributes<HTMLDivElement> {
  advertiser?: string;
  targetDemographic?: string;
  spendRange?: string;
  adId?: string;
}

export const PoliticalAdDisclosure = React.forwardRef<HTMLDivElement, PoliticalAdDisclosureProps>(
  ({ className, advertiser, targetDemographic, spendRange, adId, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'p-5 rounded-xl border bg-surface/40 border-border/60 backdrop-blur-sm flex flex-col gap-4',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between border-b border-border/30 pb-3">
          <div className="flex items-center gap-2 text-foreground/80">
            <Megaphone className="h-5 w-5" />
            <span className="font-bold text-sm uppercase tracking-tight">Political Advertisement</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] opacity-50 font-mono">
            ID: {adId || 'AD-772-X'}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase opacity-50 font-bold block mb-1">Paid for by</span>
              <span className="text-base font-serif">{advertiser || "Unknown Committee"}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase opacity-50 font-bold block mb-1">Estimated Spend</span>
              <span className="text-sm font-medium">{spendRange || "$10k - $50k"}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <Target className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <div>
                <span className="text-[10px] uppercase opacity-50 font-bold block mb-1">Targeting Logic</span>
                <p className="text-xs leading-relaxed">
                  {targetDemographic || "Users interested in environmental policy, aged 25-45, located in swing districts."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 pt-4 border-t border-border/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-medium opacity-70">
            <ShieldCheck className="h-3 w-3 text-success" />
            <span>Verified Political Advertiser</span>
          </div>
          <button className="text-[10px] font-bold uppercase tracking-widest hover:underline decoration-primary underline-offset-4">
            Why am I seeing this?
          </button>
        </div>
      </div>
    );
  }
);

PoliticalAdDisclosure.displayName = 'PoliticalAdDisclosure';
