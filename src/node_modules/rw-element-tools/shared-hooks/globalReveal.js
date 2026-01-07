const globalReveal = (rw) => {
    const {
        revealAnimationName: name,
        revealAnimationDirection: direction,
        revealPlay: play,
        revealStart: start,
        revealEnd: end,
        revealDuration: duration,
        revealDelay: delay,
        revealEasing: easing,
        revealDistance: distance,
        revealDegrees: degrees,
        revealScrub: scrub,
        revealDebug: debug,
    } = rw.props;

    const { title } = rw.node;
    const revealID = `reveal-${title.replace(/\s+/g, '-').toLowerCase()}`;

    const gsapTriggerPoints = {
        "entering-screen": "top bottom",
        "middle-of-screen": "top center",
        "exiting-screen": "top top",
    };

    const animationName = `${name}${direction.charAt(0).toUpperCase() + direction.slice(1)}In`;
    const exitAnimationName = animationName.replace("In", "Out");

    const data = {
        "data-reveal": "",
        "data-reveal-id": revealID,
        "data-reveal-duration": `${duration/1000}`,
        "data-reveal-delay": `${delay/1000}`,
        "data-reveal-easing": easing,
        "data-reveal-animation": animationName,
        "data-reveal-exit-animation": exitAnimationName,
        "data-reveal-play": play,
        "data-reveal-start": gsapTriggerPoints[start] || gsapTriggerPoints["entering-screen"],
        "data-reveal-end": gsapTriggerPoints[end] || gsapTriggerPoints["exiting-screen"],
        "data-reveal-distance": distance,
        "data-reveal-degrees": degrees,
        "data-reveal-scrub": scrub || false,
        "data-reveal-debug": debug || false,
    }

    return data;

};
