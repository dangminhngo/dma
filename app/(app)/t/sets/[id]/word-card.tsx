import Image from "next/image"

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
import WordForm from "./word-form"

interface WordCardProps {
  word: InferElement<RouterOutput["word"]["list"]>
  onDelete: () => void
}

export default function WordCard({ word, onDelete }: WordCardProps) {
  return (
    <div className="group flex items-center justify-between rounded-lg border p-4">
      <div>
        <div className="font-medium">{word.term}</div>
        <div className="text-muted-foreground">{word.definition}</div>
        {word.image && (
          <div className="relative">
            <Image src={word.image} alt={word.term} fill />
          </div>
        )}
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
                <DialogTitle>Update a word</DialogTitle>
                <DialogDescription>
                  Change word term and definition
                </DialogDescription>
              </DialogHeader>
              <WordForm setId={word.setId} word={word} editing />
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
                  This will remove all data of the word from the set and cannot
                  be undone.
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
