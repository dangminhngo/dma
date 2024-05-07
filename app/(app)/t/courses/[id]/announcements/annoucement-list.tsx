"use client"

import { PlusIcon } from "~/components/icons"
import Loading from "~/components/loading"
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
import AnnouncementCard from "./announcement-card"
import AnnouncementForm from "./announcement-form"

interface AnnouncementListProps {
  course: RouterOutput["course"]["byId"]
}

export default function AnnouncementList({ course }: AnnouncementListProps) {
  const utils = api.useUtils()

  const announcementListQuery = api.announcement.list.useQuery({
    courseId: course?.id ?? 0,
  })

  const announcementDeleter = api.announcement.delete.useMutation({
    async onSuccess(data) {
      await utils.announcement.list.invalidate({ courseId: data.courseId })
      await utils.announcement.byId.invalidate({ id: data.courseId })
    },
    async onError(err) {
      console.error(err)
    },
  })

  function onAnnouncementDelete(id: number) {
    announcementDeleter.mutate({ id })
  }

  if (!course) return null

  if (announcementListQuery.isLoading) return <Loading onlyColumn />

  if (announcementListQuery.isError || !announcementListQuery.data)
    return <div>Cannot fetch announcements</div>

  return (
    <div className="flex flex-col items-stretch space-y-2 py-4">
      <div className="flex items-center justify-between">
        <Heading as="h3">
          Announcements ({announcementListQuery.data?.length ?? 0})
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
                <DialogTitle>Create an announcement</DialogTitle>
                <DialogDescription>
                  Add a new announcement to the course
                </DialogDescription>
              </DialogHeader>
              <AnnouncementForm courseId={course.id} />
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
      <div className="flex flex-col items-stretch space-y-2">
        {announcementListQuery.data?.map((a) => (
          <AnnouncementCard
            key={a.id}
            announcement={a}
            onDelete={() => onAnnouncementDelete(a.id)}
          />
        ))}
      </div>
    </div>
  )
}
