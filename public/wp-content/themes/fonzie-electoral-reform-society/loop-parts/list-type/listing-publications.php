<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package CharityPress
 */

?>

<?php

if ( has_post_thumbnail() ):

	$_classes = isset($_classes) ? $_classes : '';

	$_img_string = '<img src="%s" alt="%s" %s/>';
	$_thumb_id   = get_post_thumbnail_id();

	$_img_src  = wp_get_attachment_image_src( $_thumb_id, 'block-image--publication' );
	$_img_alt  = get_post_meta( $_thumb_id, '_wp_attachment_image_alt', true );
	$_images[] = sprintf( $_img_string, $_img_src[0], $_img_alt, $_classes );

	$_images = implode( '', $_images );

endif;

?>

<article id="post-<?php the_ID(); ?>" <?php post_class('listing-post'); ?>>
	<div class="listing-post__text">
		<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
		<p><?php echo limit_words( get_the_excerpt(), 35 ); ?></p>
		<?php news_posted_at(); ?>
	</div>

	<?php if ( has_post_thumbnail() ): ?>
		<a href="<?php the_permalink(); ?>" class="listing-post__image">
			<?php echo $_images; ?>
		</a>
	<?php endif; ?>

</article>
