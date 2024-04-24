"use client"

import { PlusIcon } from "~/components/icons"
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
    <div className="space-y-2">
      <Heading as="h3">Students</Heading>
      <div className="grid grid-cols-2 gap-4">
        {!!course?.students.length &&
          course?.students.map((st) => (
            <StudentCard
              key={st.id}
              user={st}
              onRemove={() => onStudentRemove(st.id)}
            />
          ))}
        <Dialog>
          <DialogTrigger asChild>
            <div className="grid min-h-[74px] cursor-pointer place-items-center rounded-lg bg-muted text-muted-foreground">
              <PlusIcon className="h-8 w-8" />
            </div>
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
    </div>
  )
}
