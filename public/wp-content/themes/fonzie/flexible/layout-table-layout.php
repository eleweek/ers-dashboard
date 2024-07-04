
<div class="row">
	<div class="col-xs-12">
		<div class="table-container">
			<?php

			$table = get_sub_field( 'table_block' );

			if ( $table ) {

				echo '<table>';

				if ( $table['header'] ) {

					echo '<thead>';

					echo '<tr>';

					foreach ( $table['header'] as $th ) {

						echo '<th>';
						echo $th['c'];
						echo '</th>';
					}

					echo '</tr>';

					echo '</thead>';
				}

				echo '<tbody>';

				foreach ( $table['body'] as $tr ) {

					echo '<tr>';

					foreach ( $tr as $td ) {

						echo '<td>';
						echo $td['c'];
						echo '</td>';
					}

					echo '</tr>';
				}

				echo '</tbody>';

				echo '</table>';
			}

			?>
		</div>
	</div>
</div>
