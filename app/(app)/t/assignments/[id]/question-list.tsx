"use client"

import { PlusIcon } from "~/components/icons"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/react"
import { type RouterOutput } from "~/trpc/types"
import AssigmentImport from "./assignment-import"
import CreateQuestionForm from "./create-question-form"
import QuestionCard from "./question-card"

interface QuestionListProps {
  assignment: RouterOutput["assignment"]["byId"]
}

export default function QuestionList({ assignment }: QuestionListProps) {
  const utils = api.useUtils()

  const questionDeleter = api.question.delete.useMutation({
    async onSuccess(data) {
      await utils.question.list.invalidate({ assignmentId: data.assignmentId })
    },
    async onError(err) {
      console.error(err)
    },
  })

  function onQuestionDelete(id: number) {
    questionDeleter.mutate({ id })
  }

  const questionListQuery = api.question.list.useQuery({
    assignmentId: assignment?.id ?? 0,
  })

  if (!assignment) return null

  if (questionListQuery.isLoading) return <div>Loading...</div>

  if (questionListQuery.isError || !questionListQuery.data)
    return <div>Cannot fetch questions</div>

  return (
    <div className="flex flex-col items-stretch space-y-2">
      <div className="flex items-center justify-between">
        <Heading as="h3">
          Questions ({questionListQuery.data.length ?? 0})
        </Heading>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="flex items-center space-x-1 self-end"
                variant="outline"
                size="xs"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Import</span>
              </Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import from text file</DialogTitle>
                  <DialogDescription>
                    Create an assignment from a text file on your computer
                  </DialogDescription>
                </DialogHeader>
                <AssigmentImport assignmentId={assignment.id} />
              </DialogContent>
            </DialogPortal>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="flex items-center space-x-1 self-end"
                size="xs"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Add</span>
              </Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a question</DialogTitle>
                  <DialogDescription>
                    Add a new question to the assignment
                  </DialogDescription>
                </DialogHeader>
                <CreateQuestionForm assignmentId={assignment.id} />
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {questionListQuery.data.map((q, _index) => (
          <QuestionCard
            key={q.id}
            assignmentId={assignment.id}
            index={_index + 1}
            question={q}
            onDelete={() => onQuestionDelete(q.id)}
          />
        ))}
      </div>
    </div>
  )
}
