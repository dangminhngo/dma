"use client"

import { useRouter } from "next/navigation"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/react"
import { type RouterOutput } from "~/trpc/types"

interface CourseSettingsDangerProps {
  course: RouterOutput["course"]["byId"]
}

export default function CourseSettingsDanger({
  course,
}: CourseSettingsDangerProps) {
  const router = useRouter()

  const utils = api.useUtils()
  const courseDeleter = api.course.delete.useMutation({
    async onSuccess(data) {
      await utils.course.list.invalidate()
      await utils.course.byId.invalidate({ id: data.id })
      router.push("/t/courses")
    },
    async onError(err) {
      console.error(err)
    },
  })

  function onCourseDelete() {
    if (!course) throw new Error("No course")
    courseDeleter.mutate({ id: course.id })
  }

  return (
    <div className="space-y-2 py-6">
      <Heading as="h3" className="text-destructive">
        Danger
      </Heading>
      <div className="flex items-center justify-between rounded-lg border border-destructive bg-destructive/15 p-4">
        <div>
          <div className="font-medium">Delete Course</div>
          <div className="text-muted-foreground">
            All data of the course will be lost and you cannot recover your
            data.
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Continue</Button>
          </AlertDialogTrigger>
          <AlertDialogPortal>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure to delete this course?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  All data of the course will be lost and cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={onCourseDelete}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogPortal>
        </AlertDialog>
      </div>
    </div>
  )
}
