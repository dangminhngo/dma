import { AnnouncementLevel } from "@prisma/client"

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
import { cn, formatDateTime } from "~/lib/utils"
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
    <div className="group flex items-center justify-between rounded-lg border px-6 py-3">
      <div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span
            className={cn(
              "block h-2 w-2 rounded-full",
              getIndicatorColorByLevel(announcement.level)
            )}
          >
            &nbsp;
          </span>
          <span>{announcement.level}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {formatDateTime(announcement.createdAt)}
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

function getIndicatorColorByLevel(level: AnnouncementLevel) {
  switch (level) {
    case AnnouncementLevel.NORMAL:
      return "bg-foreground"
    case AnnouncementLevel.IMPORTANT:
      return "bg-destructive"
  }
}
