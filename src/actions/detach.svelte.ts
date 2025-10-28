
export interface DetachOptions {
  detached: boolean
  setHeight?: (height: number) => void
}

export function detach(node: HTMLElement, { detached, setHeight }: DetachOptions) {
  function update({ detached, setHeight }: DetachOptions) {
    if (detached) {
      const box = node.getBoundingClientRect()
      node.style.position = 'fixed'
      node.style.left = `${box.left}px`
      node.style.top = `${box.top}px`
      node.style.width = `${box.width}px`
      node.style.height = `${box.height}px`
      node.style.zIndex = '9999'
      setHeight?.(box.height)
    } else {
      node.style.position = ''
      node.style.left = ''
      node.style.top = ''
      node.style.width = ''
      node.style.height = ''
      node.style.zIndex = ''
    }
  }

  update({ detached, setHeight })

  return {
    update(params: DetachOptions) {
      update(params)
    }
  }
}