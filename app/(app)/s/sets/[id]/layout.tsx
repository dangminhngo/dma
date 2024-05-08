import { notFound } from "next/navigation"

import Breadcrumb from "~/components/breadcrumb"
import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/server"

interface SetLayoutProps extends Readonly<React.PropsWithChildren> {
  params: { id: string }
}

export default async function SetLayout({ params, children }: SetLayoutProps) {
  const set = await api.set.byId({ id: +params.id })

  if (!set) return notFound()

  const links = [
    {
      label: "Home",
      href: "/s",
    },
    {
      label: "Courses",
      href: "/s/courses",
    },
    {
      label: set.course.name,
      href: `/s/courses/${set.courseId}`,
    },
    {
      label: "Sets",
      href: `/s/courses/${set.courseId}/sets`,
    },
    {
      label: set.title,
    },
  ]

  return (
    <div className="space-y-4">
      <Breadcrumb links={links} />
      <Heading as="h1">Set: {set.title}</Heading>
      <div>{children}</div>
    </div>
  )
}
