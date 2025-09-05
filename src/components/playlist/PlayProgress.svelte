<script lang="ts">
  import type { PreloadedSong } from "../../entities/song.svelte"

  interface Props {
    song: PreloadedSong
  }
  let { song }: Props = $props()

  let timePassed = $state(0)
  let timer: number | null = null

  function updateTimePassed() {
    timePassed = song.timePassed
    timer = setTimeout(updateTimePassed, 1000)
  }

  $effect(() => {
    if (song.startingTime > 0) {
      updateTimePassed()
      return () => clearTimeout(timer!)
    }
  })

  let width = $derived(`${(timePassed / song.info.duration) * 100}%`)
</script>

<div class="h-0.5 bg-stone-200 dark:bg-stone-700">
  <div class="h-0.5 bg-pink-400 dark:bg-pink-700" style:width></div>
</div>
