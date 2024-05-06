import { useMemo } from "react"
import { type ColumnDef } from "@tanstack/react-table"

import DataTable from "~/components/data-table"
import { CloseIcon } from "~/components/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import { api } from "~/trpc/react"
import { type RouterOutput } from "~/trpc/types"
import { type InferElement } from "~/types"
import { formatDateTime } from "~/lib/utils"

type ScoreRow = InferElement<RouterOutput["score"]["listByAssignment"]>

interface ScoreTableProps {
  assignmentId: number
}

export default function ScoreTable({ assignmentId }: ScoreTableProps) {
  const utils = api.useUtils()
  const scoreListByAssignmentQuery = api.score.listByAssignment.useQuery({
    assignmentId,
  })
  const allowRetakeMutation = api.assignment.allowRetake.useMutation({
    async onSuccess(data) {
      await utils.score.listByAssignment.invalidate({
        assignmentId: data.assignmentId,
      })
    },
    async onError(err) {
      console.error(err)
    },
  })

  function onAllowRetake(studentId: string) {
    allowRetakeMutation.mutate({ studentId, assignmentId })
  }

  const columns = useMemo<ColumnDef<ScoreRow>[]>(
    () => [
      {
        accessorKey: "student.name",
        header: "Student",
      },
      {
        accessorKey: "student.email",
        header: "Email",
      },
      {
        accessorKey: "points",
        header: "Points",
      },
      {
        accessorKey: "createdAt",
        header: "Timestamp",
        cell: (props) => formatDateTime(props.getValue() as Date)
      },
      {
        header: "Actions",
        cell: (props) => {
          const scoreRow = props.row.original

          if (!scoreRow) return null

          return (
            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="icon-sm">
                    <CloseIcon className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogPortal>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove all results of this student in the
                        assignment.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onAllowRetake(scoreRow?.studentId)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogPortal>
              </AlertDialog>
            </div>
          )
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  if (scoreListByAssignmentQuery.isLoading) return <div>Loading...</div>

  if (scoreListByAssignmentQuery.isError || !scoreListByAssignmentQuery.data)
    return <div>Error</div>

  return <DataTable columns={columns} data={scoreListByAssignmentQuery.data} />
}
