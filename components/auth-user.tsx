"use client"

import { type User } from "next-auth"

import { LogoutIcon, SettingsIcon } from "./icons"
import ProfileImage from "./profile-image"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface AuthUserProps {
  user: User
}

export default function AuthUser({ user }: AuthUserProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="space-x-2">
          <ProfileImage image={user.image} name={user.name} />
          <span>{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="min-w-[256px]" align="end">
          <DropdownMenuGroup>
            <div className="flex items-center space-x-2 px-4 py-2">
              <ProfileImage image={user.image} name={user.name} size={40} />
              <div className="flex flex-col -space-y-0.5">
                <span className="font-medium">{user.name}</span>
                <span className="text-sm text-foreground/60">{user.email}</span>
              </div>
            </div>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer space-x-2">
              <SettingsIcon className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer space-x-2 text-destructive/80 hover:text-destructive focus:text-destructive">
              <LogoutIcon className="h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}