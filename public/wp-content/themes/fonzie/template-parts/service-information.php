<div class="row">
	<div class="col-xs-12">
	  	<div class="service-post-information">
	  		<div class="col-lg-6">
	  			<h4>Service Information <?php include( fonzie_svg_path( "info-circle.svg" ) ); ?></h4>
	  			<p>
	  				<?php if (get_field('instructor', $postId)): ?>
		  			<strong>Instructor:</strong> <?php echo get_field('instructor', $postId); ?><br>
			  		<?php endif; ?>
	  				<?php if (get_field('cost', $postId)): ?>
	  				<strong>Cost:</strong> <?php echo get_field('cost', $postId); ?><br>
		  			<?php endif; ?>
		  			<?php 
		  			if( have_rows('contact_details', $postId) ):

		  				while( have_rows('contact_details', $postId) ): the_row(); 

		  					// get the type for this row
		  					if (get_sub_field('type')) {
		  						$type = get_sub_field('type');
		  					}

		  					// get the value for this row
		  					if (get_sub_field('email_address')) {
		  						$value = '<a href="mailto:' . get_sub_field('email_address') . '">' . get_sub_field('email_address') . '</a>';
		  					}
		  					if (get_sub_field('number')) {
		  						$value = get_sub_field('number');
		  					}

		  					// if a value exists, print the row
		  					if ($value) {
		  			?>
		  			<strong><?php echo $type; ?>:</strong> <?php echo $value; ?><br>
		  			<?php
		  					}

		  				endwhile; 

		  			endif;
		  			?>
				</p>
	  		</div>
	  		<div class="col-lg-6">
	  			<h4>Opening Hours <?php include( fonzie_svg_path( "clock-o.svg" ) ); ?></h4>

				<dl class="opening-hours">

					<?php
					if( have_rows('opening_times', $postId) ):

						while( have_rows('opening_times', $postId) ): the_row(); 

							// get day of the week name
							$day_of_the_week = get_sub_field_object('day_of_the_week');
							$day_of_the_week_value = get_sub_field('day_of_the_week');
							$day_of_the_week_label = $day_of_the_week['choices'][ $day_of_the_week_value ];

							// trim day of the week to first 3 letters
							$day_of_the_week_label = substr($day_of_the_week_label,0,3);

							// get opening and closing time
							$opening_time = get_sub_field('opening_time');
							$closing_time = get_sub_field('closing_time');

							if ($opening_time == '' || $closing_time == '') {
								$opening_time = 'Closed';
							}

					?>
					<dt><?php echo $day_of_the_week_label; ?></dt>
					<dd><?php echo $opening_time; if ($closing_time) echo ' - ' . $closing_time; ?></dd>
					<?php							
						endwhile; 
						
					endif;
					?>
				</dl>
	  		</div>

	  	</div>
	</div><!-- /.col -->
</div>