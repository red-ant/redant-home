// https://bl.ocks.org/mbostock/2b116e0a95b4c981d50a
// Isometric III

// mike
var width = 1356,
    height = 600;
var canvas = d3.select(".header").append("canvas")
    .attr("class", "bg")
    .attr("width", width)
    .attr("height", height);
var scale = 37;
var dist = 1.42;
var speed = 5000;
var spread = 15;
// /mike

var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;

var isocontext = isometric(context);
isocontext.scale3d(scale, scale, scale);


var f = function(elapsed) {
  context.save();
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#fff";
  context.strokeStyle = "#000";
  context.translate(width / 2, height * 0.6);
  for (var x = spread, d, t = (elapsed / speed) % 1; x >= -spread; --x) {
    for (var y = spread; y >= -spread; --y) {
      if ((d = distanceManhattan(x, y)) > (spread+1)) continue;
      var te = d3_ease.easeCubic(Math.max(0, Math.min(1, t * 4.8 - distanceCartesian(x, y) / 5)));
      drawCube((d & 1 ? -1 : +1) * (Math.PI / 4 - te * Math.PI / 2), x * dist, y * dist + te * (x & 1 ? 1 : -1) * dist, te * dist * 2);
    }
  }
  context.restore();
  //console.log('1');
};
var t = d3_timer.timer(f);

function distanceCartesian(x, y) {
  return Math.sqrt(x * x + y * y);
}

function distanceManhattan(x, y) {
  return Math.abs(x) + Math.abs(y);
}

function drawCube(angle, x, y, z) {
  if ((angle %= Math.PI / 2) < 0) angle += Math.PI / 2;
  isocontext.save();
  isocontext.translate3d(x, y, z);
  isocontext.rotateZ(angle - Math.PI / 4);

  context.beginPath();
  isocontext.moveTo(+0.5, -0.5, +0.5);
  isocontext.lineTo(+0.5, +0.5, +0.5);
  isocontext.lineTo(-0.5, +0.5, +0.5);
  isocontext.lineTo(-0.5, +0.5, -0.5);
  isocontext.lineTo(-0.5, -0.5, -0.5);
  isocontext.lineTo(+0.5, -0.5, -0.5);
  isocontext.closePath();
  context.fill();
  context.lineWidth = 1.5;
  context.strokeStyle = "#000";
  context.stroke();

  context.beginPath();
  isocontext.moveTo(-0.5, -0.5, +0.5);
  isocontext.lineTo(+0.5, -0.5, +0.5);
  isocontext.moveTo(-0.5, -0.5, +0.5);
  isocontext.lineTo(-0.5, +0.5, +0.5);
  isocontext.moveTo(-0.5, -0.5, +0.5);
  isocontext.lineTo(-0.5, -0.5, -0.5);
  context.lineWidth = 0.75;
  context.strokeStyle = "#000";
  context.stroke();

  isocontext.restore();
}
