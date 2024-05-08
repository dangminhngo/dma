"use client"

import Image from "next/image"

import { AudioIcon } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { useSound, useToggle } from "~/hooks"
import { type RouterOutput } from "~/trpc/types"
import { type InferElement } from "~/types"

interface FlipCardProps {
  word: InferElement<RouterOutput["word"]["list"]>
  flip?: boolean
}

export default function FlipCard({ word, flip = false }: FlipCardProps) {
  const [flipped, toggleFlipped] = useToggle()
  const { play } = useSound({ url: word.audio })

  return flip ? (
    <div className="h-[50vh] w-full">
      <div
        className="relative h-full w-full transition-transform"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onClick={toggleFlipped}
      >
        <div
          className="absolute grid h-full w-full place-items-center rounded-lg border-2 bg-background p-4 text-4xl font-medium"
          style={{ backfaceVisibility: "hidden" }}
        >
          {word.term}
          <div className="absolute right-4 top-4 flex items-center space-x-2">
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                play()
              }}
            >
              <AudioIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div
          className="absolute flex h-full w-full flex-col items-center justify-center space-y-2 rounded-lg border-2 bg-background p-4 text-2xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>{word.definition}</div>
          {word.image && (
            <div className="relative">
              <Image src={word.image} alt={word.term} fill />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="space-y-1 rounded-lg border p-4">
      <div className="flex items-center space-x-2">
        <strong className="text-lg font-medium">{word.term}</strong>
        <Button
          size="icon-sm"
          variant="invisible"
          onClick={play}
          className="h-4 w-4 text-foreground/50"
        >
          <AudioIcon className="h-4 w-4" />
        </Button>
      </div>
      <div>{word.definition}</div>
      {word.image && (
        <div className="relative">
          <Image src={word.image} alt={word.term} fill />
        </div>
      )}
    </div>
  )
}
