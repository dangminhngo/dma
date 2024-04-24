import { zodResolver } from "@hookform/resolvers/zod"
import { AnnouncementLevel } from "@prisma/client"
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
import { Textarea } from "~/components/ui/textarea"
import { api } from "~/trpc/react"
import { type RouterOutput } from "~/trpc/types"

interface AnnouncementFormProps {
  courseId: number
  announcement?: RouterOutput["announcement"]["byId"]
  editing?: boolean
}

export default function AnnouncementForm({
  courseId,
  announcement,
  editing = false,
}: AnnouncementFormProps) {
  const utils = api.useUtils()

  const announcementCreator = api.announcement.create.useMutation({
    async onSuccess(data) {
      await utils.announcement.list.invalidate({ courseId: data.courseId })
    },
    async onError(err) {
      console.error(err)
    },
  })

  const announcementUpdater = api.announcement.update.useMutation({
    async onSuccess(data) {
      await utils.announcement.list.invalidate({ courseId: data.courseId })
    },
    async onError(err) {
      console.error(err)
    },
  })

  const form = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      text: announcement?.text ?? "",
      level: AnnouncementLevel.NORMAL,
    },
  })

  function onSubmit(values: z.infer<typeof announcementSchema>) {
    if (editing && announcement) {
      return announcementUpdater.mutate({ id: announcement.id, data: values })
    }

    announcementCreator.mutate({ courseId, data: values })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-stretch space-y-2"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your text here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={AnnouncementLevel.NORMAL}>
                    NORMAL
                  </SelectItem>
                  <SelectItem value={AnnouncementLevel.IMPORTANT}>
                    IMPORTANT
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{editing ? "Save" : "Create"}</Button>
      </form>
    </Form>
  )
}

const announcementSchema = z.object({
  text: z.string(),
  level: z.nativeEnum(AnnouncementLevel),
})
