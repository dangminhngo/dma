import { notFound } from "next/navigation"

import Breadcrumb from "~/components/breadcrumb"
import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/server"
import SetCarousel from "./set-carousel"

export default async function SetPage({ params }: { params: { id: string } }) {
  const set = await api.set.byId({ id: +params.id })

  if (!set) return notFound()

  const words = await api.word.list({ setId: set.id })

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
      <SetCarousel words={words} />
    </div>
  )
}
