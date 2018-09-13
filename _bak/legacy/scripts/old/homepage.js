$(function() {
  'use strict';

  // update the footer copyright with the current year
  $('.yyyy').html(new Date().getFullYear());

  function showMenu($overlay) {
    $overlay.addClass('open');
  }

  function hideMenu($overlay) {
    $overlay.removeClass('open');
    $overlay.addClass('nav-closing');

    function hideFinished(event) {
      if (event.target === $overlay.get(0)) {
        $overlay.removeClass('nav-closing');
        $overlay.off($.support.transition.end, hideFinished);
      }
    }

    if ($.support.transition) {
      $overlay
        .on($.support.transition.end, hideFinished)
        .emulateTransitionEnd(10000);
    }
  }

  $('button.hamburger').click(function() {
    var $this    = $(this),
        $overlay = $('.overlay'),
        $nav     = $this.parents('.nav');

    if ($overlay.hasClass('open')) {
      hideMenu($overlay);

      $this.removeClass('active');
      //$nav.removeClass('active');
    }

    else if (!$overlay.hasClass('nav-closing')) {
      showMenu($overlay);

      $this.addClass('active');
      //$nav.addClass('active');
    }
  });

  var $nav = document.querySelector('.nav');
  var origOffsetY = $nav.offsetTop;
  function onScroll(e) {
    window.scrollY >= origOffsetY ? $nav.classList.add('sticky') : $nav.classList.remove('sticky');
  }
  document.addEventListener('scroll', onScroll);

  /*
  var waypoint = new Waypoint({
    element: $('.nav')[0],
    handler: function(direction) {
      console.log('You have scrolled to a thing')
    }
  });

  var sticky = new Waypoint.Sticky({
    element: $('.nav')[0]
  });
  */

  var platform_svg = new Waypoint({
    element: $('.platform svg')[0],
    offset: '75%',
    handler: function(direction) {
      console.log(direction);
      platform_svg_expand();
    }
  });
});

platform_svg_expand = function(){
  $('.platform svg #one').attr('transform','translate(0,-60)');
  $('.platform svg #two').attr('transform','translate(0,-30)');
  $('.platform svg #four').attr('transform','translate(0,30)');
  $('.platform svg #five').attr('transform','translate(0,60)');
}
platform_svg_collapse = function(){
  $('.platform svg #one').attr('transform','translate(0,0)');
  $('.platform svg #two').attr('transform','translate(0,0)');
  $('.platform svg #four').attr('transform','translate(0,0)');
  $('.platform svg #five').attr('transform','translate(0,0)');
}

/*
opt 1
  bg stays fixed, fades between colours
opt 2
  bg moves with slide

-A- _B_ -C-

slides
  active = 1
  2 = transformX 100%
  3 = transformX -100%

*/

slide_plando_in = function(){
  $('.slide.plando svg.preview').attr('class','preview animated');
  $('.slide.plando svg.preview #big').attr('transform','translate(-45 75)').attr('opacity','1');
  $('.slide.plando svg.preview #small').attr('transform','translate(-10 437)').attr('opacity','1');
  $('.slide.plando svg.preview .shadow1').attr('transform','translate(0 10)');
  $('.slide.plando svg.preview .shadow2').attr('transform','translate(0 20)');
  $('.slide.plando svg.preview .shadow3').attr('transform','translate(0 30)');
  $('.slide.plando svg.preview .shadow4').attr('transform','translate(0 40)');
  // disable animations for slide out, with enough time for them to complete
  setTimeout(function(){
    $('.slide.plando svg.preview').attr('class','preview');
  },1000);
}

slide_plando_out = function(){
  $('.slide.plando svg.preview').attr('class','preview');
  $('.slide.plando svg.preview #big').attr('transform','translate(-45 -125)').attr('opacity','0');
  $('.slide.plando svg.preview #small').attr('transform','translate(-10 237)').attr('opacity','0');
  $('.slide.plando svg.preview .shadow1').attr('transform','translate(0 0)');
  $('.slide.plando svg.preview .shadow2').attr('transform','translate(0 0)');
  $('.slide.plando svg.preview .shadow3').attr('transform','translate(0 0)');
  $('.slide.plando svg.preview .shadow4').attr('transform','translate(0 0)');
  //$('.slide.plando svg.preview').attr('class','preview animated');
  //console.log($('.slide.plando svg.preview').attr('class'));
}

// temp
//platform_svg_expand();
slide_plando_in();

$('.stuff .slides').slick({
  // Prev/Next Arrows
  arrows: false,
  // Enables Autoplay
  autoplay: false,
  // Autoplay Speed in milliseconds
  // autoplaySpeed: 3000,
  // Current slide indicator dots
  dots: true,
  // Change where the navigation dots are attached (Selector, htmlString, Array, Element, jQuery object)
  // appendDots: $el

  // Infinite looping
  // infinite: true,

  // Number of slides to show at a time
  // slidesToShow: 1,

  // Disables tabbing and arrow key navigation
  accessibility: false,

  speed: 800,
});
/*
$('.stuff .slides').slick({
*/

/*
$('.slides').slick({
  infinite: true,
  dots: false,
  slidesToShow: 1,
  speed: 300,
  autoplay: true,
  fade: true,
  cssEase: 'linear'
});
*/

