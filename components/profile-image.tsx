import { AvatarFallback } from "@radix-ui/react-avatar"
import { type User } from "next-auth"

import { env } from "~/env"
import { Avatar, AvatarImage } from "./ui/avatar"

interface ProfileImageProps extends Pick<User, "name" | "image"> {
  size?: number
}

export default function ProfileImage({
  image,
  name,
  size = 24,
}: ProfileImageProps) {
  return (
    <Avatar style={{ width: size, height: size }}>
      {image && (
        <AvatarImage
          src={`${env.NEXT_PUBLIC_R2_PUBLIC_URL}/${image}`}
          alt={name ?? undefined}
        />
      )}
      <AvatarFallback
        className="tracking-none flex h-full w-full items-center justify-center bg-foreground leading-none text-background"
        style={{ fontSize: size / 1.5 }}
      >
        {name?.[0]}
      </AvatarFallback>
    </Avatar>
  )
}
