export const eventTypeList = [
  {
    name: "点击",
    type: 1,
  },
  {
    name: "双击",
    type: 2,
  },
];

export const scenesList = [
  {
    name: "无反馈",
    icon: "fa-ban",
    isSelect: true,
  },
  {
    name: "跳转外链",
    icon: "fa-link",
    isSelect: false,
    scenesType: 1,
    placeholder: "请输入链接",
  },
  {
    name: "拨打电话",
    icon: "fa-phone",
    isSelect: false,
    scenesType: 2,
    placeholder: "请输入电话号码",
  },
  // {
  //   name: "播放视频",
  //   icon: "fa-video",
  // },
  // {
  //   name: "播放音频",
  //   icon: "fa-music",
  // },
  // {
  //   name: "播放动画",
  //   icon: "fa-circle-play",
  // },
  {
    name: "复制内容",
    icon: "fa-copy",
    isSelect: false,
    scenesType: 3,
    placeholder: "请输入复制的文本内容",
  },
];
