"use client"

import Image from "next/image"

import { useToggle } from "~/hooks"
import { type RouterOutput } from "~/trpc/types"
import { type InferElement } from "~/types"

interface FlipCardProps {
  word: InferElement<RouterOutput["word"]["list"]>
}

export default function FlipCard({ word }: FlipCardProps) {
  const [flipped, toggleFlipped] = useToggle()

  return (
    <div className="h-[50vh] w-full">
      <div
        className="relative h-full w-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onClick={toggleFlipped}
      >
        <div
          className="absolute grid h-full w-full place-items-center rounded-lg border bg-background p-6 text-4xl font-medium"
          style={{ backfaceVisibility: "hidden" }}
        >
          {word.term}
        </div>
        <div
          className="absolute flex h-full w-full flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-6 text-2xl"
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
  )
}
