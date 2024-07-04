<?php

function form_submit_button( $button, $form ) {
	return "<input type='submit' class='btn' id='gform_submit_button_{$form['id']}' value='{$form['button']['text']}' />";
}
add_filter( 'gform_submit_button', 'form_submit_button', 10, 2 );

$id = get_option( 'options_newsletter_form' );

function form_submit_button_alt( $button, $form ) {
	return "<input type='submit' class='newsletter-signup__button btn btn_outlined' id='gform_submit_button_{$form['id']}' value='{$form['button']['text']}' />";
}
add_filter( 'gform_submit_button_'.$id, 'form_submit_button_alt', 10, 2 );

add_filter( 'gform_enable_field_label_visibility_settings', '__return_true' );

add_filter( 'gform_display_add_form_button', '__return_false' );
