/* Template: Mobile subnav
 ========================================================================== */

template.mobile_subnav = function() {

  var $supports_touch = 'ontouchstart' in window || navigator.msMaxTouchPoints,
      $sidebar_dropdown = $('.sidebar__dropdown'),
      $sidebar_dropdown_icon = $('.sidebar__dropdown .icon'),
      animating = false;

  $sidebar_dropdown_icon.click(function (e) {

    e.preventDefault();
    e.stopPropagation();

    // if not already animating
    if (!animating) {
      animating = true;

      var $this = $(this),
          $a = $this.parent(),
          $li = $a.parent(),
          $children = $li.find('ul').first();

      $a.blur();

      // show children
      if (!$li.hasClass('active')) {
        $children.hide();
        $li.addClass('active');
        $children.slideDown(function() {
          animating = false;
        });
      }
      // hide children 
      else {
        $children.css('display', 'block');
        $li.removeClass('active');
        $children.slideUp(function() {
          animating = false;
        });
      }
    }


  });

  /*$sidebar_dropdown.click(function(e) {

      var $this = $(this);
      var mq = template.media_query();


      // if it's child menu is not open, open it
      if (!$this.hasClass('active')) {
          e.preventDefault();
          $this.addClass('active');
          $this.find('a').first().removeAttr('title')
      }
      // otherwise just fire the link

  });*/

};
