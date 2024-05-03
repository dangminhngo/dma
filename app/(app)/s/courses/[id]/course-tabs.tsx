"use client"

import { usePathname } from "next/navigation"

import {
  LinkTabs,
  LinkTabsContent,
  LinkTabsList,
  LinkTabsTrigger,
} from "~/components/ui/link-tabs"

interface CourseTabsProps extends React.PropsWithChildren {
  id: string
}

export default function CourseTabs({ id, children }: CourseTabsProps) {
  const pathname = usePathname()

  return (
    <LinkTabs>
      <LinkTabsList>
        <LinkTabsTrigger
          href={`/s/courses/${id}/sets`}
          active={pathname?.startsWith(`/s/courses/${id}/sets`)}
        >
          Sets
        </LinkTabsTrigger>
        <LinkTabsTrigger
          href={`/s/courses/${id}/assignments`}
          active={pathname?.startsWith(`/s/courses/${id}/assignments`)}
        >
          Assignments
        </LinkTabsTrigger>
        <LinkTabsTrigger
          href={`/s/courses/${id}/announcements`}
          active={pathname?.startsWith(`/s/courses/${id}/announcements`)}
        >
          Announcements
        </LinkTabsTrigger>
      </LinkTabsList>
      <LinkTabsContent>{children}</LinkTabsContent>
    </LinkTabs>
  )
}
