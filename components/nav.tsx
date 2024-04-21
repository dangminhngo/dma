"use client"

import { usePathname } from "next/navigation"
import { UserRole } from "@prisma/client"
import { type User } from "next-auth"

import NavLink from "./nav-link"

interface NavProps {
  user: User
}

export default function Nav({ user }: NavProps) {
  const pathname = usePathname()

  return (
    <nav>
      <ul className="flex items-center space-x-8">
        {links[user.role].map(({ label, href }) => (
          <li key={href}>
            <NavLink href={href} active={pathname.startsWith(href)}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const links = {
  [UserRole.TEACHER]: [
    {
      label: "Courses",
      href: "/t/courses",
    },
  ],
  [UserRole.STUDENT]: [
    {
      label: "Courses",
      href: "/s/courses",
    },
  ],
}
