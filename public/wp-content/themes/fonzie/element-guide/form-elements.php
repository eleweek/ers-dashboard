<?php
get_header();
?>

	<div id="primary" class="content-area">
		<div class="container-fluid">
			<main id="main" class="site-main" role="main">

				<br><br><br><!-- just added these breaks so i can see what i'm doing -->

				<h2>Form Elements</h2>

				<h3>Main Forms</h3>

				<div class="row">
					<div class="col-xs-12">
						<div class="form-group col-sm-2">
							<div class="row">
								<label for="title">Title *</label>
								<select name="card[title]" id="title">
									<option value="">--</option>
									<option value="Mr">Mr</option>
									<option value="Mrs">Mrs</option>
									<option value="Miss">Miss</option>
									<option value="Master">Master</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="form-group col-sm-6">
						<label for="firstName">First name *</label>
						<input type="text" name="card[firstName]" id="firstName" placeholder="First Name">
					</div>
					<div class="form-group col-sm-6">
						<label for="lastName">Last name *</label>
						<input type="text" name="card[lastName]" id="lastName" placeholder="Surname">
					</div>
				</div>

				<div class="row">
					<div class="form-group col-sm-12">
						<label for="email">Email address *</label>
						<input type="text" name="card[email]" id="email">
					</div>
				</div>

				<div class="row">
					<div class="form-group col-sm-12">
						<label for="card-billingAddressOne">Address Line 1 *</label>
						<input type="text" name="card[billingAddress1]" id="billingAddress1" placeholder="Address Line 1">
					</div>
				</div>

				<div class="row">
					<div class="form-group col-sm-12">
						<label for="card-billingAddressTwo">Address Line 2</label>
						<input type="text" name="card[billingAddress2]" id="billingAddress2">
					</div>
				</div>

				<div class="row">
					<div class="form-group col-sm-6">
						<label for="card-billingCity">Town *</label>
						<input type="text" name="card[billingCity]" id="billingCity">
					</div>
					<div class="form-group col-sm-6">
						<label for="card-billingState">County *</label>
						<input type="text" name="card[billingState]" id="billingState">
					</div>
				</div>

				<div class="row">
					<div class="form-group col-sm-6">
						<label for="card-billingPostcode">Post Code *</label>
						<input type="text" name="card[billingPostcode]" id="billingPostcode">
					</div>
				</div>

				<div class="row">
					<div class="form-group col-sm-6">
						<label for="freetext">Free text</label>
						<textarea cols="20" rows="20" name="freetext"></textarea>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-12">
						<div class="h3">iCheck</div>
						<label>Checkboxes</label>
					</div>
					<div class="form-group col-sm-6">
						<label for="checkbox_item_1">
							<input type="checkbox" id="checkbox_item_1" checked="checked">
							<span>Sign up to our email list to keep up-to-date with everything that’s going on at Hopewell.</span>
						</label>
					</div>
					<div class="form-group col-sm-6">
						<label for="checkbox_item_2">
							<input type="checkbox" id="checkbox_item_2">
							<span>Sign up to our email list to keep up-to-date with everything that’s going on at Hopewell.</span>
						</label>
					</div>
					<div class="form-group col-sm-6">
						<label for="checkbox_item_3">
							<input type="checkbox" id="checkbox_item_3" checked="checked" disabled>
							<span>Disabled checkbox</span>
						</label>
					</div>
				</div>

				<div class="row">
					<div class="form-group col-sm-6">
						<label>Inline Radio Buttons</label>
						<input type="radio" name="radio-group-inline" id="radio_item_1" value="one" checked="checked">
						<input type="radio" name="radio-group-inline" id="radio_item_2" value="two">
						<input type="radio" name="radio-group-inline" id="radio_item_3" value="three">
						<input type="radio" name="radio-group-inline" id="radio_item_4" value="none" disabled>
					</div>
				</div>

				<div class="row">
					<div class="form-group col-sm-6">
						<label>Stacked option Radio Buttons</label>
						<label for="radio_item_1">
							<input type="radio" name="radio-group" id="radio_item_1" value="regular" checked="checked">
							<span>Quisque malesuada placerat nisl. Sed libero. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui.</span>
						</label>

						<label for="radio_item_2">
							<input type="radio" name="radio-group" id="radio_item_2" value="single">
							<span>Quisque malesuada placerat nisl. Sed libero. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui.Quisque malesuada placerat nisl. Sed libero. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui.</span>
						</label>

						<input type="radio" name="radio-group" id="radio_item_3" value="three">

						<label for="radio_item_4">
							<input type="radio" name="radio-group" id="radio_item_4" value="none" disabled>
							<span>Disabled Radio</span>
						</label>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-12">
						<h3>Donations</h3>
					</div>
					<div class="col-xs-12">
						<div class="donation-types">
							<label for="donation-types__reg">
								<input type="radio" name="donation-type" id="donation-types__reg" value="regular" checked="checked">
								<span><?php echo get_field('option_label_reg', 'option'); ?></span>
							</label>

							<label for="donation-types__single">
								<input type="radio" name="donation-type" id="donation-types__single" value="single">
								<span><?php echo get_field('option_label_single', 'option'); ?></span>
							</label>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-12">
						<div class="donation-amount__input">
							<span>£</span>
							<input type="number" min="0" step="0.50" name="amount" onchange="(function(el){el.value=parseFloat(el.value).toFixed(2);})(this)" value="<?php echo $_amount; ?>"/>
						</div>
					</div>
				</div>


				<div class="row">
					<div class="col-xs-12">
						<h3>Additional Input Types</h3>
					</div>
				</div>

				<div class="row">
					<div class="col-sm-6">
						<label for="card-billingCountry">Country *</label>
					</div>
					<div class="form-group col-sm-6">
						<select name="card[billingCountry]" id="billingCountry">
							<option value="">Choose a Country</option>
							<option value="GB" selected="">United Kingdom</option>
							<option value="AL">Albania</option>
							<option value="DZ">Algeria</option>
							<option value="AD">Andorra</option>
							<option value="AO">Angola</option>
							<option value="AI">Anguilla</option>
							<option value="AG">Antigua and Barbuda</option>
							<option value="AR">Argentina</option>
							<option value="AM">Armenia</option>
							<option value="AW">Aruba</option>
							<option value="AU">Australia</option>
							<option value="AT">Austria</option>
							<option value="AZ">Azerbaijan Republic</option>
							<option value="BS">Bahamas</option>
							<option value="BH">Bahrain</option>
						</select>
					</div>
				</div>

				<div class="row">
					<div class="col-sm-6">
						<label>Email</label>
					</div>
					<div class="form-group col-sm-6">
						<input type="email">
					</div>
				</div>

				<div class="row">
					<div class="col-sm-6">
						<label>File</label>
					</div>
					<div class="form-group col-sm-6">
						<input type="file">
					</div>
				</div>

				<div class="row">
					<div class="col-sm-6">
						<label>Password</label>
					</div>
					<div class="form-group col-sm-6">
						<input type="password">
					</div>
				</div>

				<div class="row">
					<div class="col-sm-6">
						<label>Telephone</label>
					</div>
					<div class="form-group col-sm-6">
						<input type="tel">
					</div>
				</div>

				<div class="row">
					<div class="col-sm-6">
						<label>Date</label>
					</div>
					<div class="form-group col-sm-6">
						<input type="date">
					</div>
				</div>

				<div class="row">
					<div class="col-sm-6">
						<label>Datetime</label>
					</div>
					<div class="form-group col-sm-6">
						<input type="datetime">
					</div>
				</div>

				<div class="row">
					<div class="col-sm-6">
						<label>Datetime local</label>
					</div>
					<div class="form-group col-sm-6">
						<input type="datetime-local">
					</div>
				</div>

				<div class="row">
					<p class="form-group col-sm-12">
						<button type="submit" class="btn btn-primary">Next: Payment details</button>
					</p>
				</div>

				<br><br><br><br><br><br><br><!-- just added these breaks so i can see what i'm doing -->

			</main>
		</div>
	</div>

<?php get_footer();