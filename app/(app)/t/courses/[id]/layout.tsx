import TeacherCourseTabs from "./course-tabs"

interface TeacherCourseLayoutProps extends Readonly<React.PropsWithChildren> {
  params: { id: string }
}

export default function TeacherCourseLayout({
  children,
  params,
}: TeacherCourseLayoutProps) {
  return (
    <div>
      <TeacherCourseTabs id={params.id}>{children}</TeacherCourseTabs>
    </div>
  )
}
