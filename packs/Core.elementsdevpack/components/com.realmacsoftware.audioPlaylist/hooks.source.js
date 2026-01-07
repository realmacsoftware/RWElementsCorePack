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
    } = rw.props;

    const { mode } = rw.project;
    const { tracks } = rw.collections;
    const { sharedAssetPath } = rw.component;

    const firstTrack = tracks?.[0] || {
        title: "Placeholder Title",
        artist: "Placeholder Artist",
        coverImage: `${sharedAssetPath}/images/image-square.jpg`,
        audioSource:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    };

    const hasMultipleTracks = tracks?.length > 1;

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
                nowPlayingLayout,
                nowPlayingGap,
                nowPlayingPadding,
            ]).toString(),
            artwork: classnames([
                "object-cover",
                nowPlayingArtworkSize,
                nowPlayingArtworkShadow,
                nowPlayingArtworkBorderRadius,
            ]).toString(),
            title: classnames([
                `font-semibold font-body`,
                nowPlayingTitleTextColor,
                nowPlayingTitleFontSize,
            ]).toString(),
            artist: classnames([
                `font-body`,
                nowPlayingArtistTextColor,
                nowPlayingArtistFontSize,
            ]).toString(),
            progressBar: {
                wrapper: classnames([
                    nowPlayingProgressBarSize,
                    nowPlayingProgressBarBgColor,
                    `relative overflow-hidden w-full mx-auto rounded-full cursor-pointer select-none`,
                ]).toString(),
                foreground: classnames([
                    "absolute top-0 left-0 rounded-full",
                    nowPlayingProgressBarSize,
                    nowPlayingProgressBarForegroundColor,
                ]).toString(),
                thumb: classnames([
                    nowPlayingProgressBarSize,
                    nowPlayingProgressBarForegroundColor,
                    "absolute top-0 aspect-square rounded-full transition duration-[0ms]",
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
                "group/track flex items-center gap-4 px-4 py-3 cursor-pointer transition",
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
        },
        icons: {
            wrapper: `flex items-center justify-center ${iconSpacing}`,
            skip: `${iconSkipColor} ${iconSkipColorHover} ${iconSkipSize} focus:outline-none transition`,
            track: `${iconNextPrevColor} ${iconNextPrevColorHover} ${iconNextPrevSize} focus:outline-none transition`,
            playButton: ``,
            play: `${iconPlayPauseColor} ${iconPlayPauseColorHover} ${iconPlayPauseSize} transition`,
        },
    };

    rw.setRootElement({
        as: "div",
        class: classes.wrapper,
        args: {
            "x-data": "elementsAudioPlaylist()",
            "x-init": "init",
        },
    });

    rw.setProps({
        id: rw.node.id,
        edit: mode === "edit",
        tracks,
        firstTrack,
        classes,
        hasMultipleTracks,
        iconPlay: iconPlay || `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"></path></svg>`,
        iconPause: iconPause || `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"></path></svg>`,
        iconNext: iconNext || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82zM16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"></path></svg>`,
        iconPrevious: iconPrevious || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z"></path></svg>`,
        iconSkipBack: iconSkipBack || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 5V2.21c0-.45-.54-.67-.85-.35L7.35 5.65c-.2.2-.2.51 0 .71l3.79 3.79c.31.31.85.09.85-.35V7c3.73 0 6.68 3.42 5.86 7.29-.47 2.27-2.31 4.1-4.57 4.57-3.57.75-6.75-1.7-7.23-5.01-.06-.48-.48-.85-.98-.85-.6 0-1.08.53-1 1.13.62 4.39 4.8 7.64 9.53 6.72 3.12-.61 5.63-3.12 6.24-6.24.99-5.13-2.9-9.61-7.85-9.61zm-1.1 11h-.85v-3.26l-1.01.31v-.69l1.77-.63h.09V16zm4.28-1.76c0 .32-.03.6-.1.82s-.17.42-.29.57-.28.26-.45.33-.37.1-.59.1-.41-.03-.59-.1-.33-.18-.46-.33-.23-.34-.3-.57-.11-.5-.11-.82v-.74c0-.32.03-.6.1-.82s.17-.42.29-.57.28-.26.45-.33.37-.1.59-.1.41.03.59.1.33.18.46.33.23.34.3.57.11.5.11.82v.74zm-.85-.86c0-.19-.01-.35-.04-.48s-.07-.23-.12-.31-.11-.14-.19-.17-.16-.05-.25-.05-.18.02-.25.05-.14.09-.19.17-.09.18-.12.31-.04.29-.04.48v.97c0 .19.01.35.04.48s.07.24.12.32.11.14.19.17.16.05.25.05.18-.02.25-.05.14-.09.19-.17.09-.19.11-.32.04-.29.04-.48v-.97z"></path></svg>`,
        iconSkipForward: iconSkipForward || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 13c-.5 0-.91.37-.98.86-.48 3.37-3.77 5.84-7.42 4.96-2.25-.54-3.91-2.27-4.39-4.53C5.32 10.42 8.27 7 12 7v2.79c0 .45.54.67.85.35l3.79-3.79c.2-.2.2-.51 0-.71l-3.79-3.79c-.31-.31-.85-.09-.85.36V5c-4.94 0-8.84 4.48-7.84 9.6.6 3.11 2.9 5.5 5.99 6.19 4.83 1.08 9.15-2.2 9.77-6.67.09-.59-.4-1.12-1-1.12zm-8.02 3v-4.27h-.09l-1.77.63v.69l1.01-.31V16zm3.42-4.22c-.18-.07-.37-.1-.59-.1s-.41.03-.59.1-.33.18-.45.33-.23.34-.29.57-.1.5-.1.82v.74c0 .32.04.6.11.82s.17.42.3.57.28.26.46.33.37.1.59.1.41-.03.59-.1.33-.18.45-.33.22-.34.29-.57.1-.5.1-.82v-.74c0-.32-.04-.6-.11-.82s-.17-.42-.3-.57-.29-.26-.46-.33zm.01 2.57c0 .19-.01.35-.04.48s-.06.24-.11.32-.11.14-.19.17-.16.05-.25.05-.18-.02-.25-.05-.14-.09-.19-.17-.09-.19-.12-.32-.04-.29-.04-.48v-.97c0-.19.01-.35.04-.48s.06-.23.12-.31.11-.14.19-.17.16-.05.25-.05.18.02.25.05.14.09.19.17.09.18.12.31.04.29.04.48v.97z"></path></svg>`,
    });
};

exports.transformHook = transformHook;
