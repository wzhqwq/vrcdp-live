import { getThumbnailUrl, type PreloadedSongInfo } from "../api/song"


export class PreloadedSong {
  info: PreloadedSongInfo

  visualState = $state<"created" | "entering" | "idle" | "playing" | "exiting" | "exited">("created")
  expanded = $state<boolean>(false)

  constructor(info: PreloadedSongInfo) {
    this.info = info
  }

  public removeFromList() {

  }

  public syncTime(currentTime: number) {

  }

  public getThumbnail() {
    return getThumbnailUrl(this.info)
  }
}