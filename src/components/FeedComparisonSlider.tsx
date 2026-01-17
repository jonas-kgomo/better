import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeedComparisonSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  initialPosition?: number;
}

export const FeedComparisonSlider = ({
  className,
  leftContent,
  rightContent,
  initialPosition = 50,
  ...props
}: FeedComparisonSliderProps) => {
  const [sliderPosition, setSliderPosition] = React.useState(initialPosition);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let newPosition = (x / rect.width) * 100;
    newPosition = Math.max(0, Math.min(100, newPosition));
    setSliderPosition(newPosition);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };
  
  const handleInteractionStart = () => setIsDragging(true);
  const handleInteractionEnd = () => setIsDragging(false);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("mouseup", handleInteractionEnd);
      document.addEventListener("touchend", handleInteractionEnd);
      document.body.style.cursor = 'ew-resize';
    } else {
      document.body.style.cursor = '';
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleInteractionEnd);
      document.removeEventListener("touchend", handleInteractionEnd);
      document.body.style.cursor = '';
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-[800px] overflow-hidden select-none group border rounded-2xl bg-background shadow-2xl",
        className
      )}
      onMouseDown={handleInteractionStart}
      onTouchStart={handleInteractionStart}
      {...props}
    >
      {/* Left Content (Absent) - Base Layer */}
      <div className="absolute inset-0 w-full h-full overflow-y-auto bg-slate-50 dark:bg-slate-950">
        {leftContent}
      </div>
      
      {/* Right Content (Better) - Top Layer (Clipped from right) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10"
        style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
      >
        <div className="w-full h-full overflow-y-auto bg-background pointer-events-auto">
          {rightContent}
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 h-full w-1 cursor-ew-resize z-20"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute inset-y-0 w-1 bg-primary/50 backdrop-blur-sm"></div>
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl",
            "transition-transform duration-300",
            isDragging && "scale-110"
          )}
        >
          <div className="flex items-center">
            <ChevronLeft className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-30 pointer-events-none">
        <div className="bg-slate-800/90 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
          Resonant A (Absent)
        </div>
      </div>
      <div className="absolute top-4 right-4 z-30 pointer-events-none">
        <div className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
          Resonant B (Better)
        </div>
      </div>
    </div>
  );
};
