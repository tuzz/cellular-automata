"use strict";

var CanvasView = function (canvas, view) {
  var self = this;
  var initialized, context, imageData, scale;

  var initialize = function () {
    context = canvas.getContext("2d");
    imageData = context.createImageData(canvas.width, canvas.height);

    scale = canvas.width / view.width();
  };

  self.render = function () {
    if (!initialized) {
      initialize();
      initialized = true;
    }

    for (var y = 0; y < view.height(); y += 1) {
      for (var x = 0; x < view.width(); x += 1) {
        var color = view.get(x, y) ? 0 : 255;
        setCell(x, y, color);
      }
    }

    redraw();
  };

  var setCell = function (x, y, color) {
    var xOffset = x * scale;
    var yOffset = y * scale;

    for (var i = 0; i < scale; i += 1) {
      for (var j = 0; j < scale; j += 1) {
        setPixel(xOffset + i, yOffset + j, color);
      }
    }
  };

  var setPixel = function (x, y, color) {
    var offset = (y * canvas.width + x) * 4;

    imageData.data[offset + 0] = color;
    imageData.data[offset + 1] = color;
    imageData.data[offset + 2] = color;
    imageData.data[offset + 3] = 255;
  };

  var redraw = function () {
    context.putImageData(imageData, 0, 0);
  };
};

module.exports = CanvasView;
