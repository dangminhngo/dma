import Link from "next/link"

import { Heading } from "~/components/ui/heading"
import { type RouterOutput } from "~/trpc/types"
import { type InferElement } from "~/types"

type Course = InferElement<RouterOutput["course"]["list"]>

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/t/courses/${course.id}`}>
      <div className="rounded-lg border p-4">
        <Heading as="h3">{course.name}</Heading>
      </div>
    </Link>
  )
}
