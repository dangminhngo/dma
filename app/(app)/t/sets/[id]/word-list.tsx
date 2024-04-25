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
import WordCard from "./word-card"
import WordForm from "./word-form"

interface WordListProps {
  set: RouterOutput["set"]["byId"]
}

export default function WordList({ set }: WordListProps) {
  const utils = api.useUtils()

  const wordDeleter = api.word.delete.useMutation({
    async onSuccess(data) {
      await utils.word.list.invalidate({ setId: data.setId })
    },
    async onError(err) {
      console.error(err)
    },
  })

  function onWordDelete(id: number) {
    wordDeleter.mutate({ id })
  }

  const wordListQuery = api.word.list.useQuery({ setId: set?.id ?? 0 })

  if (!set) return null

  if (wordListQuery.isLoading) return <div>Loading...</div>

  if (wordListQuery.isError || !wordListQuery.data)
    return <div>Cannot fetch words</div>

  return (
    <div className="flex flex-col items-stretch space-y-2">
      <div className="flex items-center justify-between">
        <Heading as="h3">Words ({wordListQuery.data.length ?? 0})</Heading>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-1 self-end" size="xs">
              <PlusIcon className="h-4 w-4" />
              <span>Add</span>
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a word</DialogTitle>
                <DialogDescription>
                  Add a new word to the set
                </DialogDescription>
              </DialogHeader>
              <WordForm setId={set.id} />
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {wordListQuery.data.map((s) => (
          <WordCard key={s.id} word={s} onDelete={() => onWordDelete(s.id)} />
        ))}
      </div>
    </div>
  )
}
