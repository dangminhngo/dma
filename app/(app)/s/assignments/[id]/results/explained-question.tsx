import { cn } from "~/lib/utils"
import { type RouterOutput } from "~/trpc/types"
import { type InferElement } from "~/types"

interface ExplainedQuestionProps {
  index: number
  question: InferElement<RouterOutput["question"]["list"]>
  studentAnswer?: InferElement<
    RouterOutput["studentAnswer"]["listByAssignment"]
  >
}

export default function ExplainedQuestion({
  index,
  question,
  studentAnswer,
}: ExplainedQuestionProps) {
  const yourAnswer = question.answers.find(
    (a) => a.id === studentAnswer?.answerId
  )

  return (
    <div className="flex flex-col items-stretch space-y-2 rounded-lg border p-4">
      <div>
        <strong>Question {index}</strong>. {question.text}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {question.answers.map((a) => (
          <HighlightableAnswer key={a.id} answer={a} />
        ))}
      </div>
      <div>
        Your answer is:{" "}
        <span
          className={cn(
            "font-medium",
            yourAnswer?.right ? "text-green-500" : "text-red-500"
          )}
        >
          {yourAnswer?.text}
        </span>
      </div>
      <div className="text-muted-foreground">
        <strong className="font-medium">Explanation</strong>:{" "}
        {question.explanation}
      </div>
    </div>
  )
}

interface HighlightableAnswerProps {
  answer: InferElement<ExplainedQuestionProps["question"]["answers"]>
}

function HighlightableAnswer({ answer }: HighlightableAnswerProps) {
  return (
    <div className="flex items-center space-x-2">
      <div
        className={cn(
          "h-4 w-4 rounded-full border border-muted-foreground",
          answer.right ? "border-green-600 bg-green-300" : ""
        )}
      >
        &nbsp;
      </div>
      <div>{answer.text}</div>
    </div>
  )
}
