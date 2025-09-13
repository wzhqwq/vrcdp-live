import { getThumbnailUrl, type PreloadedSongInfo } from "../api/song"

export class PreloadedSong {
  expanded = $state<boolean>(false)
  downloadProgress = $state<number>(0)
  playing = $state<boolean>(false)
  label = $state<string>("")
  labelClass = $state<string>("bg-stone-100 dark:bg-stone-700")
  startingTime = $state<number>(0)

  title = $state<string>("")
  group = $state<string>("")

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
      this.downloadProgress =
        this.info.downloadStatus === "downloaded" ? 100 : this.info.downloadProgress ?? 0
    }
    if (!keys || keys.includes("title")) {
      this.title = this.info.title
    }
    if (!keys || keys.includes("group")) {
      this.group = this.info.group
    }
  }

  public removeFromList() {}

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
    this.labelClass = "bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300"
  }

  public setEnded() {
    this.playing = false
    this.label = "结束力"
    this.labelClass = "bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400"
    this.onSongEnded?.()
  }

  public setUpcoming() {
    this.expanded = true
    this.label = "即将播放"
    this.labelClass = "bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 animate-pulse"
  }

  public setETA(eta: number) {
    const time = new Date(Date.now() + eta)
    const hours = time.getHours().toString().padStart(2, "0")
    const minutes = time.getMinutes().toString().padStart(2, "0")
    this.label = `预计 ${hours}:${minutes} 播放`
    this.labelClass = "bg-stone-100 dark:bg-stone-700"
  }

  public setOnSongEnded(callback: () => void) {
    this.onSongEnded = callback
    if (this.info.playStatus === "ended") {
      this.onSongEnded?.()
    }
  }

  get timePassed() {
    return this.info.playStatus == "queued" ? 0 : Date.now() - this.startingTime
  }

  public msToEnd() {
    return Math.max(0, this.info.duration - this.timePassed)
  }
}
