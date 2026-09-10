<?php
/**
 * RSS 2.0 Feed Generator for RapidWeaver Elements Core Pack.
 *
 * Reads markdown files with YAML frontmatter from a CMS content directory
 * and produces a standards-compliant RSS 2.0 feed.
 *
 * Supported frontmatter keys (matching CMS markdown collection conventions):
 *
 *   title          — post title  (string, required)
 *   date_published — publication date  (ISO 8601 or Y-m-d)
 *   description    — plain-text excerpt or summary
 *   image          — featured / header image URL  (string)
 *   tags           — list of tag slugs or labels  (array)
 *   categories     — list of category labels      (array)
 *
 * RSS extensions emitted:
 *   <enclosure>       — standard RSS 2.0 image attachment
 *   <media:content>   — Media RSS (Yahoo mrss) image element
 *   <media:thumbnail> — Media RSS thumbnail hint
 *   <category>        — one element per tag and per category
 *
 * Configuration — set these variables before including this file,
 * or accept the defaults:
 *
 *   $rwRssFeedTitle       — channel <title>        (default: site <title>)
 *   $rwRssFeedLink        — channel <link>          (default: site URL)
 *   $rwRssFeedDescription — channel <description>   (default: empty)
 *   $rwRssFeedLanguage    — channel <language>       (default: "en")
 *   $rwRssContentDir      — path to the CMS posts directory
 *   $rwRssSiteUrl         — base URL for resolving relative image paths
 */

header('Content-Type: application/rss+xml; charset=UTF-8');

$rwRssFeedTitle       = isset($rwRssFeedTitle)       ? $rwRssFeedTitle       : 'Blog';
$rwRssFeedLink        = isset($rwRssFeedLink)        ? $rwRssFeedLink        : '';
$rwRssFeedDescription = isset($rwRssFeedDescription) ? $rwRssFeedDescription : '';
$rwRssFeedLanguage    = isset($rwRssFeedLanguage)    ? $rwRssFeedLanguage    : 'en';
$rwRssContentDir      = isset($rwRssContentDir)      ? $rwRssContentDir      : '';
$rwRssSiteUrl         = isset($rwRssSiteUrl)         ? $rwRssSiteUrl         : '';

function rwRssEscape($str) {
    return htmlspecialchars((string) $str, ENT_XML1 | ENT_QUOTES, 'UTF-8');
}

function rwRssGuessMime($url) {
    $ext = strtolower(pathinfo((string) $url, PATHINFO_EXTENSION));
    $map = [
        'png'  => 'image/png',
        'gif'  => 'image/gif',
        'webp' => 'image/webp',
        'avif' => 'image/avif',
        'svg'  => 'image/svg+xml',
    ];
    return isset($map[$ext]) ? $map[$ext] : 'image/jpeg';
}

function rwRssParseFrontmatter($content) {
    if (strpos($content, '---') !== 0) return [];
    $end = strpos($content, "\n---", 3);
    if ($end === false) return [];
    $yaml = substr($content, 3, $end - 3);
    $fm = [];
    $currentKey = null;
    $listMode = false;

    foreach (explode("\n", $yaml) as $line) {
        if (preg_match('/^(\w[\w_]*):\s*(.*)$/', $line, $m)) {
            $currentKey = $m[1];
            $val = trim($m[2]);
            if ($val === '' || $val === '[]') {
                $fm[$currentKey] = [];
                $listMode = true;
            } else {
                $fm[$currentKey] = $val;
                $listMode = false;
            }
        } elseif ($currentKey && $listMode && preg_match('/^\s+-\s+(.+)$/', $line, $m)) {
            $fm[$currentKey][] = trim($m[1], '"\'');
        }
    }
    return $fm;
}

function rwRssResolveImage($image, $siteUrl) {
    if (empty($image)) return '';
    $url = is_array($image) && isset($image['src']) ? $image['src'] : (string) $image;
    if ($url === '') return '';
    if (strpos($url, 'http') === 0) return $url;
    return rtrim($siteUrl, '/') . '/' . ltrim($url, '/');
}

