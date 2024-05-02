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
import AssignmentCard from "./assignment-card"
import AssignmentForm from "./assignment-form"

interface AssignmentListProps {
  course: RouterOutput["course"]["byId"]
}

export default function AssignmentList({ course }: AssignmentListProps) {
  const utils = api.useUtils()

  const assignmentDeleter = api.assignment.delete.useMutation({
    async onSuccess(data) {
      await utils.assignment.list.invalidate({ courseId: data.courseId })
    },
    async onError(err) {
      console.error(err)
    },
  })

  function onAssignmentDelete(id: number) {
    assignmentDeleter.mutate({ id })
  }

  const assignmentListQuery = api.assignment.list.useQuery({
    courseId: course?.id ?? 0,
  })

  if (!course) return null

  if (assignmentListQuery.isLoading) return <div>Loading...</div>

  if (assignmentListQuery.isError || !assignmentListQuery.data)
    return <div>Cannot fetch assignments</div>

  return (
    <div className="flex flex-col items-stretch space-y-2 py-8">
      <div className="flex items-center justify-between">
        <Heading as="h3">
          Assignments ({assignmentListQuery.data.length ?? 0})
        </Heading>
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
                <DialogTitle>Create a assignment</DialogTitle>
                <DialogDescription>
                  Add a new assignment to the course
                </DialogDescription>
              </DialogHeader>
              <AssignmentForm courseId={course.id} />
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {assignmentListQuery.data.map((s) => (
          <AssignmentCard
            key={s.id}
            assignment={s}
            onDelete={() => onAssignmentDelete(s.id)}
          />
        ))}
      </div>
    </div>
  )
}
