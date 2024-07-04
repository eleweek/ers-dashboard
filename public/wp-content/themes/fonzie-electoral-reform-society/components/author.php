<div class="author">

	<div class="author__image">
		<?php echo get_avatar( get_the_author_meta( 'ID' ) , 64 ); ?>
	</div>

	<div class="author__content">
		<div><strong>Author:</strong></div>
		<div><?php echo get_the_author(); ?>, <?php $authorDesc = the_author_meta('description'); echo $authorDesc; ?></div>
	</div>
</div>
