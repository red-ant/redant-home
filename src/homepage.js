import 'slick-carousel';

import AOS from 'aos';

const init = $(function() {
  var $carousel_selector = $('.carousel');
  var overlay_selector = '.nav-overlay';
  var toggle_selector = '.nav-toggle-icon';

  /* Nav menu */
  $(toggle_selector + ', .nav-links').click(function() {
    $(overlay_selector).toggleClass('open');
  });

  var path = window.location.pathname.replace(/\//g, '');

  if (path.length === 0) {
    path = 'home';
  }

  $(`.${path}-link`).toggleClass('active');

  /* AOS */
  $(window).resize(function() {
    AOS.refresh();
  });

  AOS.init({
    dataAosAnchorPlacement: 'center-bottom',
    easing: 'ease-in-out',
    duration: 900,
    disable: 'mobile'
  });

  $(document).on('click', 'a[href^="#contact"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top,
      easing: "easein"
     }, 500);
  });

  /* Carousel */
  if ($carousel_selector.length) {
    $carousel_selector.slick({
      dots: true,
      appendDots: '.carousel-dots',
      appendArrows: '.carousel-arrows',
      autoplay: true,
      autoplaySpeed: 4000,
      slidesToScroll: 1
    });

    $carousel_selector.slick('slickPause');

    $(document).on('scroll', function() {
      if (($carousel_selector.offset().top - window.innerHeight) < window.scrollY) {
        $carousel_selector.slick('slickPlay');
        $(document).off('scroll');
      }
    });
  }


  $('#gallery-modal').on('shown.bs.modal', function (e) {
    var $carousel = $(this).find(carousel_selector);
    var index = $(e.relatedTarget).data('index');
    $carousel.resize();

    if (index) {
      $carousel.slick('slickGoTo', index - 1);
    }
  });
});

export default init;
