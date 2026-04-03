"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-display font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kapix-emerald)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--kapix-emerald)] text-[var(--kapix-navy)] hover:shadow-[0_4px_36px_rgba(0,212,170,0.35)] hover:-translate-y-0.5",
        ghost:
          "bg-transparent text-[var(--kapix-silver)] border border-[var(--border-color)] hover:border-[var(--kapix-mist)] hover:text-foreground hover:bg-foreground/[0.03]",
        outline:
          "bg-transparent border border-[var(--border-color)] text-foreground hover:bg-surface-2",
        link: "text-[#00D4AA] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-xs rounded-md",
        md: "h-11 px-6 text-sm rounded-lg",
        lg: "h-13 px-10 text-base rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
