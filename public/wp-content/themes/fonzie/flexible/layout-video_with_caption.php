<div class="row flexible-block">
	<div class="col-xs-12">
    <div class="video-with-caption">
      <div class="video-with-caption__embed embed-container">
        <?php echo get_sub_field('video_with_caption_embed'); ?>
      </div>

			<?php if(get_sub_field('video_with_caption_text')) : ?>
	      <div class="video-with-caption__text">
	        <?php echo get_sub_field('video_with_caption_text'); ?>
	      </div>
			<?php endif; ?>
    </div>
  </div>
</div>
