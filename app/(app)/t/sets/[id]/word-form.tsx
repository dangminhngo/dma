import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Textarea } from "~/components/ui/textarea"
import { Input } from "~/components/ui/input"
import { api } from "~/trpc/react"
import { type RouterOutput } from "~/trpc/types"
import { type InferElement } from "~/types"

interface WordFormProps {
  setId: number
  editing?: boolean
  word?: InferElement<RouterOutput["word"]["list"]>
}

export default function WordForm({
  setId,
  editing = false,
  word,
}: WordFormProps) {
  const utils = api.useUtils()

  const wordCreator = api.word.create.useMutation({
    async onSuccess(data) {
      await utils.word.list.invalidate({ setId: data.setId })
    },
    async onError(err) {
      console.log(err)
    },
  })

  const wordUpdater = api.word.update.useMutation({
    async onSuccess(data) {
      await utils.word.list.invalidate({ setId: data.setId })
    },
    async onError(err) {
      console.log(err)
    },
  })

  const form = useForm<z.infer<typeof wordSchema>>({
    resolver: zodResolver(wordSchema),
    defaultValues: {
      term: word?.term ?? "",
      definition: word?.definition ?? "",
    },
  })

  function onSubmit(values: z.infer<typeof wordSchema>) {
    if (editing && word) {
      return wordUpdater.mutate({ id: word.id, data: values })
    }

    wordCreator.mutate({ setId, data: values })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-stretch space-y-2"
      >
        <FormField
          control={form.control}
          name="term"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Term</FormLabel>
              <FormControl>
                <Input placeholder="Term" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="definition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Definition</FormLabel>
              <FormControl>
                <Textarea placeholder="Definition" rows={4} {...field} className="resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{editing ? "Save" : "Create"}</Button>
      </form>
    </Form>
  )
}

const wordSchema = z.object({
  term: z.string(),
  definition: z.string(),
})
