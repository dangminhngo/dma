import { type RouterOutput } from "~/trpc/types"
import { type InferElement } from "~/types"
import CourseCard from "./course-card"

type Course = InferElement<RouterOutput["course"]["list"]>

interface CourseListProps {
  courses: Course[]
}

export default function CourseList({ courses }: CourseListProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {courses.map((c) => (
        <CourseCard key={c.id} course={c} />
      ))}
    </div>
  )
}
