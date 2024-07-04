<?php
if ( function_exists( 'acf_add_options_page' ) ) {

	acf_add_options_page();
	acf_add_options_sub_page( 'General' );
	acf_add_options_sub_page( 'Header' );
	acf_add_options_sub_page( 'Footer' );
	acf_add_options_sub_page( '404' );

	require_once __DIR__ . '/option-pages/general_post_type_settings.php';
	require_once __DIR__ . '/option-pages/general_leader_page_settings.php';
	require_once __DIR__ . '/option-pages/404.php';
	require_once __DIR__ . '/option-pages/general-social-share.php';
	require_once __DIR__ . '/option-pages/google-maps.php';
	require_once __DIR__ . '/option-pages/page_assignments.php';

	if( class_exists('CharityPressDonations\Plugin') ):
		acf_add_options_sub_page( 'Donations' );
		require_once __DIR__ . '/option-pages/donations.php';
	endif;


}
