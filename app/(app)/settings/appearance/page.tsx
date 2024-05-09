import { Heading } from "~/components/ui/heading"
import SettingsAppearance from "./settings-appearance"

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-4">
      <Heading as="h1">Appearance</Heading>
      <SettingsAppearance />
    </div>
  )
}
