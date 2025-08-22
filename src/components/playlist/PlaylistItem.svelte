<script lang="ts">
  import { slide } from "svelte/transition"
  import { settings } from "../../api/settings.svelte"
  import type { PreloadedSong } from "../../entities/song.svelte"
  import Thumbnail from "../song/Thumbnail.svelte"

  interface PlaylistItemProps {
    song: PreloadedSong
  }
  let { song }: PlaylistItemProps = $props()

  let collapsed = $derived.by(() => {
    if (settings.collapsed == "never") return false
    if (settings.collapsed == "always") return true
    return !song.expanded
  })
  let cornerClass = $derived(
    collapsed
      ? settings.attached
        ? ""
        : "rounded-r-md"
      : settings.attached
        ? settings.side == "left"
          ? "rounded-r-md"
          : "rounded-l-md"
        : "rounded-lg"
  )
</script>

<div
  class={[
    "flex transition-[gap]",
    { "flex-row-reverse": settings.side == "left" },
    collapsed ? "gap-0" : "gap-1",
  ]}
>
  <Thumbnail src={song.getThumbnail()} {collapsed} downloadProgress={60} />
  <div
    class={[
      "flex-1 flex flex-col justify-evenly bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100",
      "transition-[border-radius,padding] duration-300 min-w-48",
      collapsed ? "px-1" : "px-2",
      cornerClass,
    ]}
  >
    <p class={["transition-[font-size] duration-300 overflow-hidden", collapsed ? "text-sm" : "text-lg"]}>
      <span class="text-nowrap">{song.info.title}</span>
    </p>
    {#if !collapsed}
      <div class="text-xs pb-1" transition:slide={{ duration: 300 }}>
        <p class="flex gap-1">
          <span class="text-stone-500 dark:text-stone-300 overflow-hidden text-ellipsis text-nowrap">{song.info.group}</span>
          <span class="text-stone-400 shrink-0">{song.info.songId}</span>
        </p>
        <p class="">
          由{song.info.adder}添加
        </p>
      </div>
    {/if}
  </div>
</div>
