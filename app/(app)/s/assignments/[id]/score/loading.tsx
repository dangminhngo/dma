import { Skeleton } from "~/components/ui/skeleton"

export default function AssignmentScoreLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[30px]" />
      <Skeleton className="h-[45px]" />
      <Skeleton className="h-[27px]" />
      <Skeleton className="h-[42px]" />
      <Skeleton className="h-[40px]" />
    </div> 
  )
}
