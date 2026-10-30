// Behavioral check for Gallery lightbox local video (#177).
// Renders the real lightbox templates with the pack's Alpine build, plays two
// real MP4s in headless Chrome, and drives the published controls with real
// mouse and key input. The previous test only grepped for pauseLightboxMedia().

import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const templateRoot =
    process.env.GALLERY_TEMPLATE_ROOT ||
    path.join(
        repoRoot,
        "packs/Core.elementsdevpack/components/com.realmacsoftware.gallery/templates"
    );
const alpineJs = path.join(
    repoRoot,
    "packs/Core.elementsdevpack/components/shared/assets/alpine.js"
);
const alpineIntersect = path.join(
    repoRoot,
    "packs/Core.elementsdevpack/components/shared/assets/alpine-intersect.js"
);

// Structural classes the Gallery hook emits for a default navigation size.
// Tailwind is not loaded here; the harness CSS below implements the same
// layout rules the published stylesheet does for these utilities.
const classes = {
    overlay: "absolute inset-0 -z-10 cursor-zoom-out",
    lightboxCloseButton: "cursor-pointer absolute top-3 right-3 z-10 p-2",
    lightboxCloseButtonIcon: "size-[24px]",
    lightboxItem:
        "snap-center shrink-0 w-screen h-screen flex flex-col justify-center items-center",
    lightboxItemMedia: "max-w-full max-h-full min-h-0 object-contain",
    lightboxButton: "self-center absolute z-10 cursor-pointer p-2",
    lightboxButtonIcon: "size-[24px]",
};

const layoutCss = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; height: 100%; background: #111; }
  [x-cloak] { display: none !important; }
  .pointer-events-none { pointer-events: none; }
  .invisible { visibility: hidden; }
  .fixed { position: fixed; }
  .absolute { position: absolute; }
  .inset-0 { inset: 0; }
  .isolate { isolation: isolate; }
  .z-50 { z-index: 50; }
  .z-10 { z-index: 10; }
  .-z-10 { z-index: -10; }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .w-full { width: 100%; }
  .h-auto { height: auto; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .shrink-0 { flex-shrink: 0; }
  .min-h-0 { min-height: 0; }
  .overflow-x-scroll { overflow-x: scroll; overflow-y: hidden; }
  .snap-x.snap-mandatory { scroll-snap-type: x mandatory; }
  .snap-center { scroll-snap-align: center; }
  .hidden { display: none; }
  @media (min-width: 768px) {
    .md\\:block { display: block; }
  }
  .top-3 { top: 0.75rem; }
  .left-3 { left: 0.75rem; }
  .right-3 { right: 0.75rem; }
  .self-center { align-self: center; }
  .cursor-pointer { cursor: pointer; }
  .p-2 { padding: 0.5rem; }
  .size-\\[24px\\] { width: 24px; height: 24px; }
  .max-w-full { max-width: 100%; }
  .max-h-full { max-height: 100%; }
  .object-contain { object-fit: contain; }
  .aspect-video { aspect-ratio: 16 / 9; }
  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
  }
  button { color: white; background: rgba(0, 0, 0, 0.55); border: 0; }
  video { width: min(70vw, 640px); max-height: 70vh; background: black; }
  /* One slide per scrollport. w-screen is 100vw, which is wider than the
     slider once a classic scrollbar is present, and a sliver of the previous
     slide would keep x-intersect from firing leave. */
  ul[x-ref="slider"] > li {
    width: 100%;
    height: 100vh;
    flex: 0 0 100%;
  }
