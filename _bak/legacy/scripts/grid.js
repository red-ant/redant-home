import Parallax from 'parallax-js';

const init = $(function() {
  function init() {
    var scene = document.getElementById('parallax-header');
    var parallaxInstance = new Parallax(scene, {
      relativeInput: true
    });
  }

  init();
});

export default init;
