<script lang="ts">
  import { flip, flyIn, flyOut } from "../../animation/flip_and_fly"
  import { Playlist } from "../../entities/playlist.svelte"
  import PlaylistItem from "./PlaylistItem.svelte"
  import { settings } from "../../api/settings.svelte"

  interface PlaylistProps {
    viewportHeight: number
    playlist: Playlist
  }
  let { viewportHeight, playlist }: PlaylistProps = $props()

  $effect(() => {
    if ($settings.hideOverflowItems) playlist.updateViewportHeight(viewportHeight)
  })
  $effect(() => {
    if ($settings.hideOverflowItems) playlist.updateSettings($settings.scale, $settings.collapsed)
  })

  let visibleItems = $derived(
    playlist.current.slice(0, $settings.hideOverflowItems ? playlist.visibleCount : 100)
  )
</script>

<div class={["p-1", $settings.attached ? ($settings.side == "left" ? "pl-0" : "pr-0") : ""]}>
  <div class="flex flex-col">
    {#each visibleItems as song, i (song.info.id)}
      <div
        animate:flip
        in:flyIn={{ side: $settings.side, data: song.animationData }}
        out:flyOut={{ side: $settings.side, data: song.animationData }}
        class="not-first-of-type:pt-2 overflow-clip"
      >
        <PlaylistItem
          {song}
          halfVisible={$settings.hideOverflowItems && i == playlist.visibleCount - 1}
        />
      </div>
    {/each}
  </div>
</div>
