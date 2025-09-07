<script lang="ts">
  import { settings } from "../../api/settings.svelte"
  import HoverDetach from "./HoverDetach.svelte"
  import Select from "./Select.svelte"
  import Switch from "./Switch.svelte"
</script>

<div class="card self-start gap-2 grid grid-cols-[1fr_auto] items-center justify-items-start">
  <span class="text-sm">主题</span>
  <Select options={["light", "dark"]} bind:value={$settings.theme} />
  <span class="text-sm">停靠位置</span>
  <Select options={["left", "right"]} bind:value={$settings.side} />
  <span class="text-sm">折叠以节省空间</span>
  <Select options={["never", "always", "auto"]} bind:value={$settings.collapsed} />
</div>

<div class="card self-start gap-2 grid grid-cols-[1fr_auto] items-center justify-items-start">
  <span class="text-sm">贴合边缘</span>
  <Switch bind:on={$settings.attached} />
  <span class="text-sm">标题溢出时跑马灯</span>
  <Switch bind:on={$settings.titleMarquee} />
</div>

<HoverDetach>
  <span class="text-sm">UI大小</span>
  <div class="range-ticks">
    <input type="range" list="scales" min="0" max="3" step="1" bind:value={$settings.scale} />
    <datalist id="scales">
      <option value="0" label="极小"></option>
      <option value="1" label="正常"></option>
      <option value="2" label="中"></option>
      <option value="3" label="大"></option>
    </datalist>
  </div>
</HoverDetach>
