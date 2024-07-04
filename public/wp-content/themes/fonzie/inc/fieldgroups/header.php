<?php

if( function_exists('acf_add_local_field_group') ):

$header_fields = array (
	array (
		'key' => 'field_56c58bdd4e70a',
		'label' => 'Button Active',
		'name' => 'button_active',
		'type' => 'true_false',
		'instructions' => '',
		'required' => 0,
		'conditional_logic' => 0,
		'wrapper' => array (
			'width' => '',
			'class' => '',
			'id' => '',
		),
		'message' => '',
		'default_value' => 0,
	),
	array (
		'key' => 'field_56c58bab4e709',
		'label' => 'Button text',
		'name' => 'button_text',
		'type' => 'text',
		'instructions' => 'limited to 15 characters',
		'required' => 0,
		'conditional_logic' => array (
			array (
				array (
					'field' => 'field_56c58bdd4e70a',
					'operator' => '==',
					'value' => '1',
				),
			),
		),
		'wrapper' => array (
			'width' => '',
			'class' => '',
			'id' => '',
		),
		'default_value' => '',
		'placeholder' => '',
		'prepend' => '',
		'append' => '',
		'maxlength' => 15,
		'readonly' => 0,
		'disabled' => 0,
	),
	array (
		'key' => 'field_56c58bfe4e70b',
		'label' => 'Button link location',
		'name' => 'button_link_location',
		'type' => 'radio',
		'instructions' => '',
		'required' => 0,
		'conditional_logic' => array (
			array (
				array (
					'field' => 'field_56c58bdd4e70a',
					'operator' => '==',
					'value' => '1',
				),
			),
		),
		'wrapper' => array (
			'width' => '',
			'class' => '',
			'id' => '',
		),
		'choices' => array (
			1 => 'Internal URL',
			2 => 'External URL',
		),
		'other_choice' => 0,
		'save_other_choice' => 0,
		'default_value' => '',
		'layout' => 'horizontal',
		'allow_null' => 0,
	),
	array (
		'key' => 'field_56c58c3b4e70c',
		'label' => 'Link',
		'name' => 'button_link_internal',
		'type' => 'post_object',
		'instructions' => '',
		'required' => 0,
		'conditional_logic' => array (
			array (
				array (
					'field' => 'field_56c58bdd4e70a',
					'operator' => '==',
					'value' => '1',
				),
				array (
					'field' => 'field_56c58bfe4e70b',
					'operator' => '==',
					'value' => '1',
				),
			),
		),
		'wrapper' => array (
			'width' => '',
			'class' => '',
			'id' => '',
		),
		'post_type' => array (
		),
		'taxonomy' => array (
		),
		'allow_null' => 0,
		'multiple' => 0,
		'return_format' => 'id',
		'ui' => 1,
	),
	array (
		'key' => 'field_56c58c9d4e70e',
		'label' => 'Link',
		'name' => 'button_link_external',
		'type' => 'url',
		'instructions' => '',
		'required' => 0,
		'conditional_logic' => array (
			array (
				array (
					'field' => 'field_56c58bdd4e70a',
					'operator' => '==',
					'value' => '1',
				),
				array (
					'field' => 'field_56c58bfe4e70b',
					'operator' => '==',
					'value' => '2',
				),
			),
		),
		'wrapper' => array (
			'width' => '',
			'class' => '',
			'id' => '',
		),
		'default_value' => '',
		'placeholder' => '',
	),
);

if ( !class_exists('CharityPressDonations\Plugin') ) {
	$header_fields[] = array(
		'key' => 'field_57727156fcede',
		'label' => 'Is donation?',
		'name' => 'button_is_donation',
		'type' => 'true_false',
		'instructions' => 'If checked, the look of the button will be in the style of donations (with heart icon)',
		'required' => 0,
		'conditional_logic' => array (
			array (
				array (
					'field' => 'field_56c58bdd4e70a',
					'operator' => '==',
					'value' => '1',
				),
			),
		),
		'wrapper' => array (
			'width' => '',
			'class' => '',
			'id' => '',
		),
		'message' => '',
		'default_value' => 0,
	);
}

acf_add_local_field_group(array (
	'key' => 'group_56c58b9d893ab',
	'title' => 'Header Button',
	'fields' => $header_fields,
	'location' => array (
		array (
			array (
				'param' => 'options_page',
				'operator' => '==',
				'value' => 'acf-options-header',
			),
		),
	),
	'menu_order' => 0,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'left',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => 1,
	'description' => '',
));

endif;
