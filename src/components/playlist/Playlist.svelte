<script lang="ts">
  import { flip } from "svelte/animate"
  import { Playlist } from "../../entities/playlist.svelte"
  import PlaylistItem from "./PlaylistItem.svelte"
  import { fly } from "svelte/transition"
  import { settings } from "../../api/settings.svelte"

  var currentPlaylist = $state<Playlist | undefined>()
  $effect(() => {
    currentPlaylist = new Playlist()
    return () => {
      currentPlaylist?.destroy()
      currentPlaylist = undefined
    }
  })

  var flyParams = $derived({ duration: 300, x: $settings.side == "right" ? "100%" : "-100%" })
</script>

<div class={["p-1", $settings.attached ? ($settings.side == "left" ? "pl-0" : "pr-0") : ""]}>
  {#if currentPlaylist}
    <div class="flex flex-col gap-2">
      {#each currentPlaylist.current as song (song.info.id)}
        <div animate:flip={{ duration: 300, delay: 200 }} transition:fly={flyParams}>
          <PlaylistItem {song} />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
</style>
