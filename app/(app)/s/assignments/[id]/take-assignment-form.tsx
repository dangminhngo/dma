"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { convertTime } from "~/lib/utils"
import { api } from "~/trpc/react"
import { type RouterOutput } from "~/trpc/types"

interface TakeAssignmentFormProps {
  assignmentId: number
  questions: RouterOutput["question"]["list"]
}

export default function TakeAssignmentForm({
  assignmentId,
  questions,
}: TakeAssignmentFormProps) {
  const router = useRouter()
  const scoreCreator = api.score.create.useMutation({
    async onSuccess(data) {
      router.push(`/s/assignments/${data.assignmentId}/score`)
    },
    async onError(err) {
      console.error(err)
    },
  })
  const studentAnswerCreator = api.studentAnswer.createMany.useMutation({
    async onSuccess(data) {
      console.log(data)
    },
    async onError(err) {
      console.error(err)
    },
  })

  const form = useForm<z.infer<typeof schema>>()

  const expirationTime =
    questions.length * (process.env.NODE_ENV === "development" ? 10 : 90) // 1.5 min for each question
  const [remainingTime, setRemainingTime] = useState(expirationTime)
  const [time, setTime] = useState(convertTime(expirationTime))

  useEffect(() => {
    const interval = window.setInterval(
      () => setRemainingTime((time) => time - 1),
      1000
    )

    if (remainingTime <= 0) {
      window.clearInterval(interval)
      setRemainingTime(0)
    }

    return () => window.clearInterval(interval)
  }, [remainingTime])

  const onSubmit = useCallback(
    (values: z.infer<typeof schema>) => {
      const result = Object.keys(values).reduce((res, curr) => {
        const question = questions.find((q) => q.id === +curr)
        if (!question) return res
        if (question.answers.find((ans) => ans.id === +values[curr])?.right) {
          return ++res
        }
        return res
      }, 0)

      let points = (result / questions.length) * 10
      points = parseFloat(points.toFixed(1))

      studentAnswerCreator.mutate({ assignmentId, answers: values })
      scoreCreator.mutate({ assignmentId, points })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [questions]
  )

  useEffect(() => {
    setTime(convertTime(remainingTime))
    if (remainingTime <= 0) {
      form
        .handleSubmit(onSubmit)()
        .then(() => {
          console.log("Form Submitted")
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [remainingTime, form, onSubmit])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center rounded border px-4 py-2">
        Remaining Time: {time.min}:{time.sec}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-stretch space-y-4"
        >
          {questions.map((question, index) => (
            <FormField
              key={question.id}
              control={form.control}
              name={question.id + ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-normal">
                    <strong className="font-medium">
                      Question {index + 1}
                    </strong>
                    . {question.text.replace("_", "______")}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2"
                    >
                      {question.answers.map((answer) => (
                        <FormItem
                          key={answer.id}
                          className="flex flex-row items-center space-x-2 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={answer.id + ""} />
                          </FormControl>
                          <FormLabel
                            className="text-lg font-normal"
                            style={{
                              fontWeight:
                                field.value === answer.id + "" ? "500" : "400",
                            }}
                          >
                            {answer.text}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

const schema = z.record(z.string(), z.string())
