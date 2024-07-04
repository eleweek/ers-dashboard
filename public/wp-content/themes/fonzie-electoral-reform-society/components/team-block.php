<?php
if ( have_rows('team_members') ): ?>

	<div class="selected-pages bg-very-light-grey">

		<div class="container-fluid">

			<div class="campaign-info-block__header">

				<h4 class="campaign-info-block__title"><?php printf( esc_html__( 'The %s team' ), get_the_title() ); ?></h4>

			</div>

			<div class="block__row">

				<?php while ( have_rows('team_members') ) : the_row(); ?>

					<?php
					$image = get_sub_field('team_members_image');
					$name = get_sub_field('team_members_name');
					$role = get_sub_field('team_members_role');
					$contact = get_sub_field('team_members_contact');
					$bio = get_sub_field('team_members_bio');
					?>

					<div class="block__item block__item--team">

						<div class="team-block">

							<?php if( !empty( $image ) ) : ?>

								<img src="<?php echo $image['sizes']['block-image--square-small']; ?>" alt="<?php echo $image['alt']; ?>" class="team-block__image">

							<?php endif; ?>

							<div class="team-block__name"><?php echo $name; ?></div>

							<?php if( !empty( $role ) ) : ?>

								<div class="team-block__role"><?php echo $role; ?></div>

							<?php endif; ?>

							<?php if( !empty( $contact ) ) : ?>

								<div class="team-block__contact">
									<a href="mailto:<?php echo $contact; ?>"><?php echo $contact; ?></a>
								</div>

							<?php endif; ?>

							<?php if( !empty( $bio ) ) : ?>

								<div class="team-block__bio"><?php echo $bio; ?></div>

							<?php endif; ?>

						</div>

					</div>

				<?php endwhile; ?>

			</div>

		</div>

	</div>

<?php endif; ?>
