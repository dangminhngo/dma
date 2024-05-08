import { type RouterOutput } from "~/trpc/types"
import WordCard from "./word-card"

interface WordListProps {
  words: RouterOutput["word"]["list"]
}

export default function WordList({ words }: WordListProps) {
  return (
    <div className="flex flex-col items-stretch space-y-2">
      {words.map((w) => (
        <WordCard key={w.id} word={w} />
      ))}
    </div>
  )
}
