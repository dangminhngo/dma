"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { ManageAccountsIcon, RollerIcon } from "~/components/icons"
import { cn } from "~/lib/utils"

export default function SettingsSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex w-[256px] flex-col items-stretch space-y-0.5 border-r px-2">
      {tabs.map(({ label, href, icon: Icon }) => (
        <SettingsSidebarLink
          key={href}
          href={href}
          active={pathname.startsWith(href)}
        >
          <Icon className="h-5 w-5" /> <span>{label}</span>
        </SettingsSidebarLink>
      ))}
    </div>
  )
}

const tabs = [
  { label: "Account", href: "/settings/account", icon: ManageAccountsIcon },
  { label: "Appearance", href: "/settings/appearance", icon: RollerIcon },
]

interface SettingsSidebarLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  active?: boolean
}

function SettingsSidebarLink({
  active = false,
  className,
  ...props
}: SettingsSidebarLinkProps) {
  return (
    <Link
      className={cn(
        "flex h-10 items-center space-x-2 rounded px-4",
        active
          ? "bg-foreground/5 font-medium text-foreground"
          : "text-foreground/60",
        className
      )}
      {...props}
    />
  )
}
