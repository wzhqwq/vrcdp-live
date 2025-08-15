<script lang="ts">
  import { checkInLive } from "./api/ua"

  let available = $state(false)
  let isLive = $state(false)

  $effect(() => {
    checkInLive().then((live) => {
      isLive = live
      available = true
    }).catch(() => {
      available = false
    })
  })
</script>

<main>
  {#if available}
    <p>当前直播状态: {isLive ? '直播中' : '未直播'}</p>
  {:else}
    <p>无法获取直播状态</p>
  {/if}
</main>

<style>
  main {
    padding: 20px;
    font-size: 16px;
    color: #333;
  }
</style>
