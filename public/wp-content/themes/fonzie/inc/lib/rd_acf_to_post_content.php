<?php
class rd_acf_to_post_content {
	protected static $field_keys = [ ];
	protected static $hooked = false;

	public static function addFieldKey( $field_key ) {
		self::$field_keys[] = $field_key;
		if ( ! self::$hooked ) {
			self::$hooked = add_action(
				'save_post',
				[
					'rd_acf_to_post_content',
					'convert_acf_page_content_to_post_content'
				],
				20
			);
		}
	}

	public static function convert_acf_page_content_to_post_content( $post_id ) {

		if ( wp_is_post_revision( $post_id ) ) {
			return;
		}
		if ( ! array_key_exists( 'acf', $_POST )) {
			return;
		}

		$field_key = '';
		foreach(self::$field_keys as $key) {
			if (array_key_exists( $key, $_POST['acf'] ) ) {
				$field_key = $key;
				break;
			}
		}

		if ($field_key === '') {
			return;
		}

		if ( have_rows( $field_key, $post_id ) ) {
			ob_start();
			while ( have_rows( $field_key ) ) {
				the_row();
				get_template_part( 'flexible/layout', get_row_layout() );
			}
			$content = ob_get_clean();

			if ( strlen( $content ) > 0 ) {
				remove_action( 'save_post',
					[
						'rd_acf_to_post_content',
						'convert_acf_page_content_to_post_content'
					],
					20
				);
				wp_update_post( array( 'ID' => $post_id, 'post_content' => $content ) );
				$_POST['post_content'] = $content;
			}
		}
	}
}