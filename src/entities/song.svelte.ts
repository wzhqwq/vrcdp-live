import { getThumbnailUrl, type PreloadedSongInfo } from "../api/song"


export class PreloadedSong {
  info: PreloadedSongInfo

  visualState = $state<"created" | "entering" | "idle" | "playing" | "exiting" | "exited">("created")
  expanded = $state<boolean>(false)
  downloadProgress = $state<number>(0)
  playing = $state<boolean>(false)
  label = $state<string>("")

  constructor(info: PreloadedSongInfo) {
    this.info = info
    this.playing = info.playing
    this.downloadProgress = info.downloadProgress
  }

  public removeFromList() {

  }

  public syncTime(currentTime: number) {

  }

  public getThumbnail() {
    return getThumbnailUrl(this.info)
  }

  public setPlaying() {
    this.playing = true
    this.expanded = true
    this.label = "正在播放"
  }

  public setUpcoming() {
    this.expanded = true
    this.label = "即将播放"
  }

  public setETA(eta: number) {
    const time = new Date(Date.now() + eta * 1000)
    this.label = `预计 ${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")} 播放`
  }
}