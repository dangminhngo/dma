import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"
import { type RouterOutput } from "~/trpc/types"
import WordCard from "./word-card"

interface WordFlashcardsProps {
  words: RouterOutput["word"]["list"]
}

export default function WordFlashcards({ words }: WordFlashcardsProps) {
  return (
    <Carousel>
      <CarouselContent>
        {words.map((word) => (
          <CarouselItem key={word.id}>
            <WordCard word={word} flip />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
