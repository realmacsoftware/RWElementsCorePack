@include("remote-scan")
<?php if (!isset($rwGalleryImages_{{phpId}})) { $rwGalleryImages_{{phpId}} = []; } ?>
<?php $rwGalleryLazyFrom_{{phpId}} = (int)'{{lazyFrom}}'; ?>
<?php foreach ($rwGalleryImages_{{phpId}} as $rwGalleryIndex_{{phpId}} => $rwGalleryImage_{{phpId}}): ?>
<div
    @mouseenter="$dispatch('gallery-lightbox-scroll-to', {id: '{{id}}', index: <?php echo $rwGalleryIndex_{{phpId}}; ?>})"
    @click="$dispatch('gallery-lightbox-show', {id: '{{id}}', slide: <?php echo $rwGalleryIndex_{{phpId}}; ?>})"
    class="{{classes.thumbnail}}"
>
    <?php if (!empty($rwGalleryImage_{{phpId}}['isVideo']) && $rwGalleryImage_{{phpId}}['poster'] === ''): ?>
    <video
        class="{{classes.thumbnailImage}} pointer-events-none"
        src="<?php echo htmlspecialchars($rwGalleryImage_{{phpId}}['src'], ENT_QUOTES, 'UTF-8'); ?>"
        muted
        playsinline
        preload="metadata"
        tabindex="-1"
        aria-hidden="true"
    ></video>
    <?php else: ?>
    <img
        src="<?php echo htmlspecialchars($rwGalleryImage_{{phpId}}['thumb'], ENT_QUOTES, 'UTF-8'); ?>"
        alt="<?php echo htmlspecialchars($rwGalleryImage_{{phpId}}['caption'], ENT_QUOTES, 'UTF-8'); ?>"
        class="{{classes.thumbnailImage}}"
        <?php echo ($rwGalleryLazyFrom_{{phpId}} >= 0 && $rwGalleryIndex_{{phpId}} >= $rwGalleryLazyFrom_{{phpId}}) ? 'loading="lazy"' : ''; ?>
        decoding="async"
    />
    <?php endif; ?>
    @if(thumbnailWantsMeta)
    <div class="{{classes.thumbnailMeta}}">
        @if (thumbnailShowCaption)
        <div class="{{classes.thumbnailCaption}}">
            <?php echo htmlspecialchars($rwGalleryImage_{{phpId}}['caption'], ENT_QUOTES, 'UTF-8'); ?>
        </div>
        @endif
    </div>
    @endif
</div>
<?php endforeach; ?>
