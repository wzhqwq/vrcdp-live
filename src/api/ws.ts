import { connectionState } from "./connection.svelte"
import type { Message, PlaylistUpdateMessage } from "./message"

export abstract class WSSession {
  private readonly url:string
  private socket?: WebSocket

  constructor(url: string) {
    this.url = url
    this.connect()
  }

  connect() {
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
        default:
          console.warn("Unknown message type:", message.type)
      }
    })
    this.socket.addEventListener("error", e => {
      console.error("WebSocket error:", e)
      connectionState.connected = false
      connectionState.retrying = true
      setTimeout(() => {
        connectionState.retrying = false
        this.connect()
      }, 5000) // Retry after 5 seconds
    })
    this.socket.addEventListener("open", () => {
      console.log("WebSocket connection established")
      connectionState.connected = true
    })
  }
  handleNewPlaylist() {
    // implement me
  }

  handlePlaylistUpdate(message: PlaylistUpdateMessage) {
    // implement me
  }

  close() {
    this.socket?.close()
  }
}