// https://stackoverflow.com/questions/41464633/how-to-create-slick-slider-with-progress-bar-like-this-http-www-apple-com
// http://kenwheeler.github.io/slick/
// https://github.com/kenwheeler/slick/
/*
var SlickProgressBar = (function(){
  init     // reset to initial state, first slide, paused
  play     // when in viewport, play
  stop     // once clicked, no autoplay
  listen   // watch for enter viewport, exit viewport, mouse over, mouse exit
  pause    // on hover
  resume   // on hover out
  jumpTo   // click on progress bar to jump to slide
  interval // incr progress
})();
*/

var SlickProgressBar = {
  percentTime: false,
  tick: false,
  autoplaySpeed: 3,
  progressBarIndex: 0,

  init: function() {
    // reset to initial state, first slide, paused
    var $progress = $('.slider-progress');
    var n_slides = $('.slides .slide:not(.slick-cloned)').length;

    // init progress bar
    for (var i = 0; i < n_slides; i++) {
      var track = $('<div class="track"><div class="train train' + i + '" data-slick-index="' + i + '"></div></div>');
      $progress.append(track);
    }

    this.play();
  },

  listen: function() {
    // watch for enter viewport, exit viewport, mouse over, mouse exit
    $('.slider, .slider-progress').on('mouseenter.slick', $.proxy(this.pause, this));
    $('.slider, .slider-progress').on('mouseleave.slick', $.proxy(this.resume, this));
  },

  play: function() {
    // when in viewport, play
    this.stop();
    this.percentTime = 0;
    this.resume();
  },

  stop: function() {
    // once clicked, no autoplay
    $('.train').css({width: 0 + '%'});
    clearInterval(this.tick);
  },

  pause: function() {
    // on hover
    clearInterval(this.tick);
  },

  resume: function() {
    // on hover out
    this.tick = setInterval(this.interval, 10);
  },

  jumpTo: function() {
    // click on progress bar to jump to slide
    // click disables autoplay
    $('.slider-progress .train').click(function () {
      clearInterval(this.tick);

      var goToThisIndex = $(this).find('span').data('slickIndex');
      $('.single-item').slick('slickGoTo', goToThisIndex, false);

      //this.start();
      this.stop();//resetProgressbar();

      percentTime = 100;
      this.progressBarIndex = $('.slider .slick-track div[aria-hidden="false"]').data('slickIndex');
      $('.inProgress' + this.progressBarIndex).css({width: this.percentTime + "%"});
    });
  },

  interval: function() {
    // incr progress
    if (($('.slider .slick-track div[data-slick-index="' + this.progressBarIndex + '"]').attr("aria-hidden")) === "true") {
      this.progressBarIndex = $('.slider .slick-track div[aria-hidden="false"]').data("slickIndex");
      start();
    } else {
      this.percentTime += 1 / this.autoplaySpeed;
      $('.inProgress' + this.progressBarIndex).css({width: this.percentTime + "%"});
      if (this.percentTime >= 100) {
        $('.single-item').slick('slickNext');
        this.progressBarIndex++;
        if (this.progressBarIndex > 2) {
          this.progressBarIndex = 0;
        }
        start();
      }
    }
  }
};

SlickProgressBar.init();

/*
var percentTime;
var tick;
var time = 3;
var progressBarIndex = 0;

// based on number of slides
// $('.slider-progress').append('<div class="track"></div>')
// <div class="track">
// <div class="train" data-slick-index="0">
// </div>
// </div>

var $progress = $('.slider-progress');
var n_slides = $('.slides .slide').length;

for (var i = 0; i < n_slides; i++) {
  var track = $('<div class="track"><div class="train train' + i + '" data-slick-index="' + i + '"></div></div>');
  $progress.append(track);
}

function startProgressbar() {
  resetProgressbar();
  percentTime = 0;
  tick = setInterval(interval, 10);
}

// on hover
function pauseProgressbar() {
  clearInterval(tick);
}

// on hover out
function resumeProgressbar() {
  tick = setInterval(interval, 10);
}

//$('.slider').on('mouseenter.slick', $.proxy(_.interrupt, _, true));
//$('.slider').on('mouseleave.slick', $.proxy(_.interrupt, _, false));

$('.slider, .slider-progress').on('mouseenter.slick', pauseProgressbar);
$('.slider, .slider-progress').on('mouseleave.slick', resumeProgressbar);

function interval() {
  if (($('.slider .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
    progressBarIndex = $('.slider .slick-track div[aria-hidden="false"]').data("slickIndex");
    startProgressbar();
  } else {
    percentTime += 1 / time;
    $('.inProgress' + progressBarIndex).css({width: percentTime + "%"});
    if (percentTime >= 100) {
      $('.single-item').slick('slickNext');
      progressBarIndex++;
      if (progressBarIndex > 2) {
        progressBarIndex = 0;
      }
      startProgressbar();
    }
  }
}

function resetProgressbar() {
  $('.inProgress').css({width: 0 + '%'});
  clearInterval(tick);
}

startProgressbar();

// click disables autoplay
$('.slider-progress .train').click(function () {
  clearInterval(tick);
  var goToThisIndex = $(this).find('span').data('slickIndex');
  $('.single-item').slick('slickGoTo', goToThisIndex, false);
  //startProgressbar();
  resetProgressbar();
  percentTime = 100;
  progressBarIndex = $('.slider .slick-track div[aria-hidden="false"]').data('slickIndex');
  $('.inProgress' + progressBarIndex).css({width: percentTime + "%"});
});
*/