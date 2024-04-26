import { z } from "zod"

const setSchema = z.array(
  z.object({ term: z.string(), definition: z.string() })
)

export function parseSet(json: string): z.infer<typeof setSchema> | undefined {
  try {
    return setSchema.parse(JSON.parse(json))
  } catch (err) {
    console.error(err)
  }
}

const assignmentSchema = z.object({
  multipleChoiceQuestions: z.array(
    z.object({
      question: z.string(),
      answers: z.object({ text: z.string(), right: z.boolean() }),
    })
  ),
  incompleteQuestions: z.array(
    z.object({ question: z.string(), answer: z.string() })
  ),
})

export function parseAssignment(
  json: string
): z.infer<typeof assignmentSchema> | undefined {
  try {
    return assignmentSchema.parse(JSON.parse(json))
  } catch (err) {
    console.error(err)
  }
}
