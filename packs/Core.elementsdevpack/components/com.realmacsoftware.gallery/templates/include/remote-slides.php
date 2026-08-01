@include("remote-scan")
<?php if (!isset($rwGalleryImages_{{phpId}})) { $rwGalleryImages_{{phpId}} = []; } ?>
<?php foreach ($rwGalleryImages_{{phpId}} as $rwGalleryImage_{{phpId}}): ?>
<li class="{{classes.lightboxItem}}" @click="show = false" role="option">
    <img
        src="<?php echo htmlspecialchars($rwGalleryImage_{{phpId}}['src'], ENT_QUOTES, 'UTF-8'); ?>"
        alt="<?php echo htmlspecialchars($rwGalleryImage_{{phpId}}['caption'], ENT_QUOTES, 'UTF-8'); ?>"
        class="{{classes.lightboxItemMedia}}"
        @click.stop
    />
    @if(lightboxWantsMeta)
    <div class="{{classes.lightboxMeta}}" @click.stop>
        @if (lightboxShowCaption)
        <div class="{{classes.lightboxCaption}}">
            <?php echo htmlspecialchars($rwGalleryImage_{{phpId}}['caption'], ENT_QUOTES, 'UTF-8'); ?>
        </div>
        @endif
    </div>
    @endif
</li>
<?php endforeach; ?>
