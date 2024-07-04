<?php

if ( function_exists( 'acf_add_local_field_group' ) ):

	acf_add_local_field_group( array(
		'key'                   => 'group_56b9d5e7736ce',
		'title'                 => 'Page Intro',
		'fields'                => array(
			array(
				'key'               => 'field_56b9d5ee8a058',
				'label'             => 'Content',
				'name'              => 'page_intro_content',
				'type'              => 'textarea',
				'instructions'      => '',
				'required'          => 0,
				'conditional_logic' => 0,
				'wrapper'           => array(
					'width' => '',
					'class' => '',
					'id'    => '',
				),
				'default_value'     => '',
				'placeholder'       => '',
				'maxlength'         => '',
				'rows'              => '',
				'new_lines'         => 'wpautop',
				'readonly'          => 0,
				'disabled'          => 0,
			),
		),
		'location'              => array(
			array(
				array(
					'param'    => 'post_type',
					'operator' => '==',
					'value'    => 'page',
				),
				array(
					'param'    => 'page_type',
					'operator' => '!=',
					'value'    => 'front_page',
				),
				array(
					'param' => 'page_template',
					'operator' => '!=',
					'value' => 'templates/promotion-page.php',
				),
				array(
					'param' => 'page_template',
					'operator' => '!=',
					'value' => 'templates/donations-process.php',
				),
			),
			array(
				array(
					'param'    => 'post_type',
					'operator' => '==',
					'value'    => 'cp-campaigns',
				),
				array(
					'param'    => 'page_type',
					'operator' => '!=',
					'value'    => 'front_page',
				),
				array(
					'param' => 'page_template',
					'operator' => '!=',
					'value' => 'templates/promotion-page.php',
				),
			),
		),
		'menu_order'            => 1,
		'position'              => 'acf_after_title',
		'style'                 => 'default',
		'label_placement'       => 'left',
		'instruction_placement' => 'label',
		'hide_on_screen'        => '',
		'active'                => 1,
		'description'           => '',
	) );

endif;
