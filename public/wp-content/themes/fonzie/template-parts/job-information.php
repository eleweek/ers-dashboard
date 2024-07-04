<div class="job-post">
	<div class="row">
		<div class="col-xs-12">
			<ul>

				<?php if ( get_field( 'salary' ) ): ?>
					<li>
						<h3>Salary</h3>
						<p><?php echo get_field( 'salary' ); ?></p>
					</li>
				<?php endif; ?>

				<?php if ( get_field( 'hours_of_work' ) ): ?>
					<li>
						<h3>Hours of work</h3>
						<p><?php echo get_field( 'hours_of_work' ); ?></p>
					</li>
				<?php endif; ?>

				<?php if ( get_field( 'contract' ) ): ?>
					<li>
						<h3>Contract</h3>
						<p><?php echo get_field( 'contract' ); ?></p>
					</li>
				<?php endif; ?>

				<?php if ( get_field( 'closing_date' ) ): ?>
					<li>
						<h3>Closing date</h3>
						<p><?php echo date( 'j M Y', strtotime( get_field( 'closing_date' ) ) ); ?></p>
					</li>
				<?php endif; ?>

			</ul>
		</div><!-- /.col -->
	</div>
</div><!-- /.job-post -->
