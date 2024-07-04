<div class="voting-hero">

	<div class="container-fluid">

		<div class="row">

			<div class="col-md-8 col-md-offset-2">

				<h1 class="voting-hero__title"><?php the_title(); ?></h1>

				<?php if( get_field( 'page_intro_content' ) ) : ?>
					<div class="voting-hero__text">
						<?php echo get_field( 'page_intro_content' ); ?>
					</div>
				<?php endif; ?>

				<?php if( get_field( 'voting_leader_content' ) ) : ?>
					<div class="voting-hero__content">
						<?php echo get_field( 'voting_leader_content' ); ?>
					</div>
				<?php endif; ?>

			</div>
			
		</div>

	</div>

</div>
