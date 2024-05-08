import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { api } from "~/trpc/server"
import WordFlashcards from "./word-flashcards"
import WordList from "./word-list"

export default async function SetPage({ params }: { params: { id: string } }) {
  const words = await api.word.list({ setId: +params.id })

  return (
    <div>
      <Tabs defaultValue="flashcards">
        <TabsList>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>
        <TabsContent value="flashcards">
          <WordFlashcards words={words} />
        </TabsContent>
        <TabsContent value="list">
          <WordList words={words} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
