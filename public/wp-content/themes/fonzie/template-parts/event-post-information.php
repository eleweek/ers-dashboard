<?php
// the id of the wordpress event post
$postId = 240;

// get all the variables we'll need
$startDate        = DateTime::createFromFormat( 'Ymd', get_field( 'start_date', $postId ) );
$endDate          = DateTime::createFromFormat( 'Ymd', get_field( 'end_date', $postId ) );
$startTime        = get_field( 'start_time', $postId );
$endTime          = get_field( 'end_time', $postId );
$locationName     = get_field( 'location_name', $postId );
$locationPostcode = get_field( 'location_postcode', $postId );
$location         = get_field( 'map', $postId );

// is it a single or multi date event? ($dateType)
$dateType = ( $startDate && $endDate ) ? 'multiple' : 'single';

// does it have a location? ($hasLocation)
$hasLocation = ( $locationName && $locationPostcode );
?>

<!-- google maps scripts -->
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/js/min/maps.js"></script>


<h3>Event post information & location</h3>

<div class="row">
	<div class="col-lg-12">

		<h4>Event location (dynamic)</h4>

		<h4>ACF generated event (dynamic)</h4>

		<div class="event-info">
			<div class="event-info__date">
				<?php if ( $dateType == 'single' ) : ?>
					<span class="larger"><?php echo $startDate->format( 'd' ); ?></span>
					<span class="large light"><?php echo $startDate->format( 'M' ); ?></span>
				<?php elseif ( $dateType == 'multiple' ) : ?>
					<span><?php echo $startDate->format( 'd M' ); ?></span>
					<span><?php include( fonzie_svg_path( "long-arrow-right.svg" ) ); ?></span>
					<span><?php echo $endDate->format( 'd M' ); ?></span>
				<?php endif; ?>
			</div>
			<div class="event-info__gutter"></div>
			<div class="event-info__details">
				<?php if ( $hasLocation ): ?>
					<p class="main-info">
						<?php if ( $locationName ) { _e( $locationName, 'charitypress_fonzie' );} ?>,
						<?php if ( $locationPostcode ) { _e( $locationPostcode, 'charitypress_fonzie' );} ?></p>
					<p class="sub-info">
						<span class="date">
							<?php include( fonzie_svg_path( "calendar-o.svg" ) ); ?>
							<?php _e( $startDate->format( 'l d M y' ), 'charitypress_fonzie' ); ?>
						</span>
						<span class="time">
							<?php if ( $startTime ): ?>
								<?php include( fonzie_svg_path( "clock-o.svg" ) );
								echo ' ';
								_e( $startTime, 'charitypress_fonzie' );
							endif; ?>
							<?php if ( $endTime ): ?> - <?php _e( $endTime, 'charitypress_fonzie' ); endif ?>
						</span>
					</p>
				<?php else: ?>
					<p class="main-info">
						<?php if ( $startDate ): ?><?php include( fonzie_svg_path( "calendar-o.svg" ) ); ?> <?php _e( $startDate->format( 'l d M y' ), 'charitypress_fonzie' ); endif; ?>
						<?php if ( $endDate ) : ?> to <?php _e( $endDate->format( 'l d M y' ), 'charitypress_fonzie' ); endif; ?>
						<span class="time">
							<?php if ( $startTime ): ?>
								<?php include( fonzie_svg_path( "clock-o.svg" ) );
								echo ' ';
								_e( $startTime, 'charitypress_fonzie' );
							endif; ?>
							<?php if ( $endTime ): ?> - <?php _e( $endTime, 'charitypress_fonzie' ); endif ?>
						</span>
					</p>
				<?php endif; ?>
			</div>
		</div>

		<h4>Single day event (static)</h4>

		<div class="event-info">
			<div class="event-info__date">
				<span class="larger">25</span>
				<span class="large light">Oct</span>
			</div>
			<div class="event-info__gutter"></div>
			<div class="event-info__details">
				<p class="main-info">Hopewell Town Hall, CH1 A32</p>
				<p class="sub-info">
					<span class="date"><?php include( fonzie_svg_path( "calendar-o.svg" ) ); ?> Sunday 25 Oct 15</span>
					<span class="time"><?php include( fonzie_svg_path( "clock-o.svg" ) ); ?> 09:00 - 17:00</span>
				</p>
			</div>
		</div>


		<h4>Multiple day event (static)</h4>

		<div class="event-info">
			<div class="event-info__date">
				<span>11 Jan</span>
				<span><?php include( fonzie_svg_path( "long-arrow-right.svg" ) ); ?></span>
				<span>17 Jan</span>
			</div>
			<div class="event-info__gutter"></div>
			<div class="event-info__details">
				<p class="main-info">Hopewell Town Hall, CH1 A32</p>
				<p class="sub-info">
					<span class="date"><?php include( fonzie_svg_path( "calendar-o.svg" ) ); ?> Sunday 25 Oct 15</span>
					<span class="time"><?php include( fonzie_svg_path( "clock-o.svg" ) ); ?> 09:00 - 17:00</span>
				</p>
			</div>
		</div>

		<h4>No location e.g. walk to work week (static)</h4>

		<div class="event-info">
			<div class="event-info__date">
				<span>11 Jan</span>
				<span><?php include( fonzie_svg_path( "long-arrow-right.svg" ) ); ?></span>
				<span>17 Jan</span>
			</div>
			<div class="event-info__gutter"></div>
			<div class="event-info__details">
				<p class="main-info">
					<?php include( fonzie_svg_path( "calendar-o.svg" ) ); ?> Monday 11 Jan 15 to Tuesday 17 Jan 15
					<span class="time"><?php include( fonzie_svg_path( "clock-o.svg" ) ); ?> 09:00 - 17:00</span>
				</p>
			</div>
		</div>

	</div><!-- /.col -->
</div>
