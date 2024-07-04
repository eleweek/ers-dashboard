/* Template: Donation Process
 ========================================================================== */
template.donationProcess = function() {
	var donationEdit = $('.donation-process__amount-edit');
	var donationInput = $('.donation-process__amount-input');
	var donationBtnNext = $('.donation-process__btn-next');
	var donationBtnSubmit = $('.donation-process__btn-submit');
	var donationStepOne = $('.donation-process__step-one');
	var donationStepTwo = $('.donation-process__step-two');
	var donationForm = $('#charitypress_donation_form');
	var clickCountNext = 0;
	var clickCountSubmit = 0;
	var donationAmountFormRegular = $('#donation-amount__form-regular');
	var donationAmountFormSingle = $('#donation-amount__form-single');

	function prependError($step) {
		$step.prepend('<p class="error-message">Oops! There seems to be some form errors</p>');
	}



	donationEdit.click(function() {
		donationInput.focus();
	});



	// jquery validate
	var currentYear = new Date().getFullYear();

	/*eslint-disable no-unused-vars*/
	$.validator.addMethod('noSpace', function(value, element) {
		value = value.replace(/ /g,'');
		if(value.length) {
			return true;
		} else {
			return false;
		}
	}, 'Please don\'t leave this field blank');
	/*eslint-enable no-unused-vars*/


	$.validator.addMethod("postcodeUK", function(value, element) {
		return this.optional(element) || /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}$/i.test(value);
	}, "Please specify a valid Postcode");

	donationForm.validate({
		rules: {
			'amount': {
				required: true,
				min: '0.30'
			},
			'card[firstName]': {
				required: true,
				noSpace: true
			},
			'card[lastName]': {
				required: true,
				noSpace: true
			},
			'card[number]': {
				required: true,
				creditcard: true
			},
			'card[expiryMonth]': {
				required: true,
				range: [1, 12],
				rangelength: [1, 2]
			},
			'card[expiryYear]': {
				required: true,
				min: currentYear,
				rangelength: [4, 4]
			},
			'card[cvv]': {
				required: true,
				rangelength: [3, 4]
			},
			'card[billingAddress1]': {
				required: true,
				noSpace: true
			},
			'card[billingCity]': {
				required: true,
				noSpace: true
			},
			'card[billingPostcode]': {
				required: true,
				noSpace: true,
				postcodeUK: true
			},
			'extras[homeAddress1]': {
				required: true,
				noSpace: true
			},
			'extras[homeCity]': {
				required: true,
				noSpace: true
			},
			'extras[homePostcode]': {
				required: true,
				noSpace: true,
				postcodeUK: true
			}
		},
		messages: {
			'card[expiryMonth]': {
				range: 'Please enter a value between 01 and 12',
				rangelength: 'Month must not exceed the maximum of 2 characters'
			},
			'card[expiryYear]': {
				rangelength: 'Year must be 4 characters'
			},
			'card[cvv]': {
				rangelength: 'Must be 3 or 4 digits'
			}
		}
	});

	donationAmountFormRegular.validate({
		'amount': {
			min: '1'
		},
	});
	donationAmountFormSingle.validate({
		'amount': {
			min: '1'
		},
	});

	donationBtnNext.click(function() {
		var donationFormValid = donationForm.valid();
		clickCountNext++;

		if(donationFormValid) {
			donationStepOne.hide();
			donationStepTwo.show();

			$('.process-step--details').removeClass('active');
			$('.process-step--payment').addClass('active');

			$('html,body').scrollTop(0);
		} else {
			$('html,body').scrollTop(0);

			if(clickCountNext === 1) {
				prependError(donationStepOne);
			}
		}
	});


	donationBtnSubmit.click(function() {
		var donationFormValid = donationForm.valid();
		clickCountSubmit++;

		if(!donationFormValid) {
			$('html,body').scrollTop(0);

			if(clickCountSubmit === 1) {
				prependError(donationStepTwo);
			}
		}
	});

	$('#donation-process__elem-expiry-month').change(function() {
		var monthVal = this.value;
		var monthValInt = parseInt(monthVal, 10);

		if(monthValInt < 10 && monthVal.toString().length === 1) {
			this.value = '0' + monthVal;
		}
	});

	$('.donation-process__address-switcher').change(function() {
		if($(this).attr('id') === 'donation-process__elem-same-address-no') {
			$('.donation-process__home-address').addClass('active');
		} else {
			$('.donation-process__home-address').removeClass('active');
		}
	});

};
