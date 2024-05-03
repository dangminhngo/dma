import Link from "next/link"

import { Heading } from "~/components/ui/heading"
import { type RouterOutput } from "~/trpc/types"

interface StudentCourseCardProps {
  course: RouterOutput["course"]["byId"]
}

export default function StudentCourseCard({ course }: StudentCourseCardProps) {
  return (
    <Link href={`/s/courses/${course?.id}`}>
      <div className="flex flex-col space-y-2 rounded-lg border p-4">
        <Heading as="h3">{course?.name}</Heading>
        <div className="text-muted-foreground">
          Teacher: {course?.teacher.name}
        </div>
      </div>
    </Link>
  )
}
