<?php

if ( function_exists( 'acf_add_local_field_group' ) ):

	acf_add_local_field_group( array(
		'key'                   => 'group_56c5d2e3a9129',
		'title'                 => 'Homepage Get Involved Block',
		'fields'                => array(
			array(
				'key'               => 'field_56e05df80ec20',
				'label'             => 'Show Get Involved Block',
				'name'              => 'show_get_involved_block',
				'type'              => 'true_false',
				'instructions'      => '',
				'required'          => 0,
				'conditional_logic' => 0,
				'wrapper'           => array(
					'width' => '',
					'class' => '',
					'id'    => '',
				),
				'message'           => '',
				'default_value'     => 0,
			),
			array(
				'key'               => 'field_56c5d2e3b1d0a',
				'label'             => 'Block Title',
				'name'              => 'homepage_gi_block_title',
				'type'              => 'text',
				'instructions'      => '',
				'required'          => 0,
				'conditional_logic' => array(
					array(
						array(
							'field'    => 'field_56e05df80ec20',
							'operator' => '==',
							'value'    => '1',
						),
					),
				),
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
				'key'               => 'field_56c5d2e3b1d21',
				'label'             => 'CTA Block',
				'name'              => 'homepage_gi_blocks',
				'type'              => 'repeater',
				'instructions'      => 'Fourth will only be displayed on mobile devices',
				'required'          => 1,
				'conditional_logic' => array(
					array(
						array(
							'field'    => 'field_56e05df80ec20',
							'operator' => '==',
							'value'    => '1',
						),
					),
				),
				'wrapper'           => array(
					'width' => '',
					'class' => '',
					'id'    => '',
				),
				'collapsed'         => '',
				'min'               => 4,
				'max'               => 4,
				'layout'            => 'row',
				'button_label'      => 'Add CTA',
				'sub_fields'        => array(
					array(
						'key'               => 'field_56c5d38fde702',
						'label'             => 'Post',
						'name'              => 'post',
						'type'              => 'post_object',
						'instructions'      => '',
						'required'          => 1,
						'conditional_logic' => 0,
						'wrapper'           => array(
							'width' => '',
							'class' => '',
							'id'    => '',
						),
						'post_type'         => array(
							0 => 'services',
							1 => 'jobs',
							2 => 'post',
							3 => 'events'
						),
						'taxonomy'          => array(),
						'allow_null'        => 0,
						'multiple'          => 0,
						'return_format'     => 'id',
						'ui'                => 1,
					),
				),
			),
		),
		'location'              => array(
			array(
				array(
					'param'    => 'page_type',
					'operator' => '==',
					'value'    => 'front_page',
				),
			),
		),
		'menu_order'            => 3,
		'position'              => 'acf_after_title',
		'style'                 => 'default',
		'label_placement'       => 'left',
		'instruction_placement' => 'label',
		'hide_on_screen'        => '',
		'active'                => 1,
		'description'           => '',
	) );

endif;
