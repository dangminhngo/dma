"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { type Session } from "next-auth"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import ProfileImage from "~/components/profile-image"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
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
import { ALLOWED_IMAGES, MAX_IMAGE_SIZE } from "~/lib/constants"
import { api } from "~/trpc/react"

interface SettingsProfileProps {
  session: Session
}

export default function SettingsProfile({ session }: SettingsProfileProps) {
  const router = useRouter()
  const { update } = useSession()

  const accountUpdater = api.account.update.useMutation({
    async onSuccess(data) {
      await update(data)
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

  const updateImageForm = useForm<z.infer<typeof updateImageSchema>>({
    resolver: zodResolver(updateImageSchema),
  })

  async function onUpdateNameSubmit(values: z.infer<typeof updateNameSchema>) {
    accountUpdater.mutate(values)
  }

  async function onUpdateImageSubmit(
    values: z.infer<typeof updateImageSchema>
  ) {
    if (!values.image) return

    const reader = new FileReader()
    reader.readAsDataURL(values.image as Blob)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    reader.addEventListener("load", async () => {
      const dataUrl = reader.result
      if (dataUrl && session.user?.id) {
        const [, ext] = values.image.name.split(".")
        const key = `${session.user.id}.${ext}`
        const res = await fetch("/api/assets", {
          method: "POST",
          body: JSON.stringify({
            key,
          }),
        })
        const { url } = (await res.json()) as { url: string }
        await fetch("/api/assets", {
          method: "PUT",
          body: JSON.stringify({
            url,
            dataUrl,
          }),
        })

        accountUpdater.mutate({ image: key })
      }
    })
  }

  function onProfileImageRemove() {
    accountUpdater.mutate({ image: null })
  }

  return (
    <>
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
      <div className="min-w-[400px] space-y-2">
        <div className="font-medium">Image</div>
        <div className="group relative h-[256px] w-[256px]">
          <ProfileImage
            image={session.user?.image}
            name={session.user?.name}
            size={256}
          />
          <div className="pointer-events-none absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center space-y-2 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="xs">Change</Button>
              </DialogTrigger>
              <DialogPortal>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Profile Image</DialogTitle>
                    <DialogDescription>
                      Upload an image from your computer
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...updateImageForm}>
                    <form
                      onSubmit={updateImageForm.handleSubmit(
                        onUpdateImageSubmit
                      )}
                      className="flex flex-col items-stretch space-y-4"
                    >
                      <FormField
                        control={updateImageForm.control}
                        name="image"
                        render={({
                          field: { value: _, onChange, ...fieldProps },
                        }) => (
                          <FormItem>
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
                      <Button type="submit">Upload</Button>
                    </form>
                  </Form>
                </DialogContent>
              </DialogPortal>
            </Dialog>
            <Button
              size="xs"
              variant="destructive"
              onClick={onProfileImageRemove}
            >
              Remove
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          You can change or remove your profile image.
        </p>
      </div>
    </>
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
        file.size <= MAX_IMAGE_SIZE && ALLOWED_IMAGES.includes(file.type)
    ),
})
