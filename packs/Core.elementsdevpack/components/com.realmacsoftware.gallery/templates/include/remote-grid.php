@include("remote-scan")
<?php if (!isset($rwGalleryImages_{{phpId}})) { $rwGalleryImages_{{phpId}} = []; } ?>
<?php foreach ($rwGalleryImages_{{phpId}} as $rwGalleryIndex_{{phpId}} => $rwGalleryImage_{{phpId}}): ?>
<div
    @mouseenter="$dispatch('gallery-lightbox-scroll-to', {id: '{{id}}', index: <?php echo $rwGalleryIndex_{{phpId}}; ?>})"
    @click="$dispatch('gallery-lightbox-show', {id: '{{id}}', slide: <?php echo $rwGalleryIndex_{{phpId}}; ?>})"
    class="{{classes.thumbnail}}"
>
    <img
        src="<?php echo htmlspecialchars($rwGalleryImage_{{phpId}}['thumb'], ENT_QUOTES, 'UTF-8'); ?>"
        alt="<?php echo htmlspecialchars($rwGalleryImage_{{phpId}}['caption'], ENT_QUOTES, 'UTF-8'); ?>"
        class="{{classes.thumbnailImage}}"
        loading="lazy"
    />
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
