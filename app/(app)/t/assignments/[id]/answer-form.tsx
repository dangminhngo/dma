import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { api } from "~/trpc/react"
import { type RouterOutput } from "~/trpc/types"

interface AnswerFormProps {
  assignmentId: number
  questionId?: number
  editing?: boolean
  answer?: RouterOutput["answer"]["update"]
}

export default function AnswerForm({
  answer,
  editing = false,
  assignmentId,
  questionId,
}: AnswerFormProps) {
  const utils = api.useUtils()
  const answerCreator = api.answer.create.useMutation({
    async onSuccess() {
      await utils.question.list.invalidate({ assignmentId })
    },
    async onError(err) {
      console.error(err)
    },
  })
  const answerUpdater = api.answer.update.useMutation({
    async onSuccess() {
      await utils.question.list.invalidate({ assignmentId })
    },
    async onError(err) {
      console.error(err)
    },
  })

  const form = useForm<z.infer<typeof answerSchema>>({
    defaultValues: { text: answer?.text ?? "", right: answer?.right ?? false },
  })

  function onSubmit(values: z.infer<typeof answerSchema>) {
    if (editing && answer) {
      return answerUpdater.mutate({ id: answer.id, data: values })
    }

    if (!questionId) return

    answerCreator.mutate({ questionId, data: values })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-stretch space-y-4"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input placeholder="Answer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="right"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Right</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{editing ? "Save" : "Create"}</Button>
      </form>
    </Form>
  )
}

const answerSchema = z.object({
  text: z.string(),
  right: z.boolean(),
})
