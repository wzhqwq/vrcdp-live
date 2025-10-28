import { getWsUrl } from "../api/base"
import type { PlaylistUpdateMessage, SongUpdateMessage } from "../api/message"
import { getFullPlaylist } from "../api/playlist"
import { WSSession } from "../api/ws"
import { PreloadedSong } from "./song.svelte"

export class Playlist extends WSSession {
  public current = $state.raw<PreloadedSong[]>([])
  private activeSongs: Map<number, PreloadedSong> = new Map()

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
