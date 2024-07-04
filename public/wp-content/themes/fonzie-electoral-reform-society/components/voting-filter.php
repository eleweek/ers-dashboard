<?php
$sortby = get_query_var( 'sortby' );
?>

<div class="voting-filter" id="voting-filter">

	<div class="voting-filter__title">Order voting systems by those with the best:</div>

	<a href="?sortby=proportionality_rating#voting-filter" class="btn voting-filter__btn proportionality hidden-sm-down<?php if($sortby === 'proportionality_rating'): echo ' voting-filter__btn--active'; endif; ?>" data-sort-by="proportionality">Proportionality</a>

	<a href="?sortby=voter_choice_rating#voting-filter" class="btn voting-filter__btn voter_choice hidden-sm-down<?php if($sortby === 'voter_choice_rating'): echo ' voting-filter__btn--active'; endif; ?>" data-sort-by="voter_choice">Voter choice</a>

	<a href="?sortby=local_representation_rating#voting-filter" class="btn voting-filter__btn local_representation hidden-sm-down<?php if($sortby === 'local_representation_rating'): echo ' voting-filter__btn--active'; endif; ?>" data-sort-by="local_representation">Local representation</a>

	<div class="hidden-md-up">
		<form action="#voting-filter" id="voting-filter-form">
			<select name="sortby" id="voting-filter-select">
				<option value="">Select</option>
				<option value="proportionality_rating" data-sort-by="proportionality"<?php if($sortby === 'proportionality_rating'): echo ' selected'; endif; ?>>Proportionality</option>
				<option value="voter_choice_rating" data-sort-by="voter_choice"<?php if($sortby === 'voter_choice_rating'): echo ' selected'; endif; ?>>Voter choice</option>
				<option value="local_representation_rating" data-sort-by="local_representation"<?php if($sortby === 'local_representation_rating'): echo ' selected'; endif; ?>>Local representation</option>
			</select>

			<button class="btn voting-filter__btn">Filter</button>
		</form>
	</div>

</div>
