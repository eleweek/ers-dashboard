<?php

if ( function_exists( 'acf_add_local_field_group' ) ):

	acf_add_local_field_group( array(
		'key'                   => 'group_56b0a156551a3',
		'title'                 => 'Campaign Progress',
		'fields'                => array(
			array(
				'key'               => 'field_56b0a16e5cefd',
				'label'             => 'Raised so far',
				'name'              => 'raised_so_far',
				'type'              => 'number',
				'instructions'      => 'Enter an amount without symbols or commas, e.g. \'21345\'',
				'required'          => 1,
				'conditional_logic' => 0,
				'wrapper'           => array(
					'width' => '',
					'class' => '',
					'id'    => '',
				),
				'default_value'     => 0,
				'placeholder'       => 'Enter a number e.g. \'21345\'',
				'prepend'           => '',
				'append'            => '',
				'min'               => 0,
				'max'               => '',
				'step'              => 1,
				'readonly'          => 0,
				'disabled'          => 0,
			),
			array(
				'key'               => 'field_56b0a1dc5ceff',
				'label'             => 'Target',
				'name'              => 'target',
				'type'              => 'number',
				'instructions'      => 'Enter an amount without symbols or commas, e.g. \'50000\'',
				'required'          => 1,
				'conditional_logic' => 0,
				'wrapper'           => array(
					'width' => '',
					'class' => '',
					'id'    => '',
				),
				'default_value'     => 0,
				'placeholder'       => 'Enter a number e.g. \'50000\'',
				'prepend'           => '',
				'append'            => '',
				'min'               => 0,
				'max'               => '',
				'step'              => 1,
				'readonly'          => 0,
				'disabled'          => 0,
			),
			array(
				'key'               => 'field_56d05c0d722d9',
				'label'             => 'Has End Date',
				'name'              => 'has_end_date',
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
				'key'               => 'field_56b0a2115cf00',
				'label'             => 'End date',
				'name'              => 'end_date',
				'type'              => 'date_picker',
				'instructions'      => 'Choose the date when the campaign ends',
				'required'          => 0,
				'conditional_logic' => array(
					array(
						array(
							'field'    => 'field_56d05c0d722d9',
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
				'display_format'    => 'd/m/Y',
				'return_format'     => 'd/m/Y',
				'first_day'         => 1,
			),
		),
		'location'              => array(
			array(
				array(
					'param'    => 'page_template',
					'operator' => '==',
					'value'    => 'templates/global-blocks.php',
				),
			),
			array(
				array(
					'param'    => 'post_type',
					'operator' => '==',
					'value'    => 'cp-campaigns',
				),
			)
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

?>