import { getApiUrl } from "./base"

export interface PreloadedSongInfo {
  id: number
  songId: string
  title: string
  adder: string
  group: string

  playing: boolean
  downloading: boolean
  statusText: string

  duration: number
  timePassed: number

  downloadProgress: number
  error?: string
}

export type PreloadedSongInfoShort = Pick<PreloadedSongInfo, "id">

export const getThumbnailUrl = (song: PreloadedSongInfo) => {
  return getApiUrl(`thumbnail/${song.songId}`)
}
