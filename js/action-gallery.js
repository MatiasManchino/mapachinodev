$(document).ready(function($) {
  $('.buttons').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    var filter = $(this).attr('data-filter');
    if (filter == 'Todo') {
      $('.image').show(400);
    } else {
      $('.image').not('.' + filter).hide(200);
      $('.image').filter('.' + filter).show(400);
    }
  });

  $('.gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: {
      enabled: true
    },
    image: {
      titleSrc: function(item) {
        return item.el.find('img').attr('alt');
      }
    }
  });
});
