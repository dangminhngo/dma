interface Word {
  term: string
  definition: string
}

export function parseJSONtoSet(json: string) {
  const set = JSON.parse(json) as Word[]
  return set
}

interface MultipleChoiceQuestion {
  question: string
  answers: { text: string; right: boolean }[]
}

interface IncompleteQuestion {
  question: string
  answer: string
}

function isMultipleChoice(
  question: MultipleChoiceQuestion | IncompleteQuestion
): question is MultipleChoiceQuestion {
  return (question as MultipleChoiceQuestion).answers?.length > 0
}

function isIncompleteQuestion(
  question: MultipleChoiceQuestion | IncompleteQuestion
): question is IncompleteQuestion {
  return !!(question as IncompleteQuestion).answer
}

export function parseJSONtoAssignment(json: string) {
  const questions = JSON.parse(json) as (
    | MultipleChoiceQuestion
    | IncompleteQuestion
  )[]
  return questions.reduce(
    (r, q) => {
      if (isMultipleChoice(q)) {
        return {
          ...r,
          multipleChoiceQuestions: [...r.multipleChoiceQuestions, q],
        }
      }

      if (isIncompleteQuestion(q)) {
        return {
          ...r,
          incompleteQuestions: [...r.incompleteQuestions, q],
        }
      }

      return r
    },
    {
      multipleChoiceQuestions: [],
      incompleteQuestions: [],
    } as {
      multipleChoiceQuestions: MultipleChoiceQuestion[]
      incompleteQuestions: IncompleteQuestion[]
    }
  )
}
