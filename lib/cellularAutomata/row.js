"use strict";

var Row = function (length) {
  var self = this;
  var cells = new Array(length);

  for (var i = 0; i < length; i += 1) {
    cells[i] = false;
  }

  self.length = function () {
    return length;
  };

  self.get = function (index) {
    return cells[index];
  };

  self.set = function (index, alive) {
    cells[index] = alive;
  };
};

module.exports = Row;
