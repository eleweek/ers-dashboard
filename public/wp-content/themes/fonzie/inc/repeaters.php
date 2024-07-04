<?php

function human_filesize($bytes, $decimals = 2) {
	$sz = array('B', 'KB', 'MB', 'GB', 'TB');
	$factor = floor((strlen($bytes) - 1) / 3);
	return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$sz[$factor];
}

function get_cta_btn(){
	$btn_set = get_sub_field('add_cta_button');
	$btn_text = get_sub_field('button_text');
	$linkNewTab = get_sub_field('content_wysiwyg_editor_links_new_tab');

	if( $btn_set && $btn_text ):

		if( get_sub_field('link_location') == 'External Link' ):
			$link_url =  get_sub_field('external_link');
		elseif( get_sub_field('link_location') == 'Internal Link' ):
			$link_url = get_sub_field('page_link');
		endif;


		if($linkNewTab):
			$btn = '<a href="%s" class="btn" target="_blank">%s</a>';
		else:
			$btn = '<a href="%s" class="btn">%s</a>';
		endif;

		return sprintf($btn, $link_url, $btn_text );

	endif;
}
