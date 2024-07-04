<?php
// get all the variables we'll need
$startDate        = DateTime::createFromFormat( 'Ymd', get_field( 'start_date' ) );
$endDate          = DateTime::createFromFormat( 'Ymd', get_field( 'end_date' ) );
$startTime        = get_field( 'start_time' );
$endTime          = get_field( 'end_time' );
$locationName     = get_field( 'location_name' );
$locationPostcode = get_field( 'location_postcode' );
$location         = get_field( 'map' );

// is it a single or multi date event? ($dateType)
$dateType = ( $startDate && $endDate ) ? 'multiple' : 'single';

// does it have a location? ($hasLocation)
$hasLocation = ( $locationName && $locationPostcode );

?>

<div class="row">
	<div class="col-lg-12">
		<div class="event-info">
			<div class="event-info__date">
				<?php if ( $dateType == 'single' ): ?>
					<span class="larger"><?php echo $startDate->format( 'd' ); ?></span>
					<span class="large light"><?php echo $startDate->format( 'M' ); ?></span>
				<?php elseif ( $dateType == 'multiple' ): ?>
					<span><?php echo $startDate->format( 'd M' ); ?></span>
					<span><?php include( fonzie_svg_path( "long-arrow-right.svg" ) ); ?></span>
					<span><?php echo $endDate->format( 'd M' ); ?></span>
				<?php endif ?>
			</div>
			<div class="event-info__gutter"></div>
			<div class="event-info__details">
				<?php if ( $hasLocation ): ?>
					<p class="main-info">
						<?php
						if ( $locationName ) :
							_e( $locationName, 'charitypress_fonzie' );
						endif;
						if( $locationName && $locationPostcode) echo ', ';
						if ( $locationPostcode ) :
							_e( $locationPostcode, 'charitypress_fonzie' );
						endif;
						?>
					</p>
					<p class="sub-info">
						<span class="date"><?php include( fonzie_svg_path( "calendar-o.svg" ) ); ?>
							<?php
							 _e( $startDate->format( 'l d M y' ), 'charitypress_fonzie' );

							 if( $endDate ) :
 								_e( $endDate->format( ' - l d M y' ), 'charitypress_fonzie' );
 							endif;
							?>

						</span>
						<?php
						if ( $startTime ): ?>
							<span class="time">
								<?php include( fonzie_svg_path( "clock-o.svg" ) ); _e( ' '.$startTime, 'charitypress_fonzie' );

								if ( $endTime ):
									_e( ' - '.$endTime, 'charitypress_fonzie' );
								endif;
								?>
							</span>
						<?php
						endif
						?>
					</p>
				<?php else: ?>
					<p class="sub-info">
						<?php
						if ( $startDate ):
							include( fonzie_svg_path( "calendar-o.svg" ) );
							_e( $startDate->format( 'l d M y' ), 'charitypress_fonzie' );

							if ( $endDate ):
								_e( ' - '.$endDate->format( 'l d M y' ), 'charitypress_fonzie' );
							endif;
						endif;

						if ( $startTime ): ?>
							<span class="time">
								<?php include( fonzie_svg_path( "clock-o.svg" ) ); _e( ' '.$startTime, 'charitypress_fonzie' );

								if ( $endTime ):
									_e( ' - '.$endTime, 'charitypress_fonzie' );
								endif;
								?>
							</span>
						<?php endif ?>
					</p>
				<?php endif; ?>
			</div>
		</div>

	</div><!-- /.col -->
</div>
