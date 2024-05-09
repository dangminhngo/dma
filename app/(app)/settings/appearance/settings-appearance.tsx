"use client"

import { AppTheme } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { useTheme } from "~/hooks"
import { api } from "~/trpc/react"

export default function SettingsAppearance() {
  const utils = api.useUtils()

  const settingsQuery = api.settings.fetch.useQuery()
  const settingsUpdater = api.settings.update.useMutation({
    async onSuccess() {
      await utils.settings.fetch.invalidate()
    },
    async onError(err) {
      console.error(err)
    },
  })

  const form = useForm<z.infer<typeof settingsAppearanceSchema>>({
    defaultValues: {
      theme: settingsQuery.data?.theme ?? AppTheme.DAY,
    },
  })

  function onSubmit(values: z.infer<typeof settingsAppearanceSchema>) {
    settingsUpdater.mutate({ data: values })
  }

  // FIXME: what happens here? The theme doesn't match the query data
  useTheme(settingsQuery.data?.theme)

  return (
    <Form {...form}>
      <form
        onChange={form.handleSubmit(onSubmit)}
        className="flex flex-col items-stretch space-y-2"
      >
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Theme</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={AppTheme.DAY} />
                    </FormControl>
                    <FormLabel className="text-base font-normal">
                      Day theme
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={AppTheme.NIGHT} />
                    </FormControl>
                    <FormLabel className="text-base font-normal">
                      Night theme
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

const settingsAppearanceSchema = z.object({
  theme: z.nativeEnum(AppTheme),
})
