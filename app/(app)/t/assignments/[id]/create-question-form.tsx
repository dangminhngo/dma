import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
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
import { api } from "~/trpc/react"

interface CreateQuestionFormProps {
  assignmentId: number
}

export default function CreateQuestionForm({
  assignmentId,
}: CreateQuestionFormProps) {
  const utils = api.useUtils()

  const questionCreator = api.question.create.useMutation({
    async onSuccess(data) {
      await utils.question.list.invalidate({ assignmentId: data.assignmentId })
    },
    async onError(err) {
      console.log(err)
    },
  })

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      text: "",
      answers: {
        "1": {
          text: "",
          right: true,
        },
        "2": {
          text: "",
          right: false,
        },
        "3": {
          text: "",
          right: false,
        },
        "4": {
          text: "",
          right: false,
        },
      },
    },
  })

  function onSubmit(values: z.infer<typeof questionSchema>) {
    return questionCreator.mutate({
      assignmentId,
      data: {
        text: values.text,
        answers: Object.values(values.answers),
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-stretch space-y-4"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input placeholder="Question" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-stretch space-y-2 border-t pt-4">
          <div className="flex items-center justify-between">
            <Label>Answer 1</Label>
            <FormField
              control={form.control}
              name="answers.1.right"
              render={({ field }) => (
                <FormItem className="flex space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="answers.1.text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Answer 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col items-stretch space-y-2">
          <div className="flex items-center justify-between">
            <Label>Answer 2</Label>
            <FormField
              control={form.control}
              name="answers.2.right"
              render={({ field }) => (
                <FormItem className="flex space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="answers.2.text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Answer 2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col items-stretch space-y-2">
          <div className="flex items-center justify-between">
            <Label>Answer 3</Label>
            <FormField
              control={form.control}
              name="answers.3.right"
              render={({ field }) => (
                <FormItem className="flex space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="answers.3.text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Answer 3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col items-stretch space-y-2">
          <div className="flex items-center justify-between">
            <Label>Answer 4</Label>
            <FormField
              control={form.control}
              name="answers.4.right"
              render={({ field }) => (
                <FormItem className="flex space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="answers.4.text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Answer 4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Create</Button>
      </form>
    </Form>
  )
}

const answerSchema = z.object({ text: z.string(), right: z.boolean() })

const questionSchema = z.object({
  text: z.string(),
  answers: z.object({
    "1": answerSchema,
    "2": answerSchema,
    "3": answerSchema,
    "4": answerSchema,
  }),
})
