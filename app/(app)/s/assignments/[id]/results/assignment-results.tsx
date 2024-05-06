import { Heading } from "~/components/ui/heading"
import { type RouterOutput } from "~/trpc/types"
import ExplainedQuestion from "./explained-question"

interface AssignmentResultsProps {
  assignment: RouterOutput["assignment"]["byId"]
  questions: RouterOutput["question"]["list"]
  studentAnswers: RouterOutput["studentAnswer"]["listByAssignment"]
}

export default function AssignmentResults({
  assignment,
  questions,
  studentAnswers,
}: AssignmentResultsProps) {
  return (
    <div className="space-y-4">
      <Heading as="h1">Assignment Results: {assignment?.title}</Heading>
      <div className="space-y-4">
        {questions.map((q, _index) => (
          <ExplainedQuestion
            key={q.id}
            index={_index + 1}
            question={q}
            studentAnswer={studentAnswers.find((sa) => sa.questionId === q.id)}
          />
        ))}
      </div>
    </div>
  )
}
