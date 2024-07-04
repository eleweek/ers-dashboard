<?php

	include __DIR__ . '/cpts/jobs.php';
	include __DIR__ . '/cpts/services.php';
	include __DIR__ . '/cpts/events.php';

function append_parents_slug( $_post, $_slug ) {
	if( $_post->post_parent ):
		$_pp = get_post( $_post->post_parent );
		$_ppparent = get_post( $_pp->post_parent );
		if( $_ppparent ):
			$_slug = $_pp->post_name.'/'.$_slug;
			$_slug = append_parents_slug( $_ppparent, $_slug );
		else:
			$_slug = $_pp->post_name.'/'.$_slug;
		endif;
		return $_slug;
	else:
		return $_slug;
	endif;
}

function get_cpt_rewrite_slug( $_archive ) {
	return trim( str_replace( site_url(), '', get_permalink( $_archive ) ), '/' );
}

function flush_permalinks_after_cpt_update() {
	$screen = get_current_screen();
	if (strpos($screen->id, "acf-options-general") == true) {
		//Ensure the $wp_rewrite global is loaded
		global $wp_rewrite;
		//Call flush_rules() as a method of the $wp_rewrite object
		$wp_rewrite->flush_rules( false );
	}
}
add_action('acf/save_post', 'flush_permalinks_after_cpt_update', 20);

function check_cpt_active(){

	if( class_exists('acf') ) {

		if ( ! get_field( 'jobs_active', 'option' ) ):
			remove_action( 'init', 'rd_register_job_cpt', 1 );
		endif;

		if ( ! get_field( 'services_active', 'option' ) ):
			remove_action( 'init', 'rd_register_service_cpt', 1 );
		endif;

		if ( ! get_field( 'events_active', 'option' ) ):
			remove_action( 'init', 'rd_register_events_cpt', 1 );
		endif;
	}

}
add_action( 'init', 'check_cpt_active', 0 );