`;

function assemblePage() {
    const mp4 = fs.readFileSync(path.join(templateRoot, "include/mp4.html"), "utf8");
    let lightbox = fs.readFileSync(path.join(templateRoot, "include/lightbox.html"), "utf8");
    const alpine = fs.readFileSync(path.join(templateRoot, "alpine-gallery-lightbox.html"), "utf8");
    const script = alpine.match(/<script>([\s\S]*?)<\/script>/);
    if (!script) {
        throw new Error("alpine-gallery-lightbox.html has no script");
    }

    const fillMp4 = (src) =>
        mp4
            .replaceAll("{{item.image}}", "")
            .replaceAll("{{item.videoSrc}}", src)
            .replaceAll("{{classes.lightboxItemMedia}}", classes.lightboxItemMedia);

    lightbox = lightbox.replace(/@portal\([\s\S]*?\)\s*/, "").replace(/@endportal\s*$/, "");
    lightbox = lightbox.replace(/@if\(!edit\)\s*x-cloak\s*@endif/g, "x-cloak");
    lightbox = lightbox.replace(
        /@each\(item in resources\)([\s\S]*?)@endeach/,
        (_, inner) => {
            const liOpen = inner.match(/<li\b[\s\S]*?>/);
            if (!liOpen) {
                throw new Error("lightbox each-loop has no <li>");
            }
            return ["/v1.mp4", "/v2.mp4"]
                .map((src) => `${liOpen[0]}\n${fillMp4(src)}\n</li>`)
                .join("\n");
        }
    );
    lightbox = lightbox.replace(/@includeIf\([^)]*\)/g, "");
    lightbox = lightbox.replaceAll("{{id}}", "gallery-1");
    lightbox = lightbox.replaceAll("{{images.title}}", "Gallery");
    lightbox = lightbox.replace(/\{\{classes\.(\w+)\}\}/g, (_, name) => {
        if (!(name in classes)) {
            throw new Error(`unmapped lightbox class ${name}`);
        }
        return classes[name];
    });

    const leftover = lightbox.match(/@(?:if|each|endeach|endif|include|includeIf|portal|endportal)\b|\{\{[^}]+\}\}/g);
    if (leftover) {
        throw new Error(`unresolved template syntax: ${leftover.join(", ")}`);
    }

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Gallery lightbox playback</title>
  <style>${layoutCss}</style>
</head>
<body>
${lightbox}
<script src="/alpine-intersect.js"></script>
<script>${script[1]}</script>
<script src="/alpine.js"></script>
</body>
</html>`;
}

function freePort() {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.on("error", reject);
        server.listen(0, "127.0.0.1", () => {
            const { port } = server.address();
            server.close(() => resolve(port));
        });
    });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function contentType(filePath) {
    if (filePath.endsWith(".js")) return "text/javascript; charset=utf-8";
    if (filePath.endsWith(".mp4")) return "video/mp4";
    if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
    return "application/octet-stream";
}

function startServer(rootDir) {
    const server = http.createServer((req, res) => {
        const url = new URL(req.url, "http://127.0.0.1");
        const filePath = path.join(rootDir, decodeURIComponent(url.pathname));
        if (!filePath.startsWith(rootDir) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
            res.writeHead(404);
            res.end("not found");
            return;
        }
        res.writeHead(200, {
            "content-type": contentType(filePath),
            "cache-control": "no-store",
            "accept-ranges": "bytes",
        });
        fs.createReadStream(filePath).pipe(res);
    });
    return new Promise((resolve) => {
        server.listen(0, "127.0.0.1", () => {
            resolve({ server, port: server.address().port });
        });
    });
}

function makeVideo(dest, frequency) {
    const result = spawn(
        "ffmpeg",
        [
            "-y",
            "-f",
            "lavfi",
            "-i",
            "testsrc=size=320x240:rate=30",
            "-f",
            "lavfi",
            "-i",
            `sine=frequency=${frequency}:sample_rate=44100`,
            "-t",
            "4",
            "-c:v",
            "libx264",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-shortest",
            dest,
        ],
        { stdio: ["ignore", "ignore", "pipe"] }
    );
    let stderr = "";
    result.stderr.on("data", (chunk) => {
        stderr += chunk;
    });
    return new Promise((resolve, reject) => {
        result.on("exit", (code) => {
            if (code === 0) resolve();
            else reject(new Error(`ffmpeg exited ${code}\n${stderr.slice(-500)}`));
        });
    });
}

