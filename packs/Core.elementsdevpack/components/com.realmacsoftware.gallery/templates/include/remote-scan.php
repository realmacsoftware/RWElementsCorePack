<?php
/**
 * Reads the configured server folder and builds the image list used by the
 * remote grid and lightbox slides. Runs once per gallery instance — the
 * variables are suffixed with the node id so two galleries on one page
 * don't share state.
 *
 * The folder can be written relative to the page ("resources/Instagram"),
 * relative to the site root ("/resources/Instagram") or as a full URL on this
 * site. Each candidate location is tried against the filesystem and the first
 * one that exists wins, so the same setting works under local preview, in a
 * site published into a subdirectory, and on the live server.
 */
if (!isset($rwGalleryImages_{{phpId}})) {
    $rwGalleryImages_{{phpId}} = [];
    $rwGalleryFolder_{{phpId}} = '{{remoteFolder}}';

    if ($rwGalleryFolder_{{phpId}} !== '') {
        // A full URL on this site is treated as the path it points at.
        $rwGalleryPath_{{phpId}} = $rwGalleryFolder_{{phpId}};
        if (preg_match('#^https?://#i', $rwGalleryPath_{{phpId}})) {
            $rwGalleryParts_{{phpId}} = parse_url($rwGalleryPath_{{phpId}});
            $rwGalleryPath_{{phpId}} = isset($rwGalleryParts_{{phpId}}['path'])
                ? '/' . ltrim($rwGalleryParts_{{phpId}}['path'], '/')
                : '';
        }

        // A leading slash means "from the site root", anything else is
        // relative to this page.
        $rwGalleryFromRoot_{{phpId}} = strpos($rwGalleryPath_{{phpId}}, '/') === 0;
        $rwGalleryRel_{{phpId}} = trim($rwGalleryPath_{{phpId}}, '/');

        // Relative path from this page back to the site root, e.g. "" or "../".
        $rwGalleryUp_{{phpId}} = trim('{{pageDocRoot}}', '/');
        $rwGallerySiteDir_{{phpId}} = $rwGalleryUp_{{phpId}} === ''
            ? __DIR__
            : __DIR__ . '/' . $rwGalleryUp_{{phpId}};
        $rwGallerySiteUrl_{{phpId}} = $rwGalleryUp_{{phpId}} === ''
            ? ''
            : $rwGalleryUp_{{phpId}} . '/';

        // [filesystem base, URL prefix] pairs, most likely first.
        $rwGalleryPageBase_{{phpId}} = [__DIR__, ''];
        $rwGallerySiteBase_{{phpId}} = [$rwGallerySiteDir_{{phpId}}, $rwGallerySiteUrl_{{phpId}}];
        $rwGalleryDocBase_{{phpId}} = [
            rtrim(isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] : '', '/'),
            '/',
        ];

        $rwGalleryCandidates_{{phpId}} = $rwGalleryFromRoot_{{phpId}}
            ? [$rwGallerySiteBase_{{phpId}}, $rwGalleryDocBase_{{phpId}}, $rwGalleryPageBase_{{phpId}}]
            : [$rwGalleryPageBase_{{phpId}}, $rwGallerySiteBase_{{phpId}}, $rwGalleryDocBase_{{phpId}}];

        $rwGalleryDir_{{phpId}} = false;
        $rwGalleryUrlBase_{{phpId}} = '';

        foreach ($rwGalleryCandidates_{{phpId}} as $rwGalleryCandidate_{{phpId}}) {
            list($rwGalleryBaseDir_{{phpId}}, $rwGalleryBaseUrl_{{phpId}}) = $rwGalleryCandidate_{{phpId}};
            if ($rwGalleryBaseDir_{{phpId}} === '') {
                continue;
            }
            $rwGalleryBaseReal_{{phpId}} = realpath($rwGalleryBaseDir_{{phpId}});
            if ($rwGalleryBaseReal_{{phpId}} === false) {
                continue;
            }
            $rwGalleryTry_{{phpId}} = realpath(
                $rwGalleryBaseReal_{{phpId}} . '/' . $rwGalleryRel_{{phpId}}
            );
            // Keep the resolved folder inside the base it was resolved against.
            if (
                $rwGalleryTry_{{phpId}} !== false
                && is_dir($rwGalleryTry_{{phpId}})
                && strpos(
                    $rwGalleryTry_{{phpId}} . DIRECTORY_SEPARATOR,
                    $rwGalleryBaseReal_{{phpId}} . DIRECTORY_SEPARATOR
                ) === 0
            ) {
                $rwGalleryDir_{{phpId}} = $rwGalleryTry_{{phpId}};
                $rwGalleryUrlBase_{{phpId}} = $rwGalleryBaseUrl_{{phpId}};
                break;
            }
        }

        if ($rwGalleryDir_{{phpId}} !== false) {
            $rwGalleryAllowed_{{phpId}} = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'];
            $rwGalleryFiles_{{phpId}} = [];
            $rwGalleryThumbs_{{phpId}} = [];

            // A companion thumbnail is any file whose name ends in a "thumb"
            // marker: photo_thumb.jpg, photo-thumb.jpg, photo.thumb.jpg,
            // "photo thumb.jpg", _thumbnail, and @2x / -1 suffixes on the end.
            // Whatever the spelling, these are never gallery items themselves.
            $rwGalleryMarker_{{phpId}} = '/[-_. ]thumb(?:nail)?(?:@[0-9]+x)?(?:-[0-9]+)?$/i';

            // Closure (not a named function) so two galleries on one page
            // can't redeclare it. Tolerates a stray double extension and
            // trailing spaces, which otherwise hide the marker.
            $rwGalleryStemOf_{{phpId}} = function ($file) {
                $stem = rtrim(pathinfo($file, PATHINFO_FILENAME));
                return preg_replace('/\.(jpe?g|png|gif|webp|avif)$/i', '', $stem);
            };

            foreach (scandir($rwGalleryDir_{{phpId}}) as $rwGalleryEntry_{{phpId}}) {
                if (
                    $rwGalleryEntry_{{phpId}}[0] === '.' ||
                    !is_file($rwGalleryDir_{{phpId}} . DIRECTORY_SEPARATOR . $rwGalleryEntry_{{phpId}})
                ) {
                    continue;
                }
                $rwGalleryExt_{{phpId}} = strtolower(
                    pathinfo($rwGalleryEntry_{{phpId}}, PATHINFO_EXTENSION)
                );
                if (!in_array($rwGalleryExt_{{phpId}}, $rwGalleryAllowed_{{phpId}}, true)) {
                    continue;
                }
                $rwGalleryStem_{{phpId}} = $rwGalleryStemOf_{{phpId}}($rwGalleryEntry_{{phpId}});
                if (preg_match($rwGalleryMarker_{{phpId}}, $rwGalleryStem_{{phpId}})) {
                    $rwGalleryThumbs_{{phpId}}[
                        strtolower(trim(preg_replace(
                            $rwGalleryMarker_{{phpId}},
                            '',
                            $rwGalleryStem_{{phpId}}
                        )))
                    ] = $rwGalleryEntry_{{phpId}};
                } else {
                    $rwGalleryFiles_{{phpId}}[] = $rwGalleryEntry_{{phpId}};
                }
            }

            natcasesort($rwGalleryFiles_{{phpId}});

            // Base URL for the folder, built on whichever location matched so
            // the links stay valid in preview and in a subdirectory install.
            // Encoded per path segment.
            $rwGallerySegments_{{phpId}} = array_filter(
                explode('/', $rwGalleryRel_{{phpId}}),
                'strlen'
            );
            $rwGalleryBase_{{phpId}} = rtrim(
                $rwGalleryUrlBase_{{phpId}}
                    . implode('/', array_map('rawurlencode', $rwGallerySegments_{{phpId}})),
                '/'
            );

            foreach ($rwGalleryFiles_{{phpId}} as $rwGalleryFile_{{phpId}}) {
                $rwGalleryStem_{{phpId}} = $rwGalleryStemOf_{{phpId}}($rwGalleryFile_{{phpId}});
                $rwGallerySrc_{{phpId}} = $rwGalleryBase_{{phpId}} . '/' . rawurlencode($rwGalleryFile_{{phpId}});
                $rwGalleryKey_{{phpId}} = strtolower(trim($rwGalleryStem_{{phpId}}));
                $rwGalleryCaption_{{phpId}} = trim(preg_replace('/[-_]+/', ' ', $rwGalleryStem_{{phpId}}));

                $rwGalleryImages_{{phpId}}[] = [
                    'src' => $rwGallerySrc_{{phpId}},
                    'thumb' => isset($rwGalleryThumbs_{{phpId}}[$rwGalleryKey_{{phpId}}])
                        ? $rwGalleryBase_{{phpId}} . '/' . rawurlencode($rwGalleryThumbs_{{phpId}}[$rwGalleryKey_{{phpId}}])
                        : $rwGallerySrc_{{phpId}},
                    'caption' => $rwGalleryCaption_{{phpId}},
                ];
            }
        }
    }
}
?>
