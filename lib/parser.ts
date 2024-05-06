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

const assignmentSchema = z.array(
  z.object({
    text: z.string(),
    explanation: z.string(),
    answers: z.array(z.object({ text: z.string(), right: z.boolean() })),
  })
)

export function parseAssignment(
  json: string
): z.infer<typeof assignmentSchema> | undefined {
  try {
    return assignmentSchema.parse(JSON.parse(json))
  } catch (err) {
    console.error(err)
  }
}
