/* Template: Donation Giftaid
 ========================================================================== */

template.getGiftAid = function(value) {
    var val = (value / 100) * 25;

    return parseFloat(val);
};

template.setGiftAid = function() {
    var donation = parseFloat($('.donation-amount__input input').val()),
        giftAidDonation = template.getGiftAid(donation);

    if (!isNaN(donation) && !isNaN(giftAidDonation)) {
        $('.donation-amount').text('£' + donation.toFixed(2));

        $('.giftaid-amount').text('£' + (donation + giftAidDonation).toFixed(2));
    }
};

template.giftAidChange = function() {

    $('.donation-amount__input input').change(function() {
        template.setGiftAid();
    });

    $(document).on('ifChanged change', '#gift_aid', function(e) {
        e.stopPropagation();

        $('.donation-process__selection p').toggleClass('active');
    });

};

template.giftAid = function() {
    template.setGiftAid();
    template.giftAidChange();
};