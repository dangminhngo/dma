import Link from "next/link"

interface NavLinkProps extends React.PropsWithChildren {
  href: string
  active?: boolean
}

export default function NavLink({
  href,
  active = false,
  ...props
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`${active ? "text-foreground" : "text-foreground/60"} font-medium`}
      {...props}
    />
  )
}
