import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const hookPath = "packs/Core.elementsdevpack/components/com.realmacsoftware.audioPlaylist/hooks.source.js";

function classnames(initialClasses = "") {
    const initialClassArray = Array.isArray(initialClasses)
        ? initialClasses
        : initialClasses.split(" ").filter(Boolean);
    const classes = new Set(initialClassArray.filter(Boolean));

    return {
        add(className) {
            (Array.isArray(className) ? className : [className]).forEach((cls) => {
                if (cls) classes.add(cls);
            });
            return this;
        },
        toString() {
            return Array.from(classes).join(" ");
        },
    };
}

function loadTransformHook() {
    const source = fs.readFileSync(hookPath, "utf8");
    const sandbox = {
        exports: {},
        JSON,
        Array,
        Math,
        parseFloat,
        classnames,
        globalLayout: () => "layout",
        globalSizing: () => "sizing",
        globalSpacing: () => "spacing",
        globalTransitions: () => "transitions",
        globalEffects: () => "effects",
        globalFilters: () => "filters",
        globalTransforms: () => "transforms",
        globalBackground: () => "background",
        globalBorders: () => "borders",
        advancedClasses: () => "advanced",
    };

    vm.runInNewContext(source, sandbox, { filename: hookPath });
    return sandbox.exports.transformHook;
}

function renderAudioPlaylist({ props = {}, tracks, mode = "preview" } = {}) {
    const transformHook = loadTransformHook();
    const rw = {
        props: { ...props },
        node: { id: "node-1" },
        project: { mode },
        collections: { tracks },
        component: { sharedAssetPath: "/shared" },
        setRootElement(root) {
            this.root = root;
        },
        setProps(computed) {
            this.computedProps = computed;
        },
    };

    transformHook(rw);
    return rw;
}

test("volume classes include the configured styling props", () => {
    const rw = renderAudioPlaylist({
        props: {
            volumeBarBgColor: "bg-surface-100",
            volumeBarFgColor: "bg-surface-300",
            volumeBarSize: "h-1.5",
            volumeBarWidth: "w-24",
            iconVolumeColor: "text-surface-500",
            iconVolumeColorHover: "hover:text-surface-600",
            iconVolumeSize: "size-5",
        },
    });
    const volume = rw.computedProps.classes.nowPlaying.volume;

    assert.match(volume.bar, /bg-surface-100/);
    assert.match(volume.bar, /h-1\.5/);
    assert.match(volume.bar, /w-24/);
    assert.match(volume.fill, /bg-surface-300/);
    assert.match(volume.muteButton, /text-surface-500/);
    assert.match(volume.muteButton, /hover:text-surface-600/);
    assert.match(volume.muteButton, /size-5/);
});

test("initial volume defaults to 100 when unset", () => {
    const rw = renderAudioPlaylist();

    assert.equal(rw.computedProps.initialVolume, 100);
});

test("initial volume is clamped to the 0-100 range", () => {
    assert.equal(renderAudioPlaylist({ props: { initialVolume: 250 } }).computedProps.initialVolume, 100);
    assert.equal(renderAudioPlaylist({ props: { initialVolume: -5 } }).computedProps.initialVolume, 0);
    assert.equal(renderAudioPlaylist({ props: { initialVolume: 0 } }).computedProps.initialVolume, 0);
    assert.equal(renderAudioPlaylist({ props: { initialVolume: 65 } }).computedProps.initialVolume, 65);
});

test("initial volume tolerates string values from the inspector", () => {
    assert.equal(renderAudioPlaylist({ props: { initialVolume: "50" } }).computedProps.initialVolume, 50);
    assert.equal(renderAudioPlaylist({ props: { initialVolume: "250" } }).computedProps.initialVolume, 100);
});

test("volume icons fall back to the default SVGs", () => {
    const p = renderAudioPlaylist().computedProps;

    assert.match(p.iconVolume, /^<svg /);
    assert.match(p.iconMuted, /^<svg /);
    assert.notEqual(p.iconVolume, p.iconMuted);
});

test("volume icon resources override the defaults", () => {
    const p = renderAudioPlaylist({
        props: { iconVolume: "<svg custom-volume/>", iconMuted: "<svg custom-muted/>" },
    }).computedProps;

    assert.equal(p.iconVolume, "<svg custom-volume/>");
    assert.equal(p.iconMuted, "<svg custom-muted/>");
});

