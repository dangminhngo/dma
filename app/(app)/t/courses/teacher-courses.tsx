"use client"

import Breadcrumb from "~/components/breadcrumb"
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
import CourseCard from "./course-card"
import CourseForm from "./course-form"

interface TeacherCoursesProps {
  courses: RouterOutput["course"]["list"]
}

const links = [
  { label: "Home", href: "/t" },
  { label: "Courses", href: "/t/courses" },
]

export default function TeacherCourses({ courses }: TeacherCoursesProps) {
  return (
    <div className="space-y-4">
      <Breadcrumb links={links} />
      <div className="flex items-center justify-between">
        <Heading as="h1">Courses ({courses.length})</Heading>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-1 self-end" size="xs">
              <PlusIcon className="h-4 w-4" />
              <span>Add</span>
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
      <div className="grid grid-cols-2 gap-4">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  )
}
