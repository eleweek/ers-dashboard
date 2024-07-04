<?php

if ( function_exists( 'acf_add_local_field_group' ) ):

	acf_add_local_field_group( array(
		'key'                   => 'group_57692057b06b7',
		'title'                 => '404 Title Content',
		'fields'                => array(
			array(
				'key'               => 'field_5769205d41412',
				'label'             => 'Not Found title',
				'name'              => 'not_found_title',
				'type'              => 'text',
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
				'prepend'           => '',
				'append'            => '',
				'maxlength'         => '',
				'readonly'          => 0,
				'disabled'          => 0,
			),
			array(
				'key'               => 'field_5769207841413',
				'label'             => 'Not Found subtitle',
				'name'              => 'not_found_subtitle',
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
				'rows'              => 4,
				'new_lines'         => 'br',
				'readonly'          => 0,
				'disabled'          => 0,
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