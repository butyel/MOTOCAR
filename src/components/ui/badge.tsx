import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider leading-none transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-motocar-red text-white',
        secondary: 'bg-motocar-off-white text-motocar-graphite',
        outline: 'border border-motocar-light-gray text-motocar-graphite',
        success: 'bg-motocar-green text-white',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
