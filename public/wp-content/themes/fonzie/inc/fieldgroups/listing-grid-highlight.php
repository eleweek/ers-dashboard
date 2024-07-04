<?php

if ( function_exists( 'acf_add_local_field_group' ) ):

	acf_add_local_field_group( array(
		'key'                   => 'group_56bda9c145787',
		'title'                 => 'Listing Grid Highlighting',
		'fields'                => array(
			array(
				'key'               => 'field_56bdaa057ddc7',
				'label'             => 'Is this listing highlighted?',
				'name'              => 'highlighted_listing_type',
				'type'              => 'checkbox',
				'instructions'      => '',
				'required'          => 0,
				'conditional_logic' => 0,
				'wrapper'           => array(
					'width' => '',
					'class' => '',
					'id'    => '',
				),
				'choices'           => array(
					'Yes' => 'Yes',
				),
				'default_value'     => array(),
				'layout'            => 'horizontal',
				'toggle'            => 0,
			),
		),
		'location'              => array(
			array(
				array(
					'param'    => 'taxonomy',
					'operator' => '==',
					'value'    => 'jobs-category',
				),
			),
			array(
				array(
					'param'    => 'taxonomy',
					'operator' => '==',
					'value'    => 'services-category',
				),
			),
			array(
				array(
					'param'    => 'taxonomy',
					'operator' => '==',
					'value'    => 'events-category',
				),
			),
		),
		'menu_order'            => 0,
		'position'              => 'normal',
		'style'                 => 'default',
		'label_placement'       => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen'        => '',
		'active'                => 1,
		'description'           => '',
	) );

endif;