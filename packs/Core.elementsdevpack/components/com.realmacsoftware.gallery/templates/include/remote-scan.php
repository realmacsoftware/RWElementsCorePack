<?php
/**
 * Reads the configured server folder and builds the image list used by the
 * remote grid and lightbox slides. Runs once per gallery instance — the
 * variables are suffixed with the node id so two galleries on one page
 * don't share state.
 */
if (!isset($rwGalleryImages_{{phpId}})) {
    $rwGalleryImages_{{phpId}} = [];
    $rwGalleryFolder_{{phpId}} = '{{remoteFolder}}';

    if ($rwGalleryFolder_{{phpId}} !== '') {
        // Accept a full URL on this server or a root-relative path.
        $rwGalleryPath_{{phpId}} = $rwGalleryFolder_{{phpId}};
        if (preg_match('#^https?://#i', $rwGalleryPath_{{phpId}})) {
            $rwGalleryParts_{{phpId}} = parse_url($rwGalleryPath_{{phpId}});
            $rwGalleryPath_{{phpId}} = isset($rwGalleryParts_{{phpId}}['path'])
                ? $rwGalleryParts_{{phpId}}['path']
                : '';
        }
        $rwGalleryPath_{{phpId}} = '/' . trim($rwGalleryPath_{{phpId}}, '/');

        $rwGalleryRoot_{{phpId}} = realpath(rtrim(
            isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] : '',
            '/'
        ));
        $rwGalleryDir_{{phpId}} = $rwGalleryRoot_{{phpId}} === false
            ? false
            : realpath($rwGalleryRoot_{{phpId}} . $rwGalleryPath_{{phpId}});

        // Keep the resolved folder inside the document root.
        $rwGalleryValid_{{phpId}} = $rwGalleryDir_{{phpId}} !== false
            && is_dir($rwGalleryDir_{{phpId}})
            && strpos(
                $rwGalleryDir_{{phpId}} . DIRECTORY_SEPARATOR,
                $rwGalleryRoot_{{phpId}} . DIRECTORY_SEPARATOR
            ) === 0;

        if ($rwGalleryValid_{{phpId}}) {
            $rwGalleryAllowed_{{phpId}} = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'];
            $rwGalleryFiles_{{phpId}} = [];
            $rwGalleryThumbs_{{phpId}} = [];

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
                $rwGalleryStem_{{phpId}} = pathinfo($rwGalleryEntry_{{phpId}}, PATHINFO_FILENAME);
                if (preg_match('/_thumb$/i', $rwGalleryStem_{{phpId}})) {
                    $rwGalleryThumbs_{{phpId}}[
                        strtolower(preg_replace('/_thumb$/i', '', $rwGalleryStem_{{phpId}}))
                    ] = $rwGalleryEntry_{{phpId}};
                } else {
                    $rwGalleryFiles_{{phpId}}[] = $rwGalleryEntry_{{phpId}};
                }
            }

            natcasesort($rwGalleryFiles_{{phpId}});

            // Root-relative base URL for the folder, encoded per path segment.
            $rwGallerySegments_{{phpId}} = array_filter(
                explode('/', trim($rwGalleryPath_{{phpId}}, '/')),
                'strlen'
            );
            $rwGalleryBase_{{phpId}} = rtrim(
                '/' . implode('/', array_map('rawurlencode', $rwGallerySegments_{{phpId}})),
                '/'
            );

            foreach ($rwGalleryFiles_{{phpId}} as $rwGalleryFile_{{phpId}}) {
                $rwGalleryStem_{{phpId}} = pathinfo($rwGalleryFile_{{phpId}}, PATHINFO_FILENAME);
                $rwGallerySrc_{{phpId}} = $rwGalleryBase_{{phpId}} . '/' . rawurlencode($rwGalleryFile_{{phpId}});
                $rwGalleryKey_{{phpId}} = strtolower($rwGalleryStem_{{phpId}});
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
