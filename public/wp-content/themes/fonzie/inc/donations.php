<?php

function get_rdd_process_page() {
	return get_field( 'process_page', 'option' );
}

function the_rdd_process_page() {
	echo get_rdd_process_page();
}

function get_rdd_landing_page() {
	return get_field( 'landing_page', 'option' );
}

function the_rdd_landing_page() {
	echo get_rdd_landing_page();
}

class donationProcess {

	public $process = '';
	public $type = '';

	function __construct() {
		$this->check_progress();
		$this->check_type();
	}

	public function check_progress() {
		if ( isset( $_GET['process'] ) ):
			$this->process = $_GET['process'];
		endif;
	}

	public function current_step( $_step = '' ) {
		$_activeClass = ' active';
		if ( $this->process == $_step || $this->process == 'complete' ):
			echo $_activeClass;
		endif;
	}

	public function check_type() {
		if ( isset( $_GET['type'] ) ):
			$this->type = $_GET['type'];
		endif;
	}

}

function check_donation_templates( $page_templates ){
	if( class_exists('CharityPressDonations\Plugin') )
		return $page_templates;

	if( !is_array( $page_templates ) )
		return $page_templates;

	unset($page_templates['templates/donations-landing.php'] );
	unset($page_templates['templates/donations-process.php'] );

	return $page_templates;

}
add_filter( 'theme_page_templates', 'check_donation_templates');
