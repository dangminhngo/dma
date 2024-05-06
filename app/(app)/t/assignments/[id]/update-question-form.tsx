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
import { Input } from "~/components/ui/input"
import { api } from "~/trpc/react"
import { type RouterOutput } from "~/trpc/types"
import { type InferElement } from "~/types"

interface UpdateQuestionFormProps {
  question: InferElement<RouterOutput["question"]["list"]>
}

export default function UpdateQuestionForm({
  question,
}: UpdateQuestionFormProps) {
  const utils = api.useUtils()

  const questionUpdater = api.question.update.useMutation({
    async onSuccess(data) {
      await utils.question.list.invalidate({ assignmentId: data.assignmentId })
    },
    async onError(err) {
      console.log(err)
    },
  })

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      text: question.text,
      explanation: question.explanation ?? "",
    },
  })

  function onSubmit(values: z.infer<typeof questionSchema>) {
    return questionUpdater.mutate({
      id: question.id,
      data: values,
    })
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
                <Input placeholder="Question" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Explanation</FormLabel>
              <FormControl>
                <Input placeholder="Explanation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}

const questionSchema = z.object({
  text: z.string(),
  explanation: z.string(),
})
