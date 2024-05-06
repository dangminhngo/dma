"use client"

import { notFound } from "next/navigation"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { type RouterOutput } from "~/trpc/types"
import ScoreTable from "./score-table"

interface AssignmentManagementsProps {
  assignment: RouterOutput["assignment"]["byId"]
}
export default function AssignmentManagements({
  assignment,
}: AssignmentManagementsProps) {
  if (!assignment) return notFound()

  return (
    <div>
      <Tabs defaultValue="scores">
        <TabsList>
          <TabsTrigger value="scores">Scores</TabsTrigger>
        </TabsList>
        <TabsContent value="scores">
          <ScoreTable assignmentId={assignment.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
