/* Global: Media query tester
 ========================================================================== */

template.media_query = function() {
  var body = document.querySelector('body'), 
      result = getComputedStyle(body, ':before').content;
      result = result.replace(/['"]+/g, '');
  return result;
};
