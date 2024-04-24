"use client"

import { usePathname } from "next/navigation"

import {
  LinkTabs,
  LinkTabsContent,
  LinkTabsList,
  LinkTabsTrigger,
} from "~/components/ui/link-tabs"

interface TeacherCourseTabsProps extends React.PropsWithChildren {
  id: string
}

export default function TeacherCourseTabs({
  id,
  children,
}: TeacherCourseTabsProps) {
  const pathname = usePathname()

  return (
    <LinkTabs>
      <LinkTabsList>
        <LinkTabsTrigger
          href={`/t/courses/${id}/sets`}
          active={pathname?.startsWith(`/t/courses/${id}/sets`)}
        >
          Sets
        </LinkTabsTrigger>
        <LinkTabsTrigger
          href={`/t/courses/${id}/assignments`}
          active={pathname?.startsWith(`/t/courses/${id}/assignments`)}
        >
          Assignments
        </LinkTabsTrigger>
        <LinkTabsTrigger
          href={`/t/courses/${id}/settings`}
          active={pathname?.startsWith(`/t/courses/${id}/settings`)}
        >
          Settings
        </LinkTabsTrigger>
      </LinkTabsList>
      <LinkTabsContent>{children}</LinkTabsContent>
    </LinkTabs>
  )
}
