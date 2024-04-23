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
import { type RouterOutput } from "~/trpc/types"
import CourseForm from "./course-form"
import CourseList from "./course-list"

interface TeacherCoursesProps {
  courses: RouterOutput["course"]["list"]
}

export default function TeacherCourses({ courses }: TeacherCoursesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading as="h1">Courses ({courses.length})</Heading>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="icon-sm">
              <PlusIcon className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create course</DialogTitle>
                <DialogDescription>
                  Type the name of the course that you want to create.
                </DialogDescription>
              </DialogHeader>
              <CourseForm />
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
      <CourseList courses={courses} />
    </div>
  )
}
