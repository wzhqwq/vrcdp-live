import type { PreloadedSongInfo, PreloadedSongInfoShort } from "./song"

export interface Message {
  type: string
  payload: any
}

export interface PlaylistUpdateMessage {
  current: PreloadedSongInfoShort[]
  newSongs: PreloadedSongInfo[]
  removedSongs: PreloadedSongInfoShort[]
}

export type SongUpdateMessage = Pick<PreloadedSongInfo, "id"> &
  Partial<
    Pick<
      PreloadedSongInfo,
      "playStatus" | "timePassed" | "downloadProgress" | "downloadStatus" | "error"
    >
  >
