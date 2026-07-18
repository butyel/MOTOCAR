import { Skeleton } from '@/components/ui/skeleton'

export function ProductCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <Skeleton className="aspect-square w-full mb-3" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2 mb-3" />
      <Skeleton className="h-5 w-1/3 mb-1" />
      <Skeleton className="h-4 w-1/4 mb-3" />
      <Skeleton className="h-9 w-full" />
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <Skeleton className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg" />
  )
}

export function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <Skeleton className="h-16 w-16 rounded-full" />
      <Skeleton className="h-4 w-20" />
    </div>
  )
}
