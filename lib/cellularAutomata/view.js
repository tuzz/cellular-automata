"use strict";

var View = function (circularBuffer) {
  var self = this;
  var width, height;

  var initialize = function () {
    var firstRow = circularBuffer.get(0);

    width = firstRow.length();
    height = circularBuffer.fixedSize();
  };

  self.width = function () {
    return width;
  };

  self.height = function () {
    return height;
  };

  self.get = function (x, y) {
    checkBounds(x, y);

    var row;
    if (y < circularBuffer.length()) {
      row = circularBuffer.get(y);
    }

    if (row && x < width) {
      return row.get(x);
    } else {
      return false;
    }
  };

  var checkBounds = function (x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) {
      throw new Error("The coordinate (" + x + ", " + y + ") is out of bounds");
    }
  };

  initialize();
};

module.exports = View;
