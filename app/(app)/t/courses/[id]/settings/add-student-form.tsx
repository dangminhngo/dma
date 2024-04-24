"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { UserRole } from "@prisma/client"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { api } from "~/trpc/react"
import { type RouterOutput } from "~/trpc/types"

interface AddStudentFormProps {
  course: RouterOutput["course"]["byId"]
}

export default function AddStudentForm({ course }: AddStudentFormProps) {
  const utils = api.useUtils()

  const studentListQuery = api.user.list.useQuery({ role: UserRole.STUDENT })

  const addStudentMutation = api.course.addStudent.useMutation({
    async onSuccess(data) {
      await utils.course.byId.invalidate({ id: data.id })
    },
    async onError(err) {
      console.log(err)
    },
  })

  const form = useForm<z.infer<typeof addStudentSchema>>({
    resolver: zodResolver(addStudentSchema),
    defaultValues: {
      id: "",
    },
  })

  function onSubmit(values: z.infer<typeof addStudentSchema>) {
    if (!course) throw new Error("No course")
    addStudentMutation.mutate({ courseId: course.id, studentId: values.id })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-stretch space-y-2"
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a student</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {studentListQuery.data?.map((st) => (
                    <SelectItem key={st.id} value={st.id}>
                      {st.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add</Button>
      </form>
    </Form>
  )
}

const addStudentSchema = z.object({
  id: z.string(),
})
