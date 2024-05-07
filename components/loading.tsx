import { Skeleton } from "~/components/ui/skeleton"

export default function Loading({
  onlyColumn = false,
}: {
  onlyColumn?: boolean
}) {
  return (
    <div className="flex flex-col items-stretch space-y-2 py-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-8 w-[68px]" />
      </div>
      {onlyColumn ? (
        <div className="flex flex-col items-stretch space-y-4">
          <Skeleton className="h-[94px]" />
          <Skeleton className="h-[94px]" />
          <Skeleton className="h-[94px]" />
          <Skeleton className="h-[94px]" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-[94px]" />
          <Skeleton className="h-[94px]" />
          <Skeleton className="h-[94px]" />
          <Skeleton className="h-[94px]" />
          <Skeleton className="h-[94px]" />
          <Skeleton className="h-[94px]" />
        </div>
      )}
    </div>
  )
}
