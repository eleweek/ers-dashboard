<?php

if ( function_exists( 'acf_add_local_field_group' ) ):

	include __DIR__ . '/lib/rd_acf_to_post_content.php';

	include __DIR__ . '/fieldgroups/job-post.php';
	include __DIR__ . '/fieldgroups/campaign-progress.php';
	include __DIR__ . '/fieldgroups/events.php';
	include __DIR__ . '/fieldgroups/services.php';
	include __DIR__ . '/fieldgroups/listing-grid-highlight.php';
	include __DIR__ . '/fieldgroups/page-intro.php';
	include __DIR__ . '/fieldgroups/footer.php';
	include __DIR__ . '/fieldgroups/header.php';
	include __DIR__ . '/fieldgroups/page-contact.php';
	include __DIR__ . '/fieldgroups/featured-image.php';
	include __DIR__ . '/fieldgroups/flexible-content.php';
	include __DIR__ . '/fieldgroups/homepage-header.php';
	include __DIR__ . '/fieldgroups/homepage-flexible-content.php';
	include __DIR__ . '/fieldgroups/social-links.php';

endif;
