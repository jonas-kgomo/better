import * as React from 'react';
import clsx from 'clsx';
import { Split, Check } from 'lucide-react';

interface ABTestDisclosureProps extends React.HTMLAttributes<HTMLDivElement> {
  testName: string;
  variantA: string;
  variantB: string;
  description?: string;
  onChoose?: (variant: 'A' | 'B') => void;
}

export const ABTestDisclosure = React.forwardRef<HTMLDivElement, ABTestDisclosureProps>(
  ({ className, testName, variantA, variantB, description, onChoose, ...props }, ref) => {
    const [selected, setSelected] = React.useState<'A' | 'B' | null>(null);

    const handleSelect = (variant: 'A' | 'B') => {
      setSelected(variant);
      onChoose?.(variant);
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'res-ab-test-disclosure',
          'p-4 rounded-md border border-border bg-surface/30',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-full bg-primary/10 p-2 shrink-0">
            <Split className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-sm">A/B Test: {testName}</h4>
            {description && (
              <p className="text-xs opacity-70">{description}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <button
            onClick={() => handleSelect('A')}
            className={clsx(
              'flex flex-col items-center p-3 rounded-md border',
              selected === 'A' ? 'bg-primary/10 border-primary' : 'bg-background hover:bg-surface-hover',
              'transition-colors'
            )}
          >
            <span className="font-medium text-sm mb-1">{variantA}</span>
            {selected === 'A' && <Check className="h-4 w-4 text-primary" />}
          </button>
          <button
            onClick={() => handleSelect('B')}
            className={clsx(
              'flex flex-col items-center p-3 rounded-md border',
              selected === 'B' ? 'bg-primary/10 border-primary' : 'bg-background hover:bg-surface-hover',
              'transition-colors'
            )}
          >
            <span className="font-medium text-sm mb-1">{variantB}</span>
            {selected === 'B' && <Check className="h-4 w-4 text-primary" />}
          </button>
        </div>
        {selected && (
          <p className="mt-3 text-xs opacity-70">
            You are currently seeing <strong>{selected === 'A' ? variantA : variantB}</strong>.
          </p>
        )}
      </div>
    );
  }
);

ABTestDisclosure.displayName = 'ABTestDisclosure';
