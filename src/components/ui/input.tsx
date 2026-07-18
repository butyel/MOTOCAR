import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full border border-motocar-light-gray bg-white px-3 py-1.5 text-sm text-motocar-graphite file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-motocar-gray focus:outline-none focus:border-motocar-red transition-colors disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
