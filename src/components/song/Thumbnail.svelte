<script lang="ts">
  import { Icon } from "svelte-icons-pack"
  import { FiArrowDown } from "svelte-icons-pack/fi"
  import { fade } from "svelte/transition"
  import { settings } from "../../api/settings.svelte"

  interface ThumbnailProps {
    src: string
    collapsed: boolean
    downloadProgress: number
  }
  let { src, collapsed, downloadProgress }: ThumbnailProps = $props()
  let thumbnailLoaded = $state<boolean>(false)
  let progressText = $derived(downloadProgress.toFixed())

  $effect(() => {
    if (collapsed) {
      thumbnailLoaded = false
    }
  })

  let width = $derived(thumbnailLoaded ? "96px" : "6px")
  let height = $derived(collapsed ? "30px" : "72px")
  let cornerClass = $derived(
    collapsed ? (settings.side == "left" ? "rounded-r-md" : "rounded-l-md") : "rounded-md"
  )
</script>

<div
  class={[
    "relative transition-[height,width,border-radius] duration-300 overflow-hidden",
    cornerClass,
  ]}
  style:width
  style:height
>
  {#if !collapsed}
    <img
      {src}
      class="absolute h-full w-full object-cover"
      alt="Thumbnail"
      onload={() => {
        thumbnailLoaded = true
      }}
    />
  {/if}
  {#if thumbnailLoaded}
    <div
      class="absolute bottom-0 w-full bg-black/50"
      style:height={(100 - downloadProgress).toFixed(1) + "%"}
      transition:fade={{ duration: 300 }}
    ></div>
    <div
      class="absolute w-full bg-white/80 shadow-[0_0_4px_1px_#fff8] h-[1px]"
      style:top={downloadProgress.toFixed(1) + "%"}
      transition:fade={{ duration: 300 }}
    ></div>
    {#if progressText != "100"}
      <div
        class="absolute left-0.5 bottom-0.5 bg-stone-800 text-white rounded-sm flex items-center"
      >
        <Icon src={FiArrowDown} size="14" />
        <span class="-ml-0.5 w-5 text-center text-xs">
          {progressText}
        </span>
      </div>
    {/if}
  {:else}
    <div
      class="absolute w-full h-full bg-pink-200 dark:bg-pink-900"
      transition:fade={{ duration: 300 }}
    >
      <div
        class="absolute top-0 w-full bg-pink-600"
        style:height={downloadProgress.toFixed(1) + "%"}
      ></div>
    </div>
  {/if}
</div>
