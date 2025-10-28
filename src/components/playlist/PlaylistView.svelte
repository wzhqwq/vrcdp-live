<script lang="ts">
  import { flip } from "svelte/animate"
  import { Playlist } from "../../entities/playlist.svelte"
  import PlaylistItem from "./PlaylistItem.svelte"
  import { fly } from "svelte/transition"
  import { settings } from "../../api/settings.svelte"

  interface PlaylistProps {
    playlist: Playlist
  }
  let { playlist }: PlaylistProps = $props()

  let flyParams = $derived({ duration: 300, x: $settings.side == "right" ? "100%" : "-100%" })
</script>

<div class={["p-1", $settings.attached ? ($settings.side == "left" ? "pl-0" : "pr-0") : ""]}>
  {#if playlist}
    <div class="flex flex-col">
      {#each playlist.current as song (song.info.id)}
        <div
          animate:flip={{ duration: 300, delay: 200 }}
          transition:fly={flyParams}
          class="not-first-of-type:pt-2 overflow-clip"
        >
          <PlaylistItem {song} />
        </div>
      {/each}
    </div>
  {/if}
</div>
