<div class="voting-leader">

	<?php
	$count = 0;

	$sortby = get_query_var( 'sortby' );

	if(empty($sortby)) {

		$args = array(
			'post_type'      => 'page',
			'posts_per_page' => -1,
			'post_parent'    => $post->ID,
			'order'          => 'ASC',
			'orderby'        => 'menu_order'
		);

	} else {

		$args = array(
			'post_type'      => 'page',
			'posts_per_page' => -1,
			'post_parent'    => $post->ID,
			'meta_key'		 => $sortby,
			'orderby'		 => 'meta_value',
			'order'			 => 'DESC'
		);

	}

	$parent = new WP_Query( $args );

	if ( $parent->have_posts() ) : ?>

		<?php
		while ( $parent->have_posts() ) : $parent->the_post();

			$proportionality_rating = get_field('proportionality_rating');
			$voter_choice_rating = get_field('voter_choice_rating');
			$local_representation_rating = get_field('local_representation_rating');
		?>

			<div class="voting-leader__item">

				<div class="voting-leader-child element-link">

					<div class="voting-leader-child__main">

						<h2 class="voting-leader-child__heading"><?php the_title(); ?></h2>

						<p class="voting-leader-child__text"><?php echo get_the_excerpt(); ?></p>

						<div class="voting-leader-child__link">
							<a href="<?php the_permalink(); ?>"><?php echo esc_html__( 'Read More' ); ?> ></a>
						</div>

					</div>

					<?php if( have_rows('where_its_used') ): ?>

						<div class="voting-leader-child__locations">

							<div class="voting-leader-child__sub-heading"><?php echo esc_html__( 'Where it\'s used' ); ?></div>

							<ul class="voting-leader-child__list">

							    <?php while ( have_rows('where_its_used') ) : the_row(); ?>

							        <li><?php echo get_sub_field('where_its_used_location'); ?></li>

								<?php endwhile; ?>

							</ul>

						</div>

					<?php endif; ?>

					<div class="voting-leader-child__ratings">

						<div class="voting-leader-child__sub-heading voting-leader-child__rating">
							<span class="voting-leader-child__number proportionality"><?php echo $proportionality_rating; ?></span>
							<span><?php echo esc_html__( 'Proportionality' ); ?></span>
							<div class="voting-leader-child__stars">
								<?php
								$count = 0;

								for ($i = 1; $i <= 5; $i++) {

									$count++;

									if($count <= $proportionality_rating) {
										include( fonzie_svg_path( "star.svg" ) );
									} else {
										include( fonzie_svg_path( "star-empty.svg" ) );
									}

								}
								?>
							</div>
						</div>

						<div class="voting-leader-child__sub-heading voting-leader-child__rating">
							<span class="voting-leader-child__number voter-choice"><?php echo $voter_choice_rating; ?></span>
							<span><?php echo esc_html__( 'Voter choice' ); ?></span>
							<div class="voting-leader-child__stars">
								<?php
								$count = 0;

								for ($i = 1; $i <= 5; $i++) {

									$count++;

									if($count <= $voter_choice_rating) {
										include( fonzie_svg_path( "star.svg" ) );
									} else {
										include( fonzie_svg_path( "star-empty.svg" ) );
									}

								}
								?>
							</div>
						</div>

						<div class="voting-leader-child__sub-heading voting-leader-child__rating">
							<span class="voting-leader-child__number local-representation"><?php echo $local_representation_rating; ?></span>
							<span><?php echo esc_html__( 'Local representation' ); ?></span>
							<div class="voting-leader-child__stars">
								<?php
								$count = 0;

								for ($i = 1; $i <= 5; $i++) {

									$count++;

									if($count <= $local_representation_rating) {
										include( fonzie_svg_path( "star.svg" ) );
									} else {
										include( fonzie_svg_path( "star-empty.svg" ) );
									}

								}
								?>
							</div>
						</div>

					</div>

				</div>

			</div>

		<?php endwhile; ?>

	<?php endif; wp_reset_query(); ?>

</div><!-- /.voting-leader -->
