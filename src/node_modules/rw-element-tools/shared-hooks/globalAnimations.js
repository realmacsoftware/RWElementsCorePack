const globalAnimations = (app) => {
    const {
        globalScrollAnimationPreviewInEditor: previewInEditor,
        
        globalScrollAnimationTrigger: triggerType, // none, instant, inView, scroll
        
        globalScrollAnimationEase: ease,
        globalScrollAnimationEaseCustom: easeCustom,
        globalScrollAnimationEaseSteps: easeSteps,
        globalScrollAnimationOrigin: origin,
        globalScrollAnimationDuration: duration,
        globalScrollAnimationDelay: delay,

        // inView
        globalScrollAnimationAmount: amount,

        // spring
        globalScrollAnimationIsSpring: isSpring,
        globalScrollAnimationSpringStrength: springStrength,
        globalScrollAnimationSpringAmplitude: springAmplitude,

        // trigger positions
        globalScrollAnimationTriggerElementPositionEnter: triggerElementPositionEnter,
        globalScrollAnimationTriggerViewportPositionEnter: triggerViewportPositionEnter,
        globalScrollAnimationTriggerElementPositionExit: triggerElementPositionExit,
        globalScrollAnimationTriggerViewportPositionExit: triggerViewportPositionExit,


        // margin
        globalScrollAnimationMarginTop: marginTop,
        globalScrollAnimationMarginBottom: marginBottom,
        
        // repeat
        globalScrollAnimationRepeat: repeat,
        globalScrollAnimationRepeatTimes: repeatTimes,
        globalScrollAnimationRepeatYoyo: repeatYoyo,
        globalScrollAnimationRepeatDelay: repeatDelay,

        // Effects
        // - start
        globalScrollAnimationEnterState: enterState,
        globalScrollAnimationOpacityEnterStart: opacityEnterStart,
        globalScrollAnimationRotateEnterStart: rotateEnterStart,
        globalScrollAnimationScaleEnterStart: scaleEnterStart,
        globalScrollAnimationTranslateXEnterStart: translateXEnterStart,
        globalScrollAnimationTranslateYEnterStart: translateYEnterStart,
        // - end
        globalScrollAnimationOpacityEnterEnd: opacityEnterEnd,
        globalScrollAnimationRotateEnterEnd: rotateEnterEnd,
        globalScrollAnimationScaleEnterEnd: scaleEnterEnd,
        globalScrollAnimationTranslateXEnterEnd: translateXEnterEnd,
        globalScrollAnimationTranslateYEnterEnd: translateYEnterEnd,

        // exit
        globalScrollAnimationExitEnabled: exitEnabled,
        globalScrollAnimationOpacityExitEnd: opacityExitEnd,
        globalScrollAnimationRotateExitEnd: rotateExitEnd,
        globalScrollAnimationScaleExitEnd: scaleExitEnd,
        globalScrollAnimationTranslateXExitEnd: translateXExitEnd,
        globalScrollAnimationTranslateYExitEnd: translateYExitEnd,
    } = app.props;

    const { mode } = app.project;
    const gsapEase = isSpring ? `elastic.out(${springAmplitude}, ${springStrength})` : ease;
    const gsapMargin = (value) => value < 0 ? `-=${Math.abs(value)}` : `+=${value}`;
    const scrollTriggerStart = `${triggerElementPositionEnter}${gsapMargin(marginTop)} ${triggerViewportPositionEnter}${gsapMargin(marginBottom)}`;
    const scrollTriggerEnd = `${triggerElementPositionExit}${gsapMargin(marginTop)} ${triggerViewportPositionExit}${gsapMargin(marginBottom)}`;

    const wantsRepeat = triggerType == 'instant' && repeat != 'false';
    const gsapRepeat = !wantsRepeat
        ? false
        : {
            repeat: repeat == 'infinite' ? -1 : repeatTimes,
            yoyo: repeatYoyo ? true : false,
            repeatDelay: repeatDelay/1000,
        }

    const onEnterFrom = {
        opacity: opacityEnterStart/100,
        rotation: rotateEnterStart,
        scale: scaleEnterStart/100,
        x: `${translateXEnterStart}%`,
        y: `${translateYEnterStart}%`,
        autoAlpha: 0,
        duration: duration/1000,
        ease: gsapEase,
        transformOrigin: origin.replace("-", " "),
    }

    const onEnterTo = {
        opacity: opacityEnterEnd/100,
        rotation: rotateEnterEnd,
        scale: scaleEnterEnd/100,
        x: `${translateXEnterEnd}%`,
        y: `${translateYEnterEnd}%`,
        autoAlpha: 1,
        duration: duration/1000,
        ease: gsapEase,
        transformOrigin: origin.replace("-", " "),
    }

    const onLeaveTo = {
        opacity: opacityExitEnd/100,
        rotation: rotateExitEnd,
        scale: scaleExitEnd/100,
        x: `${translateXExitEnd}%`,
        y: `${translateYExitEnd}%`,
        autoAlpha: 0,
        duration: duration/1000,
        ease: gsapEase,
        transformOrigin: origin.replace("-", " "),
    }

    const cssVarsFrom = Object.entries(onEnterFrom).map(([key, value]) => `[--scroll-animation-from-${key}:${value}]`).join(" ");
    const cssVarsTo = Object.entries(onEnterTo).map(([key, value]) => `[--scroll-animation-to-${key}:${value}]`).join(" ");

    return {
        isEnabled: triggerType != "none",
        isScroll: triggerType == "scroll",
        isInView: triggerType == "inView",
        isInstant: triggerType == "instant",
        isExitEnabled: exitEnabled,
        previewInEditor: previewInEditor && mode == "edit",
        editorPreviewCSSVars: {
            from: cssVarsFrom,
            to: cssVarsTo,
            duration: `${duration/1000}s`,
            delay: `${delay/1000}s`,
        },
        data: {
            "data-animation": "true",
            "data-animation-trigger-type": triggerType,
            "data-animation-enter-from": JSON.stringify(onEnterFrom).replace(/"/g, '&quot;'),
            "data-animation-enter-to": JSON.stringify(onEnterTo).replace(/"/g, '&quot;'),
            "data-animation-exit-to": JSON.stringify(onLeaveTo).replace(/"/g, '&quot;'),
            "data-animation-trigger-start": scrollTriggerStart,
            "data-animation-trigger-end": scrollTriggerEnd,
            "data-animation-repeat": gsapRepeat ? JSON.stringify(gsapRepeat).replace(/"/g, '&quot;') : false
        },
    };
};
