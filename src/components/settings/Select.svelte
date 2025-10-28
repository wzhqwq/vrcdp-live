<script lang="ts">
  import i18n from "../../i18n/zh-cn"
  let { options, value = $bindable(), disabled = false } = $props()
</script>

<div class="flex p-1 gap-1 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg shadow-xs">
  {#each options as option}
    <button
      type="button"
      class={["option", { primary: value == option }]}
      onclick={() => {
        value = option
      }}
      {disabled}
    >
      {i18n.options[option]}
    </button>
  {/each}
</div>
