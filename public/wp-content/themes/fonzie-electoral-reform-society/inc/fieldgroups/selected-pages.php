<?php
if( function_exists('acf_add_local_field_group') ):

acf_add_local_field_group(array(
	'key' => 'group_595c9f0db8354',
	'title' => 'Selected pages',
	'fields' => array(
		array(
			'key' => 'field_595c9f393c033',
			'label' => 'Title',
			'name' => 'selected_pages_block_title',
			'type' => 'text',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'default_value' => '',
			'placeholder' => '',
			'prepend' => '',
			'append' => '',
			'maxlength' => '',
		),
		array(
			'key' => 'field_595c9fc33c034',
			'label' => 'Pages',
			'name' => 'selected_pages_pages',
			'type' => 'repeater',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'collapsed' => '',
			'min' => 0,
			'max' => 0,
			'layout' => 'table',
			'button_label' => '',
			'sub_fields' => array(
				array(
					'key' => 'field_595c9ffe3c035',
					'label' => 'Page',
					'name' => 'selected_pages_page',
					'type' => 'post_object',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array(
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'post_type' => array(
					),
					'taxonomy' => array(
					),
					'allow_null' => 0,
					'multiple' => 0,
					'return_format' => 'object',
					'ui' => 1,
				),
			),
		),
		array(
			'key' => 'field_5c1b67eb37dc2',
			'label' => 'Link To',
			'name' => 'link_to',
			'type' => 'radio',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'choices' => array(
				'Internal Link' => 'Internal Link',
				'External Link' => 'External Link',
			),
			'allow_null' => 0,
			'other_choice' => 0,
			'save_other_choice' => 0,
			'default_value' => '',
			'layout' => 'vertical',
			'return_format' => 'value',
		),
		array(
			'key' => 'field_595ca58932bb0',
			'label' => 'See all link',
			'name' => 'selected_pages_see_all_link',
			'type' => 'page_link',
			'instructions' => '',
			'required' => 1,
			'conditional_logic' => array(
				array(
					array(
						'field' => 'field_5c1b67eb37dc2',
						'operator' => '==',
						'value' => 'Internal Link',
					),
				),
			),
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'post_type' => array(
				0 => 'page',
			),
			'taxonomy' => array(
			),
			'allow_null' => 0,
			'allow_archives' => 1,
			'multiple' => 0,
		),
		array(
			'key' => 'field_5c1b689e37dc4',
			'label' => 'See all link',
			'name' => 'selected_pages_see_all_link_external',
			'type' => 'url',
			'instructions' => '',
			'required' => 1,
			'conditional_logic' => array(
				array(
					array(
						'field' => 'field_5c1b67eb37dc2',
						'operator' => '==',
						'value' => 'External Link',
					),
				),
			),
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'default_value' => '',
			'placeholder' => '',
		),
	),
	'location' => array(
		array(
			array(
				'param' => 'page_template',
				'operator' => '==',
				'value' => 'templates/national.php',
			),
		),
	),
	'menu_order' => 0,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => 1,
	'description' => '',
));

endif;