<input type="hidden" name="success_url" value="<?php echo esc_url( add_query_arg('process', 'complete')); ?>"/>
<input type="hidden" name="cancel_url" value="<?php echo esc_url( add_query_arg('process', 'failed')); ?>"/>

<div class="donation-process__step-one">
	<div class="form-section">
		<div class="form-group">
			<label class="h2" for="donation-process__elem-amount-input">Donation amount</label>

			<div class="form-item donation-process__amount">
				<input id="donation-process__elem-amount-input" class="donation-process__amount-input" type="number" min="0" step="any" name="amount" value="<?php echo $_GET['amount'] ?>" required>
				<p>&pound;</p>
				<button class="donation-process__amount-edit" type="button">Edit</button>
			</div>
		</div>
	</div><!-- /.form-section -->


	<div class="form-section">
		<h2>Your details</h2>

		<div class="row">
			<div class="col-md-6">
				<div class="form-group">
					<label for="donation-process__elem-fname">First name <span>*</span></label>

					<div class="form-item">
						<input id="donation-process__elem-fname" type="text" name="card[firstName]" required>
					</div>
				</div>
			</div>

			<div class="col-md-6">
				<div class="form-group">
					<label for="donation-process__elem-lname">Last name <span>*</span></label>

					<div class="form-item">
						<input id="donation-process__elem-lname" type="text" name="card[lastName]" required>
					</div>
				</div>
			</div>
		</div>

		<div class="form-group">
			<label for="donation-process__elem-email">Email address <span>*</span></label>

			<p class="form-sub-text">We will only use your email address to send you information about your donation.</p>

			<div class="row">
				<div class="col-lg-6">
					<div class="form-item">
						<input id="donation-process__elem-email" type="email" name="card[email]" required>
					</div>
				</div>
			</div>

		</div>
	</div><!-- /.form-section -->


	<div class="form-section">
		<h2>About your donation</h2>

		<div class="donation-process__giftaid">
			<div class="row">
				<div class="col-md-3">
					<div class="donation-process__giftaid-logo">
						<?php include( fonzie_svg_path('giftaid-logo.svg') ); ?>
					</div>
				</div>

				<div class="col-md-9">
					<p>If you are a UK taxpayer, tick the Gift Aid box and increase the value of your donation by 25p for every &pound;1 you give, at no extra cost to you.</p>

					<div class="form-group form-group--giftaid">
						<input id="donation-process__elem-giftaid-checkbox" type="checkbox" name="gift_aid">
						<label for="donation-process__elem-giftaid-checkbox"><strong>Tick here to add Gift Aid</strong> and confirm the following statement</label>
					</div>

					<p>"I want to Gift Aid my donation and any donations I make in the future or have made in the past four years. <br><br> I am a UK taxpayer and understand that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my donations in that tax year it is my responsibility to pay any difference."</p>
				</div>
			</div>
		</div>
	</div><!-- /.form-section -->

	<button class="btn donation-process__btn-next" type="button">Go to step 2 - payment details</button>
</div><!-- /.donation-process__step-one -->

