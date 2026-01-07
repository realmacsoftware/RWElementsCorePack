const AnimationSettings = [
    {
        title: "Type",
        id: "globalScrollAnimationTrigger",
        responsive: false,
        select: {
            default: "instant",
            items: [
                {
                    title: "Instant",
                    value: "instant",
                },
                {
                    title: "Scroll",
                    value: "inView",
                },
                {
                    title: "Scrub",
                    value: "scroll",
                },
            ]
        }
    },
    {
        visible: "globalScrollAnimationTrigger == 'instant'",
        information: {},
        title: "The animation is triggered immediately on page load.",
    },
    {
        visible: "globalScrollAnimationTrigger == 'inView'",
        information: {},
        title: "The animation is triggered when the component enters the viewport.",
    },
    {
        visible: "globalScrollAnimationTrigger == 'scroll'",
        information: {},
        title: "The animation progress is linked to window scroll position.",
    },
    {
        divider: {},
    },
    {
        visible: "globalScrollAnimationTrigger != 'scroll'",
        title: "Duration",
        id: "globalScrollAnimationDuration",
        responsive: false,
        number: {
            default: 2000,
        }
    },
    {
        visible: "globalScrollAnimationTrigger != 'scroll'",
        title: "Delay",
        id: "globalScrollAnimationDelay",
        responsive: false,
        number: {
            default: 0,
            subtitle: "In milliseconds",
        }
    },
    {
        title: "Origin",
        id: "globalScrollAnimationOrigin",
        responsive: false,
        select: {
          use: "TransformOrigins",
        }
    },
    {
        title: "Ease",
        id: "globalScrollAnimationEase",
        responsive: false,
        select: {
            default: "easeInOut",
            items: [
                { title: "None", value: "none" },
                { title: "Linear", value: "linear" },
                { title: "Power0", value: "power0" },
                { title: "Power1", value: "power1" },
                { title: "Power2", value: "power2" },
                { title: "Power3", value: "power3" },
                { title: "Power4", value: "power4" },
                { title: "Sine easeIn", value: "sine.in" },
                { title: "Sine easeOut", value: "sine.out" },
                { title: "Sine easeInOut", value: "sine.inOut" },
                { title: "Circ easeIn", value: "circ.in" },
                { title: "Circ easeOut", value: "circ.out" },
                { title: "Circ easeInOut", value: "circ.inOut" },
                { title: "Expo easeIn", value: "expo.in" },
                { title: "Expo easeOut", value: "expo.out" },
                { title: "Expo easeInOut", value: "expo.inOut" },
                { title: "Back easeIn", value: "back.in" },
                { title: "Back easeOut", value: "back.out" },
                { title: "Back easeInOut", value: "back.inOut" },
                { title: "Elastic easeIn", value: "elastic.in" },
                { title: "Elastic easeOut", value: "elastic.out" },
                { title: "Elastic easeInOut", value: "elastic.inOut" },
                { title: "Bounce easeIn", value: "bounce.in" },
                { title: "Bounce easeOut", value: "bounce.out" },
                { title: "Bounce easeInOut", value: "bounce.inOut" },
                { title: "Steps", value: "steps" },
                // { title: "Rough", value: "rough" },
                // { title: "Slow", value: "slow" },
                { title: "Custom", value: "custom" }
            ]
        }
    },
    {
        visible: "globalScrollAnimationEase == 'steps'",
        title: "Steps",
        id: "globalScrollAnimationEaseSteps",
        responsive: false,
        number: {
            default: 10,
        }
    },
    {
        visible: "globalScrollAnimationEase == 'custom'",
        title: "Custom Ease",
        id: "globalScrollAnimationEaseCustom",
        responsive: false,
        text: {
            default: ".17,.67,.83,.67",
        }
    },
    {
        divider: {},
    },
    {
        title: "Spring",
        heading: {}
    },
    {
        id: "globalScrollAnimationIsSpring",
        title: "Enable",
        responsive: false,
        switch: {}
    },
    {
        visible: "globalScrollAnimationIsSpring == 'true'",
        title: "Strength",
        id: "globalScrollAnimationSpringStrength",
        responsive: false,
        slider: {
            default: "0.3",
            items: [
                {
                    title: "0.1",
                    value: "0.1",
                },
                {
                    title: "0.2",
                    value: "0.2",
                },
                {
                    title: "0.3",
                    value: "0.3",
                },
                {
                    title: "0.4",
                    value: "0.4",
                },
                {
                    title: "0.5",
                    value: "0.5",
                },
                {
                    title: "0.6",
                    value: "0.6",
                },
                {
                    title: "0.7",
                    value: "0.7",
                },
                {
                    title: "0.8",
                    value: "0.8",
                },
                {
                    title: "0.9",
                    value: "0.9",
                },
                {
                    title: "1",
                    value: "1",
                },
            ]
        }
    },
    {
        visible: "globalScrollAnimationIsSpring == 'true'",
        title: "Aplitude",
        id: "globalScrollAnimationSpringAmplitude",
        responsive: false,
        slider: {
            default: "1",
            items: [
                {
                    title: "0.5",
                    value: "0.5",
                },
                {
                    title: "0.75",
                    value: "0.75",
                },
                {
                    title: "1",
                    value: "1",
                },
                {
                    title: "1.25",
                    value: "1.25",
                },
                {
                    title: "1.5",
                    value: "1.5",
                },
                {
                    title: "1.75",
                    value: "1.75",
                },
                {
                    title: "2",
                    value: "2",
                },
                {
                    title: "2.25",
                    value: "2.25",
                },
                {
                    title: "2.5",
                    value: "2.5",
                },
                {
                    title: "2.75",
                    value: "2.75",
                },
                {
                    title: "3",
                    value: "3",
                },
            ]
        }
    },
    {
        divider: {},
    },
    {
        visible: "globalScrollAnimationTrigger == 'scroll' || globalScrollAnimationTrigger == 'inView'",
        title: "Trigger Enter",
        heading: {}
    },
    {
        visible: "globalScrollAnimationTrigger == 'scroll' || globalScrollAnimationTrigger == 'inView'",
        title: "Element",
        id: "globalScrollAnimationTriggerElementPositionEnter",
        responsive: false,
        select: {
            default: "top",
            items: [
                {
                    title: "Top",
                    value: "top",
                },
                {
                    title: "Center",
                    value: "center",
                },
                {
                    title: "Bottom",
                    value: "bottom",
                },
            ]
        }
    },
    {
        visible: "globalScrollAnimationTrigger == 'scroll' || globalScrollAnimationTrigger == 'inView'",
        title: "Viewport",
        id: "globalScrollAnimationTriggerViewportPositionEnter",
        responsive: false,
        select: {
            default: "center",
            items: [
                {
                    title: "Top",
                    value: "top",
                },
                {
                    title: "Center",
                    value: "center",
                },
                {
                    title: "Bottom",
                    value: "bottom",
                },
            ]
        }
    },
    {
        visible: "globalScrollAnimationTrigger == 'scroll' || globalScrollAnimationTrigger == 'inView'",
        title: "Trigger Exit",
        heading: {}
    },
    {
        visible: "globalScrollAnimationTrigger == 'scroll' || globalScrollAnimationTrigger == 'inView'",
        title: "Element",
        id: "globalScrollAnimationTriggerElementPositionExit",
        responsive: false,
        select: {
            default: "top",
            items: [
                {
                    title: "Top",
                    value: "top",
                },
                {
                    title: "Center",
                    value: "center",
                },
                {
                    title: "Bottom",
                    value: "bottom",
                },
            ]
        }
    },
    {
        visible: "globalScrollAnimationTrigger == 'scroll' || globalScrollAnimationTrigger == 'inView'",
        title: "Viewport",
        id: "globalScrollAnimationTriggerViewportPositionExit",
        responsive: false,
        select: {
            default: "center",
            items: [
                {
                    title: "Top",
                    value: "top",
                },
                {
                    title: "Center",
                    value: "center",
                },
                {
                    title: "Bottom",
                    value: "bottom",
                },
            ]
        }
    },
    {
        visible: "globalScrollAnimationTrigger == 'scroll' || globalScrollAnimationTrigger == 'inView'",
        divider: {},
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationTrigger == 'inView'",
        title: "Trigger Margin",
        heading: {}
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationTrigger == 'inView'",
        title: "Top",
        id: "globalScrollAnimationMarginTop",
        responsive: false,
        number: {
            default: 0,
        }
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationTrigger == 'inView'",
        title: "Bottom",
        id: "globalScrollAnimationMarginBottom",
        responsive: false,
        number: {
            default: 0,
        }
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationTrigger == 'inView'",
        divider: {},
    },
    {
        visible: "globalScrollAnimationTrigger != 'none'",
        title: "Repeat",
        heading: {}
    },
    {
        visible: "globalScrollAnimationTrigger != 'none'",
        title: "Repeat",
        id: "globalScrollAnimationRepeat",
        responsive: false,
        select: {
            default: "false",
            items: [
                {
                    title: "Off",
                    value: "false",
                },
                {
                    title: "Infinite",
                    value: "infinite",
                },
                {
                    title: "Set Number of Times",
                    value: "setTimes",
                },
            ]
        }
    },
    {
        visible: "globalScrollAnimationRepeat == 'setTimes'",
        title: "Times",
        id: "globalScrollAnimationRepeatTimes",
        responsive: false,
        number: {
            default: 3,
        }
    },
    {
        visible: "globalScrollAnimationRepeat != 'false'",
        title: "Yoyo",
        id: "globalScrollAnimationRepeatYoyo",
        responsive: false,
        switch: {}
    },
    {
        visible: "globalScrollAnimationRepeat != 'false'",
        title: "Delay",
        id: "globalScrollAnimationRepeatDelay",
        responsive: false,
        number: {
            default: 0,
            subtitle: "In milliseconds",
        }
    },
]

export default AnimationSettings;