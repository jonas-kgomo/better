import * as React from 'react';
import clsx from 'clsx';
import { Brain, ChevronDown, ChevronUp, Code } from 'lucide-react';

export interface AlgorithmStep {
  step: number;
  title: string;
  description: string;
  weight: number; // 0-1
}

interface AlgorithmExplainerProps extends React.HTMLAttributes<HTMLDivElement> {
  algorithmName: string;
  purpose: string;
  steps: AlgorithmStep[];
  showCode?: boolean;
  codeSnippet?: string;
}

export const AlgorithmExplainer = React.forwardRef<HTMLDivElement, AlgorithmExplainerProps>(
  ({ className, algorithmName, purpose, steps, showCode = false, codeSnippet, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [showCodeView, setShowCodeView] = React.useState(false);
    
    return (
      <div
        ref={ref}
        className={clsx(
          'res-algorithm-explainer',
          'rounded-md border border-border bg-surface/30 overflow-hidden',
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
              <h4 className="font-medium text-sm">{algorithmName}</h4>
              <p className="text-xs opacity-60">{purpose}</p>
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
            {/* Algorithm Steps */}
            <div className="space-y-3">
              <p className="text-xs font-medium opacity-60">How it works:</p>
              {steps.map((step) => (
                <div key={step.step} className="flex gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{step.title}</span>
                      <span className="text-xs opacity-60">{Math.round(step.weight * 100)}%</span>
                    </div>
                    <p className="text-xs opacity-70 leading-relaxed">{step.description}</p>
                    <div className="h-1 bg-background rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${step.weight * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Code View Toggle */}
            {showCode && codeSnippet && (
              <div className="pt-3 border-t border-border">
                <button
                  onClick={() => setShowCodeView(!showCodeView)}
                  className="flex items-center gap-2 text-xs font-medium text-primary hover:underline"
                >
                  <Code className="h-3 w-3" />
                  {showCodeView ? 'Hide' : 'View'} pseudocode
                </button>
                {showCodeView && (
                  <pre className="mt-3 p-3 bg-background rounded-md text-xs overflow-x-auto">
                    <code>{codeSnippet}</code>
                  </pre>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

AlgorithmExplainer.displayName = 'AlgorithmExplainer';