class Cdp {
    constructor(ws) {
        this.ws = ws;
        this.nextId = 0;
        this.pending = new Map();
        this.listeners = [];
        ws.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.id && this.pending.has(message.id)) {
                const { resolve, reject } = this.pending.get(message.id);
                this.pending.delete(message.id);
                if (message.error) {
                    reject(new Error(`${message.error.message || "cdp error"} ${JSON.stringify(message.error)}`));
                } else {
                    resolve(message.result);
                }
                return;
            }
            for (const listener of this.listeners) listener(message);
        });
    }

    send(method, params = {}) {
        const id = ++this.nextId;
        return new Promise((resolve, reject) => {
            this.pending.set(id, { resolve, reject });
            this.ws.send(JSON.stringify({ id, method, params }));
        });
    }

    on(listener) {
        this.listeners.push(listener);
    }
}

async function launchChrome(port, userDataDir) {
    const chrome = spawn(
        "google-chrome",
        [
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            "--disable-dev-shm-usage",
            `--remote-debugging-port=${port}`,
            `--user-data-dir=${userDataDir}`,
            "--remote-allow-origins=*",
            "--autoplay-policy=no-user-gesture-required",
            "--no-first-run",
            "--no-default-browser-check",
            "--disable-background-networking",
            "about:blank",
        ],
        { stdio: ["ignore", "ignore", "pipe"] }
    );
    let stderr = "";
    chrome.stderr.on("data", (chunk) => {
        stderr += chunk.toString();
        if (stderr.length > 4000) stderr = stderr.slice(-4000);
    });
    for (let i = 0; i < 50; i++) {
        try {
            const response = await fetch(`http://127.0.0.1:${port}/json/version`);
            if (response.ok) return { chrome, stderr: () => stderr };
        } catch {
            // Chrome is still starting.
        }
        if (chrome.exitCode !== null) {
            throw new Error(`chrome exited ${chrome.exitCode}\n${stderr}`);
        }
        await sleep(100);
    }
    chrome.kill("SIGKILL");
    throw new Error(`chrome devtools did not start\n${stderr}`);
}

async function connectPage(port) {
    let page;
    for (let i = 0; i < 30; i++) {
        const list = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json());
        page = list.find((target) => target.type === "page");
        if (page?.webSocketDebuggerUrl) break;
        await sleep(100);
    }
    if (!page?.webSocketDebuggerUrl) {
        throw new Error("chrome has no page target");
    }
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
        ws.addEventListener("open", resolve, { once: true });
        ws.addEventListener("error", reject, { once: true });
    });
    const cdp = new Cdp(ws);
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
        width: 1280,
        height: 800,
        deviceScaleFactor: 1,
        mobile: false,
    });
    return { cdp, ws };
}

async function evaluate(cdp, expression) {
    const result = await cdp.send("Runtime.evaluate", {
        expression,
        awaitPromise: true,
        returnByValue: true,
    });
    if (result.exceptionDetails) {
        const description =
            result.exceptionDetails.exception?.description ||
            result.exceptionDetails.text ||
            "evaluate failed";
        throw new Error(description);
    }
    return result.result?.value;
}

async function waitFor(cdp, expression, label, timeoutMs = 4000) {
    const started = Date.now();
    let last;
    while (Date.now() - started < timeoutMs) {
        last = await evaluate(cdp, `(() => { try { return (${expression}); } catch (error) { return { __error: String(error) }; } })()`);
        if (last && typeof last === "object" && last.__error) {
            throw new Error(`${label}: ${last.__error}`);
        }
        if (last) return last;
        await sleep(50);
    }
    throw new Error(`timed out waiting for ${label}: ${JSON.stringify(last)}`);
}

async function mouseClick(cdp, x, y) {
    const point = { x: Math.round(x), y: Math.round(y), button: "left", clickCount: 1 };
    await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: point.x, y: point.y });
    await cdp.send("Input.dispatchMouseEvent", { type: "mousePressed", ...point });
    await cdp.send("Input.dispatchMouseEvent", { type: "mouseReleased", ...point });
}

