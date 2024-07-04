<?php 
$quote = get_sub_field('quote');
$cite = get_sub_field('citation');
$avatar = get_sub_field('avatar');
?>

<div class="row flexible-block">
	<div class="col-xs-12">

		<blockquote class="blockquote<?php echo ( $avatar )? ' blockquote--has-avatar' : ''; ?>">
			<?php if ($quote) echo $quote; ?>
			
			<?php if ($avatar): ?>
			<img class="blockquote__avatar" src="<?php echo $avatar ?>" alt="">
			<?php endif; ?>

			<?php if ($cite): ?>
			<cite><?php echo $cite; ?></cite>
			<?php endif; ?>
			<?php include( fonzie_svg_path( "quote-lora-left.svg" ) ); ?>
		</blockquote>

	</div>
</div>

