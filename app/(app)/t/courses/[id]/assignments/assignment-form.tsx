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

interface AssignmentFormProps {
  courseId: number
  editing?: boolean
  assignment?: InferElement<RouterOutput["assignment"]["list"]>
}

export default function AssignmentForm({
  courseId,
  editing = false,
  assignment,
}: AssignmentFormProps) {
  const utils = api.useUtils()

  const assignmentCreator = api.assignment.create.useMutation({
    async onSuccess(data) {
      await utils.assignment.list.invalidate({ courseId: data.courseId })
    },
    async onError(err) {
      console.log(err)
    },
  })

  const assignmentUpdater = api.assignment.update.useMutation({
    async onSuccess(data) {
      await utils.assignment.list.invalidate({ courseId: data.courseId })
    },
    async onError(err) {
      console.log(err)
    },
  })

  const form = useForm<z.infer<typeof assignmentSchema>>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      title: assignment?.title ?? "",
      description: assignment?.description ?? "",
    },
  })

  function onSubmit(values: z.infer<typeof assignmentSchema>) {
    if (editing && assignment) {
      return assignmentUpdater.mutate({ id: assignment.id, data: values })
    }

    assignmentCreator.mutate({ courseId, data: values })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-stretch space-y-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Vocabs in use" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="For the kids" {...field} />
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

const assignmentSchema = z.object({
  title: z.string(),
  description: z.string(),
})
