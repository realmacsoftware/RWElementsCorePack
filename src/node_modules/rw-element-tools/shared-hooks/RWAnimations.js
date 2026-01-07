const RWAnimations = {
  "fade-in": {
    enter: {
      start: ["opacity-0"],
      end: ["opacity-100"],
    },
    leave: {
      start: ["opacity-100"],
      end: ["opacity-0"],
    },
  },
  "fade-in-up": {
    enter: {
      start: ["opacity-0", "translate-y-10"],
      end: ["opacity-100", "translate-y-0"],
    },
    leave: {
      start: ["opacity-100", "translate-y-0"],
      end: ["opacity-0", "translate-y-10"],
    },
  },
  "fade-in-down": {
    enter: {
      start: ["opacity-0", "-translate-y-10"],
      end: ["opacity-100", "translate-y-0"],
    },
    leave: {
      start: ["opacity-100", "translate-y-0"],
      end: ["opacity-0", "-translate-y-10"],
    },
  },
  "fade-in-left": {
    enter: {
      start: ["opacity-0", "-translate-x-10"],
      end: ["opacity-100", "translate-x-0"],
    },
    leave: {
      start: ["opacity-100", "translate-x-0"],
      end: ["opacity-0", "-translate-x-10"],
    },
  },
  "fade-in-right": {
    enter: {
      start: ["opacity-0", "translate-x-10"],
      end: ["opacity-100", "translate-x-0"],
    },
    leave: {
      start: ["opacity-100", "translate-x-0"],
      end: ["opacity-0", "translate-x-10"],
    },
  },
  "zoom-in": {
    enter: {
      start: ["opacity-0", "scale-50"],
      end: ["opacity-100", "scale-100"],
    },
    leave: {
      start: ["opacity-100", "scale-100"],
      end: ["opacity-0", "scale-50"],
    },
  },
  "zoom-in-up": {
    enter: {
      start: ["opacity-0", "scale-50", "translate-y-20"],
      end: ["opacity-100", "scale-100", "translate-y-0"],
    },
    leave: {
      start: ["opacity-100", "scale-100", "translate-y-0"],
      end: ["opacity-0", "scale-50", "translate-y-20"],
    },
  },
  "zoom-in-down": {
    enter: {
      start: ["opacity-0", "scale-50", "-translate-y-20"],
      end: ["opacity-100", "scale-100", "translate-y-0"],
    },
    leave: {
      start: ["opacity-100", "scale-100", "translate-y-0"],
      end: ["opacity-0", "scale-50", "-translate-y-20"],
    },
  },
};
