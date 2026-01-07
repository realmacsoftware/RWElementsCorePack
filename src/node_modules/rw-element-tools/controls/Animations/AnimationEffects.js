const AnimationEffects = [
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects'",
        title: "Preview",
        id: "globalScrollAnimationPreviewInEditor",
        responsive: false,
        switch: {}
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects' && globalScrollAnimationPreviewInEditor == 'true'",
        information: {},
        title: "Previews the settings below. Spring effects are not supported in editor.",
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects'",
        title: "State",
        id: "globalScrollAnimationEnterState",
        responsive: false,
        segmented: {
            default: "start",
            items: [
                {
                    title: "Start",
                    value: "start"
                },
                {
                    title: "End",
                    value: "end"
                }
            ]
        }
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects' && globalScrollAnimationEnterState == 'start'",
        globalControl: "ScrollAnimation_Opacity",
        id: "{{value}}EnterStart",
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects' && globalScrollAnimationEnterState == 'start'",
        globalControl: "ScrollAnimation_Rotate",
        id: "{{value}}EnterStart",
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects' && globalScrollAnimationEnterState == 'start'",
        globalControl: "ScrollAnimation_Scale",
        id: "{{value}}EnterStart",
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects' && globalScrollAnimationEnterState == 'start'",
        globalControl: "ScrollAnimation_Translate",
        id: "{{value}}EnterStart",
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects' && globalScrollAnimationEnterState == 'end'",
        globalControl: "ScrollAnimation_Opacity",
        id: "{{value}}EnterEnd",
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects' && globalScrollAnimationEnterState == 'end'",
        globalControl: "ScrollAnimation_Rotate",
        id: "{{value}}EnterEnd",
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects' && globalScrollAnimationEnterState == 'end'",
        globalControl: "ScrollAnimation_Scale",
        id: "{{value}}EnterEnd",
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects' && globalScrollAnimationEnterState == 'end'",
        globalControl: "ScrollAnimation_Translate",
        id: "{{value}}EnterEnd",
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects'",
        divider: {},
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects'",
        title: "Exit",
        heading: {}
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects'",
        title: "Enable",
        id: "globalScrollAnimationExitEnabled",
        responsive: false,
        switch: {}
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects' && globalScrollAnimationExitEnabled == 'true'",
        globalControl: "ScrollAnimation_Opacity",
        id: "{{value}}ExitEnd",
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects' && globalScrollAnimationExitEnabled == 'true'",
        globalControl: "ScrollAnimation_Rotate",
        id: "{{value}}ExitEnd",
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects' && globalScrollAnimationExitEnabled == 'true'",
        globalControl: "ScrollAnimation_Scale",
        id: "{{value}}ExitEnd",
    },
    {
        visible: "globalScrollAnimationTrigger != 'none' && globalScrollAnimationVisibleSettings == 'effects' && globalScrollAnimationExitEnabled == 'true'",
        globalControl: "ScrollAnimation_Translate",
        id: "{{value}}ExitEnd",
    },
]

export default AnimationEffects;