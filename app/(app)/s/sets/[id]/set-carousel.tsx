import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"
import { type RouterOutput } from "~/trpc/types"
import FlipCard from "./flip-card"

interface SetCarouselProps {
  words: RouterOutput["word"]["list"]
}

export default function SetCarousel({ words }: SetCarouselProps) {
  return (
    <Carousel>
      <CarouselContent>
        {words.map((word) => (
          <CarouselItem key={word.id}>
            <FlipCard word={word} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
