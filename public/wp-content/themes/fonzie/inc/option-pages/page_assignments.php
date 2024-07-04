<?php

if ( function_exists( 'acf_add_local_field_group' ) ):

	acf_add_local_field_group( array(
		'key'                   => 'group_575c42b6d49d5',
		'title'                 => 'Page Assignments',
		'fields'                => array(
			array(
				'key'               => 'field_575c42c600f25',
				'label'             => 'Contact Page',
				'name'              => 'contact_page',
				'type'              => 'page_link',
				'instructions'      => 'This link is used on the 404 page',
				'required'          => 1,
				'conditional_logic' => 0,
				'wrapper'           => array(
					'width' => '',
					'class' => '',
					'id'    => '',
				),
				'post_type'         => array(
					0 => 'page',
				),
				'taxonomy'          => array(),
				'allow_null'        => 0,
				'multiple'          => 0,
			),
		),
		'location'              => array(
			array(
				array(
					'param'    => 'options_page',
					'operator' => '==',
					'value'    => 'acf-options-404',
				),
			),
		),
		'menu_order'            => 0,
		'position'              => 'normal',
		'style'                 => 'default',
		'label_placement'       => 'left',
		'instruction_placement' => 'label',
		'hide_on_screen'        => '',
		'active'                => 1,
		'description'           => '',
	) );

endif;