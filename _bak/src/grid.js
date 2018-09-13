import Parallax from 'parallax-js';

const init = $(function() {
  function init() {
    $('.parallax-container').each(function() {
      var parallaxInstance = new Parallax(this, {
        relativeInput: true
      });
    })
  }

  init();
});

export default init;
