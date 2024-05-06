import { CloseIcon, EditIcon } from "~/components/icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { cn } from "~/lib/utils"
import { type RouterOutput } from "~/trpc/types"
import AnswerForm from "./answer-form"

interface AnswerChipProps {
  assignmentId: number
  answer: RouterOutput["answer"]["create"]
  onDelete: () => void
}

export default function AnswerChip({
  assignmentId,
  answer,
  onDelete,
}: AnswerChipProps) {
  return (
    <div
      className={cn(
        "group/chip flex items-center justify-between space-x-4 rounded-full px-4 py-2",
        answer.right
          ? "bg-primary font-bold text-primary-foreground"
          : "bg-foreground/5"
      )}
    >
      <div>{answer.text}</div>
      <div className="pointer-events-none flex items-center space-x-0.5 opacity-0 duration-200 group-hover/chip:pointer-events-auto group-hover/chip:opacity-100">
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-100 hover:bg-foreground/10">
              <EditIcon className="h-3 w-3" />
            </button>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update answer</DialogTitle>
                <DialogDescription>
                  Change answer text and mark it right
                </DialogDescription>
              </DialogHeader>
              <AnswerForm assignmentId={assignmentId} answer={answer} editing />
            </DialogContent>
          </DialogPortal>
        </Dialog>
        <button
          onClick={onDelete}
          className="flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-100 hover:bg-foreground/5"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
