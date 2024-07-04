/* Template: Desktop subnav
 ========================================================================== */

template.desktop_subnav = function() {

  var containerWidth = 1140,
      subMenuWidth = 500,
      $subMenu = $('.sub-menu'),
      containerY = $('.container-fluid').offset().left + containerWidth;

  // Show sub menus so we can find their position
  $subMenu.show();

  // Loop though each sub menu to see if it appears outside of container and change position if it does
  $subMenu.each(function() {
    var subMenuY  = $(this).offset().left + subMenuWidth;

    if(containerY < subMenuY) {
      $(this).css({
        'left' : 'auto',
        'right' : '0'
      });
    }
  });

  // Hide sub menus
  $subMenu.hide();
};
