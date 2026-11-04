// Published Gallery remote-folder output: the real PHP scanner and the real
// lightbox script, served over HTTP, driven in headless Chrome.
//
// Covers a mixed image/video folder and a videos-only folder, including
// uppercase extensions, spaces in names, natural sort, and companion posters.
// Lightbox clips are not muted and are not set to autoplay; prev/next/close
// pause them through the shipping galleryLightbox component.

import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const templateRoot = path.join(
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
const shotDir = "/opt/cursor/artifacts/screenshots";

const classes = {
    thumbnail: "thumb",
    thumbnailImage: "thumb-media",
    thumbnailMeta: "thumb-meta",
    thumbnailCaption: "thumb-caption",
    lightboxItem: "snap-center shrink-0 w-screen h-screen flex flex-col justify-center items-center",
    lightboxItemMedia: "max-w-full max-h-full min-h-0 object-contain",
    lightboxMeta: "lightbox-meta",
    lightboxCaption: "lightbox-caption",
    overlay: "absolute inset-0 -z-10 cursor-zoom-out",
    lightboxCloseButton: "cursor-pointer absolute top-3 right-3 z-10 p-2",
    lightboxCloseButtonIcon: "size-[24px]",
    lightboxButton: "self-center absolute z-10 cursor-pointer p-2",
    lightboxButtonIcon: "size-[24px]",
};

const layoutCss = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; background: #f4f4f5; font-family: sans-serif; }
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
  @media (min-width: 768px) { .md\\:block { display: block; } }
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
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 160px);
    gap: 12px;
    padding: 16px;
  }
  .thumb { cursor: pointer; }
  .thumb-media { width: 160px; height: 160px; object-fit: cover; background: #111; display: block; }
  .thumb-caption { font-size: 12px; color: #333; }
  ul[x-ref="slider"] > li { width: 100%; height: 100vh; flex: 0 0 100%; }
  video.lightbox-player, ul[x-ref="slider"] video { width: min(70vw, 640px); max-height: 70vh; background: black; }
`;

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

function run(command, args) {
    const child = spawn(command, args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => {
        stderr += chunk.toString();
    });
    return new Promise((resolve, reject) => {
        child.on("exit", (code) => {
            if (code === 0) resolve();
            else reject(new Error(`${command} exited ${code}\n${stderr.slice(-800)}`));
        });
    });
}

function makeStill(dest, color) {
    return run("ffmpeg", [
        "-y", "-f", "lavfi", "-i", `color=c=${color}:s=320x180`,
        "-frames:v", "1", dest,
    ]);
}

function makeVideo(dest, frequency, formatArgs) {
    return run("ffmpeg", [
        "-y",
        "-f", "lavfi", "-i", "testsrc=size=320x180:rate=12",
        "-f", "lavfi", "-i", `sine=frequency=${frequency}:sample_rate=44100`,
        "-t", "3",
        "-shortest",
        ...formatArgs,
        dest,
    ]);
}

function publishPhp(filename, tokens) {
    let source = fs.readFileSync(path.join(templateRoot, filename), "utf8");
    source = source.replace(
        /@include\("([^"]+)"\)\s*/g,
        (_, name) => `<?php require __DIR__ . '/${name}.php'; ?>\n`
    );
    source = source.replace(/@if\s*\([^)]*\)\s*/g, "");
    source = source.replace(/@endif\s*/g, "");
    for (const [key, value] of Object.entries(tokens)) {
        source = source.replaceAll(`{{${key}}}`, value);
    }
    source = source.replace(/\{\{classes\.(\w+)\}\}/g, (_, name) => {
        if (!(name in classes)) throw new Error(`${filename} uses unmapped class ${name}`);
        return classes[name];
    });
    const leftover = source.match(
        /@(?:if|each|endeach|endif|include|includeIf|portal|endportal)\b|\{\{[^}]+\}\}/g
    );
    if (leftover) {
        throw new Error(`${filename} has unresolved template syntax: ${leftover.join(", ")}`);
    }
    return source;
}

function writeScan(dest, folder) {
    const php = publishPhp("include/remote-scan.php", {
        phpId: "node_1",
        remoteFolder: folder,
        pageDocRoot: "",
    });
    fs.writeFileSync(dest, php);
}

function phpJson(scanFile) {
    const runner = path.join(path.dirname(scanFile), `_run_${path.basename(scanFile)}`);
    fs.writeFileSync(
        runner,
        `<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require ${JSON.stringify(scanFile)};
echo json_encode($rwGalleryImages_node_1, JSON_UNESCAPED_SLASHES);
`
    );
    const child = spawn("php", [runner], { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
        stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
        stderr += chunk;
    });
    return new Promise((resolve, reject) => {
        child.on("exit", (code) => {
            if (code !== 0) {
                reject(new Error(`php exited ${code}\n${stderr}\n${stdout}`));
                return;
            }
            if (stderr.trim()) {
                reject(new Error(`php warnings:\n${stderr}`));
                return;
            }
            resolve(JSON.parse(stdout));
        });
    });
}

function lightboxMarkup(slidesPhp) {
    let lightbox = fs.readFileSync(path.join(templateRoot, "include/lightbox.html"), "utf8");
    lightbox = lightbox.replace(/@portal\([\s\S]*?\)\s*/, "").replace(/@endportal\s*$/, "");
    lightbox = lightbox.replace(
        /@each\(item in resources\)[\s\S]*?@endeach\s*@includeIf\(remotePublished, template: "remote-slides"\)/,
        slidesPhp
    );
    lightbox = lightbox.replace(/@if\(!edit\)\s*x-cloak\s*@endif/g, "x-cloak");
    lightbox = lightbox.replace(/@if\s*\([^)]*\)\s*/g, "");
    lightbox = lightbox.replace(/@endif\s*/g, "");
    lightbox = lightbox.replaceAll("{{id}}", "gallery-1");
    lightbox = lightbox.replaceAll("{{images.title}}", "Gallery");
    lightbox = lightbox.replace(/\{\{classes\.(\w+)\}\}/g, (_, name) => {
        if (!(name in classes)) throw new Error(`lightbox uses unmapped class ${name}`);
        return classes[name];
    });
    const leftover = lightbox.match(
        /@(?:if|each|endeach|endif|include|includeIf|portal|endportal)\b|\{\{[^}]+\}\}/g
    );
    if (leftover) {
        throw new Error(`lightbox has unresolved template syntax: ${leftover.join(", ")}`);
    }
    return lightbox;
}

function alpineScript() {
    const alpine = fs.readFileSync(path.join(templateRoot, "alpine-gallery-lightbox.html"), "utf8");
    const script = alpine.match(/<script>([\s\S]*?)<\/script>/);
    if (!script) throw new Error("alpine-gallery-lightbox.html has no script");
    return script[1];
}

function pagePhp(folder, gridPhp, slidesPhp) {
    const grid = publishPhp("include/remote-grid.php", {
        phpId: "node_1",
        remoteFolder: folder,
        pageDocRoot: "",
        lazyFrom: "3",
        id: "gallery-1",
    }).replace(
        "<?php require __DIR__ . '/remote-scan.php'; ?>",
        "<?php require __DIR__ . '/remote-scan.php'; ?>"
    );
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Remote folder</title>
  <style>${layoutCss}</style>
</head>
<body>
<div class="grid" x-data>
${grid}
</div>
${lightboxMarkup(slidesPhp)}
<script src="/alpine-intersect.js"></script>
<script>${alpineScript()}</script>
<script src="/alpine.js"></script>
</body>
</html>`;
}

const routerPhp = `<?php
$uri = urldecode(parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH));
$file = __DIR__ . $uri;
$root = realpath(__DIR__);
if (substr($uri, -4) === ".php") {
    return false;
}
$real = realpath($file);
if ($real === false || strpos($real, $root . DIRECTORY_SEPARATOR) !== 0 || !is_file($real)) {
    http_response_code(404);
    echo "not found";
    return true;
}
$ext = strtolower(pathinfo($real, PATHINFO_EXTENSION));
$mimes = [
    "mp4" => "video/mp4",
    "m4v" => "video/mp4",
    "webm" => "video/webm",
    "mov" => "video/quicktime",
    "jpg" => "image/jpeg",
    "jpeg" => "image/jpeg",
    "js" => "text/javascript",
    "png" => "image/png",
];
$size = filesize($real);
$start = 0;
$end = $size - 1;
header("Content-Type: " . ($mimes[$ext] ?? "application/octet-stream"));
header("Accept-Ranges: bytes");
header("Cache-Control: no-store");
if (isset($_SERVER["HTTP_RANGE"]) && preg_match("/bytes=(\\d*)-(\\d*)/", $_SERVER["HTTP_RANGE"], $match)) {
    if ($match[1] !== "") $start = (int) $match[1];
    if ($match[2] !== "") $end = (int) $match[2];
    if ($start > $end || $start >= $size) {
        http_response_code(416);
        header("Content-Range: bytes */$size");
        return true;
    }
    http_response_code(206);
    header("Content-Range: bytes $start-$end/$size");
    header("Content-Length: " . ($end - $start + 1));
    $handle = fopen($real, "rb");
    fseek($handle, $start);
    $remaining = $end - $start + 1;
    while ($remaining > 0 && !feof($handle)) {
        $chunk = fread($handle, min(8192, $remaining));
        $remaining -= strlen($chunk);
        echo $chunk;
    }
    fclose($handle);
    return true;
}
header("Content-Length: " . $size);
readfile($real);
return true;
`;

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
                if (message.error) reject(new Error(JSON.stringify(message.error)));
                else resolve(message.result);
                return;
            }
            for (const listener of this.listeners) listener(message);
        });
    }

    send(method, params = {}, timeoutMs = 15000) {
        const id = ++this.nextId;
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                this.pending.delete(id);
                reject(new Error(`CDP timeout: ${method}`));
            }, timeoutMs);
            this.pending.set(id, {
                resolve: (value) => {
                    clearTimeout(timer);
                    resolve(value);
                },
                reject: (error) => {
                    clearTimeout(timer);
                    reject(error);
                },
            });
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
            if (response.ok) return chrome;
        } catch {
            // still starting
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
    if (!page?.webSocketDebuggerUrl) throw new Error("chrome has no page target");
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
        throw new Error(
            result.exceptionDetails.exception?.description ||
                result.exceptionDetails.text ||
                "evaluate failed"
        );
    }
    return result.result?.value;
}

