<?php $_tags = wp_get_post_tags( $post->ID ); ?>
<?php if ( $_tags ): ?>
	<nav class="btn-list btn-list_tags">
		<ul>
			<i class="icon"><?php include( fonzie_svg_path( "tag.svg" ) ); ?></i>
			<?php foreach ( $_tags as $_tag ): ?>
				<?php $url_query = get_tag_link( $_tag->term_id ); ?>
				<li>
					<a href="<?php echo $url_query; ?>" class="btn btn_borderless btn_icon-left">
						<span><?php _e( $_tag->name, 'charitypress_fonzie' ); ?></span>
					</a>
				</li>

			<?php endforeach; ?>
		</ul>
	</nav>
<?php endif; ?>
