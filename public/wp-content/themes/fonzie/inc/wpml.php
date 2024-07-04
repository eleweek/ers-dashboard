<?php
/**
 * Display languages if available for the post.
 */
function icl_post_languages(){
	$languages = icl_get_languages('skip_missing=1');

	if(1 < count($languages)){
		echo '<div class="wpml-languages-list">';
			echo __('Hefyd ar gael yn: ');

			foreach($languages as $l){
				if(!$l['active']) $langs[] = '<a href="'.$l['url'].'">'.$l['native_name'].'</a>';
			}
			echo join(', ', $langs);
		echo '</div><!-- /.wpml-languages-list -->';
	}
}

/**
 * WPML ACF options workaround.
 */
function cl_acf_set_language() {
  return acf_get_setting('default_language');
}
function get_global_option($name) {
	add_filter('acf/settings/current_language', 'cl_acf_set_language', 100);
	$option = get_field($name, 'option');
	remove_filter('acf/settings/current_language', 'cl_acf_set_language', 100);
	return $option;
}
function get_global_option_have_rows($name) {
	add_filter('acf/settings/current_language', 'cl_acf_set_language', 100);
	$option = have_rows($name, 'option' );
	remove_filter('acf/settings/current_language', 'cl_acf_set_language', 100);
	return $option;
}
