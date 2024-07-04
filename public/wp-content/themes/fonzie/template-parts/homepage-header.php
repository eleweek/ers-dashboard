<?php
$_layout = get_field( 'header_layout_style' );
if( $_layout ) :

	switch( $_layout ){
		case '1':
			include(locate_template('template-parts/headers/homepage-header-1.php'));
			break;
		case '2':
			include(locate_template('template-parts/headers/homepage-header-2.php'));
			break;
		case '3':
			include(locate_template('template-parts/headers/homepage-header-3.php'));
			break;
		case '4' :
			include(locate_template('template-parts/headers/page-header-hero.php'));
			break;
	}

endif;
?>
