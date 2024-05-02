import { type RouterOutput } from "~/trpc/types"
import QuestionList from "./question-list"

interface TeacherAssignmentProps {
  assignment: RouterOutput["assignment"]["byId"]
}

export default function TeacherAssignment({
  assignment,
}: TeacherAssignmentProps) {
  return <QuestionList assignment={assignment} />
}
