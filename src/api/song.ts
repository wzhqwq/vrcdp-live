import { getApiUrl } from "./base"

export interface PreloadedSong {
  id: number
  songId: string
  title: string
  artist: string
  group: string

  playing: boolean
  downloading: boolean
  statusText: string

  duration: number
  timePassed: number

  downloadProgress: number
  error?: string
}

const getThumbnailUrl = (song: PreloadedSong) => {
  return getApiUrl(`thumbnail/${song.songId}`)
}