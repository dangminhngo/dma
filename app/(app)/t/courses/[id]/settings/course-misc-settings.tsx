"use client"

import { EditIcon } from "~/components/icons"
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
import CourseForm from "../../course-form"

interface CourseMiscSettingsProps {
  course: RouterOutput["course"]["byId"]
}

export default function CourseMiscSettings({
  course,
}: CourseMiscSettingsProps) {
  return (
    <div className="space-y-2 py-6">
      <Heading as="h3">Miscs</Heading>
      <div className="flex items-center space-x-2">
        <span className="font-medium">Name:</span>
        <span>{course?.name}</span>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <EditIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit course</DialogTitle>
                <DialogDescription>
                  Change course name and other information.
                </DialogDescription>
              </DialogHeader>
              <CourseForm course={course} editing />
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </div>
  )
}
