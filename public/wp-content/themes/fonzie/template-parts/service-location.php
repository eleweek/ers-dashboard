<?php
// get all the variables we'll need
$startDate = DateTime::createFromFormat('Ymd', get_field('start_date'));
$endDate = DateTime::createFromFormat('Ymd', get_field('end_date'));
$startTime = get_field('start_time');
$endTime = get_field('end_time');
$locationName = get_field('location_name');
$locationPostcode = get_field('location_postcode');
$location = get_field('map');

// is it a single or multi date event? ($dateType)
if ($startDate && !$endDate) {
	$dateType = 'single';
}
elseif ($startDate && $endDate) {
	$dateType = 'multiple';
}

// does it have a location? ($hasLocation)
if ($locationName && $locationPostcode) {
	$hasLocation = true;
}
else {
	$hasLocation = false;
}
?>

<?php
if( !empty($location) ):
	?>
	<h3><?php _e('Location', 'charitypress_fonzie'); ?></h3>

	<div class="event-location">
		<div class="event-location__map">
			<div class="acf-map">
				<div class="marker" data-lat="<?php echo $location['lat']; ?>" data-lng="<?php echo $location['lng']; ?>"></div>
			</div>
		</div>
		<div class="event-location__content">
			<?php if ($locationName) { ?>
				<h2><?php _e($locationName, 'charitypress_fonzie'); ?></h2>
			<?php } ?>
			<p><?php _e($location['address'], $postId); ?></p>
			<a href="https://maps.google.com?daddr=<?php _e(urlencode($location['address']), $postId); ?>" class="btn btn_icon-right">
				<span>Get directions</span>
				<i class="icon"><?php include( fonzie_svg_path( "map-marker.svg" ) ); ?></i>
			</a>
		</div>
	</div>
<?php endif;  ?>

