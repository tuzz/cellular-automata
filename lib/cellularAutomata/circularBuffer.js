"use strict";

var CircularBuffer = function (fixedSize) {
  var self = this;
  var buffer = new Array(fixedSize);
  var start = 0;
  var length = 0;

  self.length = function () {
    return length;
  };

  self.fixedSize = function () {
    return fixedSize;
  };

  self.get = function (index) {
    var adjustedIndex = (index + start) % fixedSize;
    return buffer[adjustedIndex];
  };

  self.push = function (element) {
    var adjustedIndex = (length + start) % fixedSize;
    buffer[adjustedIndex] = element;

    if (length < fixedSize) {
      length += 1;
    } else {
      start = (start + 1) % fixedSize;
    }
  };
};

module.exports = CircularBuffer;