async function waitFor(cdp, expression, label, timeoutMs = 8000) {
    const started = Date.now();
    let last;
    while (Date.now() - started < timeoutMs) {
        last = await evaluate(cdp, `(() => { try { return (${expression}); } catch (error) { return { __error: String(error) }; } })()`);
        if (last && typeof last === "object" && last.__error) throw new Error(`${label}: ${last.__error}`);
        if (last) return last;
        await sleep(50);
    }
    throw new Error(`timed out waiting for ${label}: ${JSON.stringify(last)}`);
}

async function screenshot(cdp, file) {
    const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
    await fs.promises.mkdir(path.dirname(file), { recursive: true });
    await fs.promises.writeFile(file, Buffer.from(shot.data, "base64"));
}

async function mouseClick(cdp, x, y) {
    const point = { x: Math.round(x), y: Math.round(y), button: "left", clickCount: 1 };
    await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: point.x, y: point.y });
    await cdp.send("Input.dispatchMouseEvent", { type: "mousePressed", ...point });
    await cdp.send("Input.dispatchMouseEvent", { type: "mouseReleased", ...point });
}

const slideVideo = (index) =>
    `document.querySelectorAll('[x-ref="slider"] > li')[${index}]?.querySelector("video")`;

async function slideState(cdp) {
    return evaluate(
        cdp,
        `(() => [...document.querySelectorAll('[x-ref="slider"] > li')].map((slide) => {
            const video = slide.querySelector("video");
            const img = slide.querySelector("img");
            if (!video) return { kind: "image", alt: img && img.alt };
            return {
                kind: "video",
                src: (video.currentSrc || (video.querySelector("source") && video.querySelector("source").src) || "").split("/").pop(),
                paused: video.paused,
                muted: video.muted,
                autoplay: video.autoplay,
                controls: video.controls,
                currentTime: video.currentTime,
                readyState: video.readyState,
                error: video.error && video.error.message,
                width: video.videoWidth,
            };
        }))()`
    );
}

