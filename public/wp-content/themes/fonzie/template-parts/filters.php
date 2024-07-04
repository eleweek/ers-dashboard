<?php

if ( get_post_type() == 'post' ):
	$_termName = 'category';
	$_termSlug = 'category_name';
else:
	$_termName = $post->post_type . '-category';
	$_termSlug = $post->post_type . '-category';
endif;
$_filtered = check_queried_filters( $_termName );
$_terms    = get_terms( $_termName, array( 'hide_empty' => true ) );
$_selected = '';


if ( $_filtered[ $_termName ] === null ):
	$_selected = ' btn_active';
endif;

$_filter_type = check_filter_type( $post->post_type );

switch ( $_filter_type ) {
	case 'select':
		include( locate_template( 'template-parts/filter-select.php' ) );
		break;
	case 'btn':
	default:
		include( locate_template( 'template-parts/filter-btn.php' ) );
		break;
}
?>
