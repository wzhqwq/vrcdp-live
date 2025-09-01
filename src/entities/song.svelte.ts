import { getThumbnailUrl, type PreloadedSongInfo } from "../api/song"


export class PreloadedSong {
  visualState = $state<"created" | "entering" | "idle" | "playing" | "exiting" | "exited">("created")
  expanded = $state<boolean>(false)
  downloadProgress = $state<number>(0)
  playing = $state<boolean>(false)
  label = $state<string>("")
  startingTime = $state<number>(0)

  onSongEnded?: () => void

  constructor(public info: PreloadedSongInfo) {
    this.info = info
    this.infoUpdated()
  }

  infoUpdated(keys?: (keyof PreloadedSongInfo)[]) {
    if (!keys || keys.includes("timePassed")) {
      this.startingTime = Date.now() - this.info.timePassed
    }
    if (!keys || keys.includes("playStatus")) {
      if (!this.playing && this.info.playStatus === "playing") {
        this.setPlaying()
      } else if (this.playing && this.info.playStatus === "ended") {
        this.setEnded()
      }
    }
    if (!keys || keys.includes("downloadProgress") || keys.includes("downloadStatus")) {
      this.downloadProgress = this.info.downloadProgress ?? (this.info.downloadStatus === "downloaded" ? 100 : 0)
    }
  }

  public removeFromList() {

  }

  public syncInfo(info: Partial<PreloadedSongInfo>) {
    this.info = { ...this.info, ...info }
    this.infoUpdated(Object.keys(info) as (keyof PreloadedSongInfo)[])
  }

  public getThumbnail() {
    return getThumbnailUrl(this.info)
  }

  public setPlaying() {
    this.playing = true
    this.expanded = true
    this.label = "正在播放"
  }

  public setEnded() {
    this.playing = false
    this.label = "结束力"
    this.onSongEnded?.()
  }

  public setUpcoming() {
    this.expanded = true
    this.label = "即将播放"
  }

  public setETA(eta: number) {
    const time = new Date(Date.now() + eta * 1000)
    this.label = `预计 ${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")} 播放`
  }

  public setOnSongEnded(callback: () => void) {
    this.onSongEnded = callback
    if (this.info.playStatus === "ended") {
      this.onSongEnded?.()
    }
  }

  public secondsToEnd() {
    return Math.max(0, this.info.duration - (this.info.timePassed ?? 0))
  }
}