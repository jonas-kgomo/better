import * as React from 'react';
import clsx from 'clsx';
import { Shield, AlertCircle, CheckCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';

export type DataFlowStatus = 'appropriate' | 'questionable' | 'violation';

export interface DataFlow {
  id: string;
  sender: string;
  recipient: string;
  dataType: string;
  purpose: string;
  status: DataFlowStatus;
  explanation: string;
}

interface ContextualIntegrityProps extends React.HTMLAttributes<HTMLDivElement> {
  dataFlows: DataFlow[];
  onReviewFlow?: (flowId: string) => void;
  onBlockFlow?: (flowId: string) => void;
  showHeader?: boolean;
}

export const ContextualIntegrity = React.forwardRef<HTMLDivElement, ContextualIntegrityProps>(
  ({ className, dataFlows, onReviewFlow, onBlockFlow, showHeader = true, ...props }, ref) => {
    const [expandedFlows, setExpandedFlows] = React.useState<Set<string>>(new Set());
    
    const toggleFlow = (flowId: string) => {
      setExpandedFlows(prev => {
        const next = new Set(prev);
        if (next.has(flowId)) {
          next.delete(flowId);
        } else {
          next.add(flowId);
        }
        return next;
      });
    };
    
    const getStatusIcon = (status: DataFlowStatus) => {
      switch (status) {
        case 'appropriate':
          return <CheckCircle className="h-4 w-4 text-green-600" />;
        case 'questionable':
          return <AlertCircle className="h-4 w-4 text-aegis-caution" />;
        case 'violation':
          return <AlertCircle className="h-4 w-4 text-red-600" />;
      }
    };
    
    const getStatusLabel = (status: DataFlowStatus) => {
      switch (status) {
        case 'appropriate':
          return 'Appropriate';
        case 'questionable':
          return 'Questionable';
        case 'violation':
          return 'Potential Violation';
      }
    };
    
    const getStatusColor = (status: DataFlowStatus) => {
      switch (status) {
        case 'appropriate':
          return 'bg-green-50 border-green-200';
        case 'questionable':
          return 'bg-yellow-50 border-aegis-caution/30';
        case 'violation':
          return 'bg-red-50 border-red-200';
      }
    };
    
    const appropriateFlows = dataFlows.filter(f => f.status === 'appropriate');
    const questionableFlows = dataFlows.filter(f => f.status === 'questionable');
    const violationFlows = dataFlows.filter(f => f.status === 'violation');
    
    return (
      <div
        ref={ref}
        className={clsx('res-contextual-integrity', className)}
        {...props}
      >
        {showHeader && (
          <div className="mb-4 p-4 bg-background border border-border rounded-lg">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-aegis-safety/10 p-2">
                <Shield className="h-5 w-5 text-aegis-safety" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-1">Contextual Integrity Monitor</h3>
                <p className="text-sm text-muted-foreground">
                  This tool analyzes how your data flows between different contexts to ensure 
                  information is shared appropriately based on social norms and expectations.
                </p>
                <div className="flex gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>{appropriateFlows.length} Appropriate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-aegis-caution" />
                    <span>{questionableFlows.length} Questionable</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span>{violationFlows.length} Violations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          {dataFlows.length === 0 ? (
            <div className="text-center py-8 border border-border rounded-lg">
              <Info className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No data flows detected on this page.
              </p>
            </div>
          ) : (
            dataFlows.map((flow) => (
              <div
                key={flow.id}
                className={clsx(
                  'border rounded-lg overflow-hidden transition-all',
                  getStatusColor(flow.status)
                )}
              >
                <button
                  onClick={() => toggleFlow(flow.id)}
                  className="w-full p-4 text-left hover:bg-black/5 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      {getStatusIcon(flow.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{flow.sender}</span>
                          <span className="text-muted-foreground">→</span>
                          <span className="font-medium text-sm">{flow.recipient}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {flow.dataType} • {flow.purpose}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-background border border-border">
                        {getStatusLabel(flow.status)}
                      </span>
                      {expandedFlows.has(flow.id) ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </button>
                
                {expandedFlows.has(flow.id) && (
                  <div className="px-4 pb-4 pt-2 border-t border-border/50 bg-background/50">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-medium text-muted-foreground mb-1">
                          Analysis
                        </h4>
                        <p className="text-sm">{flow.explanation}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-muted-foreground">Sender:</span>
                          <p className="font-medium">{flow.sender}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Recipient:</span>
                          <p className="font-medium">{flow.recipient}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Data Type:</span>
                          <p className="font-medium">{flow.dataType}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Purpose:</span>
                          <p className="font-medium">{flow.purpose}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        {flow.status !== 'appropriate' && (
                          <>
                            <button
                              onClick={() => onReviewFlow?.(flow.id)}
                              className="px-3 py-1.5 text-xs font-medium rounded-md bg-background border border-border hover:bg-muted transition-colors"
                            >
                              Review Settings
                            </button>
                            <button
                              onClick={() => onBlockFlow?.(flow.id)}
                              className="px-3 py-1.5 text-xs font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                            >
                              Block This Flow
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
);

ContextualIntegrity.displayName = 'ContextualIntegrity';
