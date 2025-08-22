<script lang="ts">
  let { on = $bindable(), disabled = false } = $props()
</script>

<div
  role="switch"
  aria-checked={on}
  tabindex="0"
  onclick={() => {
    on = !on
  }}
  class={[
    "p-0.5 rounded-full transition-[background-color] inset-shadow-xs",
    "focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:outline-none focus:ring-offset-2 focus:ring-offset-pink-200 dark:focus:ring-offset-pink-900",
    on ? "bg-pink-600 dark:bg-pink-500" : "bg-stone-200 dark:bg-stone-600",
  ]}
>
  <div class="w-7">
    <div
      class={["w-4 h-4 rounded-full bg-white shadow transition-[margin-left]", on ? "ml-3" : "ml-0"]}
    ></div>
  </div>
</div>
