<script lang="ts">
  import { detach } from "../../actions/detach.svelte"

  const { children } = $props()

  let detached = $state(false)
  let placeholderHeight = $state(0)
</script>

<div
  class={[
    "card self-start gap-2 grid grid-cols-[1fr_auto] justify-items-start transition-transform",
    detached ? "scale-105" : "",
  ]}
  use:detach={{
    detached,
    setHeight: (height: number) => {
      placeholderHeight = height
    },
  }}
  onmouseenter={() => {
    detached = true
  }}
  onmouseleave={() => {
    detached = false
  }}
  role="form"
>
  {@render children()}
</div>
{#if detached}
<div style:height={placeholderHeight + "px"}></div>
{/if}
