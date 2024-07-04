<?php
$jobs     	   = get_field( 'jobs_archive_page', 'option' );
$services 	   = get_field( 'services_archive_page', 'option' );
$publications  = get_field( 'publications_archive_page', 'option' );
$briefings 	   = get_field( 'briefings_archive_page', 'option' );
$candidates 	 = get_field( 'candidates_archive_page', 'option' );
$pressreleases = get_field( 'pressreleases_archive_page', 'option' );
$actions  	   = get_field( 'actions_archive_page', 'option' );
$events   	   = get_field( 'events_archive_page', 'option' );
$news     	   = get_option( 'page_for_posts', true );
$_pid     	   = '';


if ( is_home() || ( $post->post_type == 'post' && is_archive() ) ) :
	$_pid = $news;
elseif ( is_post_type_archive( 'jobs' ) || is_tax( 'jobs-category' ) ):
	$_pid = $jobs;
elseif ( is_post_type_archive( 'services' ) || is_tax( 'services-category' ) ):
	$_pid = $services;
elseif ( is_post_type_archive( 'publications' ) || is_tax( 'publications-category' ) ):
	$_pid = $publications;
elseif ( is_post_type_archive( 'briefings' ) || is_tax( 'briefings-category' ) ):
	$_pid = $briefings;
elseif ( is_post_type_archive( 'candidates' ) || is_tax( 'candidates-category' ) ):
	$_pid = $candidates;
elseif ( is_post_type_archive( 'pressreleases' ) || is_tax( 'pressreleases-category' ) ):
	$_pid = $pressreleases;
elseif ( is_post_type_archive( 'actions' ) ):
	$_pid = $actions;
elseif ( is_post_type_archive( 'events' ) || is_tax( 'events-category' ) ):
	$_pid = $events;
elseif ( ( $post->post_type == 'page' || $post->post_type == 'post' ) && ! is_archive() ) :
	$_pid = $post->ID;
endif;


$_intro_align = isset($_intro_align) ? $_intro_align : 'left';

switch ( $_intro_align ){
	case 'right':
		$_alignment = ' intro-block_right';
		break;
	case 'center':
		$_alignment = '';
		break;
	case 'left':
	default:
		$_alignment = ' intro-block_left';
		break;
}
?>

<div class="intro-block<?php echo $_alignment; ?>">
	<h1 class="page-title heading_pull-top">
		<?php
		if ( $_pid ) :
			echo get_the_title( $_pid );
		elseif ( is_archive() ):
			the_archive_title();
		else:
			the_title();
		endif;
		?>
	</h1>

	<?php if( get_field( 'page_intro_content', $_pid ) ) : ?>
	<div class="section-intro--text">
		<?php
			echo get_field( 'page_intro_content', $_pid );
		?>
	</div>
	<?php endif; ?>
</div>
