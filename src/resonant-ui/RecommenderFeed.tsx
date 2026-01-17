import * as React from 'react';
import { Card, InsightBadge } from './index';
import { BrainCircuit, ChevronDown, ChevronUp, Layers, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

interface FeedItem {
  id: string;
  title: string;
  type: 'article' | 'product';
  score: number;
  nudge?: string;
  residualStream: {
    factor: string;
    weight: number; // 0 to 1
    description: string;
  }[];
}

const DEMO_ITEMS: FeedItem[] = [
  {
    id: '1',
    title: 'The Future of Digital Minimalism',
    type: 'article',
    score: 0.98,
    residualStream: [
      { factor: 'User Interest', weight: 0.9, description: 'Matches your history of "Design Ethics"' },
      { factor: 'Time of Day', weight: 0.6, description: 'Morning readers prefer long-form' },
      { factor: 'Engagement Pred.', weight: 0.85, description: 'High probability of sharing' }
    ]
  },
  {
    id: '2',
    title: 'Limited Edition Mechanical Keyboard',
    type: 'product',
    score: 0.85,
    nudge: 'Scarcity',
    residualStream: [
      { factor: 'Commercial Boost', weight: 0.95, description: 'Sponsored placement' },
      { factor: 'Urgency Pattern', weight: 0.8, description: 'Stock low signal applied' },
      { factor: 'User Interest', weight: 0.4, description: 'Weak match for "Hardware"' }
    ]
  }
];

export const RecommenderFeed = () => {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-serif">Revealed Preferences Feed</h3>
        <div className="flex items-center gap-2 text-xs opacity-60">
          <BrainCircuit size={14} />
          <span>AI Decision Layer: Visible</span>
        </div>
      </div>

      {DEMO_ITEMS.map((item) => (
        <Card key={item.id} className="p-0 overflow-hidden border-opacity-50 transition-all duration-300 hover:border-primary/30">
          {/* Main Content */}
          <div className="p-5 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider opacity-50 font-medium">{item.type}</span>
                {item.nudge && (
                  <InsightBadge type="urgency" text={`${item.nudge} Nudge Detected`} />
                )}
              </div>
              <h4 className="text-lg font-medium mb-1">{item.title}</h4>
              <div className="text-xs opacity-50">Match Score: {(item.score * 100).toFixed(0)}%</div>
            </div>
            
            <button 
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              className="p-2 hover:bg-surface-hover rounded-full transition-colors text-primary"
            >
              {expandedId === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          {/* Residual Stream / AI Reasoning */}
          {expandedId === item.id && (
            <div className="bg-surface/50 border-t border-border p-5 animate-slide-in">
              <div className="flex items-center gap-2 mb-4 text-sm font-medium text-primary">
                <Layers size={16} />
                <span>Residual Stream (Decision Basis)</span>
              </div>
              
              <div className="space-y-3">
                {item.residualStream.map((factor, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{factor.factor}</span>
                      <span className="opacity-70">{factor.description}</span>
                    </div>
                    <div className="h-1.5 bg-background rounded-full overflow-hidden">
                      <div 
                        className={clsx(
                          "h-full rounded-full transition-all duration-500",
                          factor.weight > 0.8 ? "bg-primary" : "bg-primary/40"
                        )}
                        style={{ width: `${factor.weight * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {item.nudge && (
                <div className="mt-4 p-3 bg-caution/10 border border-caution/20 rounded text-sm text-caution flex gap-2 items-start">
                  <ArrowRight size={16} className="mt-0.5 shrink-0" />
                  <div>
                    <strong>Intervention:</strong> The AI boosted this item's score due to the "{item.nudge}" parameter. 
                    This is a commercial nudge, not a relevance match.
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};
