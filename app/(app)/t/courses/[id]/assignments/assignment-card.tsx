import Link from "next/link"

import { DeleteIcon, EditIcon } from "~/components/icons"
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
import { type RouterOutput } from "~/trpc/types"
import { type InferElement } from "~/types"
import AssignmentForm from "./assignment-form"

interface AssignmentCardProps {
  assignment: InferElement<RouterOutput["assignment"]["list"]>
  onDelete: () => void
}

export default function AssignmentCard({
  assignment,
  onDelete,
}: AssignmentCardProps) {
  return (
    <div className="group flex items-center justify-between rounded-lg border p-4">
      <div>
        <Link
          href={`/t/assignments/${assignment.id}`}
          className="hover:underline"
        >
          <div className="font-medium">{assignment.title}</div>
        </Link>
        <div className="text-sm text-muted-foreground">
          {assignment.description}
        </div>
        <div className="text-sm text-muted-foreground">
          {assignment._count.questions} questions
        </div>
      </div>
      <div className="pointer-events-none flex items-center space-x-2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon-sm" variant="ghost">
              <EditIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update a assignment</DialogTitle>
                <DialogDescription>
                  Change the information of a assignment
                </DialogDescription>
              </DialogHeader>
              <AssignmentForm
                courseId={assignment.courseId}
                assignment={assignment}
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
                  This will remove all data of the assignment from the course
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
