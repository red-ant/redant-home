import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

const init = $(function() {
  var overlay_selector = '.nav-overlay';
  var toggle_selector = '.nav-toggle-icon';

  $(toggle_selector + ', .nav-links').click(function() {
    $(overlay_selector).toggleClass('open');
  });

  $(window).resize(function() {
    AOS.refresh();
  });

  function init() {
    $('.carousel').slick();
    AOS.init({
      dataAosAnchorPlacement: 'center-bottom',
      easing: 'ease-in-out'
    });
  }

  init();
});

export default init;
