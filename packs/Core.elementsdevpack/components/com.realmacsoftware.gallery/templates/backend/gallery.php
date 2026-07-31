<?php
/**
 * Gallery "Remote Folder" listing endpoint.
 *
 * Lists the images in the folder configured at publish time (config.php) and
 * returns them as JSON for the Gallery component to render client-side.
 *
 * The folder must live inside this site's document root. No request
 * parameters are accepted. A file named photo_thumb.jpg is paired as the
 * grid thumbnail for photo.jpg and excluded from the main list.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$config = require __DIR__ . '/config.php';

function gallery_respond($payload, $status = 200)
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function gallery_error($message, $status)
{
    gallery_respond([
        'generator' => 'rw-gallery',
        'version' => 1,
        'error' => $message,
        'images' => []
    ], $status);
}

$folder = trim((string) ($config['folder'] ?? ''));

if ($folder === '') {
    gallery_respond([
        'generator' => 'rw-gallery',
        'version' => 1,
        'count' => 0,
        'images' => []
    ]);
}

// Accept a full URL on this server or a root-relative path.
$path = $folder;
if (preg_match('#^https?://#i', $folder)) {
    $parts = parse_url($folder);
    $path = $parts['path'] ?? '';
}
$path = '/' . trim($path, '/');

$documentRoot = realpath(rtrim((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''), '/'));
if ($documentRoot === false) {
    gallery_error('Unable to resolve the document root.', 500);
}

// The configured folder is baked in at publish (not request input), but keep
// the resolved directory inside the document root regardless.
$directory = realpath($documentRoot . $path);
if (
    $directory === false ||
    !is_dir($directory) ||
    strpos($directory . DIRECTORY_SEPARATOR, $documentRoot . DIRECTORY_SEPARATOR) !== 0
) {
    gallery_error('Image folder not found on this server.', 404);
}

$allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'];

$fullImages = [];
$thumbs = [];

foreach (scandir($directory) as $entry) {
    if ($entry[0] === '.' || !is_file($directory . DIRECTORY_SEPARATOR . $entry)) {
        continue;
    }
    $extension = strtolower(pathinfo($entry, PATHINFO_EXTENSION));
    if (!in_array($extension, $allowed, true)) {
        continue;
    }
    $stem = pathinfo($entry, PATHINFO_FILENAME);
    if (preg_match('/_thumb$/i', $stem)) {
        $thumbs[strtolower(preg_replace('/_thumb$/i', '', $stem))] = $entry;
    } else {
        $fullImages[] = $entry;
    }
}

natcasesort($fullImages);

// Root-relative base URL for the folder, encoded per path segment.
$segments = array_filter(explode('/', trim($path, '/')), 'strlen');
$baseURL = '/' . implode('/', array_map('rawurlencode', $segments));
$baseURL = rtrim($baseURL, '/');

$images = [];
foreach ($fullImages as $file) {
    $stem = pathinfo($file, PATHINFO_FILENAME);
    $item = [
        'src' => $baseURL . '/' . rawurlencode($file),
        'caption' => trim(preg_replace('/[-_]+/', ' ', $stem))
    ];
    $key = strtolower($stem);
    if (isset($thumbs[$key])) {
        $item['thumb'] = $baseURL . '/' . rawurlencode($thumbs[$key]);
    }
    $images[] = $item;
}

gallery_respond([
    'generator' => 'rw-gallery',
    'version' => 1,
    'count' => count($images),
    'images' => $images
]);
