"use client"

import { type ColumnDef } from "@tanstack/react-table"

import DataTable from "~/components/data-table"
import TableLoading from "~/components/table-loading"
import { formatDateTime } from "~/lib/utils"
import { api } from "~/trpc/react"
import { type RouterOutput } from "~/trpc/types"
import { type InferElement } from "~/types"

type ScoreRanking = InferElement<RouterOutput["score"]["listByAssignment"]>

interface AssignmentRankingsProps {
  assignmentId: number
}

export default function AssignmentRankings({
  assignmentId,
}: AssignmentRankingsProps) {
  const columns: ColumnDef<ScoreRanking>[] = [
    {
      header: "Ranking",
      cell: (props) => props.row.index + 1,
    },
    {
      accessorKey: "student.name",
      header: "Student",
      cell: (props) => (
        <strong className="font-medium">{props.getValue() as string}</strong>
      ),
    },
    { accessorKey: "student.email", header: "Email" },
    { accessorKey: "points", header: "Points" },
    {
      accessorKey: "createdAt",
      header: "Timestamps",
      cell: (props) => formatDateTime(props.getValue() as Date),
    },
  ]
  const scoreRankingsQuery = api.score.listByAssignment.useQuery({
    assignmentId,
  })

  if (scoreRankingsQuery.isLoading) return <TableLoading cols={5} rows={4} />

  if (scoreRankingsQuery.isError || !scoreRankingsQuery.data)
    return <div>Error</div>

  return <DataTable columns={columns} data={scoreRankingsQuery.data} />
}
