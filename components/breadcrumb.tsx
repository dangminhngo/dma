import Link from "next/link"

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"

interface BreadcrumbProps {
  links: { label: string; href?: string }[]
}

export default function Breadcrumb({ links }: BreadcrumbProps) {
  return (
    <BreadcrumbRoot>
      <BreadcrumbList>
        {links.map((link, _index) => (
          <>
            <BreadcrumbItem>
              {_index === links.length - 1 ? (
                <BreadcrumbPage>{link.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={link.href ?? ""}>{link.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {_index < links.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </BreadcrumbRoot>
  )
}
