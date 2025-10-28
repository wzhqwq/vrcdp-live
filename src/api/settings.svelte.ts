import { writable } from "svelte/store"
import { httpGet } from "./base"

export interface SettingsDict {
  theme: "light" | "dark"
  side: "left" | "right"
  collapsed: "always" | "never" | "auto"

  attached: boolean
  titleMarquee: boolean
  hideOverflowItems: boolean

  scale: number
  opacity: number
}

const defaultSettings:SettingsDict = {
  theme: "light",
  side: "right",
  collapsed: "auto",
  attached: true,
  titleMarquee: true,
  hideOverflowItems: false,
  scale: 1,
  opacity: 3,
}

export const settings = writable<SettingsDict>(defaultSettings)

export const fetchSettings = async () => {
  return JSON.parse(await httpGet<string>("settings"))
}

