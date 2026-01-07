const Reveals = [
  {
    title: "Mode",
    id: "revealScrub",
    responsive: false,
    segmented: {
      default: false,
      items: [
        { title: "Smooth", value: false },
        { title: "Scrub", value: true },
      ]
    }
  },
  {
    title: "Animation",
    id: "revealAnimationName",
    responsive: false,
    select: {
      use: "RevealAnimations"
    }
  },
  {
    title: "Direction",
    id: "revealAnimationDirection",
    responsive: false,
    segmented: {
      default: "up",
      items: [
        { icon: "arrow.up", value: "up" },
        { icon: "arrow.down", value: "down" },
        { icon: "arrow.left", value: "left" },
        { icon: "arrow.right", value: "right" }
      ]
    }
  },
  {
    title: "Distance",
    id: "revealDistance",
    responsive: false,
    text: {
      default: "200px"
    }
  },
  {
    visible: "revealAnimationName == 'rotate'",
    title: "Degrees",
    id: "revealDegrees",
    responsive: false,
    number: {
      default: "90"
    }
  },
  {
    divider: {}
  },
  {
    title: "Trigger",
    heading: {}
  },
  {
    title: "Play",
    id: "revealPlay",
    responsive: false,
    select: {
      default: "enter-exit",
      items: [
        { title: "Once on enter", value: "enter-once" },
        { title: "Always on enter", value: "enter-always" },
        { title: "Enter and exit", value: "enter-exit" },
      ]
    }
  },
  {
    title: "Start",
    id: "revealStart",
    responsive: false,
    segmented: {
      default: "entering-screen",
      items: [
        { icon: "align.vertical.bottom.fill", value: "entering-screen" },
        { icon: "align.vertical.center.fill", value: "middle-of-screen" },
        { icon: "align.vertical.top.fill", value: "exiting-screen" }
      ]
    }
  },
  {
    title: "End",
    id: "revealEnd",
    responsive: false,
    segmented: {
      default: "exiting-screen",
      items: [
        { icon: "align.vertical.bottom.fill", value: "entering-screen" },
        { icon: "align.vertical.center.fill", value: "middle-of-screen" },
        { icon: "align.vertical.top.fill", value: "exiting-screen" }
      ]
    }
  },
  {
    divider: {}
  },
  {
    title: "Timing",
    heading: {}
  },
  {
    title: "Easing",
    id: "revealEasing",
    responsive: false,
    select: {
      default: "power1",
      items: [
        { title: "Linear", value: "linear" },
        { title: "Power0", value: "power0" },
        { title: "Power1", value: "power1" },
        { title: "Power2", value: "power2" },
        { title: "Power3", value: "power3" },
        { title: "Power4", value: "power4" },
        { title: "Sine", value: "sine.out" },
        { title: "Circ", value: "circ.out" },
        { title: "Expo", value: "expo.out" },
        { title: "Back", value: "back.out" },
        { title: "Elastic", value: "elastic.out" },
        { title: "Bounce", value: "bounce.out" }
      ]
    }
  },
  {
    visible: "revealScrub == false",
    title: "Duration",
    id: "revealDuration",
    responsive: false,
    number: {
      default: 500
    }
  },
  {
    visible: "revealScrub == false",
    title: "Delay",
    id: "revealDelay",
    responsive: false,
    number: {
      default: 0,
      subtitle: "in milliseconds"
    }
  },
  {
    divider: {}
  },
  {
    title: "Debug",
    heading: {}
  },
  {
    title: "Markers",
    id: "revealDebug",
    responsive: false,
    switch: {
      default: false
    }
  },
  {
    information: {},
    title: "Visualize animation start and end points."
  },
];

export default Reveals;
