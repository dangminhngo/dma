"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { type Session } from "next-auth"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { ALLOWED_IMAGES, MAX_FILE_SIZE } from "~/lib/constants"
import { api } from "~/trpc/react"

interface SettingsProfileProps {
  session: Session
}

export default function SettingsProfile({ session }: SettingsProfileProps) {
  const router = useRouter()
  const { update } = useSession()

  const accountUpdater = api.account.update.useMutation({
    async onSuccess(data) {
      await update({ name: data.name })
      router.refresh()
    },
    async onError(err) {
      console.error(err.message)
    },
  })

  const updateNameForm = useForm<z.infer<typeof updateNameSchema>>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: session.user.name ?? "",
    },
  })

  async function onUpdateNameSubmit(values: z.infer<typeof updateNameSchema>) {
    accountUpdater.mutate(values)
  }

  return (
    <div>
      <Form {...updateNameForm}>
        <form onBlur={updateNameForm.handleSubmit(onUpdateNameSubmit)}>
          <FormField
            control={updateNameForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Your name may appear around DMA. This prefers your full name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

const updateNameSchema = z.object({
  name: z.string().min(3),
})

const updateImageSchema = z.object({
  image: z
    .custom<File>()
    .refine(
      (file: File) =>
        file.size <= MAX_FILE_SIZE && ALLOWED_IMAGES.includes(file.type)
    ),
})
