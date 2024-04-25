import { DeleteIcon } from "~/components/icons"
import ProfileImage from "~/components/profile-image"
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
import { type RouterOutput } from "~/trpc/types"
import { type InferElement } from "~/types"

interface StudentCardProps {
  user: InferElement<RouterOutput["user"]["list"]>
  onRemove: () => void
}

export default function StudentCard({ user, onRemove }: StudentCardProps) {
  return (
    <div className="group flex items-center justify-between space-x-2 rounded-lg border p-4">
      <div className="flex items-center space-x-2">
        <ProfileImage image={user.image} name={user.name} size={40} />
        <div className="-space-y-0.5">
          <div>{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </div>
      </div>
      <div className="pointer-events-none flex items-center space-x-2 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100">
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
                  This will remove this student from the course. But you can add
                  this student again anytime.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onRemove}>
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
