import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-motocar-red focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-transparent',
  {
    variants: {
      variant: {
        default: 'bg-motocar-red text-white hover:bg-motocar-red-dark active:bg-motocar-red-dark',
        destructive: 'bg-motocar-red text-white hover:bg-motocar-red-dark',
        outline: 'border-motocar-light-gray bg-white text-motocar-graphite hover:border-motocar-red hover:text-motocar-red',
        secondary: 'bg-motocar-green text-white hover:bg-motocar-green-light active:bg-motocar-green-light',
        ghost: 'text-motocar-graphite hover:bg-motocar-light-gray hover:text-motocar-red',
        link: 'text-motocar-red underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-1.5',
        sm: 'h-8 px-3 py-1 text-xs',
        lg: 'h-10 px-6 py-2 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
