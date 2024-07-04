<?php
// get SCSSPHP and Compiler class
// require_once "scssphp/scss.inc.php";
// use Leafo\ScssPhp\Compiler;

global $fonzie_colour_schemes, $fonzie_custom_colours;

// $fonzie_colour_schemes = fonzie_get_themes();

$fonzie_custom_colours = array(
	'primary' => '#000000',
	'secondary' => '#808080',
	'tertiary' => '#D3D3D3',
	'text' => '#373a3c'
);

function fonzie_customize_register( $wp_customize ) {

	/**
	 * Remove existing functionality...
	 */

	/* Remove Active Themes */
	$wp_customize->remove_section( 'themes' );

	/* Remove Background Image */
	$wp_customize->remove_section( 'background_image' );

	/* Remove Navigation */
	$wp_customize->remove_panel( 'nav_menus' );
	remove_action( 'customize_controls_enqueue_scripts', array( $wp_customize->nav_menus, 'enqueue_scripts' ) );
	remove_action( 'customize_register', array( $wp_customize->nav_menus, 'customize_register' ), 11 );
	remove_filter( 'customize_dynamic_setting_args', array( $wp_customize->nav_menus, 'filter_dynamic_setting_args' ) );
	remove_filter( 'customize_dynamic_setting_class', array( $wp_customize->nav_menus, 'filter_dynamic_setting_class' ) );
	remove_action( 'customize_controls_print_footer_scripts', array( $wp_customize->nav_menus, 'print_templates' ) );
	remove_action( 'customize_controls_print_footer_scripts', array( $wp_customize->nav_menus, 'available_items_template' ) );
	// remove_action( 'customize_preview_init', array( $wp_customize->nav_menus, 'customize_preview_init' ) );

	/* Remove Widgets */
	$wp_customize->remove_panel( 'widgets' );

	/* Remove Static Front Page */
	$wp_customize->remove_section( 'static_front_page' );

	/* Remove Display Header Text */
	$wp_customize->remove_control( 'display_header_text' );

	/* Remove Site Icon */
	//$wp_customize->remove_control( 'site_icon' );

	/* Remove default colour controls */
	$wp_customize->remove_control( 'header_textcolor' );
	$wp_customize->remove_control( 'background_color' );

	/* Remove Header Image */
	$wp_customize->remove_section( 'header_image' );

	/* Remove Tagline */
	$wp_customize->remove_control( 'blogdescription' );

	/* Remove Colors */
	$wp_customize->remove_section( 'colors' );


	/* Add selection for theme colours */
	// global $fonzie_colour_schemes;

	// $wp_customize->add_setting( 'colour_scheme', array(
	// 	'type'       => 'option',
	// 	'capability' => 'manage_options',
	// 	'default'    => 'bright-blue-theme',
	// 	'transport'  => 'refresh'
	// ) );

	// $wp_customize->add_control( 'colour_scheme', array(
	// 	'type'        => 'select',
	// 	'section'     => 'colors',
	// 	'label'       => __( 'Colour Theme' ),
	// 	'description' => __( 'Please choose your colour theme.' ),
	// 	'choices'     => $fonzie_colour_schemes
	// ) );

	/* Add custom colour pickers */
	// wp_add_inline_style( 'wp-admin', '.customize-control-color { display: none !important; }' );

	// // primary color
	// $wp_customize->add_setting( 'custom_primary', array(
	// 	'type'       => 'option',
	// 	'capability' => 'manage_options',
	// 	'default' => $fonzie_custom_colours['primary'],
	// 	'transport'  => 'postMessage',
	// 	'active_callback' => 'refresh_custom_theme'
	// ) );

	// $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'custom_primary', array(
	//   'label' => __( 'Primary Colour' ),
	//   'section' => 'colors'
	// ) ) );

	// secondary color
	// $wp_customize->add_setting( 'custom_secondary', array(
	// 	'type'       => 'option',
	// 	'capability' => 'manage_options',
	// 	'default' => $fonzie_custom_colours['secondary'],
	// 	'transport'  => 'postMessage',
	// 	'active_callback' => 'refresh_custom_theme'
	// ) );

	// $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'custom_secondary', array(
	//   'label' => __( 'Secondary Colour' ),
	//   'section' => 'colors'
	// ) ) );

	// tertiary color
	// $wp_customize->add_setting( 'custom_tertiary', array(
	// 	'type'       => 'option',
	// 	'capability' => 'manage_options',
	// 	'default' => $fonzie_custom_colours['tertiary'],
	// 	'transport'  => 'postMessage',
	// 	'active_callback' => 'refresh_custom_theme'
	// ) );

	// $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'custom_tertiary', array(
	//   'label' => __( 'Tertiary Colour' ),
	//   'section' => 'colors'
	// ) ) );

	// text color
	$wp_customize->add_setting( 'custom_text', array(
		'type'       => 'option',
		'capability' => 'manage_options',
		'default' => $fonzie_custom_colours['text'],
		'transport'  => 'postMessage'
	) );

	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'custom_text', array(
	  'label' => __( 'Text Colour' ),
	  'section' => 'colors'
	) ) );

	/* Add site logo */
	$wp_customize->add_setting( 'site_logo', array(
		'type'       => 'option',
		'capability' => 'manage_options',
		'transport'  => 'refresh'
	) );

	$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'site_logo', array(
		'section' => 'title_tagline',
		'label'   => __( 'Site Logo' )
	) ) );

}
add_action( 'customize_register', 'fonzie_customize_register', 10 );

