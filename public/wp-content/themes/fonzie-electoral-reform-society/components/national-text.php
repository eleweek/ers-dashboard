<?php
$text_strip = get_field('text_strip');
?>

<?php if(!empty($text_strip)): ?>

	<div class="campaign-hero campaign-hero--national">

		<div class="campaign-hero__content">

			<div class="campaign-hero__text">
				<?php echo $text_strip; ?>
			</div>

		</div>

	</div>

<?php endif; ?>
