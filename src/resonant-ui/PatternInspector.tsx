import * as React from 'react';
import clsx from 'clsx';
import { Search, AlertTriangle, Eye, EyeOff, X } from 'lucide-react';

interface PatternFinding {
  id: string;
  type: 'roach-motel' | 'privacy-zuckering' | 'forced-continuity' | 'misdirection';
  element: string; // CSS selector
  title: string;
  description: string;
  fix?: string;
}

interface PatternInspectorProps extends React.HTMLAttributes<HTMLDivElement> {
  findings: PatternFinding[];
  isActive: boolean;
  onToggle: () => void;
  onHighlightFinding?: (id: string) => void;
  onDismissFinding?: (id: string) => void;
}

export const PatternInspector = React.forwardRef<HTMLDivElement, PatternInspectorProps>(
  ({ className, findings, isActive, onToggle, onHighlightFinding, onDismissFinding, ...props }, ref) => {
    const [selectedFinding, setSelectedFinding] = React.useState<string | null>(null);
    
    const getIconForType = (type: PatternFinding['type']) => {
      switch (type) {
        case 'roach-motel':
          return <AlertTriangle className="h-4 w-4" />;
        case 'privacy-zuckering':
          return <Eye className="h-4 w-4" />;
        case 'forced-continuity':
          return <AlertTriangle className="h-4 w-4" />;
        case 'misdirection':
          return <EyeOff className="h-4 w-4" />;
        default:
          return <AlertTriangle className="h-4 w-4" />;
      }
    };
    
    return (
      <div
        ref={ref}
        className={clsx(
          'res-pattern-inspector',
          'fixed top-0 right-0 h-full w-80 bg-background border-l border-border z-50 transform transition-transform duration-300 ease-in-out',
          isActive ? 'translate-x-0' : 'translate-x-full',
          className
        )}
        {...props}
      >
        {/* Inspector Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="font-medium flex items-center gap-2">
              <Search className="h-5 w-5" />
              Pattern Inspector
            </h2>
            <button
              onClick={onToggle}
              className="p-1 rounded-md hover:bg-muted transition-colors"
              aria-label="Close inspector"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {findings.length} potential issues found
          </p>
        </div>
        
        {/* Findings List */}
        <div className="p-4 overflow-y-auto h-full pb-20">
          {findings.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-1">No issues detected</h3>
              <p className="text-sm text-muted-foreground">
                This page appears to follow ethical design practices.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {findings.map((finding) => (
                <div
                  key={finding.id}
                  className={clsx(
                    'p-3 rounded-md border cursor-pointer transition-colors',
                    selectedFinding === finding.id 
                      ? 'border-aegis-caution bg-aegis-caution/5' 
                      : 'border-border hover:bg-muted'
                  )}
                  onClick={() => {
                    setSelectedFinding(finding.id);
                    onHighlightFinding?.(finding.id);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-aegis-caution">
                      {getIconForType(finding.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{finding.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {finding.description}
                      </p>
                      {finding.fix && (
                        <p className="text-xs mt-2 p-2 bg-background rounded border border-border">
                          <span className="font-medium">Fix:</span> {finding.fix}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDismissFinding?.(finding.id);
                      }}
                      className="p-1 rounded hover:bg-muted transition-colors"
                      aria-label="Dismiss finding"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

PatternInspector.displayName = 'PatternInspector';
