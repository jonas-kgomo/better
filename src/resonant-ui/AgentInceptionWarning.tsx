import * as React from 'react';
import clsx from 'clsx';
import { Zap, Pause, Settings } from 'lucide-react';

export interface AgentLoop {
  depth: number;
  iterations: number;
  autonomyLevel: 'supervised' | 'semi-autonomous' | 'autonomous';
}

interface AgentInceptionWarningProps extends React.HTMLAttributes<HTMLDivElement> {
  agentName: string;
  currentLoop: AgentLoop;
  maxDepth?: number;
  onPauseAgent?: () => void;
  onConfigureHarness?: () => void;
}

export const AgentInceptionWarning = React.forwardRef<HTMLDivElement, AgentInceptionWarningProps>(
  ({ className, agentName, currentLoop, maxDepth = 5, onPauseAgent, onConfigureHarness, ...props }, ref) => {
    const isDeep = currentLoop.depth >= maxDepth * 0.7;
    const isCritical = currentLoop.depth >= maxDepth;
    const severity = isCritical ? 'critical' : isDeep ? 'warning' : 'info';
    const config = {
      info: { bg: 'bg-primary/10', border: 'border-primary/30', icon: 'text-primary', iconBg: 'bg-primary/20' },
      warning: { bg: 'bg-caution/10', border: 'border-caution/30', icon: 'text-caution', iconBg: 'bg-caution/20' },
      critical: { bg: 'bg-alert/10', border: 'border-alert/30', icon: 'text-alert', iconBg: 'bg-alert/20' }
    }[severity];

    return (
      <div
        ref={ref}
        className={clsx('res-agent-inception-warning', 'rounded-md border p-4', config.bg, config.border, className)}
        {...props}
      >
        <div className="flex items-start gap-3 mb-2">
          <div className={clsx('rounded-full p-2 shrink-0', config.iconBg)}>
            <Zap className={clsx('h-5 w-5', config.icon)} />
          </div>
          <div>
            <h4 className="font-medium text-sm">Agent Inception Warning: {agentName}</h4>
            {isCritical && (
              <p className={clsx('text-xs', config.icon)}>
                Maximum recursion depth reached. The agent has been paused for safety.
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="p-2 rounded-md bg-background/50">
            <div className="text-xs opacity-60 mb-1">Depth</div>
            <div className={clsx('text-lg font-medium', config.icon)}>{currentLoop.depth}/{maxDepth}</div>
          </div>
          <div className="p-2 rounded-md bg-background/50">
            <div className="text-xs opacity-60 mb-1">Iterations</div>
            <div className="text-lg font-medium">{currentLoop.iterations}</div>
          </div>
          <div className="p-2 rounded-md bg-background/50">
            <div className="text-xs opacity-60 mb-1">Autonomy</div>
            <div className="text-xs font-medium capitalize">{currentLoop.autonomyLevel}</div>
          </div>
        </div>
        <div className="flex gap-2">
          {onPauseAgent && (
            <button
              onClick={onPauseAgent}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-md bg-background border border-border hover:bg-surface-hover transition-colors"
            >
              <Pause className="h-3 w-3" />
              Pause Agent
            </button>
          )}
          {onConfigureHarness && (
            <button
              onClick={onConfigureHarness}
              className={clsx('flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-md', isCritical ? 'bg-alert text-primary-foreground hover:bg-alert/90' : 'bg-primary text-primary-foreground hover:bg-primary/90')}
            >
              <Settings className="h-3 w-3" />
              Configure Harness
            </button>
          )}
        </div>
      </div>
    );
  }
);

AgentInceptionWarning.displayName = 'AgentInceptionWarning';
