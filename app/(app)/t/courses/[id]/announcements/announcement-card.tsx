import { Announcement, AnnouncementLevel } from "@prisma/client"
import { format } from "date-fns"

import { DeleteIcon, EditIcon } from "~/components/icons"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { cn } from "~/lib/utils"
import { type RouterOutput } from "~/trpc/types"
import { type InferElement } from "~/types"
import AnnouncementForm from "./announcement-form"

interface AnnouncementCardProps {
  announcement: InferElement<RouterOutput["announcement"]["list"]>
  onDelete: () => void
}

export default function AnnouncementCard({
  announcement,
  onDelete,
}: AnnouncementCardProps) {
  return (
    <div className="group flex items-center justify-between rounded-lg border border-l-8 px-6 py-3 shadow">
      <div className="space-y-1">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-muted-foreground">
            {format(announcement.createdAt, "dd/MM/yyyy - kk:mm:ss")}
          </span>
          <span>|</span>
          <span
            className={cn(
              "font-medium",
              getClassNamesByLevel(announcement.level)
            )}
          >
            {announcement.level}
          </span>
        </div>
        <div>{announcement.text}</div>
      </div>
      <div className="pointer-events-none flex items-center space-x-2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon-sm" variant="ghost">
              <EditIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update an announcement</DialogTitle>
                <DialogDescription>
                  Change an announcement in the course
                </DialogDescription>
              </DialogHeader>
              <AnnouncementForm
                courseId={announcement.courseId}
                announcement={announcement}
                editing
              />
            </DialogContent>
          </DialogPortal>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon-sm">
              <DeleteIcon className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogPortal>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove all data of the announcement from the course
                  and cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>
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

function getClassNamesByLevel(level: AnnouncementLevel) {
  switch (level) {
    case AnnouncementLevel.NORMAL:
      return "text-muted-foreground"
    case AnnouncementLevel.IMPORTANT:
      return "text-destructive"
  }
}
