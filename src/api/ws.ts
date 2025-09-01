import { connectionState } from "./connection.svelte"
import type { Message, PlaylistUpdateMessage, SongUpdateMessage } from "./message"

const retryMinInterval = 5000 // 5 seconds

export abstract class WSSession {
  private readonly url: string
  private socket?: WebSocket
  private closed = false

  constructor(url: string) {
    this.url = url
    this.connect()
  }

  connect() {
    connectionState.connecting = true
    this.socket = new WebSocket(this.url)
    this.socket.addEventListener("message", e => {
      const message = JSON.parse(e.data) as Message
      switch (message.type) {
        case "PL_UPDATE":
          this.handlePlaylistUpdate(message.payload as PlaylistUpdateMessage)
          break
        case "PL_NEW":
          this.handleNewPlaylist()
          break
        case "SONG_UPDATE":
          this.handleSongUpdate(message.payload as SongUpdateMessage)
          break
        default:
          console.warn("Unknown message type:", message.type)
      }
    })
    this.socket.addEventListener("open", () => {
      console.log("WebSocket connection established")
      connectionState.connected = true
      connectionState.connecting = false
    })
    this.socket.addEventListener("close", () => {
      console.log("WebSocket connection closed")
      connectionState.connecting = false
      this.fail()
    })
  }
  private lastRetryTime = 0

  fail() {
    connectionState.connected = false
    if (!connectionState.connecting && !this.closed) {
      const now = Date.now()
      if (now - this.lastRetryTime > retryMinInterval) {
        this.lastRetryTime = now
        this.retry()
      } else {
        setTimeout(() => {
          if (!connectionState.connected) {
            this.fail()
          }
        }, retryMinInterval - (now - this.lastRetryTime))
      }
    }
  }
  retry() {
    console.log("retry at", new Date().toLocaleTimeString())
    this.connect()
  }

  handleNewPlaylist() {
    // implement me
  }

  handlePlaylistUpdate(message: PlaylistUpdateMessage) {
    // implement me
  }

  handleSongUpdate(message: SongUpdateMessage) {
    // implement me
  }

  close() {
    this.closed = true
    this.socket?.close()
  }
}
