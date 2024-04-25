import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/server"

interface TeacherSetLayoutProps extends Readonly<React.PropsWithChildren> {
  params: { id: string }
}
export default async function TeacherSetLayout({
  children,
  params,
}: TeacherSetLayoutProps) {
  const set = await api.set.byId({ id: +params.id })

  return (
    <div className="space-y-4">
      <Heading as="h1">Set: {set?.title}</Heading>
      <div className="text-muted-foreground">{set?.description}</div>
      <div>{children}</div>
    </div>
  )
}
