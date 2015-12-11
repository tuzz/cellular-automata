"use strict";

var Rule = function (name) {
  var self = this;
  var rules = [];

  var initialize = function () {
    var binary = name.toString(2);
    var padded = ("0000000" + binary);
    var substring = padded.substring(padded.length - 8);
    var characters = substring.split("");

    for (var i = 0; i < characters.length; i += 1) {
      var character = characters[i];
      rules.push(character === "1");
    }
  };

  self.apply = function (left, center, right) {
    var index = 0;

    if (!left) {
      index += 4;
    }

    if (!center) {
      index += 2;
    }

    if (!right) {
      index += 1;
    }

    return rules[index];
  };

  initialize();
};

module.exports = Rule;
