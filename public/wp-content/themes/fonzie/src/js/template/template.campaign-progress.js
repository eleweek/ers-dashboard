/* Template: Campaign progress
 ========================================================================== */

template.campaign_progress = function() {

    var $campaignProgressWidget = $('.campaign-progress'),
    	animationLength = 2000,
    	animationDelay = 2000;


    // for each campaign widget on the page
    $campaignProgressWidget.each(function(index) {
    	var $this = $(this),
	    	$progressBarContainer = $this.find('.progress-container'),
    		$progressBar = $this.find('.progress-bar'),
	    	$progressBarValue = $this.find('.progress-bar-value'),
	    	progressBarPercent = $this.find($progressBar).data('percent'),
	    	progressBarFinalWidth = 0,
	    	$raised = $this.find('.raised-value'),
	    	raisedValue = $raised.data('raised'),
	    	raisedCount = 0;

	    // figure out the minimum width we want the final progress bar to be in percent (it needs to be at
	    // least 59px wide so that we can see at least a one digit number without it being clipped
	    var progressBarContainerWidth = parseInt($progressBarContainer.width());
		var progressBarMinWidth = Math.round((59 / progressBarContainerWidth) * 100);

	    // figure out what the width of the final progress bar should be
	    if (progressBarPercent < progressBarMinWidth) { // we don't want the bar to be any less than 59px wide - otherwise we won't see the number
	    	progressBarFinalWidth = progressBarMinWidth;
	    }
	    else {
	    	progressBarFinalWidth = progressBarPercent;
	    }

	    // set width of progress bar to make it animate
		$progressBar.css('width', progressBarFinalWidth + '%');

		// show the number
		$progressBarValue.addClass('show');

		// wait 1s (there is a 1s delay on the css transition)
		setTimeout(function(){

			// make the percent bar number count up over the course of [animationLength]ms
			$progressBarValue.countTo({
			  from: 0,
			  to: progressBarPercent,
			  speed: animationLength,
			  refreshInterval: 20,
			  formatter: function (value, options) {
			    return value.toFixed(options.decimals) + '%'; // format to percentage
			  }
			});

			// make the 'raised' amount count up over the course of [animationLength]ms
			$raised.countTo({
			  from: 0,
			  to: raisedValue,
			  speed: animationLength,
			  refreshInterval: 20,
			  formatter: function (value, options) {
			    value = value.toFixed(options.decimals);
			    return '£' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // format to currency
			  }
			});
		}, animationDelay);
    });
    
};