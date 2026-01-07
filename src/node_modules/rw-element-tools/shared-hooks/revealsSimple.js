const revealsSimpleAnimations = {
  fade: {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  slideLeft: {
    from: {
      x: "-100%",
    },
    to: {
      x: 0,
    },
  },
  slideRight: {
    from: {
      x: "100%",
    },
    to: {
      x: 0,
    },
  },
  slideUp: {
    from: {
      y: "100%",
    },
    to: {
      y: 0,
    },
  },
  slideDown: {
    from: {
      y: "-100%",
    },
    to: {
      y: 0,
    },
  },
  grow: {
    from: {
      scale: 0,
    },
    to: {
      scale: 1,
    },
  },
}

const revealsSimple = (app) => {
  const {
    revealsSimpleEnabled,
    revealsSimpleTimingDuration,
    revealsSimpleTimingDelay,
    revealsSimpleEffect,
    revealsSimpleTimingFunction,
    revealsSimpleScrub,
  } = app.props;
  const { id } = app.node;
  const { name } = app.component;

  const scrollTriggerConfig = {
    trigger: `.reveal-${id}`,
    start: "bottom 100%",
    end: "bottom 20%",
    toggleActions: "play none none none",
    duration: revealsSimpleTimingDuration / 1000 || 1,
    delay: revealsSimpleTimingDelay / 1000 || 0,
    ease: revealsSimpleTimingFunction || "linear",
    scrub: revealsSimpleScrub || false,
  };

  const rootElementArgs = {
    "data-reveal": "true",
    "data-reveal-name": `${name}-${id.slice(-4)}`,
    "data-reveal-target": `reveal-${id}`,
    "data-reveal-set-config": JSON.stringify(revealsSimpleAnimations[revealsSimpleEffect].from).replace(/"/g, "'"),
    "data-reveal-on-enter": JSON.stringify(revealsSimpleAnimations[revealsSimpleEffect].to).replace(/"/g, "'"),
    "data-reveal-on-exit": JSON.stringify(revealsSimpleAnimations[revealsSimpleEffect].to).replace(/"/g, "'"),
    "data-reveal-scroll-trigger": JSON.stringify(scrollTriggerConfig).replace(/"/g, "'"),
  }

  return {
    trigger: `reveal-${id}`,
    enabled: revealsSimpleEnabled,
    rootElementArgs,
  };
}