async function clickSelector(cdp, finderSource, label) {
    const target = await evaluate(
        cdp,
        `(() => {
            const el = (${finderSource});
            if (!el) return { missing: true };
            const rect = el.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const top = document.elementFromPoint(x, y);
            return {
                x, y,
                width: rect.width,
                height: rect.height,
                topTag: top && top.tagName,
                topClick: top && (top.getAttribute("x-on:click") || top.getAttribute("@click")),
                hit: !!(top && (top === el || el.contains(top))),
            };
        })()`
    );
    if (!target || target.missing) {
        throw new Error(`${label} was not found`);
    }
    if (target.width < 2 || target.height < 2 || !target.hit) {
        throw new Error(`${label} is not clickable: ${JSON.stringify(target)}`);
    }
    await mouseClick(cdp, target.x, target.y);
    return target;
}

const findButton = (attrValue) =>
    `[...document.querySelectorAll("button")].find((button) => button.getAttribute("x-on:click") === ${JSON.stringify(attrValue)})`;

async function sizeSlidesToScrollport(cdp) {
    // Give each slide the slider's client width so one swipe can move it fully
    // out of the scrollport. A leftover sliver would keep x-intersect from
    // firing leave (threshold 0).
    await evaluate(
        cdp,
        `(() => {
            const slider = document.querySelector('[x-ref="slider"]');
            const width = slider.clientWidth;
            for (const slide of slider.children) {
                slide.style.flex = "0 0 " + width + "px";
                slide.style.width = width + "px";
            }
            return width;
        })()`
    );
}

async function openLightbox(cdp) {
    await sizeSlidesToScrollport(cdp);
    await evaluate(
        cdp,
        `window.dispatchEvent(new CustomEvent("gallery-lightbox-show", { detail: { id: "gallery-1", slide: 0 } }))`
    );
    await waitFor(
        cdp,
        `(() => {
            const root = document.querySelector("[x-data]");
            const next = [...document.querySelectorAll("button")].find((button) => button.getAttribute("x-on:click") === "next");
            const rect = next && next.getBoundingClientRect();
            return !!(
                root &&
                !root.classList.contains("pointer-events-none") &&
                !root.classList.contains("invisible") &&
                rect &&
                rect.width > 2 &&
                rect.height > 2
            );
        })()`,
        "lightbox to open"
    );
}

async function installPauseTrace(cdp) {
    await evaluate(
        cdp,
        `(() => {
            const root = document.querySelector("[x-data]");
            const data = Alpine.$data(root);
            const original = data.pauseLightboxMedia;
            window.__pauseTrace = [];
            data.pauseLightboxMedia = function (...args) {
                const scope = args[0] && args[0].nodeType === 1 ? args[0] : null;
                window.__pauseTrace.push({
                    elTag: this.$el ? this.$el.tagName : null,
                    elIsRoot: this.$el === root,
                    elVideos: this.$el && this.$el.querySelectorAll ? this.$el.querySelectorAll("video, audio").length : null,
                    rootVideos: this.$root && this.$root.querySelectorAll ? this.$root.querySelectorAll("video, audio").length : null,
                    scopeTag: scope ? scope.tagName : null,
                });
                return original.apply(this, args);
            };
            return true;
        })()`
    );
}

async function pauseTrace(cdp) {
    return evaluate(cdp, `window.__pauseTrace || []`);
}

async function mediaState(cdp) {
    return evaluate(
        cdp,
        `(() => [...document.querySelectorAll("video")].map((video) => ({
            paused: video.paused,
            currentTime: video.currentTime,
            muted: video.muted,
            readyState: video.readyState,
            error: video.error && video.error.message,
        })))()`
    );
}

async function playVideo(cdp, index) {
    const result = await evaluate(
        cdp,
        `(async () => {
            const video = document.querySelectorAll("video")[${index}];
            if (!video) return { missing: true };
            video.muted = false;
            try {
                await video.play();
            } catch (error) {
                return { playError: String(error), paused: video.paused, readyState: video.readyState, error: video.error && video.error.message };
            }
            const started = performance.now();
            while (video.currentTime < 0.25 && performance.now() - started < 4000) {
                await new Promise((resolve) => setTimeout(resolve, 40));
            }
            return {
                paused: video.paused,
                currentTime: video.currentTime,
                muted: video.muted,
                readyState: video.readyState,
                error: video.error && video.error.message,
            };
        })()`
    );
    if (!result || result.missing || result.playError || result.paused || result.currentTime < 0.2 || result.muted) {
        throw new Error(`video ${index + 1} did not start playing: ${JSON.stringify(result)}`);
    }
    return result;
}

