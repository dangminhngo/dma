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

interface SetFormProps {
  courseId: number
  editing?: boolean
  set?: InferElement<RouterOutput["set"]["list"]>
}

export default function SetForm({
  courseId,
  editing = false,
  set,
}: SetFormProps) {
  const utils = api.useUtils()

  const setCreator = api.set.create.useMutation({
    async onSuccess(data) {
      await utils.set.list.invalidate({ courseId: data.courseId })
    },
    async onError(err) {
      console.log(err)
    },
  })

  const setUpdater = api.set.update.useMutation({
    async onSuccess(data) {
      await utils.set.list.invalidate({ courseId: data.courseId })
    },
    async onError(err) {
      console.log(err)
    },
  })

  const form = useForm<z.infer<typeof setSchema>>({
    resolver: zodResolver(setSchema),
    defaultValues: {
      title: set?.title ?? "",
      description: set?.description ?? "",
    },
  })

  function onSubmit(values: z.infer<typeof setSchema>) {
    if (editing && set) {
      return setUpdater.mutate({ id: set.id, data: values })
    }

    setCreator.mutate({ courseId, data: values })
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

const setSchema = z.object({
  title: z.string(),
  description: z.string(),
})