function fonzie_get_themes(){

	$stylesheet = get_stylesheet_directory();

	$path = $stylesheet . '/css/themes/*.css';

	$files = array(
		'custom-theme' => 'Custom Theme'
	);

	foreach (glob($path) as $file) {

		$filename = pathinfo($file, PATHINFO_FILENAME);
		$files[ basename($filename) ] = ucwords(str_replace('-', ' ', $filename));

	}

	return $files;

}

add_action( 'customize_save_after', 'fonzie_customizer_save' );

// this gets fired after the theme is saved
function fonzie_customizer_save() {

	// duplicate master scss file
	$themePath = get_template_directory();

	$master = $themePath . '/src/sass/themes/custom-theme.scss.master';
	$scss = $themePath . '/src/sass/themes/custom-theme.scss';
	$css = $themePath . '/css/themes/custom-theme.css';

	// if master file failed to duplicate..
	if (!copy($master, $scss)) {
		echo "Failed to copy $file...";
	}

	// if master file duplicated successfully, find and replace color values in the duplicate
	else {
		// find and replace color values
		$str = file_get_contents($scss);
		// get the color codes
		$primary = get_option('custom_primary');
		$secondary = get_option('custom_secondary');
		$tertiary = get_option('custom_tertiary');
		$text = get_option('custom_text');

		// replace the placeholder strings with the color codes
		$str = str_replace('__PRIMARY__', $primary, $str);
		$str = str_replace('__SECONDARY__', $secondary, $str);
		$str = str_replace('__TERTIARY__', $tertiary, $str);
		$str = str_replace('__TEXT__', $text, $str);

		// rewrite the file
		file_put_contents($scss, $str);

		// compile the css from the scss file we just created
		$scssCompile = new Compiler();
		$scssCompile->setImportPaths($themePath . '/src/sass/');
		$compiledCss = $scssCompile->compile($str);

		// write the compiled css to the css file
		file_put_contents($css, $compiledCss);
	}

}

function fonzie_colour_scheme_init() {
	// Check if custom theme CSS exists, run function to create with defaults
	// if the file does not exist
	if ( !file_exists( get_template_directory() . '/src/sass/themes/custom-theme.scss' ) ) {
		global $fonzie_custom_colours;

		add_option( 'custom_primary', $fonzie_custom_colours['primary'] );
		add_option( 'custom_secondary', $fonzie_custom_colours['secondary'] );
		add_option( 'custom_tertiary', $fonzie_custom_colours['tertiary'] );
		add_option( 'custom_text', $fonzie_custom_colours['text'] );

		fonzie_customizer_save();
	}
}
// add_action( 'init', 'fonzie_colour_scheme_init' );
