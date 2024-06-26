import SettingsSidebar from "./settings-sidebar"

export default function SettingsLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen items-stretch space-x-6">
      <SettingsSidebar />
      <div className="flex-1">{children}</div>
    </div>
  )
}
