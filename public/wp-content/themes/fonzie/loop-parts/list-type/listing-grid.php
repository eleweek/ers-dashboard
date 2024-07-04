<?php

//Modifier classes
$_item          = 'block__item';
$_content       = 'block__content';
$_text          = 'block__text';
$_image         = 'block__image';
$_tag           = 'block__tag';
$_item_double   = 'block__item--double';
$_item_third    = 'block__item--third';
$_item_twothird = 'block__item--twothird';
$_item_services = 'block__item--services';
$_item_latest   = 'block__item--latest';
$_item_generic  = 'block__item--generic';
$_img_btm       = 'block__content--img_btm';
$_img_top       = 'block__content--img_top';
$_img_single    = 'block__content--img_single';
$_img_fixed     = 'block__content--fixedimage';
$_has_img       = 'block__content--hasimage';
$_campaign      = 'block__content--campaign';
$_image_single  = 'block__image--single';
$_img_double    = 'block__image--double';
$_img_portrait  = 'block__image--portrait';
$_img_landscape = 'block__image--landscape';
$_img_mobile    = 'block__image--mobile';

$_block__item    = array( $_item );
$_block__content = array( $_content );
$_block__text    = array( $_text );
$_block__image   = array( $_image, $_image_single );
$_block__tag     = array( $_tag );

if ( has_post_thumbnail() ):
	$_block__content[] = $_has_img;
	$_block__content[] = $_img_btm;
endif;

$_single_term = first_term( $post );
$_feature_category = get_the_terms( $post->ID, 'feature-category' );
$_feature_category = $_feature_category[0]->name;

if ( highlighted_term( $post ) ):
	$_block__content[] = $_campaign;
endif;

if ( has_post_thumbnail() ):

	$_img_string = '<img src="%s" alt="%s" %s/>';
	$_thumb_id   = get_post_thumbnail_id();

	$_classes = '';

	$_img_src  = wp_get_attachment_image_src( $_thumb_id, 'block-image' );
	$_img_alt  = get_post_meta( $_thumb_id, '_wp_attachment_image_alt', true );
	$_images = sprintf( $_img_string, $_img_src[0], $_img_alt, $_classes );

endif;

if ( $_event_related ):
	$_event_related_tag_image_block = false;
	if(($key = array_search($_img_btm, $_block__content)) !== false) {
		unset($_block__content[$key]);
	}

	if(($key = array_search($_img_single, $_block__image)) !== false) {
		unset($_block__image[$key]);
	}

	$_block__item[]    = $_item_double;
	$_block__item[]    = $_item_services;

	if ( has_post_thumbnail() ):
		$_block__content[] = $_img_top;
		$_block__content[] = $_img_single;
		$_block__image[]   = $_image_single;

		$_event_related_tag_image_block = true;
	endif;


endif;


?>

<div id="post-<?php the_ID(); ?>" <?php post_class( class_string( $_block__item, false ) ); ?>>
	<a href="<?php the_permalink(); ?>" class="<?php class_string( $_block__content ); ?>">

		<?php if( !$_block__text_bottom ): ?>
		<div class="<?php class_string( $_block__text ); ?>">
			<h2><?php echo limit_words( get_the_title(), 8 ); ?></h2>
			<p><?php echo limit_words( get_the_excerpt(), 10 ); ?></p>
		</div>
		<?php endif; ?>

		<?php if ( has_post_thumbnail() ): ?>
			<div class="<?php class_string( $_block__image ); ?>">
				<?php echo $_images; ?>
				<?php if ( $_event_related_tag_image_block ): ?>
					<span class="<?php class_string( $_block__tag ); ?>"><?php _e( $_single_term, 'charitypress_fonzie' ); ?></span>
				<?php endif; ?>
			</div>
		<?php endif; ?>

		<?php if( $_block__text_bottom ): ?>
			<div class="<?php class_string( $_block__text ); ?>">
				<h2><?php echo limit_words( get_the_title(), 8 ); ?></h2>
				<p><?php echo limit_words( get_the_excerpt(), 10 ); ?></p>
			</div>
		<?php endif; ?>

		<?php if ( $_feature_category && !$_event_related_tag_image_block ): ?>
			<span class="<?php class_string( $_block__tag ); ?>"><?php _e( $_feature_category, 'charitypress_fonzie' ); ?></span>
		<?php elseif ( $_single_term && !$_event_related_tag_image_block ): ?>
			<span class="<?php class_string( $_block__tag ); ?>"><?php _e( $_single_term, 'charitypress_fonzie' ); ?></span>
		<?php endif; ?>

	</a>
</div>
