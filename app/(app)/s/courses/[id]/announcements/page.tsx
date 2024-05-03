import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/server"
import AnnouncementCard from "./announcement-card"

export default async function CourseAnnouncementsPage({
  params,
}: {
  params: { id: string }
}) {
  const announcements = await api.announcement.list({ courseId: +params.id })

  return (
    <div className="space-y-2 py-8">
      <Heading as="h3">Announcements ({announcements.length ?? 0})</Heading>
      <div className="grid grid-cols-1 gap-2">
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </div>
  )
}
