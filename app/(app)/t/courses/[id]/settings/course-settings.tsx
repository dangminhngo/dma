"use client"

import { type RouterOutput } from "~/trpc/types"
import CourseMiscSettings from "./course-misc-settings"
import CourseSettingsDanger from "./course-settings-danger"
import CourseStudents from "./course-students"

interface CourseSettingsProps {
  course: RouterOutput["course"]["byId"]
}

export default function CourseSettings({ course }: CourseSettingsProps) {
  return (
    <div className="space-y-8">
      <CourseStudents course={course} />
      <CourseMiscSettings course={course} />
      <CourseSettingsDanger course={course} />
    </div>
  )
}
