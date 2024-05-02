import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/server"

interface TeacherAssignmentLayoutProps
  extends Readonly<React.PropsWithChildren> {
  params: { id: string }
}
export default async function TeacherAssignmentLayout({
  children,
  params,
}: TeacherAssignmentLayoutProps) {
  const assignment = await api.assignment.byId({ id: +params.id })

  return (
    <div className="space-y-4">
      <Heading as="h1">Assignment: {assignment?.title}</Heading>
      <div className="text-muted-foreground">{assignment?.description}</div>
      <div>{children}</div>
    </div>
  )
}
