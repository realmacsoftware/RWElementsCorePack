const alpineTransitionsMobile = {
    fade: {
        enter: "transition ease-out",
        enterStart: "opacity-0",
        enterEnd: "opacity-100",
        leave: "transition ease-in",
        leaveStart: "opacity-100",
        leaveEnd: "opacity-0",
    },
    slideDown: {
        enter: "transition ease-out",
        enterStart: "opacity-0 -translate-y-full",
        enterEnd: "opacity-100 translate-y-0",
        leave: "transition ease-in",
        leaveStart: "opacity-100 translate-y-0",
        leaveEnd: "opacity-0 -translate-y-full",
    },
    slideDownShort: {
        enter: "transition ease-out",
        enterStart: "opacity-0 -translate-y-3",
        enterEnd: "opacity-100 translate-y-0",
        leave: "transition ease-in",
        leaveStart: "opacity-100 translate-y-0",
        leaveEnd: "opacity-0 -translate-y-3",
    },
    slideUp: {
        enter: "transition ease-out",
        enterStart: "opacity-0 translate-y-full",
        enterEnd: "opacity-100 translate-y-0",
        leave: "transition ease-in",
        leaveStart: "opacity-100 translate-y-0",
        leaveEnd: "opacity-0 translate-y-full",
    },
    slideUpShort: {
        enter: "transition ease-out",
        enterStart: "opacity-0 translate-y-3",
        enterEnd: "opacity-100 translate-y-0",
        leave: "transition ease-in",
        leaveStart: "opacity-100 translate-y-0",
        leaveEnd: "opacity-0 translate-y-3",
    },
    slideLeft: {
        enter: "transition ease-out",
        enterStart: "opacity-0 translate-x-full",
        enterEnd: "opacity-100 translate-x-0",
        leave: "transition ease-in",
        leaveStart: "opacity-100 translate-x-0",
        leaveEnd: "opacity-0 translate-x-full",
    },
    slideLeftShort: {
        enter: "transition ease-out",
        enterStart: "opacity-0 translate-x-3",
        enterEnd: "opacity-100 translate-x-0",
        leave: "transition ease-in",
        leaveStart: "opacity-100 translate-x-0",
        leaveEnd: "opacity-0 translate-x-3",
    },
    slideRight: {
        enter: "transition ease-out",
        enterStart: "opacity-0 -translate-x-full",
        enterEnd: "opacity-100 translate-x-0",
        leave: "transition ease-in",
        leaveStart: "opacity-100 translate-x-0",
        leaveEnd: "opacity-0 -translate-x-full",
    },
    slideRightShort: {
        enter: "transition ease-out",
        enterStart: "opacity-0 -translate-x-3",
        enterEnd: "opacity-100 translate-x-0",
        leave: "transition ease-in",
        leaveStart: "opacity-100 translate-x-0",
        leaveEnd: "opacity-0 -translate-x-3",
    },
    zoom: {
        enter: "transition ease-out",
        enterStart: "opacity-0 scale-95",
        enterEnd: "opacity-100 scale-100",
        leave: "transition ease-in",
        leaveStart: "opacity-100 scale-100",
        leaveEnd: "opacity-0 scale-95",
    },
    none: {
        enter: "duration-0",
        enterStart: "",
        enterEnd: "",
        leave: "duration-0",
        leaveStart: "",
        leaveEnd: "",
    },
};

const alpineTransitionsDesktop = {
    ...alpineTransitionsMobile,
    slideDown: {
        enter: "transition ease-out duration-300",
        enterStart: "opacity-0 -translate-y-3",
        enterEnd: "opacity-100 translate-y-0",
        leave: "transition ease-in duration-300",
        leaveStart: "opacity-100 translate-y-0",
        leaveEnd: "opacity-0 -translate-y-3",
    },
    slideUp: {
        enter: "transition ease-out duration-300",
        enterStart: "opacity-0 translate-y-3",
        enterEnd: "opacity-100 translate-y-0",
        leave: "transition ease-in duration-300",
        leaveStart: "opacity-100 translate-y-0",
        leaveEnd: "opacity-0 translate-y-3",
    },
    slideLeft: {
        enter: "transition ease-out duration-300",
        enterStart: "opacity-0 -translate-x-3",
        enterEnd: "opacity-100 translate-x-0",
        leave: "transition ease-in duration-300",
        leaveStart: "opacity-100 translate-x-0",
        leaveEnd: "opacity-0 -translate-x-3",
    },
    slideRight: {
        enter: "transition ease-out duration-300",
        enterStart: "opacity-0 -translate-x-3",
        enterEnd: "opacity-100 translate-x-0",
        leave: "transition ease-in duration-300",
        leaveStart: "opacity-100 translate-x-0",
        leaveEnd: "opacity-0 -translate-x-3",
    },
};

const getAlpineTransitionAttributesMobile = (transitionName) => {
    const { enter, enterStart, enterEnd, leave, leaveStart, leaveEnd } =
        alpineTransitionsMobile[transitionName] || alpineTransitionsMobile.fade;

    const attributes = {
        "x-transition:enter": enter,
        "x-transition:enter-start": enterStart,
        "x-transition:enter-end": enterEnd,
        "x-transition:leave": leave,
        "x-transition:leave-start": leaveStart,
        "x-transition:leave-end": leaveEnd,
    };

    return Object.entries(attributes)
        .filter(([key, value]) => value)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ");
};

const getAlpineTransitionAttributesDesktop = (transitionName) => {
    const { enter, enterStart, enterEnd, leave, leaveStart, leaveEnd } =
        alpineTransitionsDesktop[transitionName] ||
        alpineTransitionsDesktop.fade;

    const attributes = {
        "x-transition:enter": enter,
        "x-transition:enter-start": enterStart,
        "x-transition:enter-end": enterEnd,
        "x-transition:leave": leave,
        "x-transition:leave-start": leaveStart,
        "x-transition:leave-end": leaveEnd,
    };

    return Object.entries(attributes)
        .filter(([key, value]) => value)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ");
};

const getHoverPrefix = (
    node = {},
    applyTo = "",
    hoverGroup = "self",
    customId = ""
) => {
    const needsPeerPrefix =
        node.isContainer && ["background", "content"].includes(applyTo);

    if (hoverGroup === "parent") return `group-hover/${node.parent.id}`;
    if (hoverGroup === "custom") return `group-hover/${customId}`;
    if (needsPeerPrefix && hoverGroup === "self")
        return `group-hover/${node.id}`;

    return hoverGroup === "self"
        ? needsPeerPrefix
            ? `peer-hover`
            : "hover"
        : `group-hover/${hoverGroup}`;
};

const injectPrefixOnDarkModeColors = (prefix, classes) => {
    // give a string like `bg-surface-50 dark:bg-surface-400`
    // make sure all dark: prefixed colors get the prefix prepended to them
    return classes.replace(/dark:(.*)/g, `dark:${prefix}:$1`);
};
