<?php
get_header();
?>

	<div id="primary" class="content-area">
		<div class="container-fluid">
			<main id="main" class="site-main" role="main">

				<h2>Global elements</h2>
	
				<h3>Normal buttons</h3>

				<div class="row margin-left-0 margin-right-0">
					
					<a href="#" class="btn">
						<span>Default button</span>
					</a>

					<a href="#" class="btn btn_icon-left">
						<i class="icon"><?php include( fonzie_svg_path( "heart.svg" ) ); ?></i>
						<span>Default icon left</span>
					</a>

					<a href="#" class="btn btn_icon-right">
						<span>Default icon right</span> 
						<i class="icon"><?php include( fonzie_svg_path( "map-marker.svg" ) ); ?></i>
					</a>

					<a href="#" class="btn btn_fixed-width">
						<span>Default fixed width</span>
					</a>

				</div>

				<div class="row margin-top-30 margin-left-0 margin-right-0">
					
					<a href="#" class="btn btn_outlined">
						<span>Outline button</span>
					</a>

					<a href="#" class="btn btn_outlined btn_icon-left">
						<i class="icon"><?php include( fonzie_svg_path( "heart.svg" ) ); ?></i>
						<span>Outline icon left</span>
					</a>

					<a href="#" class="btn btn_outlined btn_icon-right">
						<span>Outline icon right</span> 
						<i class="icon"><?php include( fonzie_svg_path( "map-marker.svg" ) ); ?></i>
					</a>

					<a href="#" class="btn btn_outlined btn_fixed-width">
						<span>Outline fixed width</span>
					</a>

					<a href="#" class="btn btn_outlined btn_download btn_icon-right">
						<span>Download link <span>(3.4mb pdf)</span></span>
						<i class="icon"><?php include( fonzie_svg_path( "cloud-download.svg" ) ); ?></i>
					</a>

				</div>

				<h3 class="margin-top-30">Social share buttons</h3>
	
				<nav class="btn-list btn-list_social-share">
					<ul>
						<li>
							<a href="#" class="btn btn_icon-left btn_icon-facebook" title="Share on Facebook">
								<i class="icon"><?php include( fonzie_svg_path( "facebook-square.svg" ) ); ?></i> 
								Share
							</a>
						</li>
						<li>
							<a href="#" class="btn btn_icon-left btn_icon-twitter" title="Tweet on Twitter">
								<i class="icon"><?php include( fonzie_svg_path( "twitter.svg" ) ); ?></i> 
								Tweet
							</a>
						</li>
						<li>
							<a href="#" class="btn btn_icon-left btn_icon-linkedin" title="Share on LinkedIn">
								<i class="icon"><?php include( fonzie_svg_path( "linkedin.svg" ) ); ?></i> 
								Share
							</a>
						</li>
						<li>
							<a href="#" class="btn btn_icon-left" title="Share via Email">
								<i class="icon"><?php include( fonzie_svg_path( "envelope.svg" ) ); ?></i> 
								Email
							</a>
						</li>
					</ul>
				</nav>

				<h3>Social share campaign</h3>

				<nav class="btn-list btn-list_social-share-campaign">
					<ul>
						<li>
							<a href="#" class="btn btn_icon-left btn_bg-facebook" title="Share on Facebook">
								<i class="icon"><?php include( fonzie_svg_path( "facebook-square.svg" ) ); ?></i> 
								Share
							</a>
						</li>
						<li>
							<a href="#" class="btn btn_icon-left btn_bg-twitter" title="Tweet on Twitter">
								<i class="icon"><?php include( fonzie_svg_path( "twitter.svg" ) ); ?></i> 
								Tweet
							</a>
						</li>
					</ul>
				</nav>

				<h3>Listing grid filter</h3>

				<nav class="btn-list">
					<ul>
						<li>
							<a href="#" class="btn btn_white">
								<span>All</span>
							</a>
						</li>
						<li>
							<a href="#" class="btn btn_white btn_active">
								<span>Ways to give</span>
							</a>
						</li>
						<li>
							<a href="#" class="btn btn_white">
								<span>Campaigns</span>
							</a>
						</li>
						<li>
							<a href="#" class="btn btn_white">
								<span>Vounteer</span>
							</a>
						</li>
					</ul>
				</nav>

				<h3>Pagination</h3>

				<nav class="btn-list">
					<ul>
						<li>
							<a href="#" class="btn btn_borderless btn_icon-left">
								<i class="icon caret"><?php include( fonzie_svg_path( "caret-left.svg" ) ); ?></i>
								<span>Previous</span>
							</a>
						</li>
						<li>
							<a href="#" class="btn btn_white btn_active">
								<span>1</span>
							</a>
						</li>

						<li>
							<a href="#" class="btn btn_white">
								<span>2</span>
							</a>
						</li>
						<li>
							<a href="#" class="btn btn_white">
								<span>3</span>
							</a>
						</li>
						<li>
							<a href="#" class="btn btn_borderless btn_icon-right">
								<span>Next</span>
								<i class="icon caret"><?php include( fonzie_svg_path( "caret-right.svg" ) ); ?></i>
							</a>
						</li>
					</ul>
				</nav>

				<h3>Tags</h3>

				<nav class="btn-list">
					<ul>
						<li>
							<a href="#" class="btn btn_borderless btn_icon-left">
								<i class="icon"><?php include( fonzie_svg_path( "tag.svg" ) ); ?></i>
								<span>community</span>
							</a>
						</li>
						<li>
							<a href="#" class="btn btn_borderless btn_icon-left">
								<i class="icon"><?php include( fonzie_svg_path( "tag.svg" ) ); ?></i>
								<span>meetup</span>
							</a>
						</li>
					</ul>
				</nav>

				<div class="content">
					<h1>Typography</h1>
					<h2>Headings</h2>

					<h1>Heading 1</h1>
					<h2>Heading 2</h2>
					<h3>Heading 3</h3>
					<h4>Heading 4</h4>
					<h5>Heading 5</h5>

					<p>Lorem ipsum dolor sit amet, consectetur <a href="#">adipisicing elit</a>. Ad aut beatae commodi culpa ea eaque error labore magni maiores maxime modi nemo non numquam quas, quibusdam? Dolor est nesciunt vitae?</p>

					<h2>List styles</h2>
					<ul>
						<li class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, reprehenderit.</li>
						<li class="item">Cupiditate deserunt dolor dolorem fugit hic, nam quam veniam voluptatum.</li>
						<li class="item">Accusamus facilis laudantium libero perferendis recusandae reprehenderit veritatis vitae voluptatum.</li>
						<li class="item">Dicta dolorum expedita inventore molestias nostrum rerum tenetur! Aliquid, velit!</li>
					</ul>

					<ol>
						<li class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, voluptate.</li>
						<li class="item">A consectetur dolores enim facere ratione! Assumenda illo mollitia perferendis.</li>
						<li class="item">Aspernatur autem commodi expedita hic minima perferendis possimus voluptatibus voluptatum.</li>
						<li class="item">Aperiam distinctio error exercitationem minus molestiae neque nulla? Molestiae, officia.</li>
					</ol>

					<h3>Paragraphs</h3>
					<p>Quisque rutrum. <strong>Cum sociis natoque</strong> penatibus et <em>magnis dis parturient</em> montes, nascetur ridiculus mus. <del>In consectetuer turpis ut velit</del>. Sed aliquam ultrices mauris. Pellentesque libero tortor, <a href="http://fonzie.local.reason.digital/">tincidunt et</a>, tincidunt eget, semper nec, quam.</p>
					<p><ins datetime="2016-01-19T10:44:21+00:00">Proin viverra,</ins> ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Pellentesque ut neque. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Praesent nec nisl a purus blandit viverra.</p>
					<p>Fusce neque. Vestibulum ullamcorper mauris at ligula. Praesent ac massa at ligula laoreet iaculis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Ut tincidunt tincidunt erat.</p>

					<h3>Blockquote</h3>
					<blockquote>Vestibulum suscipit nulla quis orci. Nam commodo suscipit quam. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed cursus turpis vitae tortor.</blockquote>

					<h3>Code</h3>
					<p><code>Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Fusce pharetra convallis urna. </code></p>

					<h3>Text Alignment</h3>
					<p style="text-align: center;">Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Fusce pharetra convallis urna. Praesent adipiscing. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam.</p>
					<p style="text-align: right;">Aenean vulputate eleifend tellus.. Nullam cursus lacinia erat. Etiam feugiat lorem non metus. Curabitur vestibulum aliquam leo.</p>
					<p style="text-align: left;">Aenean vulputate eleifend tellus. Cras risus ipsum, faucibus ut, ullamcorper id, varius ac, leo. Cras varius. Praesent adipiscing. Cras id dui.<p>
					<p>Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam quis ante. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Maecenas egestas arcu quis ligula mattis placerat. Fusce fermentum.</p>


					<h1>The quick brown fox 48px</h1>
					<p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Etiam porta sem malesuada magna mollis euismod. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
					<h2>The quick brown fox 28px</h2>
					<p>Nulla vitae elit libero, a pharetra augue. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Etiam porta sem malesuada magna mollis euismod.</p>
					<p>Etiam porta sem malesuada magna mollis euismod. Curabitur blandit tempus porttitor. Curabitur blandit tempus porttitor. Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>

				</div>
				<br><br><br><br><br><br><br><!-- just added these breaks so i can see what i'm doing -->

			</main>
		</div>
	</div>

<?php get_footer();