function assertPausedAt(state, index, minimumTime, label) {
    const clip = state[index];
    assert.equal(clip.paused, true, `${label}: video ${index + 1} paused`);
    assert.ok(
        clip.currentTime >= minimumTime,
        `${label}: video ${index + 1} currentTime ${clip.currentTime} kept (reset would be 0)`
    );
}

function assertOnlyPlaying(state, index, label) {
    state.forEach((clip, clipIndex) => {
        assert.equal(
            clip.paused,
            clipIndex !== index,
            `${label}: video ${clipIndex + 1} paused=${clip.paused}, expected only video ${index + 1} to play`
        );
    });
    assert.equal(state.filter((clip) => !clip.paused).length, 1, `${label}: one video playing`);
}

async function loadScenario(cdp, pageUrl) {
    await cdp.send("Page.navigate", { url: pageUrl });
    await waitFor(
        cdp,
        `document.readyState === "complete" && !!window.Alpine && document.querySelectorAll("video").length === 2`,
        "page ready"
    );
    await installPauseTrace(cdp);
    await openLightbox(cdp);
}

async function pressEscape(cdp) {
    const event = {
        key: "Escape",
        code: "Escape",
        windowsVirtualKeyCode: 27,
        nativeVirtualKeyCode: 27,
    };
    await cdp.send("Input.dispatchKeyEvent", { type: "keyDown", ...event });
    await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", ...event });
}

async function swipeSlider(cdp) {
    const metrics = () =>
        evaluate(
            cdp,
            `(() => {
                const slider = document.querySelector('[x-ref="slider"]');
                const first = slider.children[0].getBoundingClientRect();
                const rect = slider.getBoundingClientRect();
                return {
                    scrollLeft: slider.scrollLeft,
                    clientWidth: slider.clientWidth,
                    scrollWidth: slider.scrollWidth,
                    x: rect.left + rect.width / 2,
                    y: rect.top + Math.min(rect.height / 2, 200),
                    firstRight: first.right,
                    sliderLeft: rect.left,
                    out: first.right <= rect.left + 1,
                };
            })()`
        );

    const before = await metrics();
    for (let step = 0; step < 8; step++) {
        const current = await metrics();
        if (current.scrollLeft > before.clientWidth * 0.85 && current.out) {
            return { before, after: current, steps: step };
        }
        await cdp.send("Input.dispatchMouseEvent", {
            type: "mouseWheel",
            x: Math.round(current.x),
            y: Math.round(current.y),
            deltaX: Math.ceil(current.clientWidth),
            deltaY: 0,
        });
        await sleep(120);
    }
    const after = await metrics();
    throw new Error(`slider swipe did not move slide 1 out of view: ${JSON.stringify({ before, after })}`);
}

async function clickOverlay(cdp) {
    const point = await evaluate(
        cdp,
        `(() => {
            const overlay = [...document.querySelectorAll("[x-data] > div")].find((el) => el.getAttribute("@click") === "show = false");
            if (!overlay) return { missing: true };
            const width = window.innerWidth;
            const height = window.innerHeight;
            for (const [x, y] of [[width / 2, 12], [width / 2, height - 12], [12, height / 2], [width - 12, height / 2], [width / 2, height / 2]]) {
                if (document.elementFromPoint(x, y) === overlay) return { x, y };
            }
            return { uncovered: true };
        })()`
    );
    if (!point || point.missing) {
        throw new Error("overlay element is missing");
    }
    if (point.uncovered) {
        await evaluate(
            cdp,
            `(() => {
                const slider = document.querySelector('[x-ref="slider"]');
                slider.style.height = "60vh";
                for (const slide of slider.children) slide.style.height = "60vh";
            })()`
        );
        await sleep(50);
        const opened = await evaluate(
            cdp,
            `(() => {
                const overlay = [...document.querySelectorAll("[x-data] > div")].find((el) => el.getAttribute("@click") === "show = false");
                const x = window.innerWidth / 2;
                const y = 16;
                return { x, y, hit: document.elementFromPoint(x, y) === overlay };
            })()`
        );
        if (!opened.hit) {
            throw new Error(`overlay is not reachable: ${JSON.stringify(opened)}`);
        }
        await mouseClick(cdp, opened.x, opened.y);
        return opened;
    }
    await mouseClick(cdp, point.x, point.y);
    return point;
}

