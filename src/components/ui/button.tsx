import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // default: "bg-primary text-primary-foreground hover:bg-primary/90",
        default: "bg-gradient-to-b from-[#049DC8] to-[#0082B5] text-white shadow-[0px_2px_6px_rgba(8,140,193,0.32)] hover:shadow-[0px_4px_12px_rgba(8,140,193,0.4)] hover:from-[#049DC8]/90 hover:to-[#0082B5]/90 active:scale-95",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "bg-white border border-[#026993] shadow-[0px_1px_2px_#B0D0FD] text-[#026993] hover:bg-[#026993]/5 hover:shadow-[0px_2px_4px_#B0D0FD] active:scale-95",
        subtle:
          "bg-white border border-[#DAE6E7] shadow-[0px_2px_2px_rgba(8,140,193,0.03)] text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-[0px_4px_4px_rgba(8,140,193,0.06)] active:scale-95",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-lg px-6 has-[>svg]:px-4",
        "outline-lg": "h-9 px-5 py-2 gap-2 flex-none",
        "subtle-lg": "h-9 px-5 py-2 gap-2 flex-none",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    compoundVariants: [
      // Subtle variant with different size adjustments
      {
        variant: "subtle",
        size: "sm",
        class: "text-xs border-[1px] border-[#EDF3F3] shadow-[0px_2px_6px_rgba(8,140,193,0.08)] hover:shadow-[0px_2px_2px_rgba(8,140,193,0.04)]",
      },
      {
        variant: "subtle",
        size: "lg",
        class: "text-base border-[1.5px] shadow-[0px_3px_3px_rgba(8,140,193,0.04)] hover:shadow-[0px_6px_6px_rgba(8,140,193,0.08)]",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

function Button({
  className,
  variant = "default",
  size,
  asChild = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  // const LoadingSpinner = () => (
  //   <svg
  //     className="animate-spin size-4"
  //     xmlns="http://www.w3.org/2000/svg"
  //     fill="none"
  //     viewBox="0 0 24 24"
  //   >
  //     <circle
  //       className="opacity-25"
  //       cx="12"
  //       cy="12"
  //       r="10"
  //       stroke="currentColor"
  //       strokeWidth="4"
  //     />
  //     <path
  //       className="opacity-75"
  //       fill="currentColor"
  //       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  //     />
  //   </svg>
  // )

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <Spinner className={cn("", {
            "text-white": variant === "default",
            "text-white ": variant === "destructive",
            "text-[#026993]": variant === "outline",
            "text-gray-700": variant === "subtle",
          })} />
          {children && <span>Loading...</span>}
        </>
      )
    }

    if (icon && iconPosition === "left") {
      return (
        <>
          {icon}
          {children}
        </>
      )
    }

    if (icon && iconPosition === "right") {
      return (
        <>
          {children}
          {icon}
        </>
      )
    }

    return children
  }

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }),
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </Comp>
  )
}

export { Button, buttonVariants }
