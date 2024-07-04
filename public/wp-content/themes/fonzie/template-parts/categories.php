<?php $_cats = wp_get_post_categories( $post->ID ); ?>
<?php if ( $_cats ): ?>
	<nav class="btn-list btn-list_tags">
		<ul>
			<span>
				<strong>
					<?php if (count($_cats) > 1) {
						echo 'Campaigns:';
					} else {
						echo 'Campaign:';
					} ?>
				</strong>
			</span>
			<?php foreach ( $_cats as $_cat ): ?>
				<?php $url_query = get_category_link( $_cat ); ?>
				<li>
					<a href="<?php echo $url_query; ?>">
						<span><?php echo get_cat_name( $_cat ); ?></span>
					</a>
				</li>

			<?php endforeach; ?>
		</ul>
	</nav>
<?php endif; ?>
