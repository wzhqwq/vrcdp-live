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
</div>

<HoverDetach>
  <span class="text-sm">{i18n.scale}</span>
  <div class="range-ticks">
    <input type="range" list="scales" min="0" max="3" step="1" bind:value={$settings.scale} />
    <datalist id="scales">
      <option value="0" label={i18n.scaleOptions[0]}></option>
      <option value="1" label={i18n.scaleOptions[1]}></option>
      <option value="2" label={i18n.scaleOptions[2]}></option>
      <option value="3" label={i18n.scaleOptions[3]}></option>
    </datalist>
  </div>
</HoverDetach>
