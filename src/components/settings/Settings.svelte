<script lang="ts">
  import { settings } from "../../api/settings.svelte"
  import HoverDetach from "./HoverDetach.svelte"
  import Select from "./Select.svelte"
  import Switch from "./Switch.svelte"
  import i18n from "../../i18n/zh-cn"
</script>

<div class="card self-start gap-2 grid grid-cols-[1fr_auto] items-center justify-items-start">
  <span class="text-sm">{i18n.theme}</span>
  <Select options={["light", "dark"]} bind:value={$settings.theme} />
  <span class="text-sm">{i18n.side}</span>
  <Select options={["left", "right"]} bind:value={$settings.side} />
  <span class="text-sm">{i18n.collapsed}</span>
  <Select options={["never", "always", "auto"]} bind:value={$settings.collapsed} />
</div>

<div class="card self-start gap-2 grid grid-cols-[1fr_auto] items-center justify-items-start">
  <span class="text-sm">{i18n.attached}</span>
  <Switch bind:on={$settings.attached} />
  <span class="text-sm">{i18n.titleMarquee}</span>
  <Switch bind:on={$settings.titleMarquee} />
  <span class="text-sm">{i18n.hideOverflowItems}</span>
  <Switch bind:on={$settings.hideOverflowItems} />
</div>

<HoverDetach>
  <span class="text-sm">{i18n.scale}</span>
  <div class="range-ticks">
    <input type="range" list="scales" min="0" max="3" step="1" bind:value={$settings.scale} />
    <datalist id="scales">
      {#each i18n.scaleOptions as option, index}
        <option value={index} label={option}></option>
      {/each}
    </datalist>
  </div>
  <span class="text-sm">{i18n.opacity}</span>
  <div class="range-ticks">
    <input type="range" list="opacities" min="0" max="3" step="1" bind:value={$settings.opacity} />
    <datalist id="opacities">
      {#each i18n.opacityOptions as option, index}
        <option value={index} label={option}></option>
      {/each}
    </datalist>
  </div>
  <span class="text-sm w-20">{i18n.expandedOpacity}</span>
  <div class="range-ticks">
    <input type="range" list="opacities" min="0" max="3" step="1" bind:value={$settings.expandedOpacity} />
    <datalist id="opacities">
      {#each i18n.opacityOptions as option, index}
        <option value={index} label={option}></option>
      {/each}
    </datalist>
  </div>
</HoverDetach>
