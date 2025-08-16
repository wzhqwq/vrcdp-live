

let apiPort = 5678

export function getApiUrl(path: string): string {
  return `http://127.0.0.1:${apiPort}/${path}`
}

export function getWsUrl(): string {
  return `ws://127.0.0.1:${apiPort}/ws`
}

interface StandardResult<T> {
  ok: boolean
  data?: T
  message?: string
}

export async function httpGet<T>(path: string) : Promise<T> {
  const response = await fetch(getApiUrl(path))
  if (!response.ok) {
    throw new Error(`请求失败: ${response.status}`)
  }
  const result: StandardResult<T> = await response.json()
  if (!result.ok) {
    throw new Error(result.message || '未知错误')
  }
  return result.data as T
}