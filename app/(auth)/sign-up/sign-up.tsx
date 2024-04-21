"use client"

import { useRouter } from "next/navigation"
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
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { useToast } from "~/components/ui/use-toast"
import { api } from "~/trpc/react"

export default function SignUp() {
  const router = useRouter()
  const { toast } = useToast()

  const accountCreator = api.account.create.useMutation({
    async onSuccess() {
      router.push("/sign-in")
    },
    async onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot create account",
        description: err.message,
      })
    },
  })

  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: UserRole.STUDENT,
    },
  })

  function onSubmit(values: z.infer<typeof createAccountSchema>) {
    console.log(values)
    accountCreator.mutate(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-stretch space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>You are:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={UserRole.TEACHER} id="r1" />
                    <Label htmlFor="r1">A teacher</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={UserRole.STUDENT} id="r2" />
                    <Label htmlFor="r2">A student</Label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create account</Button>
      </form>
    </Form>
  )
}

const createAccountSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().min(4),
  role: z.nativeEnum(UserRole),
})
