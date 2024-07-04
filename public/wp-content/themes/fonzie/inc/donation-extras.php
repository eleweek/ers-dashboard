<?php

function charitypress_change_export_columns() {
	return [
		'First name'     => 'donor.firstName',
		'Last name'      => 'donor.lastName',
		'Email'          => 'donor.email',
		'Billing Address Line 1' => 'donor.billingAddress1',
		'Billing Address Line 2' => 'donor.billingAddress2',
		'Billing Town/City'      => 'donor.billingCity',
		'Billing Postcode'       => 'donor.billingPostcode',
		'Billing Country'        => 'donor.billingCountry',
		'Home Address Line 1' => 'extras.homeAddress1',
		'Home Address Line 2' => 'extras.homeAddress2',
		'Home Town/City'      => 'extras.homeCity',
		'Home Postcode'       => 'extras.homePostcode',
		'Home Country'        => 'extras.homeCountry',
		'Amount'         => 'amount',
		'Status'         => 'status',
		'Date'           => 'created',
		'Transaction ID' => 'gateway_transaction_id',
		'Gift Aid'       => 'gift_aid'
	];
}
add_filter( 'charitypress/donations/export_fields', 'charitypress_change_export_columns' );
