export const Video = [
  {
    visible: "globalBgType == 'video'",
    title: "Video",
    id: "globalBgVideo",
    resource: {},
  },
  {
    visible: "globalBgType == 'video'",
    title: "Aspect Ratio",
    heading: {}
  },
  {
    visible: "globalBgType == 'video'",
    title: "Enable",
    responsive: false,
    id: "globalBgVideoAspectRatio",
    switch: {
      default: true,
    }
  },
  {
    visible: "globalBgType == 'video'",
    title: "This will force an aspect ratio of 16:9 on the Container.",
    information: {},
  },
];

export default Video;
