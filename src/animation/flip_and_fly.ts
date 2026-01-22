import type { AnimationConfig } from "svelte/animate"
import { cubicIn, cubicOut } from "svelte/easing"
import type { TransitionConfig } from "svelte/transition"
import type { SongAnimationData } from "../entities/song.svelte"

// It's a modified/simplified version of Svelte's flip animation that works with complex list changes

interface FromTo {
  from: DOMRect
  to: DOMRect
}

export function flip(node: Element, { from, to }: FromTo) {
  const style = getComputedStyle(node)

  // find the transform origin, expressed as a pair of values between 0 and 1
  const transform = style.transform === "none" ? "" : style.transform

  // find the translation at the start of the transform
  const dy = from.top - to.top

  return {
    delay: 200,
    duration: dy * 10,
    easing: cubicOut,
    css: (t, u) => `transform: ${transform} translateY(${u * dy}px);`,
  } as AnimationConfig
}

export interface FlyParams {
  side: "left" | "right"
  data: SongAnimationData
}

export function flyIn(node: Element, { side, data }: FlyParams) {
  const style = getComputedStyle(node)
  const transform = style.transform === "none" ? "" : style.transform
  const x_value = side == "right" ? 100 : -100

  const delay = data.hidden ? 200 : 0
  data.hidden = false

  return {
    delay,
    duration: 300,
    easing: cubicOut,
    css: (t, u) => `transform: ${transform} translateX(${u * x_value}%); opacity: ${t};`,
  } as TransitionConfig
}

export function flyOut(node: Element, { side, data }: FlyParams) {
  const style = getComputedStyle(node)
  const transform = style.transform === "none" ? "" : style.transform
  const x_value = side == "right" ? 100 : -100

  return {
    duration: 300,
    easing: cubicIn,
    css: (t, u) => `transform: ${transform} translateX(${u * x_value}%); opacity: ${t};`,
  } as TransitionConfig
}
