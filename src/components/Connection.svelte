<script lang="ts">
  import { connectionState } from "../api/connection.svelte"
  import { Icon } from "svelte-icons-pack"
  import { FiArrowRight } from "svelte-icons-pack/fi"

  let inputPort = $state(connectionState.port)
  let modified = $derived(inputPort !== connectionState.port)
</script>

<div class={["modal card", { shown: !connectionState.connected }]}>
  {#if connectionState.connected}
    <p>连接状态: 已连接</p>
  {:else}
    {#if connectionState.retrying}
      <p>连接状态: 正在重试...</p>
    {:else}
      <p>连接状态: 未连接</p>
    {/if}
    <div class="mt-2">
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
          <button type="submit" class="btn-primary">
            <Icon src={FiArrowRight} size="18" />
          </button>
        </div>
      </form>
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "tailwindcss";
  .modal {
    @apply flex flex-col gap-2 items-center justify-center p-4;
    @apply fixed invisible transition-[visibility] delay-500;
    width: 200px;
    height: 150px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
  .modal.shown {
    @apply visible delay-0;
  }
</style>
