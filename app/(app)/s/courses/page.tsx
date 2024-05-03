import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/server"
import CourseCard from "./course-card"

export default async function StudentCourses() {
  const courses = await api.course.list()

  return (
    <div className="space-y-4">
      <Heading as="h1">Courses ({courses.length})</Heading>
      <div className="grid grid-cols-2 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
