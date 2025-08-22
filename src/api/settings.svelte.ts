export interface SettingsDict {
  theme: "light" | "dark"
  side: "left" | "right"
  attached: boolean
  padded: boolean
  collapsed: "always" | "never" | "auto"
}

export let settings = $state({
  theme: "light",
  side: "right",
  attached: true,
  padded: true,
  collapsed: "auto",
} as SettingsDict)
