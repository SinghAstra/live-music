import { cn } from "@/lib/utils";
import * as React from "react";

export interface HoverEdgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  side?: "top" | "bottom" | "left" | "right";
  origin?: "start" | "end";
  thickness?: number | string;
  color?: string;
  duration?: number;
  active?: boolean;
}

const positionClasses = {
  top: "top-0 left-0 right-0",
  bottom: "bottom-0 left-0 right-0",
  left: "left-0 top-0 bottom-0",
  right: "right-0 top-0 bottom-0",
};

const HoverEdge = React.forwardRef<HTMLSpanElement, HoverEdgeProps>(
  (
    {
      className,
      children,
      side = "bottom",
      origin = "start",
      thickness = 1,
      color = "var(--primary)",
      duration = 300,
      active = false,
      ...props
    },
    ref,
  ) => {
    const isHorizontal = side === "top" || side === "bottom";

    const getAnimationClasses = () => {
      if (isHorizontal) {
        if (origin === "start") {
          return active
            ? "scale-x-100 origin-left"
            : "scale-x-0 origin-right group-hover/underline:scale-x-100 group-hover/underline:origin-left group-focus-within/underline:scale-x-100 group-focus-within/underline:origin-left";
        } else {
          return active
            ? "scale-x-100 origin-right"
            : "scale-x-0 origin-left group-hover/underline:scale-x-100 group-hover/underline:origin-right group-focus-within/underline:scale-x-100 group-focus-within/underline:origin-right";
        }
      } else {
        if (origin === "start") {
          return active
            ? "scale-y-100 origin-top"
            : "scale-y-0 origin-bottom group-hover/underline:scale-y-100 group-hover/underline:origin-top group-focus-within/underline:scale-y-100 group-focus-within/underline:origin-top";
        } else {
          return active
            ? "scale-y-100 origin-bottom"
            : "scale-y-0 origin-top group-hover/underline:scale-y-100 group-hover/underline:origin-bottom group-focus-within/underline:scale-y-100 group-focus-within/underline:origin-bottom";
        }
      }
    };

    return (
      <span
        ref={ref}
        className={cn("relative inline-flex group/underline cursor-pointer", className)}
        {...props}
      >
        {children}
        <span
          className={cn(
            "absolute pointer-events-none transition-transform motion-reduce:transition-none",
            positionClasses[side],
            getAnimationClasses(),
          )}
          style={{
            backgroundColor: color,
            transitionDuration: `${duration}ms`,
            ...(isHorizontal ? { height: thickness } : { width: thickness }),
          }}
          aria-hidden="true"
        />
      </span>
    );
  },
);

HoverEdge.displayName = "HoverEdge";

export { HoverEdge };
