import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-lg border border-[var(--border-color)] bg-[var(--surface-2)] px-4 py-2.5",
          "font-body text-sm text-foreground placeholder:text-[var(--kapix-ghost)]",
          "transition-colors focus:outline-none focus:border-[var(--kapix-emerald)] focus:ring-1 focus:ring-[var(--kapix-emerald)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