test("lightbox local videos pause on next, prev, swipe, and close", { timeout: 120000 }, async () => {
    const work = await fs.promises.mkdtemp(path.join(os.tmpdir(), "gallery-lightbox-"));
    const userDataDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "gallery-chrome-"));
    const devtoolsPort = await freePort();
    let chrome;
    let server;
    let ws;
    let cdp;
    try {
        await Promise.all([
            makeVideo(path.join(work, "v1.mp4"), 440),
            makeVideo(path.join(work, "v2.mp4"), 660),
        ]);
        await fs.promises.writeFile(path.join(work, "index.html"), assemblePage());
        await fs.promises.copyFile(alpineJs, path.join(work, "alpine.js"));
        await fs.promises.copyFile(alpineIntersect, path.join(work, "alpine-intersect.js"));
        const started = await startServer(work);
        server = started.server;
        const pageUrl = `http://127.0.0.1:${started.port}/index.html`;
        ({ chrome } = await launchChrome(devtoolsPort, userDataDir));
        const page = await connectPage(devtoolsPort);
        ({ cdp, ws } = { cdp: page.cdp, ws: page.ws });
        const logs = [];
        page.cdp.on((message) => {
            if (message.method === "Runtime.consoleAPICalled") {
                logs.push(message.params.args.map((arg) => arg.value || arg.description).join(" "));
            }
        });

        const failures = [];
        const report = [];

        async function scenario(name, run) {
            try {
                await loadScenario(cdp, pageUrl);
                const detail = await run();
                const trace = await pauseTrace(cdp);
                const line = { name, pass: true, detail, trace };
                report.push(line);
                console.log(`PASS ${name}`);
                console.log(JSON.stringify({ detail, trace }));
            } catch (error) {
                let trace = null;
                let state = null;
                try {
                    trace = await pauseTrace(cdp);
                    state = await mediaState(cdp);
                } catch {
                    // The page may already be gone.
                }
                const line = { name, pass: false, error: error.message, trace, state, logs: logs.slice(-8) };
                report.push(line);
                failures.push(line);
                console.log(`FAIL ${name}`);
                console.log(JSON.stringify({ error: error.message, trace, state, logs: logs.slice(-12) }));
            }
        }

        await scenario("next arrow pauses video 1 and keeps currentTime", async () => {
            const started = await playVideo(cdp, 0);
            const click = await clickSelector(cdp, findButton("next"), "next button");
            await sleep(50);
            const state = await mediaState(cdp);
            assertPausedAt(state, 0, started.currentTime - 0.05, "after next");
            assert.equal(state[1].paused, true, "video 2 stays paused after next");
            return { click, started, state };
        });

        await scenario("playing video 2 after next leaves only one video playing", async () => {
            await playVideo(cdp, 0);
            await clickSelector(cdp, findButton("next"), "next button");
            await sleep(50);
            const started = await playVideo(cdp, 1);
            const state = await mediaState(cdp);
            assertOnlyPlaying(state, 1, "both slides");
            return { started, state };
        });

        await scenario("prev arrow pauses video 2 and keeps currentTime", async () => {
            await clickSelector(cdp, findButton("next"), "next button");
            await waitFor(
                cdp,
                `document.querySelector('[x-ref="slider"]').scrollLeft > 200`,
                "slider to reach slide 2",
                3000
            );
            const started = await playVideo(cdp, 1);
            const click = await clickSelector(cdp, findButton("prev"), "prev button");
            await sleep(50);
            const state = await mediaState(cdp);
            assertPausedAt(state, 1, started.currentTime - 0.05, "after prev");
            return { click, started, state };
        });

        await scenario("playing video 1 after prev leaves only one video playing", async () => {
            await clickSelector(cdp, findButton("next"), "next button");
            await waitFor(
                cdp,
                `document.querySelector('[x-ref="slider"]').scrollLeft > 200`,
                "slider to reach slide 2",
                3000
            );
            await playVideo(cdp, 1);
            await clickSelector(cdp, findButton("prev"), "prev button");
            await sleep(50);
            const started = await playVideo(cdp, 0);
            const state = await mediaState(cdp);
            assertOnlyPlaying(state, 0, "after prev");
            return { started, state };
        });

        await scenario("slider swipe pauses the slide that leaves view", async () => {
            const started = await playVideo(cdp, 0);
            const swipe = await swipeSlider(cdp);
            try {
                await waitFor(
                    cdp,
                    `document.querySelectorAll("video")[0].paused === true`,
                    "video 1 to pause after swipe",
                    3000
                );
            } catch (error) {
                const diag = await evaluate(
                    cdp,
                    `(() => {
                        const slider = document.querySelector('[x-ref="slider"]');
                        const slide = slider.children[0];
                        const slideRect = slide.getBoundingClientRect();
                        return {
                            tabindex: slide.getAttribute("tabindex"),
                            scrollLeft: slider.scrollLeft,
                            slideRight: slideRect.right,
                        };
                    })()`
                );
                throw new Error(`${error.message}\n${JSON.stringify({ swipe, diag })}`);
            }
            const state = await mediaState(cdp);
            assertPausedAt(state, 0, 0.15, "after swipe");
            const second = await playVideo(cdp, 1);
            const after = await mediaState(cdp);
            assertOnlyPlaying(after, 1, "after swipe");
            return { started, swipe, state, second, after };
        });

        await scenario("close button pauses the playing video", async () => {
            const started = await playVideo(cdp, 0);
            const click = await clickSelector(cdp, findButton("show = false"), "close button");
            await sleep(50);
            const state = await mediaState(cdp);
            assertPausedAt(state, 0, started.currentTime - 0.05, "after close button");
            const shown = await evaluate(cdp, `Alpine.$data(document.querySelector("[x-data]")).show`);
            assert.equal(shown, false, "lightbox show is false");
            return { click, started, state };
        });

        await scenario("overlay click pauses the playing video", async () => {
            const started = await playVideo(cdp, 0);
            const click = await clickOverlay(cdp);
            await sleep(50);
            const state = await mediaState(cdp);
            assertPausedAt(state, 0, started.currentTime - 0.05, "after overlay");
            const shown = await evaluate(cdp, `Alpine.$data(document.querySelector("[x-data]")).show`);
            assert.equal(shown, false, "lightbox show is false");
            return { click, started, state };
        });

        await scenario("Escape pauses the playing video", async () => {
            const started = await playVideo(cdp, 0);
            await pressEscape(cdp);
            await sleep(50);
            const state = await mediaState(cdp);
            assertPausedAt(state, 0, started.currentTime - 0.05, "after Escape");
            const shown = await evaluate(cdp, `Alpine.$data(document.querySelector("[x-data]")).show`);
            assert.equal(shown, false, "lightbox show is false");
            return { started, state };
        });

        console.log("SUMMARY");
        console.log(JSON.stringify(report.map(({ name, pass, error }) => ({ name, pass, error })), null, 2));
        assert.equal(failures.length, 0, `${failures.length} lightbox playback checks failed`);
    } finally {
        if (ws) ws.close();
        if (chrome) {
            chrome.kill("SIGKILL");
            await sleep(200);
        }
        if (server) await new Promise((resolve) => server.close(resolve));
        await fs.promises.rm(work, { recursive: true, force: true }).catch(() => {});
        await fs.promises.rm(userDataDir, { recursive: true, force: true }).catch(() => {});
    }
});
