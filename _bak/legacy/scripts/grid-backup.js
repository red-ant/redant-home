const init = $(function() {
  var canvas;
  var cw;
  var ch;
  var interval = null;

  // isometric:
  var IsoW; // cell width
  var IsoH; // cell height
  var IsoX;
  var IsoY;

  function IsoToScreenX(localX, localY) {
    return IsoX + (localX - localY) * IsoW;
  }

  function IsoToScreenY(localX, localY) {
    return IsoY + (localX + localY) * IsoH;
  }

  function ScreenToIsoX(globalX, globalY) {
    return ((globalX - IsoX) / IsoW + (globalY - IsoY) / IsoH) / 2;
  }

  function ScreenToIsoY(globalX, globalY) {
    return ((globalY - IsoY) / IsoH - (globalX - IsoX) / IsoW) / 2;
  }

  function bind(id, onupdate) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');
    var mouseX = canvas.width / 2;
    var mouseY = canvas.height / 2;

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      onupdate(ctx, mouseX, mouseY);
      ctx.restore();
    }

    canvas.onmousemove = function(e) {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
    };

    canvas.onmouseover = function(e) {
      if (interval == null) interval = setInterval(update, 50);
    };

    canvas.onmouseout = function(e) {
      if (interval != null) {
        clearInterval(interval);
        interval = null;
      }
    };

    onupdate(ctx, mouseX, mouseY);
  }

  bind('canvas-header', function(ctx, mouseX, mouseY) {
    ctx.font = '11px sans-serif';

    var rx = ScreenToIsoX(mouseX, mouseY);
    var ry = ScreenToIsoY(mouseX, mouseY);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Mouse (absolute): ' + mouseX + ',' + mouseY, 3, 3);
    ctx.fillText(
      'Mouse (relative): ' + rx.toFixed(2) + ',' + ry.toFixed(2),
      3,
      15
    );

    ctx.strokeStyle = '#ddd';
    for (var i = 0; i <= 8; i++) {
      ctx.beginPath();
      ctx.moveTo(IsoToScreenX(0, i), IsoToScreenY(0, i));
      ctx.lineTo(IsoToScreenX(8, i), IsoToScreenY(8, i));
      ctx.moveTo(IsoToScreenX(i, 0), IsoToScreenY(i, 0));
      ctx.lineTo(IsoToScreenX(i, 8), IsoToScreenY(i, 8));
      ctx.closePath();
      ctx.stroke();
    }

    rx = Math.max(0, Math.min(rx, 8));
    ry = Math.max(0, Math.min(ry, 8));
    ctx.lineWidth = 3;

    ctx.strokeStyle = '#DF4040'; //red
    ctx.beginPath();
    ctx.moveTo(IsoToScreenX(0, ry), IsoToScreenY(0, ry));
    ctx.lineTo(IsoToScreenX(8, ry), IsoToScreenY(8, ry));
    ctx.stroke();

    ctx.strokeStyle = '#4040DF'; //blue
    ctx.beginPath();
    ctx.moveTo(IsoToScreenX(rx, 0), IsoToScreenY(rx, 0));
    ctx.lineTo(IsoToScreenX(rx, 8), IsoToScreenY(rx, 8));
    ctx.stroke();

    ctx.strokeStyle = '#40DF40'; //green
    ctx.beginPath();
    ctx.moveTo(mouseX, 0);
    ctx.lineTo(mouseX, IsoToScreenY(8, mouseY));
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (var x = 0; x < 8; x++)
      for (var y = 0; y < 8; y++) {
        ctx.fillText(
          x + ',' + y,
          IsoToScreenX(x, y),
          IsoToScreenY(x, y) + IsoH
        );
      }
  });

  function init() {
    canvas = document.getElementById('canvas-header');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    cw = canvas.width;
    ch = canvas.height;

    // isometric:
    IsoW = cw / 8; // cell width
    IsoH = IsoW / 2; // cell height
    IsoX = cw / 2;
    IsoY = (ch - IsoH * 16) / 2;
  }

  $(window).resize(function() {
    init();
  });

  init();
});

export default init;
