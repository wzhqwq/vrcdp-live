<script lang="ts">
  import { fade, slide } from "svelte/transition"
  import { settings } from "../../api/settings.svelte"
  import type { PreloadedSong } from "../../entities/song.svelte"
  import Thumbnail from "../song/Thumbnail.svelte"
  import Title from "../song/Title.svelte"

  interface PlaylistItemProps {
    song: PreloadedSong
  }
  let { song }: PlaylistItemProps = $props()

  let thumbnailLoaded = $state(false)

  let collapsed = $derived.by(() => {
    if ($settings.collapsed == "never") return false
    if ($settings.collapsed == "always") return true
    return !song.expanded
  })
  let cornerClass = $derived(
    collapsed
      ? $settings.attached
        ? ""
        : "rounded-r-md"
      : $settings.attached
        ? $settings.side == "left"
          ? "rounded-r-md"
          : "rounded-l-md"
        : "rounded-lg"
  )
</script>

<div
  class={[
    "flex transition-[gap] duration-300",
    { "flex-row-reverse": $settings.side == "left" },
    collapsed ? "gap-0" : "gap-1",
  ]}
>
  {#if song.label != ""}
    <div
      class={[
        "transition-[margin] origin-top-left duration-300 absolute z-20 h-4 text-xs px-1 rounded-full bg-stone-100 dark:bg-stone-700 shadow text-nowrap text-center",
        thumbnailLoaded ? "w-[96px] mt-0 ml-0" : "-mt-1.5 ml-0.5 scale-80",
      ]}
      transition:fade={{ duration: 300 }}
    >
      {song.label}
    </div>
  {/if}
  <div
    class={[
      "transition-[padding-top] duration-300 pt-0",
      !collapsed && song.label != "" ? (thumbnailLoaded ? "pt-5" : "pt-3") : "pt-0",
    ]}
    transition:slide={{ duration: 300 }}
  >
    <Thumbnail
      src={song.getThumbnail()}
      {collapsed}
      downloadProgress={song.downloadProgress}
      bind:thumbnailLoaded
    />
  </div>
  <div
    class={[
      "flex-1 flex flex-col justify-evenly bg-white dark:bg-stone-800",
      "transition-[border-radius,padding] duration-300 min-w-48 px-2",
      cornerClass,
    ]}
  >
    <div class={["transition-[font-size] duration-300", collapsed ? "text-sm" : "text-lg"]}>
      {#if $settings.titleMarquee}
        <Title title={song.info.title} />
      {:else}
        <div class="text-nowrap overflow-hidden text-ellipsis w-full">{song.info.title}</div>
      {/if}
    </div>
    {#if !collapsed}
      <div class="text-xs pb-1" transition:slide={{ duration: 300 }}>
        <p class="flex gap-1">
          <span
            class="text-stone-500 dark:text-stone-300 overflow-hidden text-ellipsis text-nowrap"
          >
            {song.info.group}
          </span>
          <span class="text-stone-400 shrink-0">{song.info.songId}</span>
        </p>
        <p class="">
          由{song.info.adder}添加
        </p>
      </div>
    {/if}
  </div>
</div>
