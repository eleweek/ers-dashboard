<?php


$daysTilEnd       = null;

// get raised so far and target amounts and figure out the percentage raised

$raised           = (int)get_field( 'raised_so_far' );
$target           = (int)get_field( 'target' );
$percentageRaised = round( ($raised / $target ) * 100 );

// figure out how many days till the campaign end date
if ( get_field( 'has_end_date' ) ) {
	// get end date and today's date in format dd-mm-yyyy
	$endDate = get_field( 'end_date' );
	$today   = date( "d/m/Y" );
	$endDate = str_replace( '/', '-', $endDate );
	$today   = str_replace( '/', '-', $today );

	// figure out the number of days by figuring out the difference
	$daysTilEnd = strtotime( $endDate ) - strtotime( $today );
	$daysTilEnd = floor( $daysTilEnd / ( 60 * 60 * 24 ) );

}

?>

<h3>Campaign progress</h3>

<div class="row">
	<div class="col-lg-12">

		<div class="campaign-progress">
			<div class="tools">
				<!-- .amount-raised -->
				<div class="amount-raised">
					<div class="raised">
						<strong data-raised="<?php echo $raised ?: 0; ?>" class="raised-value">£<?php echo $raised ?: 0; ?></strong>
						<span>raised so far</span>
					</div>
					<div class="of">
						of
					</div>
					<div class="target">
						<strong>£<?php echo number_format( $target?:0 ) ?></strong>
						<span>target</span>
					</div>
				</div>
				<!-- /.amount-raised -->

				<?php if($daysTilEnd): ?>
				<!-- .days-remaining -->
				<div class="days-remaining double-border-left">
					<strong><?php echo $daysTilEnd ?: '0' ?> Days</strong>
					<span>until this campaign ends</span>
				</div>
				<?php endif ?>
				<a href="#" class="btn btn_icon-left">
					<i class="icon"><?php include( fonzie_svg_path( "heart.svg" ) ); ?></i>
					<span>Make a donation</span>
				</a>
				<!-- /.days-remaining -->
			</div>
			<!-- .progress-container -->
			<div class="progress-container">
				<div class="progress-bar" data-percent="<?php echo $percentageRaised ?: '0'; ?>">
					<span class="progress-bar-value"></span>
				</div>
			</div>
			<!-- /.progress-container -->
		</div>

	</div>
</div>
