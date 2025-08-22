<script lang="ts">
  import { connectionState } from "../api/connection.svelte"
  import { Icon } from "svelte-icons-pack"
  import { FiArrowRight } from "svelte-icons-pack/fi"
  import { fade } from "svelte/transition"
  import Spinner from "./Spinner.svelte"

  let inputPort = $state(connectionState.port)
  let modified = $derived(inputPort !== connectionState.port)
</script>

{#if !connectionState.connected}
  <div class="modal card" transition:fade>
    <p class="text-red-600">
      {#if connectionState.connecting}
        <Spinner />
      {/if}
      VRCDP未连接
    </p>
    <p class="text-sm">调整VRCDP直播端口</p>
    <form
      onsubmit={e => {
        e.preventDefault()
        if (modified) {
          connectionState.port = inputPort
        }
      }}
    >
      <div class="flex gap-2">
        <input class="min-w-10" bind:value={inputPort} type="number" min="1" max="65535" />
        <button type="submit" class="primary">
          <Icon src={FiArrowRight} size="18" />
        </button>
      </div>
    </form>
  </div>
{/if}

<style lang="postcss">
  @reference "tailwindcss";
  .modal {
    @apply fixed flex flex-col gap-2 items-center justify-center p-4;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
</style>
