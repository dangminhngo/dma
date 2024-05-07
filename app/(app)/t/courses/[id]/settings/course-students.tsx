"use client"

import { PlusIcon } from "~/components/icons"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/react"
import { type RouterOutput } from "~/trpc/types"
import AddStudentForm from "./add-student-form"
import StudentCard from "./student-card"

interface CourseStudentsProps {
  course: RouterOutput["course"]["byId"]
}

export default function CourseStudents({ course }: CourseStudentsProps) {
  const utils = api.useUtils()

  const listCourseStudentsQuery = api.user.listCourseStudents.useQuery({
    courseId: course?.id ?? 0,
  })

  const removeStudentMutation = api.course.removeStudent.useMutation({
    async onSuccess(data) {
      await utils.course.byId.invalidate({ id: data.id })
      await utils.user.listCourseStudents.invalidate({
        courseId: course?.id ?? 0,
      })
    },
    async onError(err) {
      console.error(err)
    },
  })

  function onStudentRemove(id: string) {
    if (!course) throw new Error("No course")
    removeStudentMutation.mutate({ courseId: course.id, studentId: id })
  }

  if (listCourseStudentsQuery.isLoading) return <div>Loading...</div>

  if (listCourseStudentsQuery.isError || !listCourseStudentsQuery.data)
    return <div>Error</div>

  return (
    <div className="flex flex-col items-stretch space-y-2 py-6">
      <div className="flex items-center justify-between">
        <Heading as="h3">Students</Heading>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="xs" className="space-x-1 self-end">
              <PlusIcon className="h-4 w-4" />
              <span>Add</span>
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Students</DialogTitle>
                <DialogDescription>
                  Add a student to the class.
                </DialogDescription>
              </DialogHeader>
              <AddStudentForm course={course} />
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {!!listCourseStudentsQuery.data.length &&
          listCourseStudentsQuery.data.map((st) => (
            <StudentCard
              key={st.id}
              user={st}
              onRemove={() => onStudentRemove(st.id)}
            />
          ))}
      </div>
    </div>
  )
}
