import { AnnouncementLevel } from "@prisma/client"

import { cn, formatDateTime } from "~/lib/utils"
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
