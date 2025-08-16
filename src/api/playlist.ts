import { httpGet } from "./base"
import type { PreloadedSongInfo } from "./song"

export const getFullPlaylist = async () => {
  return await httpGet<PreloadedSongInfo[]>("playlist")
}
