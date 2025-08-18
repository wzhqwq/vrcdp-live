<script lang="ts">
  import { connectionState } from "./api/connection.svelte"
  import { checkInLive } from "./api/ua"
  import Connection from "./components/Connection.svelte"
  import Playlist from "./components/playlist/Playlist.svelte"

  let liveMode = $state(false)
  $effect(() => {
    if (connectionState.connected) {
      checkInLive().then(live => {
        liveMode = live
      })
    }
  })
</script>

<main class={{ live: liveMode }}>
  <Connection />
  <Playlist />
</main>

<style lang="postcss">
  @reference "tailwindcss";
  main {
    @apply bg-pink-100 dark:bg-pink-800;
    width: 100vw;
    height: 100vh;
  }
  main.live {
    @apply bg-transparent;
  }
</style>
