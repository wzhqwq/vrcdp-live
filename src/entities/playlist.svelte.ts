import { getWsUrl } from "../api/base"
import type { PlaylistUpdateMessage } from "../api/message"
import { getFullPlaylist } from "../api/playlist"
import type { PreloadedSongInfo } from "../api/song"
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
    this.current = songs.map(song => {
      const preloadedSong = new PreloadedSong(song)
      this.activeSongs.set(preloadedSong.info.id, preloadedSong)
      return preloadedSong
    })
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
    this.current = current.map(song => this.activeSongs.get(song.id)!)
  }

  handleNewPlaylist() {
    this.fullUpdate()
  }
}
