<?php

$_show = get_field('show_related');

if( $_show ):

	$_title = get_field('related_title');

	if( !$_title )
		$_title = __( 'You might be interested in...', 'charitypress_fonzie' );

	?>
	<h2><?php echo $_title; ?></h2>
	<?php

	$_posts = array();
	$_related = get_field( 'related_posts' );

	foreach( $_related as $_post ):
		$_posts[] = $_post['post'];
	endforeach;

	$_related_posts = new WP_Query(
		array(
			'post_type' => array( 'services' ),
			'orderby' => 'post__in',
			'post__in' => $_posts
		)
	);

	if( $_related_posts->have_posts() ):
	?>
		<div class="block__row">
			<?php
			while( $_related_posts->have_posts() ): $_related_posts->the_post();

				$_event_related = true;
				include( locate_template( 'loop-parts/list-type/listing-grid.php' ) );

			endwhile;
			wp_reset_query();
			?>
		</div>
	<?php
	endif;

endif;