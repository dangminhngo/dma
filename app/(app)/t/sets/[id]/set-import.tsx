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
import { ALLOWED_TEXTS, MAX_TEXT_SIZE } from "~/lib/constants"
import { parseSet } from "~/lib/parser"
import { api } from "~/trpc/react"

export default function SetImport({ setId }: { setId: number }) {
  const utils = api.useUtils()

  const wordManyCreator = api.word.createMany.useMutation({
    async onSuccess() {
      await utils.word.list.invalidate({ setId })
    },
    async onError(err) {
      console.error(err)
    },
  })

  const form = useForm<z.infer<typeof setImportSchema>>({
    resolver: zodResolver(setImportSchema),
    defaultValues: {
      file: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof setImportSchema>) {
    const reader = new FileReader()
    reader.readAsText(values.file)
    reader.addEventListener("loadend", () => {
      const result = reader.result as string
      const data = parseSet(result)
      if (!data) {
        console.error("Error")
        return
      }
      wordManyCreator.mutate({ setId, data })
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-stretch space-y-2"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value: _, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Text file</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    onChange(file)
                  }}
                  {...fieldProps}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Import</Button>
      </form>
    </Form>
  )
}

const setImportSchema = z.object({
  file: z
    .custom<File>()
    .refine(
      (file: File) =>
        file.size <= MAX_TEXT_SIZE && ALLOWED_TEXTS.includes(file.type)
    ),
})
