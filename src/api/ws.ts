import { connectionState } from "./connection.svelte"
import type { Message, PlaylistUpdateMessage, SongUpdateMessage } from "./message"
import { fetchSettings, settings, type SettingsDict } from "./settings.svelte"

const retryMinInterval = 5000 // 5 seconds

export abstract class WSSession {
  private readonly url: string
  private socket?: WebSocket
  private closed = false

  private settingsOnServer?: SettingsDict
  private settingsUnsubscribe?: () => void
  private isSyncingFromServer = false
  private connectionCount = 0

  constructor(url: string) {
    this.url = url
    this.connect()
  }

  syncSettingsFromServer() {
    if (!this.settingsOnServer) {
      return
    }
    this.isSyncingFromServer = true
    settings.update(s => ({ ...s, ...this.settingsOnServer }))
    this.isSyncingFromServer = false
  }

  connect() {
    connectionState.connecting = true

    this.connectionCount = 0
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
        case "SETTINGS":
          this.settingsOnServer = JSON.parse(message.payload)
          this.syncSettingsFromServer()
        default:
          console.warn("Unknown message type:", message.type)
      }
    })
    this.socket.addEventListener("open", () => {
      this.connectionCount++
      if (this.connectionCount > 1) return

      console.log("WebSocket connection established")

      connectionState.connected = true
      connectionState.connecting = false
      this.settingsUnsubscribe = settings.subscribe(newSettings => {
        if (!this.settingsOnServer || this.isSyncingFromServer) {
          return
        }
        const keys = Object.keys(newSettings) as (keyof SettingsDict)[]
        if (this.socket && keys.some(key => newSettings[key] !== this.settingsOnServer?.[key])) {
          const payload = JSON.stringify(newSettings)
          this.socket.send(
            JSON.stringify({
              type: "SETTINGS",
              payload,
            })
          )
          this.settingsOnServer = JSON.parse(payload)
        }
      })
      fetchSettings().then(settings => {
        this.settingsOnServer = settings
        this.syncSettingsFromServer()
      })
    })
    this.socket.addEventListener("close", () => {
      this.connectionCount--
      if (this.connectionCount > 0) return

      this.settingsUnsubscribe?.()
      this.settingsUnsubscribe = undefined

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
