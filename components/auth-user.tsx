"use client"

import { type User } from "next-auth"

import ProfileImage from "./profile-image"
import { Button } from "./ui/button"

interface AuthUserProps {
  user: User
}

export default function AuthUser({ user }: AuthUserProps) {
  return (
    <Button variant="ghost" className="space-x-2">
      <ProfileImage image={user.image} name={user.name} />
      <span>{user.name}</span>
    </Button>
  )
}
