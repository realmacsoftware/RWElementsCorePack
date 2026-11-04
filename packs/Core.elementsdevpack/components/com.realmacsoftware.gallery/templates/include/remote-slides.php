@include("remote-scan")
<?php if (!isset($rwGalleryImages_{{phpId}})) { $rwGalleryImages_{{phpId}} = []; } ?>
<?php foreach ($rwGalleryImages_{{phpId}} as $rwGalleryImage_{{phpId}}): ?>
<li class="{{classes.lightboxItem}}" x-bind="focusableWhenVisible" @click="show = false" role="option">
    <?php if (!empty($rwGalleryImage_{{phpId}}['isVideo'])): ?>
    <video
        @click.stop=""
        class="aspect-video {{classes.lightboxItemMedia}} w-full h-auto"
        <?php if ($rwGalleryImage_{{phpId}}['poster'] !== ''): ?>
        poster="<?php echo htmlspecialchars($rwGalleryImage_{{phpId}}['poster'], ENT_QUOTES, 'UTF-8'); ?>"
        <?php endif; ?>
        preload="metadata"
        controls
        playsinline
    >
        <source
            src="<?php echo htmlspecialchars($rwGalleryImage_{{phpId}}['src'], ENT_QUOTES, 'UTF-8'); ?>"
            type="<?php echo htmlspecialchars($rwGalleryImage_{{phpId}}['mime'], ENT_QUOTES, 'UTF-8'); ?>"
        />
    </video>
    <?php else: ?>
    <img
        src="<?php echo htmlspecialchars($rwGalleryImage_{{phpId}}['src'], ENT_QUOTES, 'UTF-8'); ?>"
        alt="<?php echo htmlspecialchars($rwGalleryImage_{{phpId}}['caption'], ENT_QUOTES, 'UTF-8'); ?>"
        class="{{classes.lightboxItemMedia}}"
        loading="lazy"
        decoding="async"
        @click.stop
    />
    <?php endif; ?>
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
