"use client"

import { type Session } from "next-auth"
import { signOut } from "next-auth/react"

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
import { Heading } from "~/components/ui/heading"
import { api } from "~/trpc/react"

interface AccountDangerProps {
  session: Session
}

export default function AccountDanger({ session }: AccountDangerProps) {
  const deactivateMutation = api.account.deactivate.useMutation({
    async onSuccess() {
      await signOut({ callbackUrl: "/sign-in" })
    },
  })

  function onDeactivate() {
    deactivateMutation.mutate()
  }

  return (
    <div className="space-y-2">
      <Heading as="h3" className="text-destructive">
        Danger
      </Heading>
      <div className="flex items-center justify-between rounded-lg border border-destructive bg-destructive/15 p-4">
        <div>
          <div className="font-medium">Deactivate Account</div>
          <div className="text-muted-foreground">
            Your account is deactivate and you cannot sign in after that. This
            makes you log out from all devices.
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Continue</Button>
          </AlertDialogTrigger>
          <AlertDialogPortal>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure to deactivate your account?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You cannot sign in until you are allowed to re-activate by us.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={onDeactivate}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogPortal>
        </AlertDialog>
      </div>
    </div>
  )
}
