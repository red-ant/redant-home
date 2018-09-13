// https://bl.ocks.org/mbostock/c5c0c7de6a357a6780a3
// Isometric

// mike
var width = 1356,
    height = 600;
var canvas = d3.select(".header").append("canvas")
    .attr("class", "bg")
    .attr("width", width)
    .attr("height", height);
// /mike

var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;

var isocontext = isometric(context);
isocontext.scale3d(40, 40, 40);
context.lineWidth = 1.5;
context.lineJoin = "round";

d3_timer.timer(function(elapsed) {
  context.save();
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#fff";
  context.translate(width / 2, height / 2);

  for (var x = -8; x <= 8; ++x) {
    for (var y = -8; y <= 8; ++y) {
      context.beginPath();
      drawCube(Math.sin(elapsed / 2000) * Math.PI + (x * y / 20), x * 2, y * 2, 0);
      context.fill();
      context.stroke();
    }
  }

  context.restore();
});

function drawCube(angle, x, y, z) {
  if ((angle %= Math.PI / 2) < 0) angle += Math.PI / 2;
  isocontext.save();
  isocontext.translate3d(x, y, z);
  isocontext.rotateZ(angle - Math.PI / 4);
  isocontext.moveTo(-0.5, -0.5, +0.5);
  isocontext.lineTo(+0.5, -0.5, +0.5);
  isocontext.lineTo(+0.5, +0.5, +0.5);
  isocontext.lineTo(-0.5, +0.5, +0.5);
  isocontext.closePath();
  isocontext.moveTo(-0.5, -0.5, -0.5);
  isocontext.lineTo(-0.5, -0.5, +0.5);
  isocontext.lineTo(-0.5, +0.5, +0.5);
  isocontext.lineTo(-0.5, +0.5, -0.5);
  isocontext.closePath();
  isocontext.moveTo(-0.5, -0.5, -0.5);
  isocontext.lineTo(+0.5, -0.5, -0.5);
  isocontext.lineTo(+0.5, -0.5, +0.5);
  isocontext.lineTo(-0.5, -0.5, +0.5);
  isocontext.closePath();
  isocontext.restore();
}