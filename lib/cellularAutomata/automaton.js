"use strict";

var Row = require("./row");

var Automaton = function (startRule) {
  var self = this;
  var rule = startRule;

  self.nextRow = function (row) {
    var length = row.length();
    var nextRow = new Row(length);

    for (var i = 0; i < length; i += 1) {
      var left = get(row, i - 1, length);
      var center = get(row, i, length);
      var right = get(row, i + 1, length);

      var alive = rule.apply(left, center, right);
      nextRow.set(i, alive);
    }

    return nextRow;
  };

  self.setRule = function (newRule) {
    rule = newRule;
  };

  var get = function (row, index, length) {
    if (index >= 0 && index < length) {
      return row.get(index);
    } else {
      return false;
    }
  };
};

module.exports = Automaton;
