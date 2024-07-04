<?php
$term = first_term( $post );

$image = false;
if ( has_post_thumbnail() ):
	$image     = true;
	$_thumb_id = get_post_thumbnail_id();
	$_img_src  = wp_get_attachment_image_src( $_thumb_id, 'block-image--square' );
	$_img_alt  = get_post_meta( $_thumb_id, '_wp_attachment_image_alt', true );
endif;
?>

<div class="new-block-item element-link<?php if( $image ): echo ' new-block-item--image'; endif; ?>">

	<?php if( $image ): ?>
		<div class="new-block-item__image">
			<img src="<?php echo $_img_src[0]; ?>" alt="<?php echo $_img_alt; ?>">
		</div>
	<?php endif; ?>

	<div class="new-block-item__content">

		<h2 class="new-block-item__heading">
			<a href="<?php the_permalink(); ?>">
				<?php echo limit_words(get_the_title(), 15); ?>
			</a>
		</h2>

		<div class="new-block-item__meta">
			<?php if( $term ): ?>
				<span><?php echo $term; ?></span>
			<?php endif; ?>

			<?php news_posted_at( false ); ?>
		</div>

	</div>

</div>
