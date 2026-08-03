const transformHook = (rw) => {
    const {
        iconPlay,
        iconPause,
        iconNext,
        iconPrevious,
        iconSkipBack,
        iconSkipForward,
        iconSpacing,
        iconPlayPauseColor,
        iconPlayPauseColorHover,
        iconPlayPauseSize,
        iconNextPrevColor,
        iconNextPrevColorHover,
        iconNextPrevSize,
        iconSkipSize,
        iconSkipColor,
        iconSkipColorHover,
        trackListMaxHeight,
        trackListPadding,
        trackListGap,
        trackItemPadding,
        trackItemGap,
        trackItemBorderRadius,
        trackListArtworkSize,
        trackListArtworkShadow,
        trackListArtworkBorderRadius,
        trackListTitleFontSize,
        trackListArtistFontSize,
        trackTitleTextColor,
        trackTitleTextColorHover,
        trackArtistTextColor,
        trackArtistTextColorHover,
        trackBg,
        trackBgOpacity,
        trackBgHover,
        trackBgOpacityHover,
        trackDividersColor,
        trackDividersThickness,
        showTrackDurations,
        trackDurationColor,
        trackDurationSize,
        appearance,
        nowPlayingLayout,
        nowPlayingPadding,
        nowPlayingGap,
        nowPlayingArtworkSize,
        nowPlayingArtworkShadow,
        nowPlayingArtworkBorderRadius,
        nowPlayingTitleTextColor,
        nowPlayingArtistTextColor,
        nowPlayingArtistFontSize,
        nowPlayingTitleFontSize,
        nowPlayingProgressBarBgColor,
        nowPlayingProgressBarForegroundColor,
        nowPlayingProgressBarSize,
        showPlaybackTime,
        playbackTimeColor,
        playbackTimeSize,
        pauseWhenOutOfView,
        initialVolume,
        volumeBarBgColor,
        volumeBarFgColor,
        volumeBarSize,
        volumeBarWidth,
        iconVolumeColor,
        iconVolumeColorHover,
        iconVolumeSize,
        iconVolume,
        iconMuted,
    } = rw.props;

    const { mode } = rw.project;
    const { tracks } = rw.collections;
    const { sharedAssetPath } = rw.component;

    const firstTrack = tracks?.[0] || {
        title: "Placeholder Title",
        artist: "Placeholder Artist",
        coverImage: `${sharedAssetPath}/images/image-square.jpg`,
        audioSource: {
            path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        },
    };

    const hasMultipleTracks = tracks?.length > 1;

    const isCompact = appearance === "compact";
    const pauseOutOfView =
        pauseWhenOutOfView === true || pauseWhenOutOfView === "true";

    const classes = {
        wrapper: classnames([
            "text-white",
            advancedClasses(rw),
            globalLayout(rw),
            globalSizing(rw),
            globalSpacing(rw),
            globalTransitions(rw),
            globalFilters(rw),
            globalEffects(rw),
            globalTransforms(rw),
            globalBackground(rw),
            globalBorders(rw),
            advancedClasses(rw),
        ]).toString(),
        nowPlaying: {
            wrapper: classnames([
                `flex items-center flex-wrap`,
                isCompact ? "flex-row text-left" : nowPlayingLayout,
                nowPlayingGap,
                nowPlayingPadding,
            ]).toString(),
            artwork: classnames([
                "object-cover",
                isCompact ? "size-14 shrink-0" : nowPlayingArtworkSize,
                nowPlayingArtworkShadow,
                nowPlayingArtworkBorderRadius,
            ]).toString(),
            content: isCompact
                ? "flex flex-1 min-w-0 items-center justify-between gap-4"
                : "",
            meta: isCompact ? "min-w-0" : "mb-4",
            title: classnames([
                `font-semibold font-body`,
                nowPlayingTitleTextColor,
                nowPlayingTitleFontSize,
                isCompact && "truncate",
            ]).toString(),
            artist: classnames([
                `font-body`,
                nowPlayingArtistTextColor,
                nowPlayingArtistFontSize,
                isCompact && "truncate",
            ]).toString(),
            time: classnames([
                "font-body tabular-nums shrink-0",
                playbackTimeColor,
                playbackTimeSize,
            ]).toString(),
            progressRow: classnames([
                "flex items-center gap-3 w-full",
            ]).toString(),
            progressBar: {
                wrapper: classnames([
                    nowPlayingProgressBarSize,
                    nowPlayingProgressBarBgColor,
                    `relative overflow-hidden flex-1 min-w-0 rounded-full cursor-pointer select-none`,
                ]).toString(),
                foreground: classnames([
                    "absolute top-0 left-0 rounded-full",
                    nowPlayingProgressBarSize,
                    nowPlayingProgressBarForegroundColor,
                ]).toString(),
                thumb: classnames([
                    nowPlayingProgressBarSize,
                    nowPlayingProgressBarForegroundColor,
                    "absolute top-0 aspect-square rounded-full",
                ]).toString(),
            },
            volume: {
                wrapper: classnames([
                    "flex items-center gap-2 shrink-0",
                ]).toString(),
                muteButton: classnames([
                    iconVolumeColor,
                    iconVolumeColorHover,
                    iconVolumeSize,
                    "focus:outline-none transition [&_svg]:size-full",
                ]).toString(),
                bar: classnames([
                    volumeBarSize,
                    volumeBarWidth,
                    volumeBarBgColor,
                    "relative overflow-hidden rounded-full cursor-pointer select-none",
                ]).toString(),
                fill: classnames([
                    "absolute top-0 left-0 h-full rounded-full",
                    volumeBarFgColor,
                ]).toString(),
            },
        },
        list: classnames([
            `flex flex-col overflow-y-auto`,
            !hasMultipleTracks && `hidden`,
            trackListMaxHeight,
            trackListPadding,
            trackListGap,
            trackDividersColor,
            trackDividersThickness,
        ]).toString(),
        track: {
            wrapper: classnames([
                "group/track flex items-center cursor-pointer transition",
                trackItemGap,
                trackItemPadding,
                trackItemBorderRadius,
                trackBg,
                trackBgOpacity,
                trackBgHover,
                trackBgOpacityHover,
            ]).toString(),
            artwork: classnames([
                trackListArtworkSize,
                trackListArtworkShadow,
                trackListArtworkBorderRadius,
            ]).toString(),
            title: classnames([
                `font-body`,
                trackTitleTextColor,
                trackTitleTextColorHover,
                trackListTitleFontSize,
            ]).toString(),
            artist: classnames([
                `font-body`,
                trackArtistTextColor,
                trackArtistTextColorHover,
                trackListArtistFontSize,
            ]).toString(),
            duration: classnames([
                "font-body tabular-nums shrink-0",
                trackDurationColor,
                trackDurationSize,
            ]).toString(),
        },
        icons: {
            wrapper: `flex items-center justify-center ${iconSpacing}`,
            skip: `${iconSkipColor} ${iconSkipColorHover} ${iconSkipSize} focus:outline-none transition`,
            track: `${iconNextPrevColor} ${iconNextPrevColorHover} ${iconNextPrevSize} focus:outline-none transition`,
            playButton: ``,
            play: `${iconPlayPauseColor} ${iconPlayPauseColorHover} ${iconPlayPauseSize} transition`,
        },
    };

    const rootArgs = {
        "x-data": "elementsAudioPlaylist()",
        "x-init": "init",
    };

    if (pauseOutOfView) {
        rootArgs["x-bind"] = "pauseWhenHidden";
    }

    rw.setRootElement({
        as: "div",
        class: classes.wrapper,
        args: rootArgs,
    });

    rw.setProps({
        id: rw.node.id,
        edit: mode === "edit",
        tracks,
        firstTrack,
        classes,
        hasMultipleTracks,
        showPlaybackTime:
            showPlaybackTime === true || showPlaybackTime === "true",
        showTrackDurations:
            showTrackDurations === true || showTrackDurations === "true",
        pauseWhenOutOfView: pauseOutOfView,
        initialVolume: Math.min(100, Math.max(0, parseFloat(initialVolume ?? 100) || 0)),
        iconVolume: iconVolume || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>`,
        iconMuted: iconMuted || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path></svg>`,
        iconPlay: iconPlay || `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"></path></svg>`,
        iconPause: iconPause || `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"></path></svg>`,
        iconNext: iconNext || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82zM16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"></path></svg>`,
        iconPrevious: iconPrevious || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z"></path></svg>`,
        iconSkipBack: iconSkipBack || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 5V2.21c0-.45-.54-.67-.85-.35L7.35 5.65c-.2.2-.2.51 0 .71l3.79 3.79c.31.31.85.09.85-.35V7c3.73 0 6.68 3.42 5.86 7.29-.47 2.27-2.31 4.1-4.57 4.57-3.57.75-6.75-1.7-7.23-5.01-.06-.48-.48-.85-.98-.85-.6 0-1.08.53-1 1.13.62 4.39 4.8 7.64 9.53 6.72 3.12-.61 5.63-3.12 6.24-6.24.99-5.13-2.9-9.61-7.85-9.61zm-1.1 11h-.85v-3.26l-1.01.31v-.69l1.77-.63h.09V16zm4.28-1.76c0 .32-.03.6-.1.82s-.17.42-.29.57-.28.26-.45.33-.37.1-.59.1-.41-.03-.59-.1-.33-.18-.46-.33-.23-.34-.3-.57-.11-.5-.11-.82v-.74c0-.32.03-.6.1-.82s.17-.42.29-.57.28-.26.45-.33.37-.1.59-.1.41.03.59.1.33.18.46.33.23.34.3.57.11.5.11.82v.74zm-.85-.86c0-.19-.01-.35-.04-.48s-.07-.23-.12-.31-.11-.14-.19-.17-.16-.05-.25-.05-.18.02-.25.05-.14.09-.19.17-.09.18-.12.31-.04.29-.04.48v.97c0 .19.01.35.04.48s.07.24.12.32.11.14.19.17.16.05.25.05.18-.02.25-.05.14-.09.19-.17.09-.19.11-.32.04-.29.04-.48v-.97z"></path></svg>`,
        iconSkipForward: iconSkipForward || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 13c-.5 0-.91.37-.98.86-.48 3.37-3.77 5.84-7.42 4.96-2.25-.54-3.91-2.27-4.39-4.53C5.32 10.42 8.27 7 12 7v2.79c0 .45.54.67.85.35l3.79-3.79c.2-.2.2-.51 0-.71l-3.79-3.79c-.31-.31-.85-.09-.85.36V5c-4.94 0-8.84 4.48-7.84 9.6.6 3.11 2.9 5.5 5.99 6.19 4.83 1.08 9.15-2.2 9.77-6.67.09-.59-.4-1.12-1-1.12zm-8.02 3v-4.27h-.09l-1.77.63v.69l1.01-.31V16zm3.42-4.22c-.18-.07-.37-.1-.59-.1s-.41.03-.59.1-.33.18-.45.33-.23.34-.29.57-.1.5-.1.82v.74c0 .32.04.6.11.82s.17.42.3.57.28.26.46.33.37.1.59.1.41-.03.59-.1.33-.18.45-.33.22-.34.29-.57.1-.5.1-.82v-.74c0-.32-.04-.6-.11-.82s-.17-.42-.3-.57-.29-.26-.46-.33zm.01 2.57c0 .19-.01.35-.04.48s-.06.24-.11.32-.11.14-.19.17-.16.05-.25.05-.18-.02-.25-.05-.14-.09-.19-.17-.09-.19-.12-.32-.04-.29-.04-.48v-.97c0-.19.01-.35.04-.48s.06-.23.12-.31.11-.14.19-.17.16-.05.25-.05.18.02.25.05.14.09.19.17.09.18.12.31.04.29.04.48v.97z"></path></svg>`,
    });
};

exports.transformHook = transformHook;
