"use client"

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

type Course = RouterOutput["course"]["byId"]

interface CourseFormProps {
  editing?: boolean
  course?: Course
}

export default function CourseForm({
  editing = false,
  course,
}: CourseFormProps) {
  const utils = api.useUtils()

  const courseCreator = api.course.create.useMutation({
    async onSuccess() {
      await utils.course.list.invalidate()
    },
    async onError(err) {
      console.log(err)
    },
  })

  const courseUpdater = api.course.update.useMutation({
    async onSuccess(data) {
      await utils.course.list.invalidate()
      await utils.course.byId.invalidate({ id: data.id })
    },
    async onError(err) {
      console.log(err)
    },
  })

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: course?.name ?? "",
    },
  })

  function onSubmit(values: z.infer<typeof courseSchema>) {
    if (editing && course) {
      return courseUpdater.mutate({ id: course.id, data: values })
    }

    return courseCreator.mutate(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-stretch space-y-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course name</FormLabel>
              <FormControl>
                <Input placeholder="American English" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Continue</Button>
      </form>
    </Form>
  )
}

const courseSchema = z.object({
  name: z.string().min(3),
})
