import { Skeleton } from "~/components/ui/skeleton"

export default function AssignmentResultsLoading() {
  return (
    <div className="flex flex-col items-stretch space-y-4">
      <Skeleton className="h-[171px]" />
      <Skeleton className="h-[171px]" />
      <Skeleton className="h-[171px]" />
      <Skeleton className="h-[171px]" />
    </div>
  )
}