<div class="donation-process__step-two">
	<div class="form-section">
		<h2>Card details</h2>

		<div class="form-group">
			<label for="donation-process__elem-card-number">Card number <span>*</span></label>

			<div class="form-item">
				<input id="donation-process__elem-card-number" type="text" name="card[number]" required>
			</div>
		</div>

		<div class="row">
			<div class="col-md-4">
				<div class="form-group">
					<label for="donation-process__elem-expiry-month">Expiry month <span>*</span></label>

					<div class="form-item">
						<input id="donation-process__elem-expiry-month" type="number" name="card[expiryMonth]" min="1" max="12" placeholder="MM" required>
					</div>
				</div>
			</div>

			<div class="col-md-4">
				<div class="form-group">
					<label for="donation-process__elem-expiry-year">Expiry year <span>*</span></label>

					<div class="form-item">
						<input id="donation-process__elem-expiry-year" type="number" name="card[expiryYear]" min="<?php echo date('Y'); ?>" placeholder="YYYY" required>
					</div>
				</div>
			</div>

			<div class="col-md-4">
				<div class="form-group">
					<label for="donation-process__elem-security-code">Security code <span>*</span></label>

					<div class="form-item">
						<input id="donation-process__elem-security-code" type="number" name="card[cvv]" required>
					</div>

					<p class="form-sub-text">The last 3 or 4 digits printed on the back of your card</p>
				</div>
			</div>
		</div>
	</div><!-- /.form-section -->


	<div class="form-section">
		<h2>Your billing address</h2>

		<div class="form-group">
			<label for="donation-process__elem-address-one">Address line 1 <span>*</span></label>

			<div class="form-item">
				<input id="donation-process__elem-address-one" type="text" name="card[billingAddress1]" required>
			</div>
		</div>

		<div class="form-group">
			<label for="donation-process__elem-address-two">Address line 2</label>

			<div class="form-item">
				<input id="donation-process__elem-address-two" type="text" name="card[billingAddress2]">
			</div>
		</div>

		<div class="form-group">
			<label for="donation-process__elem-town-city">Town/City <span>*</span></label>

			<div class="form-item">
				<input id="donation-process__elem-town-city" type="text" name="card[billingCity]" required>
			</div>
		</div>

		<div class="row">
			<div class="col-md-6">
				<div class="form-group">
					<label for="donation-process__elem-country">Country <span>*</span></label>

					<div class="form-item">
						<select id="donation-process__elem-country" name="card[billingCountry]" required>
							<option value="GB">United Kingdom</option>
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
							<option value="BB">Barbados</option>
							<option value="BY">Belarus</option>
							<option value="BE">Belgium</option>
							<option value="BZ">Belize</option>
							<option value="BJ">Benin</option>
							<option value="BM">Bermuda</option>
							<option value="BT">Bhutan</option>
							<option value="BO">Bolivia</option>
							<option value="BA">Bosnia and Herzegovina</option>
							<option value="BW">Botswana</option>
							<option value="BR">Brazil</option>
							<option value="BN">Brunei</option>
							<option value="BG">Bulgaria</option>
							<option value="BF">Burkina Faso</option>
							<option value="BI">Burundi</option>
							<option value="KH">Cambodia</option>
							<option value="CM">Cameroon</option>
							<option value="CA">Canada</option>
							<option value="CV">Cape Verde</option>
							<option value="KY">Cayman Islands</option>
							<option value="TD">Chad</option>
							<option value="CL">Chile</option>
							<option value="C2">China</option>
							<option value="CO">Colombia</option>
							<option value="KM">Comoros</option>
							<option value="CK">Cook Islands</option>
							<option value="CR">Costa Rica</option>
							<option value="CI">Cote D'Ivoire</option>
							<option value="HR">Croatia</option>
							<option value="CY">Cyprus</option>
							<option value="CZ">Czech Republic</option>
							<option value="CD">Democratic Republic of the Congo</option>
							<option value="DK">Denmark</option>
							<option value="DJ">Djibouti</option>
							<option value="DM">Dominica</option>
							<option value="DO">Dominican Republic</option>
							<option value="EC">Ecuador</option>
							<option value="EG">Egypt</option>
							<option value="SV">El Salvador</option>
							<option value="ER">Eritrea</option>
							<option value="EE">Estonia</option>
							<option value="ET">Ethiopia</option>
							<option value="FK">Falkland Islands</option>
							<option value="FO">Faroe Islands</option>
							<option value="FJ">Fiji</option>
							<option value="FI">Finland</option>
							<option value="FR">France</option>
							<option value="GF">French Guiana</option>
							<option value="PF">French Polynesia</option>
							<option value="GA">Gabon Republic</option>
							<option value="GM">Gambia</option>
							<option value="GE">Georgia</option>
							<option value="DE">Germany</option>
							<option value="GI">Gibraltar</option>
							<option value="GR">Greece</option>
							<option value="GL">Greenland</option>
							<option value="GD">Grenada</option>
							<option value="GP">Guadeloupe</option>
							<option value="GT">Guatemala</option>
							<option value="GN">Guinea</option>
							<option value="GW">Guinea Bissau</option>
							<option value="GY">Guyana</option>
							<option value="HN">Honduras</option>
							<option value="HK">Hong Kong</option>
							<option value="HU">Hungary</option>
							<option value="IS">Iceland</option>
							<option value="IN">India</option>
							<option value="ID">Indonesia</option>
							<option value="IE">Ireland</option>
							<option value="IL">Israel</option>
							<option value="IT">Italy</option>
							<option value="JM">Jamaica</option>
							<option value="JP">Japan</option>
							<option value="JO">Jordan</option>
							<option value="KZ">Kazakhstan</option>
							<option value="KE">Kenya</option>
							<option value="KI">Kiribati</option>
							<option value="KW">Kuwait</option>
							<option value="KG">Kyrgyzstan</option>
							<option value="LA">Laos</option>
							<option value="LV">Latvia</option>
							<option value="LS">Lesotho</option>
							<option value="LI">Liechtenstein</option>
							<option value="LT">Lithuania</option>
							<option value="LU">Luxembourg</option>
							<option value="MK">Macedonia</option>
							<option value="MG">Madagascar</option>
							<option value="MW">Malawi</option>
							<option value="MY">Malaysia</option>
							<option value="MV">Maldives</option>
							<option value="ML">Mali</option>
							<option value="MT">Malta</option>
							<option value="MH">Marshall Islands</option>
							<option value="MQ">Martinique</option>
							<option value="MR">Mauritania</option>
							<option value="MU">Mauritius</option>
							<option value="YT">Mayotte</option>
							<option value="MX">Mexico</option>
							<option value="FM">Micronesia</option>
							<option value="MD">Moldova</option>
							<option value="MC">Monaco</option>
							<option value="MN">Mongolia</option>
							<option value="ME">Montenegro</option>
							<option value="MS">Montserrat</option>
							<option value="MA">Morocco</option>
							<option value="MZ">Mozambique</option>
							<option value="NA">Namibia</option>
							<option value="NR">Nauru</option>
							<option value="NP">Nepal</option>
							<option value="NL">Netherlands</option>
							<option value="AN">Netherlands Antilles</option>
							<option value="NC">New Caledonia</option>
							<option value="NZ">New Zealand</option>
							<option value="NI">Nicaragua</option>
							<option value="NE">Niger</option>
							<option value="NG">Nigeria</option>
							<option value="NU">Niue</option>
							<option value="NF">Norfolk Island</option>
							<option value="NO">Norway</option>
							<option value="OM">Oman</option>
							<option value="PW">Palau</option>
							<option value="PA">Panama</option>
							<option value="PG">Papua New Guinea</option>
							<option value="PY">Paraguay</option>
							<option value="PE">Peru</option>
							<option value="PH">Philippines</option>
							<option value="PN">Pitcairn Islands</option>
							<option value="PL">Poland</option>
							<option value="PT">Portugal</option>
							<option value="QA">Qatar</option>
							<option value="CG">Republic of the Congo</option>
							<option value="RE">Reunion</option>
							<option value="RO">Romania</option>
							<option value="RU">Russia</option>
							<option value="RW">Rwanda</option>
							<option value="KN">Saint Kitts and Nevis Anguilla</option>
							<option value="PM">Saint Pierre and Miquelon</option>
							<option value="VC">Saint Vincent and Grenadines</option>
							<option value="WS">Samoa</option>
							<option value="SM">San Marino</option>
							<option value="ST">São Tomé and Príncipe</option>
							<option value="SA">Saudi Arabia</option>
							<option value="SN">Senegal</option>
							<option value="RS">Serbia</option>
							<option value="SC">Seychelles</option>
							<option value="SL">Sierra Leone</option>
							<option value="SG">Singapore</option>
							<option value="SK">Slovakia</option>
							<option value="SI">Slovenia</option>
							<option value="SB">Solomon Islands</option>
							<option value="SO">Somalia</option>
							<option value="ZA">South Africa</option>
							<option value="KR">South Korea</option>
							<option value="ES">Spain</option>
							<option value="LK">Sri Lanka</option>
							<option value="SH">St. Helena</option>
							<option value="LC">St. Lucia</option>
							<option value="SR">Suriname</option>
							<option value="SJ">Svalbard and Jan Mayen Islands</option>
							<option value="SZ">Swaziland</option>
							<option value="SE">Sweden</option>
							<option value="CH">Switzerland</option>
							<option value="TW">Taiwan</option>
							<option value="TJ">Tajikistan</option>
							<option value="TZ">Tanzania</option>
							<option value="TH">Thailand</option>
							<option value="TG">Togo</option>
							<option value="TO">Tonga</option>
							<option value="TT">Trinidad and Tobago</option>
							<option value="TN">Tunisia</option>
							<option value="TR">Turkey</option>
							<option value="TM">Turkmenistan</option>
							<option value="TC">Turks and Caicos Islands</option>
							<option value="TV">Tuvalu</option>
							<option value="UG">Uganda</option>
							<option value="UA">Ukraine</option>
							<option value="AE">United Arab Emirates</option>
							<option value="US">United States</option>
							<option value="UY">Uruguay</option>
							<option value="VU">Vanuatu</option>
							<option value="VA">Vatican City State</option>
							<option value="VE">Venezuela</option>
							<option value="VN">Vietnam</option>
							<option value="VG">Virgin Islands (British)</option>
							<option value="WF">Wallis and Futuna Islands</option>
							<option value="YE">Yemen</option>
							<option value="ZM">Zambia</option>
							<option value="ZW">Zimbabwe</option>
						</select>
					</div>
				</div>
			</div>

			<div class="col-md-6">
				<div class="form-group">
					<label for="donation-process__elem-postcode">Postcode <span>*</span></label>

					<div class="form-item">
						<input id="donation-process__elem-postcode" type="text" name="card[billingPostcode]" required>
					</div>
				</div>
			</div>
		</div>
	</div><!-- /.form-section -->




	<div class="form-section">
		<p>Is your home address the same as your billing address?</p>

		<div class="form-group form-group--alt">
			<input id="donation-process__elem-same-address-yes" class="donation-process__address-switcher" type="radio" checked="checked" name="donation-process__address-switcher">
			<label for="donation-process__elem-same-address-yes">Yes</label>
		</div>

		<div class="form-group">
			<input id="donation-process__elem-same-address-no" class="donation-process__address-switcher" type="radio" name="donation-process__address-switcher">
			<label for="donation-process__elem-same-address-no">No</label>
		</div>
	</div><!-- /.form-section -->




	<div class="form-section donation-process__home-address">
		<h2>Your Home address</h2>

		<div class="form-group">
			<label for="donation-process__elem-home-address-one">Address line 1 <span>*</span></label>

			<div class="form-item">
				<input id="donation-process__elem-home-address-one" type="text" name="extras[homeAddress1]" required>
			</div>
		</div>

		<div class="form-group">
			<label for="donation-process__elem-home-address-two">Address line 2</label>

			<div class="form-item">
				<input id="donation-process__elem-home-address-two" type="text" name="extras[homeAddress2]">
			</div>
		</div>

		<div class="form-group">
			<label for="donation-process__elem-home-town-city">Town/City <span>*</span></label>

			<div class="form-item">
				<input id="donation-process__elem-home-town-city" type="text" name="extras[homeCity]" required>
			</div>
		</div>

		<div class="row">
			<div class="col-md-6">
				<div class="form-group">
					<label for="donation-process__elem-home-country">Country <span>*</span></label>

					<div class="form-item">
						<select id="donation-process__elem-home-country" name="extras[homeCountry]" required>
							<option value="GB">United Kingdom</option>
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
							<option value="BB">Barbados</option>
							<option value="BY">Belarus</option>
							<option value="BE">Belgium</option>
							<option value="BZ">Belize</option>
							<option value="BJ">Benin</option>
							<option value="BM">Bermuda</option>
							<option value="BT">Bhutan</option>
							<option value="BO">Bolivia</option>
							<option value="BA">Bosnia and Herzegovina</option>
							<option value="BW">Botswana</option>
							<option value="BR">Brazil</option>
							<option value="BN">Brunei</option>
							<option value="BG">Bulgaria</option>
							<option value="BF">Burkina Faso</option>
							<option value="BI">Burundi</option>
							<option value="KH">Cambodia</option>
							<option value="CM">Cameroon</option>
							<option value="CA">Canada</option>
							<option value="CV">Cape Verde</option>
							<option value="KY">Cayman Islands</option>
							<option value="TD">Chad</option>
							<option value="CL">Chile</option>
							<option value="C2">China</option>
							<option value="CO">Colombia</option>
							<option value="KM">Comoros</option>
							<option value="CK">Cook Islands</option>
							<option value="CR">Costa Rica</option>
							<option value="CI">Cote D'Ivoire</option>
							<option value="HR">Croatia</option>
							<option value="CY">Cyprus</option>
							<option value="CZ">Czech Republic</option>
							<option value="CD">Democratic Republic of the Congo</option>
							<option value="DK">Denmark</option>
							<option value="DJ">Djibouti</option>
							<option value="DM">Dominica</option>
							<option value="DO">Dominican Republic</option>
							<option value="EC">Ecuador</option>
							<option value="EG">Egypt</option>
							<option value="SV">El Salvador</option>
							<option value="ER">Eritrea</option>
							<option value="EE">Estonia</option>
							<option value="ET">Ethiopia</option>
							<option value="FK">Falkland Islands</option>
							<option value="FO">Faroe Islands</option>
							<option value="FJ">Fiji</option>
							<option value="FI">Finland</option>
							<option value="FR">France</option>
							<option value="GF">French Guiana</option>
							<option value="PF">French Polynesia</option>
							<option value="GA">Gabon Republic</option>
							<option value="GM">Gambia</option>
							<option value="GE">Georgia</option>
							<option value="DE">Germany</option>
							<option value="GI">Gibraltar</option>
							<option value="GR">Greece</option>
							<option value="GL">Greenland</option>
							<option value="GD">Grenada</option>
							<option value="GP">Guadeloupe</option>
							<option value="GT">Guatemala</option>
							<option value="GN">Guinea</option>
							<option value="GW">Guinea Bissau</option>
							<option value="GY">Guyana</option>
							<option value="HN">Honduras</option>
							<option value="HK">Hong Kong</option>
							<option value="HU">Hungary</option>
							<option value="IS">Iceland</option>
							<option value="IN">India</option>
							<option value="ID">Indonesia</option>
							<option value="IE">Ireland</option>
							<option value="IL">Israel</option>
							<option value="IT">Italy</option>
							<option value="JM">Jamaica</option>
							<option value="JP">Japan</option>
							<option value="JO">Jordan</option>
							<option value="KZ">Kazakhstan</option>
							<option value="KE">Kenya</option>
							<option value="KI">Kiribati</option>
							<option value="KW">Kuwait</option>
							<option value="KG">Kyrgyzstan</option>
							<option value="LA">Laos</option>
							<option value="LV">Latvia</option>
							<option value="LS">Lesotho</option>
							<option value="LI">Liechtenstein</option>
							<option value="LT">Lithuania</option>
							<option value="LU">Luxembourg</option>
							<option value="MK">Macedonia</option>
							<option value="MG">Madagascar</option>
							<option value="MW">Malawi</option>
							<option value="MY">Malaysia</option>
							<option value="MV">Maldives</option>
							<option value="ML">Mali</option>
							<option value="MT">Malta</option>
							<option value="MH">Marshall Islands</option>
							<option value="MQ">Martinique</option>
							<option value="MR">Mauritania</option>
							<option value="MU">Mauritius</option>
							<option value="YT">Mayotte</option>
							<option value="MX">Mexico</option>
							<option value="FM">Micronesia</option>
							<option value="MD">Moldova</option>
							<option value="MC">Monaco</option>
							<option value="MN">Mongolia</option>
							<option value="ME">Montenegro</option>
							<option value="MS">Montserrat</option>
							<option value="MA">Morocco</option>
							<option value="MZ">Mozambique</option>
							<option value="NA">Namibia</option>
							<option value="NR">Nauru</option>
							<option value="NP">Nepal</option>
							<option value="NL">Netherlands</option>
							<option value="AN">Netherlands Antilles</option>
							<option value="NC">New Caledonia</option>
							<option value="NZ">New Zealand</option>
							<option value="NI">Nicaragua</option>
							<option value="NE">Niger</option>
							<option value="NG">Nigeria</option>
							<option value="NU">Niue</option>
							<option value="NF">Norfolk Island</option>
							<option value="NO">Norway</option>
							<option value="OM">Oman</option>
							<option value="PW">Palau</option>
							<option value="PA">Panama</option>
							<option value="PG">Papua New Guinea</option>
							<option value="PY">Paraguay</option>
							<option value="PE">Peru</option>
							<option value="PH">Philippines</option>
							<option value="PN">Pitcairn Islands</option>
							<option value="PL">Poland</option>
							<option value="PT">Portugal</option>
							<option value="QA">Qatar</option>
							<option value="CG">Republic of the Congo</option>
							<option value="RE">Reunion</option>
							<option value="RO">Romania</option>
							<option value="RU">Russia</option>
							<option value="RW">Rwanda</option>
							<option value="KN">Saint Kitts and Nevis Anguilla</option>
							<option value="PM">Saint Pierre and Miquelon</option>
							<option value="VC">Saint Vincent and Grenadines</option>
							<option value="WS">Samoa</option>
							<option value="SM">San Marino</option>
							<option value="ST">São Tomé and Príncipe</option>
							<option value="SA">Saudi Arabia</option>
							<option value="SN">Senegal</option>
							<option value="RS">Serbia</option>
							<option value="SC">Seychelles</option>
							<option value="SL">Sierra Leone</option>
							<option value="SG">Singapore</option>
							<option value="SK">Slovakia</option>
							<option value="SI">Slovenia</option>
							<option value="SB">Solomon Islands</option>
							<option value="SO">Somalia</option>
							<option value="ZA">South Africa</option>
							<option value="KR">South Korea</option>
							<option value="ES">Spain</option>
							<option value="LK">Sri Lanka</option>
							<option value="SH">St. Helena</option>
							<option value="LC">St. Lucia</option>
							<option value="SR">Suriname</option>
							<option value="SJ">Svalbard and Jan Mayen Islands</option>
							<option value="SZ">Swaziland</option>
							<option value="SE">Sweden</option>
							<option value="CH">Switzerland</option>
							<option value="TW">Taiwan</option>
							<option value="TJ">Tajikistan</option>
							<option value="TZ">Tanzania</option>
							<option value="TH">Thailand</option>
							<option value="TG">Togo</option>
							<option value="TO">Tonga</option>
							<option value="TT">Trinidad and Tobago</option>
							<option value="TN">Tunisia</option>
							<option value="TR">Turkey</option>
							<option value="TM">Turkmenistan</option>
							<option value="TC">Turks and Caicos Islands</option>
							<option value="TV">Tuvalu</option>
							<option value="UG">Uganda</option>
							<option value="UA">Ukraine</option>
							<option value="AE">United Arab Emirates</option>
							<option value="US">United States</option>
							<option value="UY">Uruguay</option>
							<option value="VU">Vanuatu</option>
							<option value="VA">Vatican City State</option>
							<option value="VE">Venezuela</option>
							<option value="VN">Vietnam</option>
							<option value="VG">Virgin Islands (British)</option>
							<option value="WF">Wallis and Futuna Islands</option>
							<option value="YE">Yemen</option>
							<option value="ZM">Zambia</option>
							<option value="ZW">Zimbabwe</option>
						</select>
					</div>
				</div>
			</div>

			<div class="col-md-6">
				<div class="form-group">
					<label for="donation-process__elem-home-postcode">Postcode <span>*</span></label>

					<div class="form-item">
						<input id="donation-process__elem-home-postcode" type="text" name="extras[homePostcode]" required>
					</div>
				</div>
			</div>
		</div>
	</div><!-- /.form-section -->



	<button class="btn donation-process__btn-submit" type="submit">Submit</button>
</div><!-- /.donation-process__step-two -->
