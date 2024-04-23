"use client"

import { type Session } from "next-auth"

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Heading } from "~/components/ui/heading"
import ChangePassword from "./change-password"

interface AccountSecurityProps {
  session: Session
}

export default function AccountSecurity({ session }: AccountSecurityProps) {
  return (
    <div className="space-y-2">
      <Heading as="h3">Security</Heading>
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <div className="font-medium">Change Password</div>
          <div className="text-muted-foreground">
            You can change your password here.
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Change</Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change your password</DialogTitle>
                <DialogDescription>
                  Provide your old password and new password to continue
                </DialogDescription>
              </DialogHeader>
              <ChangePassword />
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </div>
  )
}
