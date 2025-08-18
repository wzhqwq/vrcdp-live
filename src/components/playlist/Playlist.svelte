<script lang="ts">
  import { Playlist } from "../../entities/playlist.svelte"

  var currentPlaylist = $state<Playlist | undefined>()
  $effect(() => {
    currentPlaylist = new Playlist()
    return () => {
      currentPlaylist?.destroy()
      currentPlaylist = undefined
    }
  })
</script>

<main></main>

<style>
</style>
