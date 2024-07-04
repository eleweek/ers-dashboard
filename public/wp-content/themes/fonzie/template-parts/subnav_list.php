<?php
	$children = get_pages( array(
		'parent' => $parent,
		'sort_column' => 'menu_order',
	) );

	$parent_class = '';
	$pclass_string = '';

	if( count( $children ) > 0 ) :

		$depth = get_depth();
		if($depth === 0):
			$parent_class = 'sidebar__dropdown';
		elseif( $page->ID == $post->ID):
			$parent_class = 'sidebar__dropdown active current_page';
		elseif( get_depth() !== 1 ):
			$parent_class = 'sidebar__dropdown active';
		else:
			$parent_class = 'sidebar__dropdown';
		endif;

	else:

		if( $page->ID == $post->ID):
			$parent_class = 'active current_page';
		endif;

	endif;

	if( $parent_class != '' ):
		$pclass_string = ' class="'.$parent_class.'"';
	endif;
?>

<li<?php echo $pclass_string; ?>>

	<a href="<?php echo get_permalink( $post_parent ); ?>"><?php echo get_the_title( $post_parent ); ?>
		<?php if( $parent_class === 'sidebar__dropdown active current_page' || $parent_class === 'active current_page' ): ?>
			<i class="icon caret"><?php include( fonzie_svg_path( "caret-right.svg" ) ); ?></i>
		<?php endif; ?>
		<?php if( $parent_class === 'sidebar__dropdown'): ?>
			<i class="icon caret sidebar__dropper"<?php if ($parent_class === 'sidebar__dropdown') echo ' title="Show more pages"' ?>><?php include( fonzie_svg_path( "caret-down.svg" ) ); ?></i>
		<?php endif; ?>
	</a>

	<?php if( count( $children ) > 0  ): ?>
		<ul>
			<?php
				foreach( $children as $child ):
					$cclass_string = '';

					if( $post->ID == $child->ID ):
						$cclass_string = ' class="current_page"';
					endif;
				?>
				<li<?php echo $cclass_string; ?>><a href="<?php echo get_permalink( $child->ID ); ?>"><?php echo get_the_title( $child->ID ); ?>
						<?php if( $cclass_string === ' class="current_page"' ): ?>
							<i class="icon caret"><?php include( fonzie_svg_path( "caret-right.svg" ) ); ?></i>
						<?php endif; ?></a>
				</li>
			<?php endforeach; ?>
		</ul>
	<?php endif; ?>
</li>
