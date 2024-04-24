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

  const removeStudentMutation = api.course.removeStudent.useMutation({
    async onSuccess(data) {
      await utils.course.byId.invalidate({ id: data.id })
    },
    async onError(err) {
      console.error(err)
    },
  })

  function onStudentRemove(id: string) {
    if (!course) throw new Error("No course")
    removeStudentMutation.mutate({ courseId: course.id, studentId: id })
  }

  return (
    <div className="flex flex-col items-stretch space-y-2 py-6">
      <Heading as="h3">Students</Heading>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="space-x-2 self-end">
            <PlusIcon className="h-4 w-4" />
            <span>Add a student</span>
          </Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Students</DialogTitle>
              <DialogDescription>Add a student to the class.</DialogDescription>
            </DialogHeader>
            <AddStudentForm course={course} />
          </DialogContent>
        </DialogPortal>
      </Dialog>
      <div className="grid grid-cols-2 gap-4">
        {!!course?.students.length &&
          course?.students.map((st) => (
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