async function playSlide(cdp, index) {
    const result = await evaluate(
        cdp,
        `(async () => {
            const video = ${slideVideo(index)};
            if (!video) return { missing: true };
            const before = { muted: video.muted, autoplay: video.autoplay, controls: video.controls, width: video.videoWidth };
            let playError = "";
            try {
                await Promise.race([
                    video.play(),
                    new Promise((_, reject) => setTimeout(() => reject(new Error("play timed out")), 4000)),
                ]);
            } catch (error) {
                playError = String(error);
            }
            const started = performance.now();
            while (video.currentTime < 0.2 && performance.now() - started < 4000) {
                await new Promise((resolve) => setTimeout(resolve, 40));
            }
            return {
                ...before,
                playError,
                paused: video.paused,
                muted: video.muted,
                currentTime: video.currentTime,
                readyState: video.readyState,
                error: video.error && video.error.message,
            };
        })()`
    );
    if (!result || result.missing || result.playError || result.paused || result.currentTime < 0.2) {
        throw new Error(`slide ${index} did not play: ${JSON.stringify(result)}`);
    }
    if (result.muted || result.autoplay || !result.controls) {
        throw new Error(`slide ${index} player flags: ${JSON.stringify(result)}`);
    }
    return result;
}

test("remote folder PHP lists videos, images, spaces, and sort order", async () => {
    const work = await fs.promises.mkdtemp(path.join(os.tmpdir(), "gallery-remote-scan-"));
    const mixedDir = path.join(work, "remote media", "mixed clips");
    const videoDir = path.join(work, "remote media", "videos only");
    await fs.promises.mkdir(mixedDir, { recursive: true });
    await fs.promises.mkdir(videoDir, { recursive: true });

    await Promise.all([
        makeStill(path.join(mixedDir, "2-pier.jpg"), "0x336699"),
        makeStill(path.join(mixedDir, "Holiday Clip-thumb.jpg"), "0xcc6633"),
        makeVideo(path.join(mixedDir, "10-harbour.mp4"), 440, ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac"]),
        makeVideo(path.join(videoDir, "b roll.mp4"), 550, ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac"]),
    ]);
    await fs.promises.copyFile(path.join(mixedDir, "10-harbour.mp4"), path.join(mixedDir, "Holiday Clip.MP4"));
    await fs.promises.copyFile(path.join(mixedDir, "10-harbour.mp4"), path.join(mixedDir, "reel.m4v"));
    await fs.promises.copyFile(path.join(mixedDir, "10-harbour.mp4"), path.join(mixedDir, "clip-thumb.mp4"));
    await fs.promises.copyFile(path.join(videoDir, "b roll.mp4"), path.join(videoDir, "A-Clip.MP4"));
    await makeVideo(path.join(mixedDir, "tour.webm"), 660, ["-c:v", "libvpx", "-b:v", "200k", "-c:a", "libopus"]);
    await makeVideo(path.join(mixedDir, "intro.mov"), 770, ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", "-f", "mov"]);
    await fs.promises.writeFile(path.join(mixedDir, "notes.txt"), "skip");
    await fs.promises.writeFile(path.join(mixedDir, ".hidden.mp4"), "nope");
    await fs.promises.writeFile(path.join(videoDir, "readme.txt"), "skip");

    writeScan(path.join(work, "scan-mixed.php"), "remote media/mixed clips");
    writeScan(path.join(work, "scan-videos.php"), "remote media/videos only");
    writeScan(path.join(work, "scan-url.php"), "https://example.com/remote media/videos only");

    const mixed = await phpJson(path.join(work, "scan-mixed.php"));
    assert.deepEqual(
        mixed.map((item) => item.caption),
        ["2 pier", "10 harbour", "clip thumb", "Holiday Clip", "intro", "reel", "tour"]
    );
    assert.deepEqual(
        mixed.map((item) => item.isVideo),
        [false, true, true, true, true, true, true]
    );
    assert.equal(mixed[0].src, "remote%20media/mixed%20clips/2-pier.jpg");
    assert.equal(mixed[0].mime, "");
    assert.equal(mixed[1].src, "remote%20media/mixed%20clips/10-harbour.mp4");
    assert.equal(mixed[1].mime, "video/mp4");
    assert.equal(mixed[1].poster, "");
    const holiday = mixed[3];
    assert.equal(holiday.src, "remote%20media/mixed%20clips/Holiday%20Clip.MP4");
    assert.equal(holiday.mime, "video/mp4");
    assert.equal(holiday.poster, "remote%20media/mixed%20clips/Holiday%20Clip-thumb.jpg");
    assert.equal(holiday.thumb, holiday.poster);
    assert.equal(mixed[4].mime, "video/quicktime");
    assert.equal(mixed[5].mime, "video/mp4");
    assert.equal(mixed[5].src.endsWith("/reel.m4v"), true);
    assert.equal(mixed[6].mime, "video/webm");
    assert.equal(
        mixed.some((item) => item.src.includes("notes") || item.src.includes("hidden")),
        false
    );

    const videos = await phpJson(path.join(work, "scan-videos.php"));
    assert.deepEqual(
        videos.map((item) => item.src),
        [
            "remote%20media/videos%20only/A-Clip.MP4",
            "remote%20media/videos%20only/b%20roll.mp4",
        ]
    );
    assert.ok(videos.every((item) => item.isVideo && item.mime === "video/mp4"));

    const fromUrl = await phpJson(path.join(work, "scan-url.php"));
    assert.deepEqual(
        fromUrl.map((item) => item.src),
        videos.map((item) => item.src)
    );
});

test("published remote folder plays videos and stops audio on next, prev, and close", { timeout: 180000 }, async () => {
    const work = await fs.promises.mkdtemp(path.join(os.tmpdir(), "gallery-remote-play-"));
    const userDataDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "gallery-remote-chrome-"));
    const mixedDir = path.join(work, "remote media", "mixed clips");
    const videoDir = path.join(work, "remote media", "videos only");
    await fs.promises.mkdir(mixedDir, { recursive: true });
    await fs.promises.mkdir(videoDir, { recursive: true });
    await fs.promises.mkdir(shotDir, { recursive: true });

    await Promise.all([
        makeStill(path.join(mixedDir, "2-pier.jpg"), "0x336699"),
        makeStill(path.join(mixedDir, "Holiday Clip-thumb.jpg"), "0xcc6633"),
        makeVideo(path.join(mixedDir, "10-harbour.mp4"), 440, ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac"]),
        makeVideo(path.join(mixedDir, "tour.webm"), 660, ["-c:v", "libvpx", "-b:v", "200k", "-c:a", "libopus"]),
        makeVideo(path.join(videoDir, "b roll.mp4"), 550, ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac"]),
    ]);
    await fs.promises.copyFile(path.join(mixedDir, "10-harbour.mp4"), path.join(mixedDir, "Holiday Clip.MP4"));
    await fs.promises.copyFile(path.join(videoDir, "b roll.mp4"), path.join(videoDir, "A-Clip.MP4"));
    await makeVideo(path.join(mixedDir, "intro.mov"), 770, ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", "-f", "mov"]);

    writeScan(path.join(work, "remote-scan.php"), "remote media/mixed clips");
    const slides = publishPhp("include/remote-slides.php", {
        phpId: "node_1",
        remoteFolder: "remote media/mixed clips",
        pageDocRoot: "",
    });
    await fs.promises.writeFile(
        path.join(work, "mixed.php"),
        pagePhp("remote media/mixed clips", null, slides)
    );

    writeScan(path.join(work, "remote-scan-videos.php"), "remote media/videos only");
    const videoSlides = publishPhp("include/remote-slides.php", {
        phpId: "node_1",
        remoteFolder: "remote media/videos only",
        pageDocRoot: "",
    }).replace(
        "__DIR__ . '/remote-scan.php'",
        "__DIR__ . '/remote-scan-videos.php'"
    );
    const videoGridPage = pagePhp("remote media/videos only", null, videoSlides).replaceAll(
        "__DIR__ . '/remote-scan.php'",
        "__DIR__ . '/remote-scan-videos.php'"
    );
    await fs.promises.writeFile(path.join(work, "videos.php"), videoGridPage);
    await fs.promises.writeFile(path.join(work, "router.php"), routerPhp);
    await fs.promises.copyFile(alpineJs, path.join(work, "alpine.js"));
    await fs.promises.copyFile(alpineIntersect, path.join(work, "alpine-intersect.js"));

    const port = await freePort();
    const php = spawn("php", ["-S", `127.0.0.1:${port}`, "-t", work, "router.php"], {
        cwd: work,
        stdio: ["ignore", "pipe", "pipe"],
    });
    let phpErr = "";
    php.stderr.on("data", (chunk) => {
        phpErr += chunk.toString();
    });
    const devtools = await freePort();
    let chrome;
    let ws;
    try {
        await waitForServer(port);
        chrome = await launchChrome(devtools, userDataDir);
        const page = await connectPage(devtools);
        ws = page.ws;
        const { cdp } = page;
        const pageErrors = [];
        cdp.on((message) => {
            if (message.method === "Runtime.exceptionThrown") {
                pageErrors.push(message.params.exceptionDetails?.exception?.description || message.params.exceptionDetails?.text);
            }
            if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
                pageErrors.push(message.params.args.map((arg) => arg.value || arg.description).join(" "));
            }
        });

        await cdp.send("Page.navigate", { url: `http://127.0.0.1:${port}/mixed.php` });
        await waitFor(
            cdp,
            `document.readyState === "complete" && !!window.Alpine && document.querySelectorAll(".grid .thumb").length === 5`,
            "mixed grid"
        );
        const grid = await waitFor(
            cdp,
            `(() => {
                const thumbs = [...document.querySelectorAll(".grid .thumb")];
                const media = thumbs.map((thumb) => {
                    const img = thumb.querySelector("img");
                    const video = thumb.querySelector("video");
                    if (img) return { tag: "img", w: img.naturalWidth, alt: img.alt, src: img.getAttribute("src") };
                    if (video) return { tag: "video", w: video.videoWidth, paused: video.paused, muted: video.muted, autoplay: video.autoplay, src: video.getAttribute("src") };
                    return { tag: null };
                });
                // intro.mov is index 3. Chromium may not decode QuickTime even
                // when the file is H.264, so the other thumbnails gate readiness.
                const ready = media.length === 5 && media.every((item, index) => index === 3 || item.w > 0);
                return ready ? media : null;
            })()`,
            "grid thumbnails to decode",
            10000
        );
        assert.equal(grid[0].tag, "img");
        assert.equal(grid[0].alt, "2 pier");
        assert.equal(grid[1].tag, "video");
        assert.equal(grid[1].muted, true);
        assert.equal(grid[1].autoplay, false);
        assert.equal(grid[1].paused, true);
        assert.match(grid[1].src, /10-harbour\.mp4$/);
        assert.equal(grid[2].tag, "img");
        assert.match(grid[2].src, /Holiday%20Clip-thumb\.jpg$/);
        assert.equal(grid[3].tag, "video");
        assert.match(grid[3].src, /intro\.mov$/);
        assert.equal(grid[4].tag, "video");
        assert.match(grid[4].src, /tour\.webm$/);
        await waitFor(
            cdp,
            `document.querySelector('[x-data^="galleryLightbox"]').classList.contains("invisible")`,
            "closed lightbox to hide before the grid shot"
        );
        await screenshot(cdp, path.join(shotDir, "remote-folder-grid.png"));

        const thumb = await evaluate(
            cdp,
            `(() => {
                const el = document.querySelectorAll(".grid .thumb")[1];
                const rect = el.getBoundingClientRect();
                return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            })()`
        );
        await mouseClick(cdp, thumb.x, thumb.y);
        await waitFor(
            cdp,
            `(() => {
                const root = document.querySelector('[x-data^="galleryLightbox"]');
                const next = [...document.querySelectorAll("button")].find((button) => button.getAttribute("x-on:click") === "next");
                const rect = next && next.getBoundingClientRect();
                return !!(
                    root &&
                    !root.classList.contains("pointer-events-none") &&
                    !root.classList.contains("invisible") &&
                    rect && rect.width > 2 && rect.height > 2
                );
            })()`,
            "lightbox to open from thumbnail"
        );
        await evaluate(
            cdp,
            `(() => {
                const slider = document.querySelector('[x-ref="slider"]');
                const width = slider.clientWidth;
                for (const slide of slider.children) {
                    slide.style.flex = "0 0 " + width + "px";
                    slide.style.width = width + "px";
                }
            })()`
        );

        // Slides: 0 image, 1 mp4, 2 poster mp4, 3 mov, 4 webm.
        await playSlide(cdp, 1);
        await screenshot(cdp, path.join(shotDir, "remote-folder-lightbox-playing.png"));

        await mouseClick(cdp, ...(await buttonPoint(cdp, "next")));
        await sleep(500);
        let state = await slideState(cdp);
        assert.equal(state[1].kind, "video");
        assert.match(state[1].src, /10-harbour\.mp4$/);
        assert.equal(state[1].paused, true, "next pauses the playing clip");
        assert.ok(state[1].currentTime >= 0.2, "next keeps the playhead");
        assert.equal(state[2].paused, true);

        await playSlide(cdp, 2);
        await mouseClick(cdp, ...(await buttonPoint(cdp, "prev")));
        await sleep(500);
        state = await slideState(cdp);
        assert.match(state[2].src, /Holiday%20Clip\.MP4$/);
        assert.equal(state[2].paused, true, "prev pauses the playing clip");
        assert.ok(state[2].currentTime >= 0.2, "prev keeps the playhead");

        await playSlide(cdp, 1);
        await mouseClick(cdp, ...(await buttonPoint(cdp, "show = false")));
        await waitFor(
            cdp,
            `document.querySelector('[x-data^="galleryLightbox"]').classList.contains("pointer-events-none")`,
            "lightbox to close"
        );
        state = await slideState(cdp);
        assert.equal(state[1].paused, true, "close pauses the playing clip");
        assert.ok(state[1].currentTime >= 0.2, "close keeps the playhead");

        await playSlide(cdp, 4);
        state = await slideState(cdp);
        assert.match(state[4].src, /tour\.webm$/);
        assert.match(state[3].src, /intro\.mov$/);
        if (state[3].width > 0) {
            await playSlide(cdp, 3);
        }

        await cdp.send("Page.navigate", { url: `http://127.0.0.1:${port}/videos.php` });
        const only = await waitFor(
            cdp,
            `(() => {
                const thumbs = [...document.querySelectorAll(".grid .thumb")];
                if (thumbs.length !== 2) return null;
                const ready = thumbs.every((thumb) => {
                    const video = thumb.querySelector("video");
                    return video && video.videoWidth > 0 && video.muted && video.paused && !video.autoplay;
                });
                if (!ready) return null;
                return thumbs.map((thumb) => thumb.querySelector("video").getAttribute("src"));
            })()`,
            "videos-only grid",
            10000
        );
        assert.match(only[0], /A-Clip\.MP4$/);
        assert.match(only[1], /b%20roll\.mp4$/);
        await waitFor(
            cdp,
            `document.querySelector('[x-data^="galleryLightbox"]').classList.contains("invisible")`,
            "videos-only lightbox hidden before the grid shot"
        );
        await screenshot(cdp, path.join(shotDir, "remote-folder-videos-only.png"));

        const first = await evaluate(
            cdp,
            `(() => {
                const el = document.querySelector(".grid .thumb");
                const rect = el.getBoundingClientRect();
                return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            })()`
        );
        await mouseClick(cdp, first.x, first.y);
        await waitFor(
            cdp,
            `!document.querySelector('[x-data^="galleryLightbox"]').classList.contains("invisible")`,
            "videos-only lightbox"
        );
        const played = await playSlide(cdp, 0);
        assert.equal(played.muted, false);
        await mouseClick(cdp, ...(await buttonPoint(cdp, "show = false")));
        await sleep(350);
        const closed = await slideState(cdp);
        assert.equal(closed[0].paused, true);

        const errors = pageErrors.filter(Boolean);
        assert.deepEqual(errors, [], `console errors:\n${errors.join("\n")}`);
        if (/PHP (Warning|Fatal|Parse)/.test(phpErr)) {
            throw new Error(phpErr);
        }
    } finally {
        if (ws) ws.close();
        if (chrome) chrome.kill("SIGKILL");
        php.kill("SIGKILL");
        await sleep(200);
        await fs.promises.rm(userDataDir, { recursive: true, force: true }).catch(() => {});
    }
});

async function waitForServer(port) {
    for (let i = 0; i < 50; i++) {
        try {
            const response = await fetch(`http://127.0.0.1:${port}/router.php`);
            if (response.status === 404 || response.ok) return;
        } catch {
            // not up
        }
        await sleep(50);
    }
    throw new Error("php server did not start");
}

async function buttonPoint(cdp, clickValue) {
    const point = await evaluate(
        cdp,
        `(() => {
            const button = [...document.querySelectorAll("button")].find((el) => el.getAttribute("x-on:click") === ${JSON.stringify(clickValue)});
            if (!button) return null;
            const rect = button.getBoundingClientRect();
            return [rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width, rect.height];
        })()`
    );
    if (!point || point[2] < 2 || point[3] < 2) {
        throw new Error(`button ${clickValue} is not clickable: ${JSON.stringify(point)}`);
    }
    return [point[0], point[1]];
}
