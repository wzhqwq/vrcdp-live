import { getWsUrl } from "../api/base"
import type { PlaylistUpdateMessage, SongUpdateMessage } from "../api/message"
import { getFullPlaylist } from "../api/playlist"
import { WSSession } from "../api/ws"
import { PreloadedSong } from "./song.svelte"

export class Playlist extends WSSession {
  public current = $state.raw<PreloadedSong[]>([])
  public visibleCount = $state<number>(100)
  private activeSongs: Map<number, PreloadedSong> = new Map()
  private viewportHeight = 0
  private scale = 1
  private collapse: "always" | "never" | "auto" = "auto"

  constructor() {
    super(getWsUrl())
  }

  async fullUpdate() {
    const songs = await getFullPlaylist()
    this.activeSongs.forEach(song => song.removeFromList())
    this.activeSongs.clear()
    this.updateCurrent(
      songs.map(song => {
        const preloadedSong = new PreloadedSong(song)
        this.activeSongs.set(preloadedSong.info.id, preloadedSong)
        return preloadedSong
      })
    )
  }

  handlePlaylistUpdate(message: PlaylistUpdateMessage) {
    const { current, newSongs, removedSongs } = message
    // for removed songs
    removedSongs.forEach(song => {
      this.activeSongs.get(song.id)?.removeFromList()
      this.activeSongs.delete(song.id)
    })
    // for new songs
    newSongs.forEach(song => {
      const preloadedSong = new PreloadedSong(song)
      this.activeSongs.set(preloadedSong.info.id, preloadedSong)
    })
    if (current.some(song => !this.activeSongs.has(song.id))) {
      this.fullUpdate()
      return
    }
    // update current songs
    this.updateCurrent(current.map(song => this.activeSongs.get(song.id)!))
  }

  updateCurrent(songs: PreloadedSong[]) {
    this.current = songs
    if (this.current.length > 0) {
      this.current[0].setOnSongEnded(() => {
        this.current[1]?.setUpcoming()
        this.updateVisibleCount()
      })
      if (this.current[0].info.playStatus !== "queued") {
        let eta = this.current[0].msToEnd()
        for (let i = 1; i < this.current.length; i++) {
          this.current[i].setETA(eta)
          eta += this.current[i].info.duration
        }
      } else {
        this.current[0].setUpcoming()
      }
    }
    this.updateVisibleCount()
  }

  updateViewportHeight(height: number) {
    this.viewportHeight = height
    this.updateVisibleCount()
  }
  updateSettings(scale: number, collapse: "always" | "never" | "auto") {
    this.scale = scale
    this.collapse = collapse
    this.updateVisibleCount()
  }
  updateVisibleCount() {
    this.visibleCount = this.calculateVisibleCount()
  }

  calculateVisibleCount() {
    const style = getComputedStyle(document.documentElement)
    const rem = parseFloat(style.fontSize)
    const spacing = 0.25 * rem
    const collapsedHeight =
      this.collapse == "never"
        ? calculateItemHeight(spacing, this.scale, false)
        : calculateItemHeight(spacing, this.scale, true)
    const expandedHeight =
      this.collapse == "always"
        ? calculateItemHeight(spacing, this.scale, true)
        : calculateItemHeight(spacing, this.scale, false)

    // p-1 in the container
    let accHeight = spacing * 2

    for (let i = 0; i < this.current.length; i++) {
      if (accHeight > this.viewportHeight) {
        return i
      }
      accHeight += (this.current[i].expanded ? expandedHeight : collapsedHeight) + spacing * 2
    }

    return accHeight > this.viewportHeight ? this.current.length : 100
  }

  handleNewPlaylist() {
    this.fullUpdate()
  }

  handleSongUpdate(message: SongUpdateMessage): void {
    const song = this.activeSongs.get(message.id)
    if (song) {
      song.syncInfo(message)
    }
  }

  handleConnected(): void {
    this.fullUpdate()
  }

  destroy() {
    this.close()
  }
}

const heights = {
  collapsed: [27, 30, 36, 42],
  expanded: [54, 54, 63, 81],
}

function calculateItemHeight(spacing: number, scale: number, collapsed: boolean) {
  return collapsed ? heights.collapsed[scale] : heights.expanded[scale] + 5 * spacing
}
