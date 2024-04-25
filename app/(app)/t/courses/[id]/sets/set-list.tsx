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
import SetCard from "./set-card"
import SetForm from "./set-form"

interface SetListProps {
  course: RouterOutput["course"]["byId"]
}

export default function SetList({ course }: SetListProps) {
  const utils = api.useUtils()

  const setDeleter = api.set.delete.useMutation({
    async onSuccess(data) {
      await utils.set.list.invalidate({ courseId: data.courseId })
    },
    async onError(err) {
      console.error(err)
    },
  })

  function onSetDelete(id: number) {
    setDeleter.mutate({ id })
  }

  const setListQuery = api.set.list.useQuery({ courseId: course?.id ?? 0 })

  if (!course) return null

  if (setListQuery.isLoading) return <div>Loading...</div>

  if (setListQuery.isError || !setListQuery.data)
    return <div>Cannot fetch sets</div>

  return (
    <div className="flex flex-col items-stretch space-y-2 py-8">
      <div className="flex items-center justify-between">
        <Heading as="h3">Sets ({setListQuery.data.length ?? 0})</Heading>
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
                <DialogTitle>Create a set</DialogTitle>
                <DialogDescription>
                  Add a new set to the course
                </DialogDescription>
              </DialogHeader>
              <SetForm courseId={course.id} />
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {setListQuery.data.map((s) => (
          <SetCard key={s.id} set={s} onDelete={() => onSetDelete(s.id)} />
        ))}
      </div>
    </div>
  )
}
