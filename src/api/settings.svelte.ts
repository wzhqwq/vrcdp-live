import { writable } from "svelte/store"
import { httpGet } from "./base"

export interface SettingsDict {
  theme: "light" | "dark"
  side: "left" | "right"
  attached: boolean
  collapsed: "always" | "never" | "auto"
  titleMarquee: boolean
}

const defaultSettings:SettingsDict = {
  theme: "light",
  side: "right",
  attached: true,
  collapsed: "auto",
  titleMarquee: true,
}

export const settings = writable<SettingsDict>(defaultSettings)

export const fetchSettings = async () => {
  return JSON.parse(await httpGet<string>("settings"))
}

