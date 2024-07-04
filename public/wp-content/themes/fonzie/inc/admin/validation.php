<?php
class Fonzie_Sanitize_Title {
    public function __construct() {
        add_action('wp_insert_post_data', array(
            $this,
            'wp_insert_post_data'
        ), 99, 2);
        add_action('admin_notices', array(
            $this,
            'admin_notices'
        ));
    }

    public function wp_insert_post_data($data, $postarr) {

        $fonzie_post_title = $data['post_title'];
        $screen = get_current_screen();

        $allowedScreens = [
          'post',
          'post-new'
        ];

        // if user has not entered a title..
        if ($fonzie_post_title == '' && in_array($screen->base, $allowedScreens)) {
            // change the post status to draft
            $data['post_status'] = 'draft';
            // add a query string variable, which will trigger an error notice
            add_filter('redirect_post_location', array(
                $this,
                'add_notice_query_var'
            ), 99);
        }

        return $data;

    }

    public function add_notice_query_var($location) {
        remove_filter('redirect_post_location', array(
            $this,
            'add_notice_query_var'
        ), 99);
        return add_query_arg(array(
            'no_post_title' => 'true'
        ), $location);
    }

    public function admin_notices() {
        if (!isset($_GET['no_post_title'])) {
            return;
        }
        // if there is not post title, output an error notice to inform ther user
?>
   		<div class="error notice">
      		<p><?php esc_html_e('Your post will be saved as a draft and not published until you enter a title.', 'text-domain'); ?></p>
	   </div>
	   <style>
		   #title {
		   		border: 1px solid #dc3232;
			}
	   </style>
<?php
    }
}
if(is_admin()) {
    new Fonzie_Sanitize_Title;
}

?>
