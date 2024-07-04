<?php
/**
 *
 * @see http://tgmpluginactivation.com/configuration/ for detailed documentation.
 *
 */

/**
 * Include the TGM_Plugin_Activation class.
 */
require_once 'class-tgm-plugin-activation.php';

add_action( 'tgmpa_register', 'fonzie_register_required_plugins' );
/**
 * Register the required plugins for this theme.
 *
 * In this example, we register five plugins:
 * - one included with the TGMPA library
 * - two from an external source, one from an arbitrary source, one from a GitHub repository
 * - two from the .org repo, where one demonstrates the use of the `is_callable` argument
 *
 * The variable passed to tgmpa_register_plugins() should be an array of plugin
 * arrays.
 *
 * This function is hooked into tgmpa_init, which is fired within the
 * TGM_Plugin_Activation class constructor.
 */
function fonzie_register_required_plugins() {

	$plugin_dir = dirname(__FILE__) . '/plugins/';

	/*
	 * Array of plugin arrays. Required keys are name and slug.
	 * If the source is NOT from the .org repo, then source is also required.
	 */
	$plugins = array(

		// CharityPress Plugins

		array(
			'name'         => 'CharityPress Donations',
			'slug'         => 'charitypress-donation',
			'source'       => $plugin_dir . 'rddev-charitypress-donations.zip',
			'required'     => false,
		),

		// Tag manager plugin
		array(
			'name'         => 'Tag manager',
			'slug'         => 'rd-gtm-tag',
			'source'       => $plugin_dir . 'rd-gtm-tag.zip',
			'required'     => false
		),

		// Advanced Custom Fields
		array(
			'name'               => 'Advanced Custom Fields Pro',
			'slug'               => 'advanced-custom-fields-pro',
			'source'             => $plugin_dir . 'advanced-custom-fields-pro.zip',
			'required'           => true,
			'version'            => '',
			'force_activation'   => true,
			'force_deactivation' => false,
			'external_url'       => '',
			'is_callable'        => '',
		),

		array(
			'name'         => 'Advanced Custom Fields: Gravity Forms Field',
			'slug'         => 'advanced-custom-fields-gravity-forms-field',
			'source'       => $plugin_dir . 'Gravity-Forms-ACF-Field.zip',
			'required'     => false,
		),

		array(
			'name'         => 'Advanced Custom Fields: Table Field',
			'slug'         => 'advanced-custom-fields-table-field',
			'source'       => $plugin_dir . 'advanced-custom-fields-table-field.zip',
			'required'     => false,
		),

		// Gravity Forms
		array(
			'name'         => 'Gravity Forms',
			'slug'         => 'gravityforms',
			'source'       => $plugin_dir . 'gravityforms.zip',
			'required'     => false,
		),

		array(
			'name'         => 'WCAG 2.0 form fields for Gravity Forms',
			'slug'         => 'wcag-20-form-fields-for-gravity-forms',
			'source'       => $plugin_dir . 'gravity-forms-wcag-20-form-fields.zip',
			'required'     => false,
		),

		// CMS Tree Page View
		array(
			'name'         => 'CMS Tree Page View',
			'slug'         => 'cms-tree-page-view',
			'source'       => $plugin_dir . 'cms-tree-page-view.zip',
			'required'     => false,
		),

		// Better Search
		array(
			'name'         => 'Better Search',
			'slug'         => 'better-search',
			'source'       => $plugin_dir . 'better-search.zip',
			'required'     => false,
		),


	);

	/*
	 * Array of configuration settings. Amend each line as needed.
	 *
	 * TGMPA will start providing localized text strings soon. If you already have translations of our standard
	 * strings available, please help us make TGMPA even better by giving us access to these translations or by
	 * sending in a pull-request with .po file(s) with the translations.
	 *
	 * Only uncomment the strings in the config array if you want to customize the strings.
	 */
	$config = array(
		'id'           => 'charity-press',                 // Unique ID for hashing notices for multiple instances of TGMPA.
		'default_path' => '',                      // Default absolute path to bundled plugins.
		'menu'         => 'tgmpa-install-plugins', // Menu slug.
		'parent_slug'  => 'themes.php',            // Parent menu slug.
		'capability'   => 'edit_theme_options',    // Capability needed to view plugin install page, should be a capability associated with the parent menu used.
		'has_notices'  => true,                    // Show admin notices or not.
		'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
		'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
		'is_automatic' => false,                   // Automatically activate plugins after installation or not.
		'message'      => '',                      // Message to output right before the plugins table.

		/*
		'strings'      => array(
			'page_title'                      => __( 'Install Required Plugins', 'charity-press' ),
			'menu_title'                      => __( 'Install Plugins', 'charity-press' ),
			'installing'                      => __( 'Installing Plugin: %s', 'charity-press' ), // %s = plugin name.
			'oops'                            => __( 'Something went wrong with the plugin API.', 'charity-press' ),
			'notice_can_install_required'     => _n_noop(
				'This theme requires the following plugin: %1$s.',
				'This theme requires the following plugins: %1$s.',
				'charity-press'
			), // %1$s = plugin name(s).
			'notice_can_install_recommended'  => _n_noop(
				'This theme recommends the following plugin: %1$s.',
				'This theme recommends the following plugins: %1$s.',
				'charity-press'
			), // %1$s = plugin name(s).
			'notice_cannot_install'           => _n_noop(
				'Sorry, but you do not have the correct permissions to install the %1$s plugin.',
				'Sorry, but you do not have the correct permissions to install the %1$s plugins.',
				'charity-press'
			), // %1$s = plugin name(s).
			'notice_ask_to_update'            => _n_noop(
				'The following plugin needs to be updated to its latest version to ensure maximum compatibility with this theme: %1$s.',
				'The following plugins need to be updated to their latest version to ensure maximum compatibility with this theme: %1$s.',
				'charity-press'
			), // %1$s = plugin name(s).
			'notice_ask_to_update_maybe'      => _n_noop(
				'There is an update available for: %1$s.',
				'There are updates available for the following plugins: %1$s.',
				'charity-press'
			), // %1$s = plugin name(s).
			'notice_cannot_update'            => _n_noop(
				'Sorry, but you do not have the correct permissions to update the %1$s plugin.',
				'Sorry, but you do not have the correct permissions to update the %1$s plugins.',
				'charity-press'
			), // %1$s = plugin name(s).
			'notice_can_activate_required'    => _n_noop(
				'The following required plugin is currently inactive: %1$s.',
				'The following required plugins are currently inactive: %1$s.',
				'charity-press'
			), // %1$s = plugin name(s).
			'notice_can_activate_recommended' => _n_noop(
				'The following recommended plugin is currently inactive: %1$s.',
				'The following recommended plugins are currently inactive: %1$s.',
				'charity-press'
			), // %1$s = plugin name(s).
			'notice_cannot_activate'          => _n_noop(
				'Sorry, but you do not have the correct permissions to activate the %1$s plugin.',
				'Sorry, but you do not have the correct permissions to activate the %1$s plugins.',
				'charity-press'
			), // %1$s = plugin name(s).
			'install_link'                    => _n_noop(
				'Begin installing plugin',
				'Begin installing plugins',
				'charity-press'
			),
			'update_link' 					  => _n_noop(
				'Begin updating plugin',
				'Begin updating plugins',
				'charity-press'
			),
			'activate_link'                   => _n_noop(
				'Begin activating plugin',
				'Begin activating plugins',
				'charity-press'
			),
			'return'                          => __( 'Return to Required Plugins Installer', 'charity-press' ),
			'plugin_activated'                => __( 'Plugin activated successfully.', 'charity-press' ),
			'activated_successfully'          => __( 'The following plugin was activated successfully:', 'charity-press' ),
			'plugin_already_active'           => __( 'No action taken. Plugin %1$s was already active.', 'charity-press' ),  // %1$s = plugin name(s).
			'plugin_needs_higher_version'     => __( 'Plugin not activated. A higher version of %s is needed for this theme. Please update the plugin.', 'charity-press' ),  // %1$s = plugin name(s).
			'complete'                        => __( 'All plugins installed and activated successfully. %1$s', 'charity-press' ), // %s = dashboard link.
			'contact_admin'                   => __( 'Please contact the administrator of this site for help.', 'charity-press' ),

			'nag_type'                        => 'updated', // Determines admin notice type - can only be 'updated', 'update-nag' or 'error'.
		),
		*/
	);

	tgmpa( $plugins, $config );
}
