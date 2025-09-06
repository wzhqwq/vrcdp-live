<script lang="ts">
  import { resize } from "../../actions/resize"

  const { title } = $props()

  let useMarquee = $state(false)

  const handleResize = (entry: ResizeObserverEntry) => {
    const container = entry.target as HTMLElement
    const text = container.querySelector("div.whitespace-nowrap")
    if (!text) return

    useMarquee = text.scrollWidth > container.clientWidth
  }
</script>

<div
  class="-mx-1.5 relative overflow-hidden"
  use:resize={{ callback: handleResize, throttle: 300 }}
>
  <div
    class="absolute z-10 w-2 h-full bg-gradient-to-r from-white dark:from-stone-800 to-white/0 dark:to-stone-800/0"
  ></div>
  <div
    class="absolute z-10 w-4 h-full right-0 bg-gradient-to-l from-white dark:from-stone-800 to-white/0 dark:to-stone-800/0"
  ></div>
  {#if useMarquee}
    <div class="pl-1.5 flex gap-8">
      <div class="whitespace-nowrap marquee">{title}</div>
      <div class="whitespace-nowrap marquee">{title}</div>
    </div>
  {:else}
    <div class="pl-1.5 whitespace-nowrap">{title}</div>
  {/if}
</div>

<style lang="postcss">
  @reference "tailwindcss";

  .marquee {
    animation: marquee 10s linear infinite;
  }

  @keyframes marquee {
    0%,
    20% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(calc(-100% - var(--spacing) * 8));
    }
  }
</style>
