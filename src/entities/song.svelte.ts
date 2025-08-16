import type { PreloadedSongInfo } from "../api/song"


export class PreloadedSong {
  info: PreloadedSongInfo

  visualState = $state<"created" | "entering" | "idle" | "playing" | "exiting" | "exited">("created")

  constructor(info: PreloadedSongInfo) {
    this.info = info
  }

  public removeFromList() {

  }

  public syncTime(currentTime: number) {

  }
}