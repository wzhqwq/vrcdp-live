export interface ResizeConfig {
  callback: (rect: ResizeObserverEntry) => void
  throttle?: number
}

export function resize(node: HTMLElement, { callback, throttle }: ResizeConfig) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastEntry: ResizeObserverEntry | null = null

  const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
      if (throttle && throttle > 0) {
        lastEntry = entry
        if (!timeoutId) {
          timeoutId = setTimeout(() => {
            if (lastEntry) callback(lastEntry)
            timeoutId = null
            lastEntry = null
          }, throttle)
        }
      } else {
        callback(entry)
      }
    }
  })

  observer.observe(node)

  return {
    destroy() {
      observer.disconnect()
      if (timeoutId) clearTimeout(timeoutId)
    },
  }
}
