export interface SettingsDict {
  theme: "light" | "dark"
  side: "left" | "right"
  attached: boolean
  collapsed: "always" | "never" | "auto"
  titleMarquee: boolean
}

export let settings = $state({
  theme: "light",
  side: "right",
  attached: true,
  collapsed: "auto",
  titleMarquee: true,
} as SettingsDict)
