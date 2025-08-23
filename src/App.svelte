<script lang="ts">
  import { Icon } from "svelte-icons-pack"
  import { connectionState } from "./api/connection.svelte"
  import { settings } from "./api/settings.svelte"
  import { checkInLive } from "./api/ua"
  import Connection from "./components/Connection.svelte"
  import Playlist from "./components/playlist/Playlist.svelte"
  import Settings from "./components/settings/Settings.svelte"
  import { FiArrowRight } from "svelte-icons-pack/fi"

  let liveMode = $state(false)
  $effect(() => {
    if (connectionState.connected) {
      checkInLive().then(live => {
        liveMode = live
      })
    }
  })
</script>

<main class={settings.theme}>
  <div
    class={[
      "bg-stone-200 dark:bg-stone-950 transition-colors duration-500 w-dvw h-dvh",
      { "bg-transparent": liveMode },
    ]}
  >
    <Connection />
    <div class={["flex h-full gap-2", { "justify-center": !liveMode }]}>
      {#if !liveMode}
        <div class="flex flex-col gap-2 shrink-0">
          <Settings />
          {#if connectionState.connected}
            <div
              class="bg-white dark:bg-stone-800 dark:text-white rounded-full flex items-center text-sm p-1 pl-2 self-end"
            >
              预览效果
              <Icon src={FiArrowRight} size="16" />
            </div>
          {/if}
        </div>
      {/if}
      <div
        class={[
          liveMode ? "w-full" : "relative overflow-hidden w-96 border-stone-300 dark:border-stone-700",
          liveMode ? "" : settings.side == "left" ? "border-l" : "border-r",
        ]}
      >
        <Playlist />
      </div>
    </div>
  </div>
</main>
