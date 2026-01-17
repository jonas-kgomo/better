import { Card } from './index';
import { Network, Lock } from 'lucide-react';

export const AttributionGraph = () => {
  return (
    <Card className="relative overflow-hidden p-8 min-h-[300px] flex items-center justify-center border-dashed border-primary/20">
      {/* Blurred Background Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="text-center z-10 max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface border border-border mb-6 shadow-lg">
          <Network size={32} className="text-primary" />
        </div>
        <h3 className="text-2xl font-serif mb-2">Attribution Graphs</h3>
        <p className="text-foreground/60 mb-6">
          Visual Reasoning Traces. See exactly which data points and past actions contributed to the AI's current output.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-sm font-medium opacity-70">
          <Lock size={14} />
          <span>Coming Soon</span>
        </div>
      </div>
    </Card>
  );
};