test("root element keeps the alpine bindings", () => {
    const rw = renderAudioPlaylist();

    assert.equal(rw.root.as, "div");
    assert.equal(rw.root.args["x-data"], "elementsAudioPlaylist()");
    assert.equal(rw.root.args["x-init"], "init");
});

test("track row uses the density controls instead of hardcoded padding", () => {
    const wrapper = renderAudioPlaylist({
        props: {
            trackItemPadding: "pt-3 pr-4 pb-3 pl-4",
            trackItemGap: "gap-4",
        },
    }).computedProps.classes.track.wrapper;

    assert.match(wrapper, /pt-3/);
    assert.match(wrapper, /pr-4/);
    assert.match(wrapper, /pb-3/);
    assert.match(wrapper, /pl-4/);
    assert.match(wrapper, /gap-4/);

    const bare = renderAudioPlaylist().computedProps.classes.track.wrapper;
    assert.match(bare, /group\/track/);
    assert.match(bare, /cursor-pointer/);
    assert.doesNotMatch(bare, /px-4/);
    assert.doesNotMatch(bare, /py-3/);
});

test("time display classes pick up the configured styling props", () => {
    const classes = renderAudioPlaylist({
        props: {
            playbackTimeColor: "text-text-600",
            playbackTimeSize: "text-sm",
            trackDurationColor: "text-text-500",
            trackDurationSize: "text-xs",
        },
    }).computedProps.classes;

    assert.match(classes.nowPlaying.time, /tabular-nums/);
    assert.match(classes.nowPlaying.time, /text-text-600/);
    assert.match(classes.nowPlaying.time, /text-sm/);
    assert.match(classes.track.duration, /tabular-nums/);
    assert.match(classes.track.duration, /text-text-500/);
    assert.match(classes.track.duration, /text-xs/);
});

test("time and pause switches normalize to booleans", () => {
    const on = renderAudioPlaylist({
        props: {
            showPlaybackTime: "true",
            showTrackDurations: true,
            pauseWhenOutOfView: "true",
        },
    }).computedProps;
    assert.equal(on.showPlaybackTime, true);
    assert.equal(on.showTrackDurations, true);
    assert.equal(on.pauseWhenOutOfView, true);

    const off = renderAudioPlaylist({
        props: { showPlaybackTime: "false", showTrackDurations: false },
    }).computedProps;
    assert.equal(off.showPlaybackTime, false);
    assert.equal(off.showTrackDurations, false);
    assert.equal(off.pauseWhenOutOfView, false);
});

test("pause when off screen wires the intersect binding on the root", () => {
    const on = renderAudioPlaylist({ props: { pauseWhenOutOfView: true } });
    assert.equal(on.root.args["x-bind"], "pauseWhenHidden");
    assert.equal(on.root.args["x-data"], "elementsAudioPlaylist()");
    assert.equal(on.root.args["x-init"], "init");

    const off = renderAudioPlaylist();
    assert.ok(!("x-bind" in off.root.args));
});

test("compact appearance restyles the now playing block", () => {
    const classes = renderAudioPlaylist({
        props: {
            appearance: "compact",
            nowPlayingLayout: "flex-col text-center",
            nowPlayingArtworkSize: "size-48",
        },
    }).computedProps.classes.nowPlaying;

    assert.match(classes.wrapper, /flex-row/);
    assert.doesNotMatch(classes.wrapper, /flex-col/);
    assert.match(classes.artwork, /size-14/);
    assert.doesNotMatch(classes.artwork, /size-48/);
    assert.match(classes.content, /justify-between/);
    assert.equal(classes.meta, "min-w-0");
    assert.match(classes.title, /truncate/);
    assert.match(classes.artist, /truncate/);
});

test("standard appearance keeps today's markup classes", () => {
    const classes = renderAudioPlaylist({
        props: { nowPlayingLayout: "flex-col text-center" },
    }).computedProps.classes.nowPlaying;

    assert.equal(classes.content, "");
    assert.equal(classes.meta, "mb-4");
    assert.match(classes.wrapper, /flex-col text-center/);
    assert.doesNotMatch(classes.title, /truncate/);
    assert.doesNotMatch(classes.artist, /truncate/);
});
