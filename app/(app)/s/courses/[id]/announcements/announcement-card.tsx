import { AnnouncementLevel } from "@prisma/client"
import { format } from "date-fns"

import { cn } from "~/lib/utils"
import { type RouterOutput } from "~/trpc/types"
import { type InferElement } from "~/types"

interface AnnouncementCardProps {
  announcement: InferElement<RouterOutput["announcement"]["list"]>
}

export default function AnnouncementCard({
  announcement,
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
