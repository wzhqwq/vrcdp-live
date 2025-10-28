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
  scale: "UI大小",
  scaleOptions: {
    0: "极小",
    1: "正常",
    2: "中",
    3: "大",
  },
  options,
}
