import Image from "next/image"

import { DeleteIcon, EditIcon, PlusIcon } from "~/components/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
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
import { api } from "~/trpc/react"
import { type RouterOutput } from "~/trpc/types"
import { type InferElement } from "~/types"
import AnswerChip from "./answer-chip"
import AnswerForm from "./answer-form"
import QuestionForm from "./question-form"

interface QuestionCardProps {
  assignmentId: number
  index: number
  question: InferElement<RouterOutput["question"]["list"]>
  onDelete: () => void
}

export default function QuestionCard({
  assignmentId,
  index,
  question,
  onDelete,
}: QuestionCardProps) {
  const utils = api.useUtils()
  const answerDeleter = api.answer.delete.useMutation({
    async onSuccess() {
      await utils.question.list.invalidate({ assignmentId })
    },
    async onError(err) {
      console.error(err)
    },
  })

  function onAnswerDelete(id: number) {
    answerDeleter.mutate({ id })
  }

  return (
    <div className="group flex items-center space-x-8 rounded-lg border p-4">
      <div className="flex-1 space-y-2">
        <div className="font-medium">
          {index}. {question.text}
        </div>
        {question.image && (
          <div className="relative">
            <Image src={question.image} alt={question.id + ""} fill />
          </div>
        )}
        <div className="grid grid-cols-2 gap-2">
          {question.answers.map((a) => (
            <AnswerChip
              key={a.id}
              assignmentId={assignmentId}
              answer={a}
              onDelete={() => onAnswerDelete(a.id)}
            />
          ))}
        </div>
        <div>
          <strong className="font-medium">Explanation:</strong>{" "}
          {question.explanation}
        </div>
      </div>
      <div className="pointer-events-none flex items-center space-x-2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon-sm" variant="ghost">
              <PlusIcon className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add an answer</DialogTitle>
                <DialogDescription>
                  Add an answer with text and mark it right
                </DialogDescription>
              </DialogHeader>
              <AnswerForm
                assignmentId={assignmentId}
                questionId={question.id}
              />
            </DialogContent>
          </DialogPortal>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon-sm" variant="ghost">
              <EditIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update a question</DialogTitle>
                <DialogDescription>
                  Change question term and definition
                </DialogDescription>
              </DialogHeader>
              <QuestionForm
                assignmentId={question.assignmentId}
                question={question}
                editing
              />
            </DialogContent>
          </DialogPortal>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon-sm">
              <DeleteIcon className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogPortal>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove all data of the question from the assignment
                  and cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogPortal>
        </AlertDialog>
      </div>
    </div>
  )
}