$rwRssItems = [];

if ($rwRssContentDir !== '' && is_dir($rwRssContentDir)) {
    $files = glob($rwRssContentDir . '/*.md');
    if ($files) {
        foreach ($files as $file) {
            $raw = file_get_contents($file);
            if ($raw === false) continue;
            $fm = rwRssParseFrontmatter($raw);
            if (empty($fm['title'])) continue;

            $rwRssItems[] = $fm + ['_file' => basename($file)];
        }
    }

    usort($rwRssItems, function ($a, $b) {
        $da = isset($a['date_published']) ? strtotime($a['date_published']) : 0;
        $db = isset($b['date_published']) ? strtotime($b['date_published']) : 0;
        return $db - $da;
    });
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<rss version="2.0"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><?php echo rwRssEscape($rwRssFeedTitle); ?></title>
    <link><?php echo rwRssEscape($rwRssFeedLink); ?></link>
    <description><?php echo rwRssEscape($rwRssFeedDescription); ?></description>
    <language><?php echo rwRssEscape($rwRssFeedLanguage); ?></language>
<?php if ($rwRssFeedLink): ?>
    <atom:link href="<?php echo rwRssEscape($rwRssFeedLink); ?>" rel="self" type="application/rss+xml" />
<?php endif; ?>
<?php foreach ($rwRssItems as $item): ?>
<?php
    $itemTitle = isset($item['title']) ? $item['title'] : '';
    $itemLink  = isset($item['link'])  ? $item['link']  : '';
    $itemDesc  = isset($item['description']) ? $item['description'] : '';
    $itemDate  = isset($item['date_published']) ? $item['date_published'] : '';
    $itemGuid  = $itemLink ? $itemLink : (isset($item['_file']) ? $item['_file'] : '');
    $imgUrl    = rwRssResolveImage(isset($item['image']) ? $item['image'] : '', $rwRssSiteUrl);
    $imgMime   = rwRssGuessMime($imgUrl);
    $tags      = isset($item['tags']) && is_array($item['tags']) ? $item['tags'] : [];
    $cats      = isset($item['categories']) && is_array($item['categories']) ? $item['categories'] : [];
?>
    <item>
      <title><?php echo rwRssEscape($itemTitle); ?></title>
<?php if ($itemLink): ?>
      <link><?php echo rwRssEscape($itemLink); ?></link>
<?php endif; ?>
<?php if ($itemDesc): ?>
      <description><?php echo rwRssEscape($itemDesc); ?></description>
<?php endif; ?>
<?php if ($itemDate): ?>
      <pubDate><?php echo date(DATE_RSS, strtotime($itemDate)); ?></pubDate>
<?php endif; ?>
<?php if ($itemGuid): ?>
      <guid><?php echo rwRssEscape($itemGuid); ?></guid>
<?php endif; ?>
<?php if ($imgUrl): ?>
      <enclosure url="<?php echo rwRssEscape($imgUrl); ?>" type="<?php echo $imgMime; ?>" length="0" />
      <media:content url="<?php echo rwRssEscape($imgUrl); ?>" medium="image" type="<?php echo $imgMime; ?>" />
      <media:thumbnail url="<?php echo rwRssEscape($imgUrl); ?>" />
<?php endif; ?>
<?php foreach ($tags as $tag): ?>
      <category><?php echo rwRssEscape(is_array($tag) ? (isset($tag['title']) ? $tag['title'] : '') : $tag); ?></category>
<?php endforeach; ?>
<?php foreach ($cats as $cat): ?>
      <category><?php echo rwRssEscape(is_array($cat) ? (isset($cat['title']) ? $cat['title'] : '') : $cat); ?></category>
<?php endforeach; ?>
    </item>
<?php endforeach; ?>
  </channel>
</rss>
