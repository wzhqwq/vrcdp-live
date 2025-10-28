<script lang="ts">
  import { Icon } from "svelte-icons-pack"
  import { connectionState } from "./api/connection.svelte"
  import { settings } from "./api/settings.svelte"
  import { checkInLive } from "./api/ua"
  import Connection from "./components/Connection.svelte"
  import PlaylistView from "./components/playlist/PlaylistView.svelte"
  import Settings from "./components/settings/Settings.svelte"
  import { FiArrowRight } from "svelte-icons-pack/fi"
  import { resize } from "./actions/resize"
  import { Playlist } from "./entities/playlist.svelte"

  const opacityClasses = ["opacity-30", "opacity-50", "opacity-75", "opacity-100"]

  let liveMode = $state(false)
  $effect(() => {
    if (connectionState.connected) {
      checkInLive().then(live => {
        liveMode = live
      })
    }
  })

  let currentPlaylist = $state<Playlist | undefined>()
  $effect(() => {
    currentPlaylist = new Playlist()
    return () => {
      currentPlaylist?.destroy()
      currentPlaylist = undefined
    }
  })

  let viewportHeight = $state(0)
  const handleResize = (entry: ResizeObserverEntry) => {
    const container = entry.target as HTMLElement
    viewportHeight = container.clientHeight
  }
  $inspect(viewportHeight)
</script>

<main class={$settings.theme}>
  <div
    class={[
      "text-stone-900 dark:text-stone-100 transition-colors duration-300 w-dvw h-dvh",
      liveMode ? "bg-transparent" : "bg-stone-200 dark:bg-stone-950",
    ]}
  >
    <Connection />
    <div class={["flex h-full gap-2", { "justify-center": !liveMode }]}>
      {#if !liveMode}
        <div class="flex flex-col gap-4 shrink-0 pt-2">
          <Settings />
          {#if connectionState.connected}
            <div
              class="bg-white dark:bg-stone-800 rounded-full flex items-center text-sm p-1 pl-2 self-end"
            >
              预览效果
              <Icon src={FiArrowRight} size="16" />
            </div>
          {/if}
        </div>
      {/if}
      {#if currentPlaylist}
        <div
          class={[
            "scale-level-" + $settings.scale,
            liveMode
              ? "w-full"
              : "relative overflow-hidden w-96 border-stone-300 dark:border-stone-700",
            liveMode ? "" : $settings.side == "left" ? "border-l" : "border-r",
            opacityClasses[$settings.opacity],
          ]}
          use:resize={{ callback: handleResize, throttle: 300 }}
        >
          <PlaylistView {viewportHeight} playlist={currentPlaylist} />
        </div>
      {/if}
    </div>
  </div>
</main>
