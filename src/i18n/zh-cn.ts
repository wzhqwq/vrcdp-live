const options = {
  light: "浅色",
  dark: "深色",
  left: "左侧",
  right: "右侧",
  never: "从不",
  always: "总是",
  auto: "自动",
} as Record<string, string>

export default {
  theme: "主题",
  side: "停靠位置",
  collapsed: "折叠以节省空间",
  attached: "贴合边缘",
  titleMarquee: "标题溢出时跑马灯",
  hideOverflowItems: "隐藏或堆叠溢出歌曲",
  scale: "UI大小",
  scaleOptions: ["极小", "正常", "中", "大"],
  opacity: "不透明度",
  expandedOpacity: "不透明度（未折叠）",
  opacityOptions: ["30%", "50%", "80%", "100%"],
  options,
}
